"use client";

import { useState } from "react";
import { Copy, Check, Play, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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

const playgroundLangs: Record<string, string> = {
  typescript: "typescript",
  javascript: "javascript",
  python: "python",
  c: "c",
  cpp: "cpp",
  html: "html",
  css: "css",
  tsx: "typescript",
  sql: "sql",
};

export default function CodeEditor({ code, language = "typescript" }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenInPlayground = () => {
    const playgroundLang = playgroundLangs[language] || "typescript";
    const url = `/playground?code=${encodeURIComponent(code)}&lang=${playgroundLang}`;
    router.push(url);
  };

  return (
    <div className="rounded-xl overflow-hidden border code-editor-border code-editor-shadow">
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
          <Link
            href={`/playground?code=${encodeURIComponent(code)}&lang=${playgroundLangs[language] || "typescript"}`}
            className="flex items-center gap-1 code-editor-label hover:text-accent text-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            Try in Playground
          </Link>
        </div>
      </div>
      <pre className="code-editor-body p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="code-editor-text font-mono">{code}</code>
      </pre>
    </div>
  );
}