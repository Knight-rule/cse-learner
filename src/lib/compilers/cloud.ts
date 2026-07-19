import { Compiler, CompileResult } from "./index";

const WANDBOX_API = "https://wandbox.org/api/compile.json";

const LANGUAGE_MAP: Record<string, string> = {
  c: "gcc-head",
  cpp: "gcc-head",
};

export class CloudCompiler implements Compiler {
  private language: string;

  constructor(language: string) {
    this.language = language;
  }

  async run(code: string): Promise<CompileResult> {
    const compiler = LANGUAGE_MAP[this.language];
    if (!compiler) {
      return { stdout: "", stderr: `Unsupported language: ${this.language}` };
    }

    try {
      const response = await fetch(WANDBOX_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          compiler,
          code,
          save: false,
        }),
      });

      const data = await response.json();

      if (data.status !== "0" && data.status !== 0) {
        const errors = [data.compiler_error, data.program_error].filter(Boolean).join("\n");
        return { stdout: data.program_output || "", stderr: errors || "Compilation failed" };
      }

      return {
        stdout: data.program_output || "",
        stderr: data.compiler_error || "",
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return {
        stdout: "",
        stderr: `Failed to connect to cloud compiler: ${msg}. Check your internet connection.`,
      };
    }
  }
}
