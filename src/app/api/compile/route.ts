import { NextRequest, NextResponse } from "next/server";

// Rate limiter with automatic cleanup
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000;
const CLEANUP_INTERVAL = 300000; // 5 minutes

// Periodic cleanup to prevent memory leak
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

const PISTON_INSTANCES = [
  "https://emkc.org/api/v2/piston/execute",
];

async function tryPiston(code: string, language: string): Promise<{ stdout: string; stderr: string } | null> {
  const langMap: Record<string, string> = { c: "c", cpp: "c++" };
  const extMap: Record<string, string> = { c: "c", cpp: "cpp" };

  for (const url of PISTON_INSTANCES) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: langMap[language],
          files: [{ name: `main.${extMap[language]}`, content: code }],
        }),
      });

      const data = await response.json();

      if (data.message && data.message.includes("whitelist")) {
        continue;
      }

      if (!response.ok) {
        continue;
      }

      const run = data.run || {};
      return {
        stdout: run.stdout || "",
        stderr: run.stderr || "",
      };
    } catch {
      continue;
    }
  }
  return null;
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
      const result = await tryPiston(code, language);
      if (result) {
        return NextResponse.json(result);
      }

      return NextResponse.json({
        stdout: "",
        stderr: "Cloud C/C++ compiler is temporarily unavailable. The external compilation service (Piston) requires API access. Try Python or JavaScript in the meantime — both run locally in your browser with no server needed.",
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
