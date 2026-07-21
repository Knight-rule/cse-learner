import { NextRequest, NextResponse } from "next/server";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

interface PistonFile {
  name?: string;
  content: string;
}

interface PistonRequest {
  language: string;
  version?: string;
  files: PistonFile[];
  stdin?: string;
}

interface PistonResponse {
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { language, code, stdin } = body as { language: string; code: string; stdin?: string };

    if (!language || !code) {
      return NextResponse.json({ error: "language and code are required" }, { status: 400 });
    }

    const langMap: Record<string, { pistonLang: string; version: string; filename: string }> = {
      c: { pistonLang: "c", version: "10.2.0", filename: "main.c" },
      cpp: { pistonLang: "cpp", version: "10.2.0", filename: "main.cpp" },
    };

    const config = langMap[language];
    if (!config) {
      return NextResponse.json({ error: `Unsupported language: ${language}` }, { status: 400 });
    }

    const payload: PistonRequest = {
      language: config.pistonLang,
      version: config.version,
      files: [{ name: config.filename, content: code }],
      ...(stdin ? { stdin } : {}),
    };

    const res = await fetch(PISTON_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Piston API error: ${res.status} ${errText}` }, { status: 502 });
    }

    const data: PistonResponse = await res.json();

    const compileError = data.compile && data.compile.code !== 0 ? data.compile.stderr : "";
    const runtimeError = data.run.code !== 0 ? data.run.stderr : "";
    const stdout = data.run.stdout;

    return NextResponse.json({
      stdout,
      stderr: compileError || runtimeError,
      exitCode: data.run.code,
      compileError,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
