"use client";

import { useState, useCallback, useEffect } from "react";
import { Play, RotateCcw, Copy, Check, ChevronDown, Terminal, Loader2, Wifi, WifiOff } from "lucide-react";
import { trackCodeRun } from "@/lib/tracker";
import { JavaScriptCompiler } from "@/lib/compilers/javascript";
import { PythonCompiler } from "@/lib/compilers/python";
import { CloudCompiler } from "@/lib/compilers/cloud";
import { validateCode, checkRateLimit } from "@/lib/compilers";
import type { Compiler } from "@/lib/compilers";
import dynamic from "next/dynamic";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror").then((mod) => mod.default), { ssr: false });

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { EditorView } from "@codemirror/view";

const darkTheme = EditorView.theme({
  "&": { backgroundColor: "#020617", color: "#e2e8f0" },
  ".cm-gutters": { backgroundColor: "#020617", color: "#64748b", border: "none" },
  ".cm-activeLineGutter": { backgroundColor: "#1e293b" },
  ".cm-activeLine": { backgroundColor: "#1e293b40" },
  ".cm-selectionBackground": { backgroundColor: "#3b82f620 !important" },
  ".cm-cursor": { borderLeftColor: "#60a5fa" },
  ".cm-matchingBracket": { backgroundColor: "#3b82f630", outline: "1px solid #3b82f650" },
}, { dark: true });

const lightTheme = EditorView.theme({
  "&": { backgroundColor: "#ffffff", color: "#1e293b" },
  ".cm-gutters": { backgroundColor: "#f8fafc", color: "#94a3b8", border: "none" },
  ".cm-activeLineGutter": { backgroundColor: "#f1f5f9" },
  ".cm-activeLine": { backgroundColor: "#f1f5f960" },
  ".cm-selectionBackground": { backgroundColor: "#3b82f620 !important" },
  ".cm-cursor": { borderLeftColor: "#2563eb" },
  ".cm-matchingBracket": { backgroundColor: "#3b82f620", outline: "1px solid #3b82f640" },
}, { dark: false });

interface Language {
  id: string;
  name: string;
  icon: string;
  mode: "local" | "cloud";
  extension: () => any;
  examples: { title: string; code: string }[];
}

const languages: Language[] = [
  {
    id: "python",
    name: "Python",
    icon: "\ud83d\udc0d",
    mode: "local",
    extension: python,
    examples: [
      { title: "Hello World", code: `print("Hello, World!")\n\nname = "CSE Student"\nprint(f"Welcome, {name}!")` },
      { title: "List Comprehension", code: `squares = [x**2 for x in range(1, 11)]\nprint("Squares:", squares)\n\nevens = [x for x in range(1, 21) if x % 2 == 0]\nprint("Evens:", evens)` },
      { title: "Functions & Lambda", code: `def factorial(n):\n    return 1 if n <= 1 else n * factorial(n - 1)\n\nprint("5! =", factorial(5))\n\nadd = lambda a, b: a + b\nprint("3 + 4 =", add(3, 4))` },
      { title: "Dictionary & Loops", code: `students = {\n    "Alice": 85,\n    "Bob": 92,\n    "Charlie": 78,\n    "Diana": 95\n}\n\nfor name, grade in students.items():\n    status = "Pass" if grade >= 80 else "Fail"\n    print(f"{name}: {grade} ({status})")\n\navg = sum(students.values()) / len(students)\nprint(f"\\nClass Average: {avg:.1f}")` },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "\ud83d\udcdc",
    mode: "local",
    extension: javascript,
    examples: [
      { title: "Hello World", code: `console.log("Hello, World!");\n\nconst name = "CSE Student";\nconsole.log(\`Welcome, \${name}!\`);` },
      { title: "Array Operations", code: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\n\nconst squares = nums.map(n => n * n);\nconsole.log("Squares:", squares);\n\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);` },
      { title: "Objects & Functions", code: `const student = {\n  name: "Alice",\n  age: 22,\n  grades: [85, 92, 78, 95]\n};\n\nconst avg = student.grades.reduce((a, b) => a + b, 0) / student.grades.length;\nconsole.log(\`\${student.name}: \${avg.toFixed(1)}\`);` },
    ],
  },
  {
    id: "c",
    name: "C",
    icon: "\u2699\ufe0f",
    mode: "cloud",
    extension: cpp,
    examples: [
      { title: "Hello World", code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    char name[] = "CSE Student";\n    printf("Welcome, %s!\\n", name);\n    return 0;\n}` },
      { title: "Arrays & Pointers", code: `#include <stdio.h>\n\nint main() {\n    int nums[] = {10, 20, 30, 40, 50};\n    int n = sizeof(nums) / sizeof(nums[0]);\n    int *ptr = nums;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        sum += *(ptr + i);\n    }\n    printf("Sum: %d\\n", sum);\n    return 0;\n}` },
      { title: "Struct & Functions", code: `#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\n\nvoid display(struct Student s) {\n    printf("%s (age %d) GPA: %.1f\\n", s.name, s.age, s.gpa);\n}\n\nint main() {\n    struct Student s1 = {"Alice", 22, 3.8};\n    struct Student s2 = {"Bob", 23, 3.5};\n    display(s1);\n    display(s2);\n    return 0;\n}` },
    ],
  },
  {
    id: "cpp",
    name: "C++",
    icon: "\ud83d\udd27",
    mode: "cloud",
    extension: cpp,
    examples: [
      { title: "Hello World", code: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    vector<int> nums = {5, 2, 8, 1, 9};\n    sort(nums.begin(), nums.end());\n    cout << "Sorted: ";\n    for (int n : nums) cout << n << " ";\n    cout << endl;\n    return 0;\n}` },
      { title: "STL & Lambda", code: `#include <iostream>\n#include <map>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n    map<string, int> grades;\n    grades["Alice"] = 85;\n    grades["Bob"] = 92;\n    grades["Charlie"] = 78;\n    for (auto& [name, grade] : grades) {\n        cout << name << ": " << grade << endl;\n    }\n    vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8};\n    int evens = count_if(nums.begin(), nums.end(),\n        [](int x) { return x % 2 == 0; });\n    cout << "Even count: " << evens << endl;\n    return 0;\n}` },
      { title: "Classes & Inheritance", code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Animal {\nprotected:\n    string name;\npublic:\n    Animal(string n) : name(n) {}\n    virtual void speak() = 0;\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal {\n    string breed;\npublic:\n    Dog(string n, string b) : Animal(n), breed(b) {}\n    void speak() override {\n        cout << name << " says Woof! (" << breed << ")" << endl;\n    }\n};\n\nint main() {\n    Dog d("Rex", "Labrador");\n    d.speak();\n    return 0;\n}` },
    ],
  },
];

function getCompiler(langId: string): Compiler {
  switch (langId) {
    case "javascript":
      return new JavaScriptCompiler();
    case "python":
      return new PythonCompiler();
    case "c":
    case "cpp":
      return new CloudCompiler(langId);
    default:
      throw new Error(`Unsupported language: ${langId}`);
  }
}

export default function Playground() {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [code, setCode] = useState(languages[0].examples[0].code);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains("light"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const onChange = useCallback((val: string) => {
    setCode(val);
  }, []);

  const selectLanguage = (lang: Language) => {
    setSelectedLang(lang);
    setCode(lang.examples[0].code);
    setOutput([]);
    setShowLangDropdown(false);
  };

  const runCode = async () => {
    if (!checkRateLimit()) {
      setOutput(["Rate limit exceeded. Please wait a minute before trying again."]);
      return;
    }

    const validationError = validateCode(code);
    if (validationError) {
      setOutput([validationError]);
      return;
    }

    setIsRunning(true);
    const modeLabel = selectedLang.mode === "cloud" ? "\u2601\ufe0f Cloud" : "\ud83d\udcbb Local";
    setOutput([`${modeLabel} Running ${selectedLang.name}...`]);

    try {
      const compiler = getCompiler(selectedLang.id);
      const result = await compiler.run(code);

      trackCodeRun("playground", selectedLang.id);

      const lines: string[] = [];
      if (result.stderr?.trim()) {
        const errLines = result.stderr.trim().split("\n");
        const hasError = errLines.some((l: string) =>
          l.includes("error") || l.includes("Error") || l.includes("exception") || l.includes("Traceback")
        );
        if (hasError) {
          lines.push("\u274c Error:");
        } else {
          lines.push("\u26a0\ufe0f Warnings:");
        }
        lines.push(...errLines);
        lines.push("");
      }
      if (result.stdout?.trim()) {
        lines.push(...result.stdout.trim().split("\n"));
      }
      setOutput(lines.length > 0 ? lines : ["(No output)"]);
    } catch (err: any) {
      setOutput(["\u274c " + (err.message || "Failed to run code")]);
    }

    setIsRunning(false);
  };

  const getExt = () => {
    if (selectedLang.id === "python") return "py";
    if (selectedLang.id === "javascript") return "js";
    if (selectedLang.id === "c") return "c";
    return "cpp";
  };

  return (
    <div className="playground-wrap" style={{ flex: 1 }}>
      {/* Toolbar */}
      <div className="playground-toolbar">
        <div style={{ position: "relative" }}>
          <button
            className="playground-toolbar-btn"
            onClick={() => setShowLangDropdown(!showLangDropdown)}
          >
            <span>{selectedLang.icon}</span>
            <span>{selectedLang.name}</span>
            <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
          </button>
          {showLangDropdown && (
            <>
              <div className="playground-close-overlay" onClick={() => setShowLangDropdown(false)} />
              <div className="playground-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => selectLanguage(lang)}
                    className={"playground-dropdown-item" + (selectedLang.id === lang.id ? " selected" : "")}
                  >
                    <span style={{ fontSize: 16 }}>{lang.icon}</span>
                    <span>{lang.name}</span>
                    <span className={"playground-mode-badge " + lang.mode} style={{ marginLeft: "auto" }}>
                      {lang.mode === "local" ? <Wifi size={10} /> : <WifiOff size={10} />}
                      {lang.mode === "local" ? "In-Browser" : "Cloud"}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <select
          className="playground-example-select"
          onChange={(e) => {
            setCode(selectedLang.examples[parseInt(e.target.value)].code);
            setOutput([]);
          }}
        >
          {selectedLang.examples.map((ex, i) => (
            <option key={i} value={i}>{ex.title}</option>
          ))}
        </select>

        <div className="playground-toolbar-spacer" />

        <button
          className="playground-icon-btn"
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        >
          {copied ? <Check size={14} style={{ color: "var(--accent-green)" }} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          className="playground-icon-btn"
          onClick={() => { setCode(selectedLang.examples[0].code); setOutput([]); }}
        >
          <RotateCcw size={14} />
          Reset
        </button>
        <button className="playground-run-btn" onClick={runCode} disabled={isRunning}>
          {isRunning ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Play size={14} fill="currentColor" />}
          Run
          <kbd>Ctrl+Enter</kbd>
        </button>
      </div>

      {/* Editor + Output */}
      <div className="playground-main">
        <div className="playground-editor-pane">
          <div className="playground-editor-header">
            <div className="playground-editor-dots">
              <div className="playground-editor-dot red" />
              <div className="playground-editor-dot yellow" />
              <div className="playground-editor-dot green" />
            </div>
            <span className="playground-editor-filename">main.{getExt()}</span>
            <span className={"playground-editor-badge " + selectedLang.mode}>
              {selectedLang.mode === "local" ? "Runs in browser" : "Runs on cloud"}
            </span>
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <CodeMirror
              value={code}
              onChange={onChange}
              extensions={[selectedLang.extension(), EditorView.lineWrapping]}
              theme={isLight ? lightTheme : darkTheme}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightActiveLine: true,
                foldGutter: true,
                bracketMatching: true,
                autocompletion: false,
              }}
              style={{ height: "100%" }}
            />
          </div>
        </div>

        <div className="playground-output-pane">
          <div className="playground-output-header">
            <Terminal size={14} style={{ color: "var(--accent-green)" }} />
            <span>Output</span>
            {output.length > 0 && (
              <button
                className="playground-icon-btn"
                style={{ marginLeft: "auto", padding: "4px 8px", fontSize: 11 }}
                onClick={() => setOutput([])}
              >
                Clear
              </button>
            )}
          </div>
          <div className="playground-output-body">
            {output.length === 0 ? (
              <div className="playground-output-empty">
                <Terminal size={32} />
                <p>Click &quot;Run&quot; or press Ctrl+Enter</p>
                <p style={{ fontSize: 11, marginTop: 8 }}>Python &amp; JavaScript run in your browser</p>
                <p style={{ fontSize: 11 }}>C &amp; C++ compile on cloud</p>
              </div>
            ) : (
              <div>
                {output.map((line, i) => (
                  <div
                    key={i}
                    className={
                      "playground-output-line " +
                      (line.startsWith("\u274c") ? "error" : line.startsWith("\u26a0\ufe0f") ? "warning" : "success")
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
