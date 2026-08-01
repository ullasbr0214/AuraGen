"use client";

import LivePreviewPanel from "./LivePreview";

import {
  LayoutPanelTop,
  CheckCircle2,
  Sparkles,
  Copy,
  Trash2,
} from "lucide-react";

import { useAura } from "../context/AuraContext";
import Card from "./ui/Card";

export default function DynamicRenderer() {
  const {
    generatedCode,
    setGeneratedCode,
    generatedComponents,
    setGeneratedComponents,
  } = useAura();

  const clearAll = () => {
    setGeneratedCode("");
    setGeneratedComponents([]);
  };

  const copyCode = async (code: string) => {
    if (!code) {
      alert("No JSX code available.");
      return;
    }

    await navigator.clipboard.writeText(code);

    alert("✅ JSX copied successfully.");
  };

  return (
    <Card className="p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <LayoutPanelTop
            className="text-cyan-400"
            size={28}
          />

          <div>

            <h2 className="text-2xl font-bold text-white">
              Dynamic Renderer
            </h2>

            <p className="text-sm text-slate-400">
              Live AI Component Preview
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            <span className="text-sm font-semibold text-green-300">
              Live Preview Active
            </span>

          </div>

          {generatedCode && (

            <button
              onClick={clearAll}
              className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-400 transition hover:bg-red-500/20"
            >

              <Trash2 size={16} />

              Clear

            </button>

          )}

        </div>

      </div>

      {/* Status */}

      <div className="mt-5 text-sm text-cyan-300">

        Generated Components :
        <span className="ml-2 font-bold">
          {generatedCode ? 1 : 0}
        </span>

      </div>

      {/* Content */}

      <div className="mt-6">
                {generatedCode.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-cyan-500/30 bg-slate-800/40 p-10 text-center">

            <Sparkles
              size={48}
              className="mx-auto text-cyan-400"
            />

            <h3 className="mt-5 text-xl font-bold text-white">
              No Components Generated
            </h3>

            <p className="mt-3 text-slate-400">
              Start by entering a prompt in Aura AI Copilot and click
              <span className="font-semibold text-cyan-300">
                {" "}Generate UI
              </span>.
            </p>

          </div>

        ) : (

          <div className="rounded-2xl border border-cyan-500/20 bg-slate-800/70 p-6">

            <div className="mb-5 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <CheckCircle2
                  size={22}
                  className="text-green-400"
                />

                <h3 className="text-lg font-bold text-white">
                  Generated React Component
                </h3>

              </div>

              <button
                onClick={() => copyCode(generatedCode)}
                className="flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-300 transition hover:bg-cyan-500/20"
              >

                <Copy size={16} />

                Copy JSX

              </button>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

              <pre className="h-[450px] overflow-auto rounded-xl border border-slate-700 bg-[#08111F] p-5 text-sm leading-6 text-green-300">

                <code>{generatedCode}</code>

              </pre>

              <LivePreviewPanel
                code={generatedCode}
              />

            </div>

          </div>

        )}

      </div>

    </Card>

  );
}