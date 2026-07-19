import { Compiler, CompileResult } from "./index";

let pyodideInstance: any = null;
let pyodideLoading = false;
let pyodideError: string | null = null;

async function loadPyodide(): Promise<any> {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideError) throw new Error(pyodideError);

  if (!pyodideLoading) {
    pyodideLoading = true;
    try {
      if (!(window as any).loadPyodide) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
        script.async = true;
        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Pyodide"));
          document.head.appendChild(script);
        });
      }

      pyodideInstance = await (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
      });
    } catch (e: unknown) {
      pyodideError = e instanceof Error ? e.message : String(e);
      throw e;
    }
  }

  while (pyodideLoading && !pyodideInstance && !pyodideError) {
    await new Promise((r) => setTimeout(r, 100));
  }

  if (pyodideError) throw new Error(pyodideError);
  return pyodideInstance;
}

export class PythonCompiler implements Compiler {
  async run(code: string): Promise<CompileResult> {
    try {
      const pyodide = await loadPyodide();

      // Pass code as a global variable — no string interpolation/injection
      pyodide.globals.set("__user_code__", code);

      const result = pyodide.runPython(`
import sys
from io import StringIO

_stdout = StringIO()
_stderr = StringIO()
sys.stdout = _stdout
sys.stderr = _stderr

try:
    exec(__user_code__)
except Exception as e:
    print(f"Error: {type(e).__name__}: {e}", file=sys.stderr)

sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__

(_stdout.getvalue(), _stderr.getvalue())
      `);

      const [stdout, stderr] = result.toJs();
      return { stdout: stdout || "", stderr: stderr || "" };
    } catch (e: unknown) {
      return { stdout: "", stderr: `Python Error: ${e instanceof Error ? e.message : String(e)}` };
    }
  }
}
