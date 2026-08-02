"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Play, RotateCcw, Terminal, X } from "lucide-react";

interface CodeEditorProps {
  code: string;
  language?: string;
}

const languageLabels: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  sql: "SQL",
  c: "C",
  cpp: "C++",
  html: "HTML",
  css: "CSS",
  tsx: "React TSX",
  bash: "Bash",
};

function runJS(code: string): { output: string; error?: string } {
  const logs: string[] = [];
  const origLog = console.log;
  const origWarn = console.warn;
  const origError = console.error;

  console.log = (...a: unknown[]) => { logs.push(a.map(String).join(" ")); origLog(...a); };
  console.warn = (...a: unknown[]) => { logs.push("[warn] " + a.map(String).join(" ")); origWarn(...a); };
  console.error = (...a: unknown[]) => { logs.push("[error] " + a.map(String).join(" ")); origError(...a); };

  try {
    new Function(code)();
    console.log = origLog; console.warn = origWarn; console.error = origError;
    return { output: logs.length ? logs.join("\n") : "(no output — use console.log)" };
  } catch (e: unknown) {
    console.log = origLog; console.warn = origWarn; console.error = origError;
    return { output: logs.join("\n"), error: String(e) };
  }
}

export default function CodeEditor({ code, language = "typescript" }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [editCode, setEditCode] = useState(code);
  const [output, setOutput] = useState("");
  const [outError, setOutError] = useState<string | undefined>();
  const [running, setRunning] = useState(false);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = useCallback(async () => {
    setRunning(true);
    setOutput("");
    setOutError(undefined);

    const lang = language === "tsx" ? "typescript" : language;

    if (lang === "javascript" || lang === "typescript") {
      const r = runJS(editCode);
      setOutput(r.output);
      setOutError(r.error);
    } else if (lang === "python") {
      try {
        const w = window as unknown as Record<string, unknown>;
        let pyodide = w.__pyodide as { runPython: (...a: unknown[]) => unknown } | undefined;
        if (!pyodide) {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
          document.head.appendChild(script);
          await new Promise<void>((res, rej) => { script.onload = () => res(); script.onerror = () => rej(); });
          const load = w.loadPyodide as (o: Record<string, unknown>) => Promise<{ runPython: (...a: unknown[]) => unknown }>;
          pyodide = await load({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full" });
          w.__pyodide = pyodide;
        }
        pyodide.runPython("import sys\nfrom io import StringIO\nsys.stdout = StringIO()\nsys.stderr = StringIO()");
        try { pyodide.runPython(editCode); } catch (e: unknown) {
          setOutput(""); setOutError(String(e)); setRunning(false); return;
        }
        const stdout = pyodide.runPython("sys.stdout.getvalue()") as string;
        const stderr = pyodide.runPython("sys.stderr.getvalue()") as string;
        setOutput(stdout?.trim() || "(no output)");
        if (stderr?.trim()) setOutError(stderr.trim());
      } catch (e: unknown) {
        setOutput(""); setOutError("Failed to load Python runtime: " + String(e));
      }
    } else if (lang === "c" || lang === "cpp") {
      try {
        const res = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language: lang === "c" ? "c" : "c++", version: "*", files: [{ content: editCode }] }),
        });
        const data = await res.json();
        setOutput((data.run?.output || "").trim() || "(no output)");
        if (data.run?.stderr || data.compile?.stderr) setOutError((data.compile?.stderr || "") + (data.run?.stderr || ""));
      } catch (e: unknown) {
        setOutput(""); setOutError("API error: " + String(e));
      }
    } else {
      setOutput(`Execution for ${languageLabels[lang] || lang} is not supported in-browser.\nCopy the code and run it locally.`);
    }

    setRunning(false);
  }, [editCode, language]);

  const handleReset = () => { setEditCode(code); setOutput(""); setOutError(undefined); };

  return (
    <div className="rounded-xl overflow-hidden border code-editor-border code-editor-shadow">
      {/* Header bar */}
      <div className="flex items-center justify-between code-editor-header px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="code-editor-label text-xs font-mono ml-2">
            {languageLabels[language] || language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 code-editor-label hover:text-white text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={() => { setPlaygroundOpen(!playgroundOpen); setEditCode(code); setOutput(""); setOutError(undefined); }}
            className="flex items-center gap-1 code-editor-label hover:text-accent text-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            {playgroundOpen ? "Close Playground" : "Try in Playground"}
          </button>
        </div>
      </div>

      {/* Code display */}
      <pre className="code-editor-body p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="code-editor-text font-mono">{code}</code>
      </pre>

      {/* Inline Playground */}
      {playgroundOpen && (
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {/* Playground toolbar */}
          <div className="flex items-center justify-between px-4 py-2" style={{ background: "rgba(139, 92, 246, 0.06)", borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-semibold" style={{ color: "#8b5cf6" }}>Playground</span>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                — Edit, run & experiment
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleReset} className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors" style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
              <button onClick={handleRun} disabled={running} className="flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold text-white transition-colors" style={{ background: running ? "#6b7280" : "linear-gradient(135deg, #8b5cf6, #3b82f6)", cursor: running ? "not-allowed" : "pointer", border: "none" }}>
                <Play className="w-3 h-3" /> {running ? "Running..." : "Run"}
              </button>
              <button onClick={() => setPlaygroundOpen(false)} className="p-1 rounded-md transition-colors" style={{ color: "var(--text-secondary)" }}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Editor + Output split */}
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", minHeight: 280 }}>
            {/* Editor */}
            <div style={{ borderRight: "1px solid var(--border)" }}>
              <textarea
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                spellCheck={false}
                className="w-full p-4"
                style={{
                  minHeight: 280, background: "var(--card-bg)", color: "var(--text-primary)",
                  border: "none", outline: "none", resize: "vertical",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: 13, lineHeight: 1.6, tabSize: 2,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    e.preventDefault();
                    const s = e.currentTarget.selectionStart;
                    const end = e.currentTarget.selectionEnd;
                    setEditCode(editCode.substring(0, s) + "  " + editCode.substring(end));
                    setTimeout(() => { e.currentTarget.selectionStart = e.currentTarget.selectionEnd = s + 2; }, 0);
                  }
                }}
              />
            </div>

            {/* Output */}
            <div style={{ background: "rgba(0,0,0,0.25)", minHeight: 280 }}>
              <div className="p-4" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.6,
                color: outError ? "#f87171" : "#a5f3fc", whiteSpace: "pre-wrap", minHeight: 260,
              }}>
                {!output && !outError && (
                  <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>
                    Click Run to see output...
                  </span>
                )}
                {output && <div>{output}</div>}
                {outError && (
                  <div style={{ color: "#f87171", marginTop: output ? 8 : 0 }}>
                    <strong>Error:</strong> {outError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
