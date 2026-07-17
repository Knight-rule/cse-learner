import { Compiler, CompileResult } from "./index";

export class JavaScriptCompiler implements Compiler {
  async run(code: string): Promise<CompileResult> {
    return new Promise((resolve) => {
      const logs: string[] = [];
      const errors: string[] = [];

      // Create sandboxed iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.sandbox = "allow-scripts";
      document.body.appendChild(iframe);

      const timeout = setTimeout(() => {
        cleanup();
        resolve({ stdout: logs.join("\n"), stderr: "Execution timed out (5s limit)" });
      }, 5000);

      function cleanup() {
        clearTimeout(timeout);
        window.removeEventListener("message", handler);
        document.body.removeChild(iframe);
      }

      function handler(event: MessageEvent) {
        if (event.source !== iframe.contentWindow) return;

        const data = event.data;
        if (data.type === "log") {
          logs.push(data.args.join(" "));
        } else if (data.type === "error") {
          errors.push(data.message);
        } else if (data.type === "done") {
          cleanup();
          resolve({
            stdout: logs.join("\n"),
            stderr: errors.join("\n"),
          });
        }
      }

      window.addEventListener("message", handler);

      // Sandboxed execution environment
      const sandboxedCode = `
        <script>
          const __logs = [];
          const __origConsole = console.log;
          console.log = (...args) => {
            parent.postMessage({ type: "log", args: args.map(a => {
              if (typeof a === 'object') return JSON.stringify(a, null, 2);
              return String(a);
            })}, "*");
          };
          console.error = (...args) => {
            parent.postMessage({ type: "error", message: args.join(" ") }, "*");
          };
          console.warn = console.error;
          console.info = console.log;

          try {
            ${code}
          } catch(e) {
            parent.postMessage({ type: "error", message: e.toString() }, "*");
          }
          parent.postMessage({ type: "done" }, "*");
        <\/script>
      `;

      iframe.srcdoc = sandboxedCode;
    });
  }
}
