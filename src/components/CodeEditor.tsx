"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

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
};

export default function CodeEditor({ code, language = "typescript" }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-dark-200 dark:border-dark-700 shadow-lg">
      <div className="flex items-center justify-between bg-dark-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-dark-400 text-xs font-mono ml-2">
            {languageLabels[language] || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-dark-400 hover:text-white text-xs transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-dark-950 p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-dark-100 font-mono">{code}</code>
      </pre>
    </div>
  );
}
