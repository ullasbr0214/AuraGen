"use client";

import { useEffect, useState } from "react";
import {
  LayoutPanelTop,
  CheckCircle2,
  Sparkles,
  Code2,
} from "lucide-react";

import {
  subscribeToGeneratedComponents,
  GeneratedComponent,
} from "../services/rendererService";

export default function DynamicRenderer() {
  const [components, setComponents] = useState<GeneratedComponent[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToGeneratedComponents((component) => {
      setComponents((prev) => [component, ...prev]);
    });

    return unsubscribe;
  }, []);

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl">

      <div className="flex items-center justify-between">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
          <LayoutPanelTop />
          Dynamic Renderer
        </h2>

        <span className="rounded-full bg-green-500/10 px-4 py-2 text-green-400 font-semibold">
          ● Live
        </span>

      </div>

      <div className="mt-6 space-y-6">

        {components.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-cyan-400/30 p-10 text-center">

            <Sparkles className="mx-auto text-cyan-400" size={42} />

            <p className="mt-4 text-slate-300 text-lg">
              Waiting for AI Generated Components...
            </p>

          </div>

        ) : (

          components.map((component) => (

            <div
              key={component.id}
              className="rounded-2xl border border-cyan-500/20 bg-slate-800/60 p-6"
            >

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-400" />

                <h3 className="text-xl font-bold text-white">
                  {component.title}
                </h3>

              </div>

              <p className="mt-3 text-slate-400">
                {component.description}
              </p>

              {component.jsx && (
                <div className="mt-5">

                  <div className="mb-2 flex items-center gap-2 text-cyan-300">
                    <Code2 size={18} />
                    <span className="font-semibold">
                      Generated React Component
                    </span>
                  </div>

                  <pre className="overflow-auto rounded-xl bg-[#0B1120] p-4 text-sm text-green-300">
                    <code>{component.jsx}</code>
                  </pre>

                </div>
              )}

            </div>

          ))

        )}

      </div>

    </section>
  );
}