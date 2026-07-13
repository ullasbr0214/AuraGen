"use client";

import { useState } from "react";
import {
  Code2,
  Copy,
  Check,
  FileCode2,
  Cpu,
} from "lucide-react";

import { useAura } from "../context/AuraContext";

export default function CodeEditor() {
  const { generatedCode } = useAura();

  const [copied, setCopied] = useState(false);

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

          <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-300">
            ● Ready
          </span>

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

        </div>

      </div>

      {/* Status */}

      <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-800/40">

        <Status title="Language" value="React TSX" />

        <Status title="Renderer" value="Ready" />

        <Status title="Pipeline" value="Connected" />

      </div>

      {/* Editor */}

      <div className="max-h-[450px] overflow-auto bg-[#0B1120]">

        <pre className="p-6 text-sm leading-7 text-green-300">

          <code>
            {code}
          </code>

        </pre>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-800/40 px-6 py-4">

        <div className="flex items-center gap-2">

          <Cpu className="text-cyan-400" size={18} />

          <p className="text-sm text-slate-400">
            Ready for Dynamic Component Rendering
          </p>

        </div>

        <div className="flex items-center gap-2">

          <FileCode2
            size={18}
            className="text-cyan-400"
          />

          <span className="text-sm text-cyan-300">
            React Component
          </span>

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