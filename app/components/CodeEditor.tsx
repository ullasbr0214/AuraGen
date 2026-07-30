"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  Copy,
  Check,
  FileCode2,
  Cpu,
  Download,
  Trash2,
} from "lucide-react";

import { useAura } from "../context/AuraContext";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const { generatedCode, setGeneratedCode } = useAura();

  const [copied, setCopied] = useState(false);

   const [saved, setSaved] = useState(true);

  const code =
    generatedCode ||
`// AuraGen AI Ready

export default function GeneratedComponent() {
  return (
    <div>
      Hello AuraGen 🚀
    </div>
  );
}`;

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([code], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);


    const a = document.createElement("a");

    a.href = url;
    a.download = "AuraGenComponent.jsx";
    a.click();

    URL.revokeObjectURL(url);
  };

  const clearCode = () => {
    setGeneratedCode("");
  };

  useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
      e.preventDefault();

      setSaved(true);

      console.log("✅ Code Saved");
    }
  };

  window.addEventListener("keydown", handler);

  return () => {
    window.removeEventListener("keydown", handler);
  };
}, []);

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-500/10 p-3">
            <Code2 className="text-cyan-400" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              AI Code Workspace
            </h2>

            <p className="text-sm text-slate-400">
              Live generated React component
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <span
  className={`rounded-full px-3 py-1 text-sm font-semibold ${
    saved
      ? "bg-green-500/10 text-green-300"
      : "bg-yellow-500/10 text-yellow-300"
  }`}
>
  {saved ? "● Saved" : "● Editing"}
</span>

          <button
            onClick={downloadCode}
            className="rounded-xl border border-slate-700 bg-slate-800 p-2 transition hover:border-cyan-400"
          >
            <Download className="text-cyan-400" size={18} />
          </button>

          <button
            onClick={copyCode}
            className="rounded-xl border border-slate-700 bg-slate-800 p-2 transition hover:border-cyan-400"
          >
            {copied ? (
              <Check className="text-green-400" size={18} />
            ) : (
              <Copy className="text-cyan-400" size={18} />
            )}
          </button>

          <button
            onClick={clearCode}
            className="rounded-xl border border-slate-700 bg-slate-800 p-2 transition hover:border-red-400"
          >
            <Trash2 className="text-red-400" size={18} />
          </button>

        </div>

      </div>

      {/* Status */}
      <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-800/40">

        <Status title="Language" value="React TSX" />

        <Status title="Renderer" value="Ready" />

        <Status title="Pipeline" value="Connected" />

      </div>

      {/* Editor */}
      {/* Editor */}
<div className="h-[500px] bg-[#0B1120]">
  <Editor
    height="100%"
    defaultLanguage="typescript"
    language="typescript"
    theme="vs-dark"
    value={generatedCode || code}
onChange={(value) => {
  setGeneratedCode(value || "");
  setSaved(false);
}}
    options={{
      fontSize: 14,
      minimap: {
        enabled: true,
      },
      wordWrap: "on",
      automaticLayout: true,
      scrollBeyondLastLine: false,
      formatOnPaste: true,
      formatOnType: true,
      tabSize: 2,
      roundedSelection: true,
      cursorBlinking: "smooth",
      smoothScrolling: true,
    }}
  />
</div>
        

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-800/40 px-6 py-4">

        <div className="flex items-center gap-2">

          <Cpu className="text-cyan-400" size={18} />

          <span className="text-sm text-slate-400">
            AI Workspace Ready
          </span>

        </div>

        <div className="flex items-center gap-6 text-sm">

          <span className="text-cyan-300">
            Lines : {code.split("\n").length}
          </span>

          <span className="text-cyan-300">
            Characters : {code.length}
          </span>

          <div className="flex items-center gap-2">

            <FileCode2
              size={18}
              className="text-cyan-400"
            />

            <span className="text-cyan-300">
              React Component
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

function Status({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (
    <div className="border-r border-slate-700 p-4 last:border-r-0">

      <p className="text-xs uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <p className="mt-1 font-semibold text-white">
        {value}
      </p>

    </div>
  );
}