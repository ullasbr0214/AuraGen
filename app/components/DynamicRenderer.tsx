"use client";
// Remove this import completely
import LivePreviewPanel from "./LivePreview";
import {
  LayoutPanelTop,
  CheckCircle2,
  Sparkles,
  Code2,
  Copy,
  Trash2,
  Clock3,
} from "lucide-react";

import { useAura } from "../context/AuraContext";

export default function DynamicRenderer() {
  const { generatedComponents, setGeneratedComponents } = useAura();
  const components = generatedComponents;

  const clearAll = () => {
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
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <LayoutPanelTop className="text-cyan-400" />

          <div>
            <h2 className="text-2xl font-bold text-white">
              Dynamic Renderer
            </h2>

            <p className="text-sm text-slate-400">
              AI Generated React Components
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">

          <span className="rounded-full bg-green-500/10 px-4 py-2 font-semibold text-green-400">
            ● Live
          </span>

          {components.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
            >
              <Trash2 size={16} />
              Clear
            </button>
          )}

        </div>

      </div>

      {/* Counter */}

      <div className="mt-5 text-sm text-cyan-300">
        Generated Components :{" "}
        <span className="font-bold">{components.length}</span>
      </div>

      {/* Content */}

      <div className="mt-6 space-y-6">

        {components.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-cyan-500/30 bg-slate-800/40 p-10 text-center">

            <Sparkles
              className="mx-auto text-cyan-400"
              size={48}
            />

            <h3 className="mt-5 text-xl font-bold text-white">
              Waiting for AI...
            </h3>

            <p className="mt-2 text-slate-400">
              Generate your first component using Aura AI.
            </p>

          </div>

        ) : (

          components.map((component, index) => (

            <div
              key={component.id}
              className="rounded-2xl border border-cyan-500/20 bg-slate-800/70 p-6"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    className="text-green-400"
                    size={22}
                  />

                  <div>

                    <h3 className="text-lg font-bold text-white">
  {component.title ?? "Untitled Component"}
</h3>

                    <p className="text-sm text-slate-400">
                      Component #{components.length - index}
                    </p>

                  </div>

                </div>

                {"timestamp" in component && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock3 size={15} />
                    {(component as any).timestamp}
                  </div>
                )}

              </div>

              <p className="mt-4 text-slate-300">
  {component.description ?? "No description available."}
</p>

              {component.jsx && (

                <div className="mt-6">

                  <div className="mb-3 flex items-center justify-between">

                    <div className="flex items-center gap-2 text-cyan-300">
                      <Code2 size={18} />

                      <span className="font-semibold">
                        Generated React JSX
                      </span>
                    </div>

                    <button
                      onClick={() => copyCode(component.jsx ?? "")}
                      className="flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
                    >
                      <Copy size={16} />
                      Copy
                    </button>

                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
  <pre className="max-h-96 overflow-auto rounded-xl border border-slate-700 bg-[#08111F] p-5 text-sm leading-6 text-green-300">
    <code>{component.jsx}</code>
  </pre>

  <LivePreviewPanel code={component.jsx ?? ""} />
</div>

                </div>

              )}

            </div>

          ))

        )}

      </div>

    </section>
  );
}