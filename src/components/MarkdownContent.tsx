"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>,
        p: ({ children }) => <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside text-dark-600 dark:text-dark-300 mb-4 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside text-dark-600 dark:text-dark-300 mb-4 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-dark-600 dark:text-dark-300">{children}</li>,
        code: ({ inline, className, children, ...props }: any) => {
          if (inline) {
            return (
              <code className="bg-dark-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          }
          return (
            <code className={`block bg-dark-950 text-dark-100 p-4 rounded-xl overflow-x-auto text-sm font-mono ${className || ""}`} {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children }) => <pre className="mb-4">{children}</pre>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary-500 pl-4 italic text-dark-500 dark:text-dark-400 my-4">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-gray-300 dark:border-dark-600 px-4 py-2 bg-dark-50 dark:bg-dark-700 text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-300 dark:border-dark-600 px-4 py-2">{children}</td>
        ),
        a: ({ children, href }) => (
          <a href={href} className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        strong: ({ children }) => <strong className="font-bold text-dark-900 dark:text-dark-100">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
}
