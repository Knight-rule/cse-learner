import { NextRequest, NextResponse } from "next/server";

// Rate limiter (simple in-memory)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < RATE_WINDOW);
  if (valid.length >= RATE_LIMIT) return false;
  valid.push(now);
  rateLimitMap.set(ip, valid);
  return true;
}

const MAX_CODE_SIZE = 50 * 1024; // 50KB

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded. Please wait before trying again." }, { status: 429 });
    }

    const { language, code } = await request.json();

    if (!language || !code) {
      return NextResponse.json({ error: "language and code are required" }, { status: 400 });
    }

    // Validate language
    const allowedLanguages = ["python", "javascript", "c", "cpp"];
    if (!allowedLanguages.includes(language)) {
      return NextResponse.json({ error: "Language not supported" }, { status: 400 });
    }

    // Validate code size
    if (typeof code !== "string" || code.length > MAX_CODE_SIZE) {
      return NextResponse.json({ error: "Code too large (max 50KB)" }, { status: 400 });
    }

    // For client-side compilation (Python, JavaScript), this endpoint is a fallback
    // The main compilation happens in the browser
    // For C/C++, this delegates to the Piston cloud API
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
      } catch (e: any) {
        return NextResponse.json({ stdout: "", stderr: "Cloud compiler unavailable. Check internet connection." });
      }
    }

    // Python and JavaScript should use client-side compilers
    // This fallback is for API compatibility
    return NextResponse.json({
      stdout: "",
      stderr: "Please run Python and JavaScript directly in the browser (no server needed).",
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
