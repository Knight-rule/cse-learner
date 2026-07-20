import { NextRequest, NextResponse } from "next/server";

// Rate limiter with automatic cleanup
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000;
const CLEANUP_INTERVAL = 300000;

let cleanupStarted = false;
if (!cleanupStarted) {
  cleanupStarted = true;
  setInterval(() => {
    const now = Date.now();
    Array.from(rateLimitMap.entries()).forEach(([ip, timestamps]) => {
      const valid = timestamps.filter((t) => now - t < RATE_WINDOW);
      if (valid.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, valid);
      }
    });
  }, CLEANUP_INTERVAL);
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  return "anonymous";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < RATE_WINDOW);
  if (valid.length >= RATE_LIMIT) return false;
  valid.push(now);
  rateLimitMap.set(ip, valid);
  return true;
}

const MAX_CODE_SIZE = 50 * 1024;

// Judge0 language IDs: https://judge0.com/docs/supported-languages
const JUDGE0_LANG_MAP: Record<string, number> = {
  c: 5,       // C (GCC 9.2.0)
  cpp: 12,    // C++ (GCC 9.2.0)
};

async function runViaJudge0(code: string, language: string): Promise<{ stdout: string; stderr: string } | null> {
  const apiKey = process.env.JUDGE0_API_KEY;
  const apiUrl = process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";

  if (!apiKey) return null;

  const langId = JUDGE0_LANG_MAP[language];
  if (!langId) return null;

  try {
    // Submit code
    const submitRes = await fetch(`${apiUrl}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: langId,
        source_code: code,
      }),
    });

    if (!submitRes.ok) return null;

    const data = await submitRes.json();

    return {
      stdout: data.stdout || "",
      stderr: data.stderr || data.compile_output || "",
    };
  } catch {
    return null;
  }
}

async function runViaPiston(code: string, language: string): Promise<{ stdout: string; stderr: string } | null> {
  const pistonUrl = process.env.PISTON_API_URL;
  if (!pistonUrl) return null;

  const langMap: Record<string, string> = { c: "c", cpp: "c++" };
  const extMap: Record<string, string> = { c: "c", cpp: "cpp" };

  try {
    const response = await fetch(`${pistonUrl}/api/v2/piston/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: langMap[language],
        files: [{ name: `main.${extMap[language]}`, content: code }],
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (data.message) return null;

    const run = data.run || {};
    return {
      stdout: run.stdout || "",
      stderr: run.stderr || "",
    };
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded. Please wait before trying again." }, { status: 429 });
    }

    const { language, code } = await request.json();

    if (!language || !code) {
      return NextResponse.json({ error: "language and code are required" }, { status: 400 });
    }

    const allowedLanguages = ["python", "javascript", "c", "cpp"];
    if (!allowedLanguages.includes(language)) {
      return NextResponse.json({ error: "Language not supported" }, { status: 400 });
    }

    if (typeof code !== "string" || code.length > MAX_CODE_SIZE) {
      return NextResponse.json({ error: "Code too large (max 50KB)" }, { status: 400 });
    }

    if (language === "c" || language === "cpp") {
      // Try Judge0 first (RapidAPI free tier: 2000/day)
      const judge0Result = await runViaJudge0(code, language);
      if (judge0Result) {
        return NextResponse.json(judge0Result);
      }

      // Try self-hosted Piston
      const pistonResult = await runViaPiston(code, language);
      if (pistonResult) {
        return NextResponse.json(pistonResult);
      }

      return NextResponse.json({
        stdout: "",
        stderr: [
          "C/C++ cloud compiler not configured yet.",
          "",
          "To enable C/C++ compilation, set one of these environment variables:",
          "",
          "Option 1 (Recommended) — Judge0 via RapidAPI (free 2000/day):",
          "  1. Sign up at https://rapidapi.com/judge0-official/api/judge0-ce",
          "  2. Subscribe to the free tier",
          "  3. Set JUDGE0_API_KEY=<your-rapidapi-key>",
          "",
          "Option 2 — Self-hosted Piston:",
          "  1. Deploy Piston: docker run -d -p 2000:2000 ghcr.io/engineer-man/piston:latest",
          "  2. Set PISTON_API_URL=http://your-piston-host:2000",
          "",
          "In the meantime, try Python or JavaScript — both run locally in your browser!",
        ].join("\n"),
      });
    }

    return NextResponse.json({
      stdout: "",
      stderr: "Python and JavaScript run directly in your browser — no server compilation needed.",
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
