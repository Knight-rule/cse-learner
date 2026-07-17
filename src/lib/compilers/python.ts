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
      // Dynamically load Pyodide from CDN
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
    } catch (e: any) {
      pyodideError = e.message;
      throw e;
    }
  }

  // Wait for loading to complete
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

      // Capture stdout/stderr
      const result = pyodide.runPython(`
import sys
from io import StringIO

_stdout = StringIO()
_stderr = StringIO()
sys.stdout = _stdout
sys.stderr = _stderr

try:
    exec("""${code.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}""")
except Exception as e:
    print(f"Error: {type(e).__name__}: {e}", file=sys.stderr)

sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__

(_stdout.getvalue(), _stderr.getvalue())
      `);

      const [stdout, stderr] = result.toJs();
      return { stdout: stdout || "", stderr: stderr || "" };
    } catch (e: any) {
      return { stdout: "", stderr: `Python Error: ${e.message}` };
    }
  }
}
