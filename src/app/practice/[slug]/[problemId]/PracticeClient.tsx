"use client";

import { useState, useCallback } from "react";
import { Play, RotateCcw, Copy, Check, ChevronRight, ChevronDown, Lightbulb, Loader2, CheckCircle, XCircle, Circle } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { PracticeProblem } from "@/data/practice";
import { markPracticeSolved, isPracticeSolved } from "@/lib/tracker";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror").then((mod) => mod.default), { ssr: false });

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { EditorView } from "@codemirror/view";
import type { LanguageSupport } from "@codemirror/language";

const darkTheme = EditorView.theme({
  "&": { backgroundColor: "#020617", color: "#e2e8f0" },
  ".cm-gutters": { backgroundColor: "#020617", color: "#64748b", border: "none" },
  ".cm-activeLineGutter": { backgroundColor: "#1e293b" },
  ".cm-activeLine": { backgroundColor: "#1e293b40" },
  ".cm-selectionBackground": { backgroundColor: "#3b82f620 !important" },
  ".cm-cursor": { borderLeftColor: "#60a5fa" },
  ".cm-matchingBracket": { backgroundColor: "#3b82f630", outline: "1px solid #3b82f650" },
}, { dark: true });

const langExtensions: Record<string, LanguageSupport[]> = {
  javascript: [javascript({ jsx: true })],
  python: [python()],
  c: [cpp()],
  cpp: [cpp()],
};

interface Props {
  problem: PracticeProblem;
  courseSlug: string;
  problemIndex: number;
  totalProblems: number;
  prevId: string | null;
  nextId: string | null;
}

export default function PracticeClient({ problem, courseSlug, problemIndex, totalProblems, prevId, nextId }: Props) {
  const [code, setCode] = useState(problem.starterCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [results, setResults] = useState<{ passed: boolean; actual: string; expected: string; input: string }[]>([]);
  const [solved, setSolved] = useState<boolean>(() => {
    try { return isPracticeSolved(problem.id); } catch { return false; }
  });

  const toggleSolved = () => {
    if (!solved) {
      markPracticeSolved(problem.id);
      setSolved(true);
    } else {
      setSolved(false);
    }
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(problem.starterCode);
    setOutput("");
    setResults([]);
  };

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("Running tests...\n");
    setResults([]);

    try {
      if (problem.language === "javascript") {
        const testResults = await runJavaScriptTests(code, problem.testCases);
        setResults(testResults);
        const passed = testResults.filter((r) => r.passed).length;
        setOutput(`\n✅ ${passed}/${testResults.length} tests passed\n`);
        if (passed === testResults.length && testResults.length > 0) { markPracticeSolved(problem.id); setSolved(true); }
      } else if (problem.language === "python") {
        const testResults = await runPythonTests(code, problem.testCases);
        setResults(testResults);
        const passed = testResults.filter((r) => r.passed).length;
        setOutput(`\n✅ ${passed}/${testResults.length} tests passed\n`);
        if (passed === testResults.length && testResults.length > 0) { markPracticeSolved(problem.id); setSolved(true); }
      } else {
        setResults([{ passed: false, actual: "", expected: "", input: "" }]);
        setOutput("\n⚠️ C/C++ execution not available in browser. Copy the code and run locally.\n");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setOutput("\n❌ Error: " + msg + "\n");
    } finally {
      setIsRunning(false);
    }
  }, [code, problem]);

  return (
    <div className="practice-layout">
      {/* Left: Problem Description */}
      <div className="practice-desc-pane">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={"badge " + (problem.difficulty === "easy" ? "badge-green" : problem.difficulty === "medium" ? "badge-accent" : "badge-purple")}>
              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
            </span>
            <span className="body-sm" style={{ color: "var(--text-muted)" }}>
              Problem {problemIndex + 1} of {totalProblems}
            </span>
          </div>
          <h2 className="heading-md mb-4">{problem.title}</h2>
          <div className="body-md" style={{ lineHeight: 1.8 }}>
            {problem.description.split("\n").map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) {
                return <p key={i} className="font-semibold mt-4 mb-2" style={{ color: "var(--text-primary)" }}>{line.replace(/\*\*/g, "")}</p>;
              }
              if (line.startsWith("- ")) {
                return <p key={i} className="ml-4 mb-1" style={{ color: "var(--text-secondary)" }}>{line}</p>;
              }
              if (line.startsWith("```")) return null;
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="mb-2" style={{ color: "var(--text-secondary)" }}>{line}</p>;
            })}
          </div>

          {/* Test Cases */}
          <div className="mt-6">
            <h3 className="heading-sm mb-3">Test Cases</h3>
            {problem.testCases.map((tc, i) => (
              <div key={i} className="glass-card p-4 mb-3" style={{ fontSize: 13 }}>
                <div className="mb-2"><span style={{ color: "var(--text-muted)" }}>Input:</span> <code style={{ color: "var(--accent)" }}>{tc.input}</code></div>
                <div><span style={{ color: "var(--text-muted)" }}>Expected:</span> <code style={{ color: "var(--accent-green)" }}>{tc.expected}</code></div>
              </div>
            ))}
          </div>

          {/* Hints */}
          <div className="mt-6">
            <button onClick={() => setShowHints(!showHints)} className="flex items-center gap-2 body-sm" style={{ color: "var(--accent)", fontWeight: 600 }}>
              <Lightbulb size={16} /> Hints {showHints ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {showHints && (
              <div className="mt-3" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {problem.hints.map((hint, i) => (
                  <div key={i} className="glass-card p-3 body-sm" style={{ color: "var(--text-secondary)" }}>
                    💡 {hint}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-6">
              <h3 className="heading-sm mb-3">Results</h3>
              {results.map((r, i) => (
                <div key={i} className={`p-3 rounded-lg mb-2 ${r.passed ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {r.passed ? <CheckCircle size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-500" />}
                    <span className="text-sm font-medium">Test {i + 1}</span>
                  </div>
                  {!r.passed && (
                    <div className="text-xs mt-1" style={{ fontFamily: "monospace" }}>
                      <div>Input: {r.input}</div>
                      <div>Expected: {r.expected}</div>
                      <div>Got: {r.actual}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Code Editor + Output */}
      <div className="practice-editor-pane">
        <div className="practice-editor-toolbar">
          <span className="badge badge-accent" style={{ fontSize: 11 }}>{problem.language.toUpperCase()}</span>
          <div className="practice-toolbar-spacer" />
          <button onClick={handleCopy} className="flex items-center gap-1 practice-toolbar-btn" title="Copy code">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={handleReset} className="flex items-center gap-1 practice-toolbar-btn" title="Reset code">
            <RotateCcw size={14} /> Reset
          </button>
          <button onClick={runCode} disabled={isRunning} className="flex items-center gap-1 practice-run-btn">
            {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            {isRunning ? "Running..." : "Run Tests"}
          </button>
          <button onClick={toggleSolved} className={"flex items-center gap-1 practice-toolbar-btn" + (solved ? " solved" : "")} title="Mark as solved">
            {solved ? <CheckCircle size={14} /> : <Circle size={14} />}
            {solved ? "Solved" : "Mark Solved"}
          </button>
        </div>

        <div className="practice-editor-wrapper">
          <CodeMirror
            value={code}
            onChange={(val) => setCode(val)}
            extensions={langExtensions[problem.language] || langExtensions.javascript}
            theme={darkTheme}
            height="100%"
            basicSetup={{ lineNumbers: true, highlightActiveLineGutter: true, highlightActiveLine: true, foldGutter: true }}
          />
        </div>

        <div className="practice-output-pane">
          <div className="flex items-center gap-2 mb-2">
            <span className="body-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Output</span>
          </div>
          <pre className="body-sm" style={{ fontFamily: "monospace", color: "var(--accent-green)", whiteSpace: "pre-wrap" }}>
            {output || "Click 'Run Tests' to check your solution."}
          </pre>
        </div>

        {/* Navigation */}
        <div className="flex justify-between p-4" style={{ borderTop: "1px solid var(--border)" }}>
          {prevId ? (
            <Link href={`/practice/${courseSlug}/${prevId}`} className="btn btn-outline btn-sm">
              ← Previous
            </Link>
          ) : <div />}
          {nextId ? (
            <Link href={`/practice/${courseSlug}/${nextId}`} className="btn btn-primary btn-sm">
              Next →
            </Link>
          ) : (
            <Link href={`/practice/${courseSlug}`} className="btn btn-primary btn-sm">
              All Problems
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Test Runners ---

async function runJavaScriptTests(code: string, testCases: { input: string; expected: string }[]) {
  const results: { passed: boolean; actual: string; expected: string; input: string }[] = [];

  for (const tc of testCases) {
    try {
      const fn = new Function("return (" + code + ")");
      const userFn = fn();
      const input = eval(tc.input);
      const actual = typeof userFn === "function" ? userFn(...(Array.isArray(input) ? input : [input])) : String(userFn);
      const actualStr = JSON.stringify(actual);
      const expectedStr = tc.expected;
      results.push({ passed: actualStr === expectedStr, actual: actualStr, expected: expectedStr, input: tc.input });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push({ passed: false, actual: "Error: " + msg, expected: tc.expected, input: tc.input });
    }
  }
  return results;
}

async function runPythonTests(code: string, testCases: { input: string; expected: string }[]) {
  const results: { passed: boolean; actual: string; expected: string; input: string }[] = [];

  try {
    const pyodide: any = await loadPyodide();
    pyodide.runPython(code);

    for (const tc of testCases) {
      try {
        const result = pyodide.runPython(`
import json
_user_fn = globals().get('filter_evens') or globals().get('word_count') or globals().get('flatten') or globals().get('sieve') or globals().get('fcfs_scheduling') or globals().get('round_robin') or globals().get('is_safe')
_input = json.loads('${tc.input.replace(/'/g, "\\'")}')
if callable(_user_fn):
    _result = _user_fn(*(_input if isinstance(_input, list) else [_input]))
else:
    _result = "Function not found"
json.dumps(_result)
`);
        const passed = String(result) === tc.expected || String(result).replace(/"/g, "'") === tc.expected;
        results.push({ passed, actual: String(result), expected: tc.expected, input: tc.input });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        results.push({ passed: false, actual: "Error: " + msg, expected: tc.expected, input: tc.input });
      }
    }
  } catch {
    results.push({ passed: false, actual: "Failed to load Python runtime", expected: "", input: "" });
  }
  return results;
}

let pyodideInstance: unknown = null;
async function loadPyodide() {
  if (pyodideInstance) return pyodideInstance;
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
  document.head.appendChild(script);
  await new Promise<void>((resolve) => { script.onload = () => resolve(); });
  const pyodideGlobal = (window as unknown as Record<string, unknown>)["loadPyodide"] as (opts: { indexURL: string }) => Promise<unknown>;
  pyodideInstance = await pyodideGlobal({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/" });
  return pyodideInstance;
}
