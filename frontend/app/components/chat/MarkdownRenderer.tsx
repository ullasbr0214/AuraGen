"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: Props) {
  return (
    <div className="prose prose-invert max-w-none prose-pre:p-0 prose-code:text-cyan-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({
            inline,
            className,
            children,
            ...props
          }: any) {
            const match = /language-(\w+)/.exec(
              className || ""
            );

            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    borderRadius: "12px",
                    fontSize: "14px",
                    padding: "20px",
                    marginTop: "12px",
                    marginBottom: "12px",
                    background: "#08111F",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }

            return (
              <code
                className="rounded bg-slate-800 px-1 py-0.5 text-cyan-300"
                {...props}
              >
                {children}
              </code>
            );
          },

          h1: ({ children }) => (
            <h1 className="mb-4 text-3xl font-bold text-white">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-2xl font-bold text-white">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-3 mt-5 text-xl font-semibold text-white">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-3 leading-7 text-slate-300">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-300">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-300">
              {children}
            </ol>
          ),

          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-cyan-400 pl-4 italic text-slate-400">
              {children}
            </blockquote>
          ),

          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-700">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="border border-slate-700 bg-slate-800 p-2 text-left text-white">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-slate-700 p-2 text-slate-300">
              {children}
            </td>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}