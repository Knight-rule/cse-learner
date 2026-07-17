"use client";

import { useState, useRef } from "react";
import { Play, RotateCcw, Copy, Check, ChevronDown, Terminal, Loader2, Wifi, WifiOff } from "lucide-react";
import { trackCodeRun } from "@/lib/tracker";
import { JavaScriptCompiler } from "@/lib/compilers/javascript";
import { PythonCompiler } from "@/lib/compilers/python";
import { CloudCompiler } from "@/lib/compilers/cloud";
import { validateCode, checkRateLimit } from "@/lib/compilers";
import type { Compiler } from "@/lib/compilers";

interface Language {
  id: string;
  name: string;
  icon: string;
  mode: "local" | "cloud";
  examples: { title: string; code: string }[];
}

const languages: Language[] = [
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    mode: "local",
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
    icon: "📜",
    mode: "local",
    examples: [
      { title: "Hello World", code: `console.log("Hello, World!");\n\nconst name = "CSE Student";\nconsole.log(\`Welcome, \${name}!\`);` },
      { title: "Array Operations", code: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\n\nconst squares = nums.map(n => n * n);\nconsole.log("Squares:", squares);\n\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);` },
      { title: "Objects & Functions", code: `const student = {\n  name: "Alice",\n  age: 22,\n  grades: [85, 92, 78, 95]\n};\n\nconst avg = student.grades.reduce((a, b) => a + b, 0) / student.grades.length;\nconsole.log(\`\${student.name}: \${avg.toFixed(1)}\`);` },
    ],
  },
  {
    id: "c",
    name: "C",
    icon: "⚙️",
    mode: "cloud",
    examples: [
      { title: "Hello World", code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    char name[] = "CSE Student";\n    printf("Welcome, %s!\\n", name);\n    return 0;\n}` },
      { title: "Arrays & Pointers", code: `#include <stdio.h>\n\nint main() {\n    int nums[] = {10, 20, 30, 40, 50};\n    int n = sizeof(nums) / sizeof(nums[0]);\n    int *ptr = nums;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        sum += *(ptr + i);\n    }\n    printf("Sum: %d\\n", sum);\n    return 0;\n}` },
      { title: "Struct & Functions", code: `#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n};\n\nvoid display(struct Student s) {\n    printf("%s (age %d) GPA: %.1f\\n", s.name, s.age, s.gpa);\n}\n\nint main() {\n    struct Student s1 = {"Alice", 22, 3.8};\n    struct Student s2 = {"Bob", 23, 3.5};\n    display(s1);\n    display(s2);\n    if (s1.gpa > s2.gpa)\n        printf("Higher GPA: %s\\n", s1.name);\n    else\n        printf("Higher GPA: %s\\n", s2.name);\n    return 0;\n}` },
    ],
  },
  {
    id: "cpp",
    name: "C++",
    icon: "🔧",
    mode: "cloud",
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const selectLanguage = (lang: Language) => {
    setSelectedLang(lang);
    setCode(lang.examples[0].code);
    setOutput([]);
    setShowLangDropdown(false);
  };

  const runCode = async () => {
    // Rate limit check
    if (!checkRateLimit()) {
      setOutput(["Rate limit exceeded. Please wait a minute before trying again."]);
      return;
    }

    // Code validation
    const validationError = validateCode(code);
    if (validationError) {
      setOutput([validationError]);
      return;
    }

    setIsRunning(true);
    const modeLabel = selectedLang.mode === "cloud" ? "☁️ Cloud" : "💻 Local";
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
          lines.push("❌ Error:");
        } else {
          lines.push("⚠️ Warnings:");
        }
        lines.push(...errLines);
        lines.push("");
      }
      if (result.stdout?.trim()) {
        lines.push(...result.stdout.trim().split("\n"));
      }
      setOutput(lines.length > 0 ? lines : ["(No output)"]);
    } catch (err: any) {
      setOutput(["❌ " + (err.message || "Failed to run code")]);
    }

    setIsRunning(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      if (ta) {
        const s = ta.selectionStart, end = ta.selectionEnd;
        setCode(code.substring(0, s) + "  " + code.substring(end));
        setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + 2; }, 0);
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3 flex-wrap">
        <div className="relative">
          <button
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-dark-50 rounded-lg hover:bg-dark-100 transition-colors font-medium text-sm"
          >
            <span>{selectedLang.icon}</span>
            <span>{selectedLang.name}</span>
            <ChevronDown className="w-4 h-4 text-dark-400" />
          </button>
          {showLangDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-xl z-50 py-2 min-w-[200px]">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => selectLanguage(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary-50 transition-colors ${
                    selectedLang.id === lang.id ? "bg-primary-50 text-primary-700 font-medium" : ""
                  }`}
                >
                  <span className="text-lg">{lang.icon}</span>
                  <span>{lang.name}</span>
                  {lang.mode === "local" ? (
                    <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Wifi className="w-3 h-3" /> In-Browser
                    </span>
                  ) : (
                    <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <WifiOff className="w-3 h-3" /> Cloud
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <select
          onChange={(e) => { setCode(selectedLang.examples[parseInt(e.target.value)].code); setOutput([]); }}
          className="px-3 py-2 bg-dark-50 rounded-lg text-sm border-0 focus:ring-2 focus:ring-primary-500"
        >
          {selectedLang.examples.map((ex, i) => (
            <option key={i} value={i}>{ex.title}</option>
          ))}
        </select>

        <div className="flex-1" />

        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-dark-500 hover:text-dark-700 hover:bg-dark-50 rounded-lg transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={() => { setCode(selectedLang.examples[0].code); setOutput([]); }}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-dark-500 hover:text-dark-700 hover:bg-dark-50 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors disabled:opacity-50 shadow-sm"
        >
          {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" fill="currentColor" />}
          Run
          <span className="text-green-300 text-xs ml-1">Ctrl+↵</span>
        </button>
      </div>

      {/* Editor + Output */}
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex flex-col border-r border-gray-200">
          <div className="bg-dark-900 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-dark-400 text-xs font-mono ml-2">main.{selectedLang.id === "python" ? "py" : selectedLang.id === "javascript" ? "js" : selectedLang.id === "c" ? "c" : "cpp"}</span>
            <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
              selectedLang.mode === "local"
                ? "bg-green-900 text-green-300"
                : "bg-blue-900 text-blue-300"
            }`}>
              {selectedLang.mode === "local" ? "Runs in browser" : "Runs on cloud"}
            </span>
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-dark-950 text-dark-100 p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>

        <div className="w-[40%] flex flex-col bg-dark-950 min-w-[300px]">
          <div className="bg-dark-900 px-4 py-2 flex items-center gap-2 border-b border-dark-800">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-dark-300 text-xs font-mono">Output</span>
            {output.length > 0 && (
              <button onClick={() => setOutput([])} className="ml-auto text-dark-500 hover:text-dark-300 text-xs">Clear</button>
            )}
          </div>
          <div className="flex-1 p-4 overflow-auto font-mono text-sm">
            {output.length === 0 ? (
              <div className="text-dark-600 flex flex-col items-center justify-center h-full gap-2">
                <Terminal className="w-8 h-8" />
                <p>Click &quot;Run&quot; or press Ctrl+Enter</p>
                <p className="text-xs text-dark-700 mt-2">Python &amp; JavaScript run in your browser</p>
                <p className="text-xs text-dark-700">C &amp; C++ compile on cloud</p>
              </div>
            ) : (
              <div className="space-y-1">
                {output.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap ${
                    line.startsWith("❌") ? "text-red-400" :
                    line.startsWith("⚠️") ? "text-yellow-400" : "text-green-300"
                  }`}>{line}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
