import { Compiler, CompileResult } from "./index";

// Piston API (free public instance)
const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_MAP: Record<string, { piston: string; ext: string }> = {
  c: { piston: "c", ext: "c" },
  cpp: { piston: "c++", ext: "cpp" },
};

export class CloudCompiler implements Compiler {
  private language: string;

  constructor(language: string) {
    this.language = language;
  }

  async run(code: string): Promise<CompileResult> {
    const langConfig = LANGUAGE_MAP[this.language];
    if (!langConfig) {
      return { stdout: "", stderr: `Unsupported language: ${this.language}` };
    }

    try {
      const response = await fetch(`${PISTON_API}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: langConfig.piston,
          files: [
            {
              name: `main.${langConfig.ext}`,
              content: code,
            },
          ],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        return { stdout: "", stderr: `Cloud compiler error (${response.status}): ${text}` };
      }

      const data = await response.json();

      if (data.message) {
        return { stdout: "", stderr: data.message };
      }

      const runOutput = data.run || {};
      return {
        stdout: runOutput.stdout || "",
        stderr: runOutput.stderr || "",
      };
    } catch (e: any) {
      return {
        stdout: "",
        stderr: `Failed to connect to cloud compiler: ${e.message}. Check your internet connection.`,
      };
    }
  }
}
