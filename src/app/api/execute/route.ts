import { NextRequest, NextResponse } from "next/server";

const JUDGE0_URL = "https://api.judge0.com/submissions?base64_encoded=false&wait=true";

interface Judge0Response {
  stdout: string;
  stderr: string;
  status: { id: number; description: string };
  compile_outputs?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { language, code, stdin } = body as { language: string; code: string; stdin?: string };

    if (!language || !code) {
      return NextResponse.json({ error: "language and code are required" }, { status: 400 });
    }

    const langMap: Record<string, number> = {
      c: 50,
      cpp: 54,
    };

    const languageId = langMap[language];
    if (!languageId) {
      return NextResponse.json({ error: `Unsupported language: ${language}` }, { status: 400 });
    }

    const payload: Record<string, unknown> = {
      language_id: languageId,
      source_code: code,
    };
    if (stdin) {
      payload.stdin = stdin;
    }

    const res = await fetch(JUDGE0_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Judge0 API error: ${res.status} ${errText}` }, { status: 502 });
    }

    const data: Judge0Response = await res.json();

    const stdout = data.stdout || "";
    const stderr = data.stderr || "";
    const compileOutput = data.compile_outputs || "";
    const exitCode = data.status?.id === 3 ? 1 : 0;

    return NextResponse.json({
      stdout,
      stderr: compileOutput || stderr,
      exitCode,
      compileError: compileOutput,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
