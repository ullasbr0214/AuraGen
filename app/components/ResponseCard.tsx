"use client";

import {
  BrainCircuit,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { useAura } from "../context/AuraContext";

export default function ResponseCard() {
  const { response } = useAura();

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Aura AI Response
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Live response from the AI pipeline
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">

          <CheckCircle2
            className="text-green-400"
            size={18}
          />

          <span className="text-sm font-semibold text-green-300">
            Connected
          </span>

        </div>

      </div>

      {/* AI Response */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-800/60 p-6">

        <div className="flex items-center gap-3">

          <BrainCircuit className="text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">
            AI Response
          </h3>

        </div>

        <p className="mt-5 whitespace-pre-wrap leading-7 text-slate-300">

          {response || "Waiting for AI response..."}

        </p>

      </div>

      {/* Status */}

      <div className="mt-6 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5">

        <div className="flex items-center gap-2">

          <Sparkles className="text-cyan-400" />

          <p className="font-semibold text-cyan-300">
            Aura AI Status
          </p>

        </div>

        <p className="mt-3 text-slate-300">

          {response
            ? "The backend responded successfully."
            : "Waiting for the backend to generate a component."}

        </p>

      </div>

    </section>
  );
}