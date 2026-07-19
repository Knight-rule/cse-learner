"use client";

import { useState, useCallback, useEffect } from "react";
import { Play, RotateCcw, Copy, Check, ChevronDown, Terminal, Loader2, Wifi, WifiOff, BookOpen } from "lucide-react";
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

interface Example {
  title: string;
  question: string;
  code: string;
}

interface Language {
  id: string;
  name: string;
  icon: string;
  mode: "local" | "cloud";
  extension: () => any;
  examples: Example[];
}

const languages: Language[] = [
  {
    id: "python",
    name: "Python",
    icon: "\ud83d\udc0d",
    mode: "local",
    extension: python,
    examples: [
      {
        title: "Hello World",
        question: "Write a program that prints \"Hello, World!\" to the console. Then create a variable called `name` with your name and print a welcome message using an f-string.",
        code: `print("Hello, World!")\n\nname = "CSE Student"\nprint(f"Welcome, {name}!")`,
      },
      {
        title: "List Comprehension",
        question: "Use list comprehension to generate a list of squares from 1 to 10. Then filter even numbers from 1 to 20 using a conditional in the comprehension. Print both results.",
        code: `squares = [x**2 for x in range(1, 11)]\nprint("Squares:", squares)\n\nevens = [x for x in range(1, 21) if x % 2 == 0]\nprint("Evens:", evens)`,
      },
      {
        title: "Functions & Lambda",
        question: "Write a recursive function `factorial(n)` that returns n!. Test it with n=5. Then create a lambda function `add` that takes two arguments and returns their sum. Test with 3 and 4.",
        code: `def factorial(n):\n    return 1 if n <= 1 else n * factorial(n - 1)\n\nprint("5! =", factorial(5))\n\nadd = lambda a, b: a + b\nprint("3 + 4 =", add(3, 4))`,
      },
      {
        title: "Dictionary & Loops",
        question: "Create a dictionary of students and their grades. Loop through it and print each student's name, grade, and whether they Pass (grade >= 80) or Fail. Then calculate and print the class average.",
        code: `students = {\n    "Alice": 85,\n    "Bob": 92,\n    "Charlie": 78,\n    "Diana": 95\n}\n\nfor name, grade in students.items():\n    status = "Pass" if grade >= 80 else "Fail"\n    print(f"{name}: {grade} ({status})")\n\navg = sum(students.values()) / len(students)\nprint(f"\\nClass Average: {avg:.1f}")`,
      },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "\ud83d\udcdc",
    mode: "local",
    extension: javascript,
    examples: [
      {
        title: "Hello World",
        question: "Use `console.log` to print \"Hello, World!\". Then create a `name` variable and print a welcome message using a template literal (backticks).",
        code: `console.log("Hello, World!");\n\nconst name = "CSE Student";\nconsole.log(\`Welcome, \${name}!\`);`,
      },
      {
        title: "Array Operations",
        question: "Given an array of numbers 1-10, use `.filter()` to get even numbers, `.map()` to get squares, and `.reduce()` to compute the sum. Print each result.",
        code: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\n\nconst squares = nums.map(n => n * n);\nconsole.log("Squares:", squares);\n\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);`,
      },
      {
        title: "Objects & Functions",
        question: "Create a `student` object with name, age, and a grades array. Calculate the average grade using `.reduce()` and print the student's name with their average (rounded to 1 decimal).",
        code: `const student = {\n  name: "Alice",\n  age: 22,\n  grades: [85, 92, 78, 95]\n};\n\nconst avg = student.grades.reduce((a, b) => a + b, 0) / student.grades.length;\nconsole.log(\`\${student.name}: \${avg.toFixed(1)}\`);`,
      },
    ],
  },
  {
    id: "c",
    name: "C",
    icon: "\u2699\ufe0f",
    mode: "cloud",
    extension: cpp,
    examples: [
      {
        title: "Hello World",
        question: "Write a C program that prints \"Hello, World!\" using `printf`. Then create a character array `name` with your name and print a welcome message using `printf` with the `%s` format specifier.",
        code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    char name[] = "CSE Student";\n    printf("Welcome, %s!\\n", name);\n    return 0;\n}`,
      },
      {
        title: "Arrays & Pointers",
        question: "Create an integer array of 5 elements. Use a pointer to traverse the array and calculate the sum of all elements. Print the result using `printf`.",
        code: `#include <stdio.h>\n\nint main() {\n    int nums[] = {10, 20, 30, 40, 50};\n    int n = sizeof(nums) / sizeof(nums[0]);\n    int *ptr = nums;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        sum += *(ptr + i);\n    }\n    printf("Sum: %d\\n", sum);\n    return 0;\n}`,
      },
      {
        title: "Struct & Functions",
        question: "Define a `Student` struct with name, age, and gpa fields. Write a `display` function that prints a student's info. Create two students and call `display` on each.",
        code: `#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\n\nvoid display(struct Student s) {\n    printf("%s (age %d) GPA: %.1f\\n", s.name, s.age, s.gpa);\n}\n\nint main() {\n    struct Student s1 = {"Alice", 22, 3.8};\n    struct Student s2 = {"Bob", 23, 3.5};\n    display(s1);\n    display(s2);\n    return 0;\n}`,
      },
    ],
  },
  {
    id: "cpp",
    name: "C++",
    icon: "\ud83d\udd27",
    mode: "cloud",
    extension: cpp,
    examples: [
      {
        title: "Hello World",
        question: "Write a C++ program that prints \"Hello, World!\" using `cout`. Create a `vector<int>` with 5 numbers, sort it with `std::sort`, and print the sorted result.",
        code: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    vector<int> nums = {5, 2, 8, 1, 9};\n    sort(nums.begin(), nums.end());\n    cout << "Sorted: ";\n    for (int n : nums) cout << n << " ";\n    cout << endl;\n    return 0;\n}`,
      },
      {
        title: "STL & Lambda",
        question: "Use a `map<string, int>` to store student grades and iterate with a structured binding. Then use `count_if` with a lambda to count even numbers in a vector.",
        code: `#include <iostream>\n#include <map>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n    map<string, int> grades;\n    grades["Alice"] = 85;\n    grades["Bob"] = 92;\n    grades["Charlie"] = 78;\n    for (auto& [name, grade] : grades) {\n        cout << name << ": " << grade << endl;\n    }\n    vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8};\n    int evens = count_if(nums.begin(), nums.end(),\n        [](int x) { return x % 2 == 0; });\n    cout << "Even count: " << evens << endl;\n    return 0;\n}`,
      },
      {
        title: "Classes & Inheritance",
        question: "Create an abstract `Animal` class with a pure virtual `speak()` method. Derive a `Dog` class that overrides `speak()` to print the dog's name and breed. Create a Dog object and call `speak()`.",
        code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Animal {\nprotected:\n    string name;\npublic:\n    Animal(string n) : name(n) {}\n    virtual void speak() = 0;\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal {\n    string breed;\npublic:\n    Dog(string n, string b) : Animal(n), breed(b) {}\n    void speak() override {\n        cout << name << " says Woof! (" << breed << ")" << endl;\n    }\n};\n\nint main() {\n    Dog d("Rex", "Labrador");\n    d.speak();\n    return 0;\n}`,
      },
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
  const [selectedExample, setSelectedExample] = useState(0);
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
    setSelectedExample(0);
    setCode(lang.examples[0].code);
    setOutput([]);
    setShowLangDropdown(false);
  };

  const selectExample = (index: number) => {
    setSelectedExample(index);
    setCode(selectedLang.examples[index].code);
    setOutput([]);
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

  const currentExample = selectedLang.examples[selectedExample];

  return (
    <div className="playground-wrap" style={{ flex: 1 }}>
      {/* Question Panel */}
      <div className="playground-question">
        <div className="playground-question-icon">
          <BookOpen size={16} />
        </div>
        <div className="playground-question-content">
          <div className="playground-question-label">Problem</div>
          <div className="playground-question-title">{currentExample.title}</div>
          <p className="playground-question-text">{currentExample.question}</p>
        </div>
      </div>

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
          value={selectedExample}
          onChange={(e) => selectExample(parseInt(e.target.value))}
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
          onClick={() => { setCode(selectedLang.examples[selectedExample].code); setOutput([]); }}
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
