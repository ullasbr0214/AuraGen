"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  LayoutPanelTop,
  CheckCircle2,
} from "lucide-react";
 import { subscribeToGeneratedComponents } from "../services/rendererService";

type GeneratedComponent = {
  id: number;
  title: string;
  description: string;
};

export default function DynamicRenderer() {
  const [components, setComponents] = useState<GeneratedComponent[]>([]);

useEffect(() => {
  const unsubscribe = subscribeToGeneratedComponents((item) => {
    setComponents((prev) => [...prev, item]);
  });
  return unsubscribe;
}, []);

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
            <LayoutPanelTop className="text-cyan-400" />
            Dynamic Renderer
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            AI-generated UI components appear here.
          </p>

        </div>

        <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300">
          Renderer Ready
        </div>

      </div>

      {/* Components */}

      <div className="mt-6 space-y-4">

        {components.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-cyan-500/20 p-8 text-center">

            <Sparkles
              className="mx-auto text-cyan-400"
              size={36}
            />

            <p className="mt-4 text-slate-300">
              Waiting for AI generated components...
            </p>

          </div>

        ) : (

          components.map((item) => (

            <div
              key={item.id}
              className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition hover:border-cyan-500/20"
            >

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-400" />

                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>

              </div>

              <p className="mt-3 text-slate-400">
                {item.description}
              </p>

            </div>

          ))

        )}

      </div>

    </section>
  );
}