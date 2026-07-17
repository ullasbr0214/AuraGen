"use client";

import { useEffect, useState } from "react";
import {
  LayoutPanelTop,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import {
  subscribeToGeneratedComponents,
} from "../services/rendererService";

type GeneratedComponent = {
  id: number;
  title: string;
  description: string;
};

export default function DynamicRenderer() {

  const [components, setComponents] = useState<GeneratedComponent[]>([]);

  useEffect(() => {

    const unsubscribe = subscribeToGeneratedComponents((component) => {

      setComponents((prev) => [...prev, component]);

    });

    return unsubscribe;

  }, []);

  return (

    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6">

      <div className="flex items-center justify-between">

        <h2 className="flex items-center gap-3 text-2xl font-bold">

          <LayoutPanelTop />

          Dynamic Renderer

        </h2>

        <span className="rounded-full bg-green-500/10 px-3 py-2 text-green-400">

          Live

        </span>

      </div>

      <div className="mt-6 space-y-4">

        {components.length === 0 ? (

          <div className="rounded-xl border border-dashed border-cyan-400 p-10 text-center">

            <Sparkles className="mx-auto" size={40} />

            <p className="mt-3">

              Waiting for AI Generated Components...

            </p>

          </div>

        ) : (

          components.map((component) => (

            <div
              key={component.id}
              className="rounded-xl border border-slate-700 bg-slate-800 p-5"
            >

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-400"/>

                <h3>

                  {component.title}

                </h3>

              </div>

              <p className="mt-3 text-slate-400">

                {component.description}

              </p>

            </div>

          ))

        )}

      </div>

    </section>

  );

}