import { Compiler, CompileResult } from "./index";

export class JavaScriptCompiler implements Compiler {
  async run(code: string): Promise<CompileResult> {
    return new Promise((resolve) => {
      const logs: string[] = [];
      const errors: string[] = [];

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.sandbox = "allow-scripts";
      document.body.appendChild(iframe);

      let cleaned = false;
      const timeout = setTimeout(() => {
        cleanup();
        resolve({ stdout: logs.join("\n"), stderr: "Execution timed out (5s limit)" });
      }, 5000);

      // Fallback: if iframe never sends "ready", clean up the onReady listener
      const readyTimeout = setTimeout(() => {
        window.removeEventListener("message", onReady);
      }, 3000);

      function cleanup() {
        if (cleaned) return;
        cleaned = true;
        clearTimeout(timeout);
        clearTimeout(readyTimeout);
        window.removeEventListener("message", handler);
        window.removeEventListener("message", onReady);
        try { document.body.removeChild(iframe); } catch {}
      }

      function handler(event: MessageEvent) {
        if (event.source !== iframe.contentWindow) return;
        if (event.origin !== "null") return;

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

      // CSP inside iframe blocks network requests from user code
      const sandboxedCode = `
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline';">
        <script>
          window.addEventListener("message", function(e) {
            if (e.data && e.data.type === "run") {
              var code = e.data.code;
              try {
                console.log = function() {
                  parent.postMessage({ type: "log", args: Array.from(arguments).map(function(a) {
                    return typeof a === "object" ? JSON.stringify(a, null, 2) : String(a);
                  })}, "*");
                };
                console.error = function() {
                  parent.postMessage({ type: "error", message: Array.from(arguments).join(" ") }, "*");
                };
                console.warn = console.error;
                console.info = console.log;

                var fn = new Function(code);
                fn();
              } catch(err) {
                parent.postMessage({ type: "error", message: err.toString() }, "*");
              }
              parent.postMessage({ type: "done" }, "*");
            }
          });
          parent.postMessage({ type: "ready" }, "*");
        <\/script>
      `;

      iframe.srcdoc = sandboxedCode;

      function onReady(e: MessageEvent) {
        if (e.source !== iframe.contentWindow) return;
        if (e.data && e.data.type === "ready") {
          clearTimeout(readyTimeout);
          window.removeEventListener("message", onReady);
          iframe.contentWindow?.postMessage({ type: "run", code }, "*");
        }
      }
      window.addEventListener("message", onReady);
    });
  }
}
