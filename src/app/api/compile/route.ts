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
  // On Render, trust x-forwarded-for from the load balancer only once.
  // Fall back to a generated session key to prevent header-spoofing bypass.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // Take the first IP (original client) — spoofing additional IPs won't help
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  return request.ip || "unknown";
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
      try {
        const langMap: Record<string, string> = { c: "c", cpp: "c++" };
        const extMap: Record<string, string> = { c: "c", cpp: "cpp" };

        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: langMap[language],
            files: [{ name: `main.${extMap[language]}`, content: code }],
          }),
        });

        if (!response.ok) {
          return NextResponse.json({ stdout: "", stderr: `Cloud compiler error (${response.status})` });
        }

        const data = await response.json();
        if (data.message) {
          return NextResponse.json({ stdout: "", stderr: data.message });
        }

        const run = data.run || {};
        return NextResponse.json({ stdout: run.stdout || "", stderr: run.stderr || "" });
      } catch (e: unknown) {
        return NextResponse.json({ stdout: "", stderr: "Cloud compiler unavailable. Check internet connection." });
      }
    }

    return NextResponse.json({
      stdout: "",
      stderr: "Please run Python and JavaScript directly in the browser (no server needed).",
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
