import { Compiler, CompileResult } from "./index";

export class CloudCompiler implements Compiler {
  private language: string;

  constructor(language: string) {
    this.language = language;
  }

  async run(code: string): Promise<CompileResult> {
    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: this.language,
          code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { stdout: "", stderr: data.error || data.stderr || `Compilation failed (HTTP ${response.status})` };
      }

      return {
        stdout: data.stdout || "",
        stderr: data.stderr || "",
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return {
        stdout: "",
        stderr: `Failed to connect to compiler: ${msg}. Check your internet connection.`,
      };
    }
  }
}
