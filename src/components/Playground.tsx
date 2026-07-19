"use client";

import { useState, useCallback, useEffect } from "react";
import { Play, RotateCcw, Copy, Check, ChevronDown, Terminal, Loader2, Wifi, WifiOff, BookOpen, Clock, Lightbulb, Eye, EyeOff } from "lucide-react";
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
  difficulty: "easy" | "medium" | "hard";
  expectedOutput: string;
  hint: string;
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
        difficulty: "easy",
        expectedOutput: 'Hello, World!\nWelcome, CSE Student!',
        hint: "Use `print()` for output. f-strings use f\"...{variable}...\" syntax.",
        code: `print("Hello, World!")\n\nname = "CSE Student"\nprint(f"Welcome, {name}!")`,
      },
      {
        title: "List Comprehension",
        question: "Use list comprehension to generate a list of squares from 1 to 10. Then filter even numbers from 1 to 20 using a conditional in the comprehension. Print both results.",
        difficulty: "medium",
        expectedOutput: "Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nEvens: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]",
        hint: "Syntax: [expression for item in iterable if condition]. Use range(1, 11) for 1-10.",
        code: `squares = [x**2 for x in range(1, 11)]\nprint("Squares:", squares)\n\nevens = [x for x in range(1, 21) if x % 2 == 0]\nprint("Evens:", evens)`,
      },
      {
        title: "Functions & Lambda",
        question: "Write a recursive function `factorial(n)` that returns n!. Test it with n=5. Then create a lambda function `add` that takes two arguments and returns their sum. Test with 3 and 4.",
        difficulty: "medium",
        expectedOutput: "5! = 120\n3 + 4 = 7",
        hint: "Base case: factorial(0) = 1. Recursive case: n * factorial(n-1). Lambda: lambda a, b: a + b",
        code: `def factorial(n):\n    return 1 if n <= 1 else n * factorial(n - 1)\n\nprint("5! =", factorial(5))\n\nadd = lambda a, b: a + b\nprint("3 + 4 =", add(3, 4))`,
      },
      {
        title: "Dictionary & Loops",
        question: "Create a dictionary of students and their grades. Loop through it and print each student's name, grade, and whether they Pass (grade >= 80) or Fail. Then calculate and print the class average.",
        difficulty: "medium",
        expectedOutput: "Alice: 85 (Pass)\nBob: 92 (Pass)\nCharlie: 78 (Fail)\nDiana: 95 (Pass)\n\nClass Average: 87.5",
        hint: "Use .items() to iterate over dict key-value pairs. f\"{name}: {grade}\" for formatting.",
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
        difficulty: "easy",
        expectedOutput: "Hello, World!\nWelcome, CSE Student!",
        hint: "Template literals use backticks: `Welcome, ${name}!`",
        code: `console.log("Hello, World!");\n\nconst name = "CSE Student";\nconsole.log(\`Welcome, \${name}!\`);`,
      },
      {
        title: "Array Operations",
        question: "Given an array of numbers 1-10, use `.filter()` to get even numbers, `.map()` to get squares, and `.reduce()` to compute the sum. Print each result.",
        difficulty: "medium",
        expectedOutput: "Evens: [2, 4, 6, 8, 10]\nSquares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nSum: 55",
        hint: ".filter(n => n % 2 === 0) keeps evens. .map(n => n * n) transforms. .reduce((a,b) => a+b, 0) sums.",
        code: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\n\nconst squares = nums.map(n => n * n);\nconsole.log("Squares:", squares);\n\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);`,
      },
      {
        title: "Objects & Functions",
        question: "Create a `student` object with name, age, and a grades array. Calculate the average grade using `.reduce()` and print the student's name with their average (rounded to 1 decimal).",
        difficulty: "medium",
        expectedOutput: "Alice: 87.5",
        hint: "Use .reduce((a, b) => a + b, 0) to sum the grades array, then divide by .length.",
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
        difficulty: "easy",
        expectedOutput: "Hello, World!\nWelcome, CSE Student!",
        hint: "Use printf(\"text\\n\") for output. %s is the format specifier for strings.",
        code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    char name[] = "CSE Student";\n    printf("Welcome, %s!\\n", name);\n    return 0;\n}`,
      },
      {
        title: "Arrays & Pointers",
        question: "Create an integer array of 5 elements. Use a pointer to traverse the array and calculate the sum of all elements. Print the result using `printf`.",
        difficulty: "medium",
        expectedOutput: "Sum: 150",
        hint: "int *ptr = nums; gives a pointer to the first element. *(ptr + i) accesses element at index i.",
        code: `#include <stdio.h>\n\nint main() {\n    int nums[] = {10, 20, 30, 40, 50};\n    int n = sizeof(nums) / sizeof(nums[0]);\n    int *ptr = nums;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        sum += *(ptr + i);\n    }\n    printf("Sum: %d\\n", sum);\n    return 0;\n}`,
      },
      {
        title: "Struct & Functions",
        question: "Define a `Student` struct with name, age, and gpa fields. Write a `display` function that prints a student's info. Create two students and call `display` on each.",
        difficulty: "hard",
        expectedOutput: "Alice (age 22) GPA: 3.8\nBob (age 23) GPA: 3.5",
        hint: "Define the struct before main(). Pass structs by value to functions: void display(struct Student s).",
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
        difficulty: "easy",
        expectedOutput: "Hello, World!\nSorted: 1 2 5 8 9",
        hint: "Use cout << \"text\" << endl. #include <vector> and <algorithm> for sort().",
        code: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    vector<int> nums = {5, 2, 8, 1, 9};\n    sort(nums.begin(), nums.end());\n    cout << "Sorted: ";\n    for (int n : nums) cout << n << " ";\n    cout << endl;\n    return 0;\n}`,
      },
      {
        title: "STL & Lambda",
        question: "Use a `map<string, int>` to store student grades and iterate with a structured binding. Then use `count_if` with a lambda to count even numbers in a vector.",
        difficulty: "hard",
        expectedOutput: "Alice: 85\nBob: 92\nCharlie: 78\nEven count: 4",
        hint: "Structured binding: for (auto& [name, grade] : map). Lambda for count_if: [](int x) { return x % 2 == 0; }",
        code: `#include <iostream>\n#include <map>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n    map<string, int> grades;\n    grades["Alice"] = 85;\n    grades["Bob"] = 92;\n    grades["Charlie"] = 78;\n    for (auto& [name, grade] : grades) {\n        cout << name << ": " << grade << endl;\n    }\n    vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8};\n    int evens = count_if(nums.begin(), nums.end(),\n        [](int x) { return x % 2 == 0; });\n    cout << "Even count: " << evens << endl;\n    return 0;\n}`,
      },
      {
        title: "Classes & Inheritance",
        question: "Create an abstract `Animal` class with a pure virtual `speak()` method. Derive a `Dog` class that overrides `speak()` to print the dog's name and breed. Create a Dog object and call `speak()`.",
        difficulty: "hard",
        expectedOutput: "Rex says Woof! (Labrador)",
        hint: "Pure virtual: virtual void speak() = 0;. Override with override keyword. Use protected for inherited members.",
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
  const [showHint, setShowHint] = useState(false);
  const [showExpected, setShowExpected] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains("light"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const onChange = useCallback((val: string) => {
    setCode(val);
  }, []);

  const selectLanguage = (lang: Language) => {
    setSelectedLang(lang);
    setSelectedExample(0);
    setCode(lang.examples[0].code);
    setOutput([]);
    setShowLangDropdown(false);
    setShowHint(false);
    setShowExpected(false);
    setExecTime(null);
  };

  const selectExample = (index: number) => {
    setSelectedExample(index);
    setCode(selectedLang.examples[index].code);
    setOutput([]);
    setShowHint(false);
    setShowExpected(false);
    setExecTime(null);
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
    setExecTime(null);
    const modeLabel = selectedLang.mode === "cloud" ? "\u2601\ufe0f Cloud" : "\ud83d\udcbb Local";
    setOutput([`${modeLabel} Running ${selectedLang.name}...`]);

    const start = performance.now();

    try {
      const compiler = getCompiler(selectedLang.id);
      const result = await compiler.run(code);

      const elapsed = Math.round(performance.now() - start);
      setExecTime(elapsed);

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
      setExecTime(null);
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
          <div className="playground-question-label">
            Problem
            <span className={"playground-difficulty " + currentExample.difficulty}>
              {currentExample.difficulty}
            </span>
            {execTime !== null && (
              <span className="playground-exec-time">
                <Clock size={10} /> {execTime}ms
              </span>
            )}
          </div>
          <div className="playground-question-title">{currentExample.title}</div>
          <p className="playground-question-text">{currentExample.question}</p>

          <button className="playground-hint-toggle" onClick={() => setShowExpected(!showExpected)}>
            {showExpected ? <EyeOff size={13} /> : <Eye size={13} />}
            {showExpected ? "Hide Expected Output" : "Show Expected Output"}
          </button>
          {showExpected && (
            <div className="playground-expected">
              <div className="playground-expected-label">Expected Output</div>
              <div className="playground-expected-code">{currentExample.expectedOutput}</div>
            </div>
          )}

          <button className="playground-hint-toggle" onClick={() => setShowHint(!showHint)} style={{ marginTop: showExpected ? 4 : 0 }}>
            <Lightbulb size={13} />
            {showHint ? "Hide Hint" : "Need a Hint?"}
          </button>
          {showHint && (
            <div className="playground-hint">{currentExample.hint}</div>
          )}
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
          onClick={() => { setCode(selectedLang.examples[selectedExample].code); setOutput([]); setExecTime(null); }}
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
                onClick={() => { setOutput([]); setExecTime(null); }}
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
