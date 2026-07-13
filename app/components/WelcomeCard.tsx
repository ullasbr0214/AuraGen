"use client";

import {
  BrainCircuit,
  Activity,
 ShieldCheck,
  Cpu,
  Sparkles,
} from "lucide-react";

export default function WelcomeCard() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-8 shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-cyan-400 font-semibold tracking-[0.25em] uppercase">
            AI Command Center
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-white">
            {greeting}, Ullas 👋
          </h2>

          <p className="mt-2 text-slate-400">
            Adaptive Workspace powered by Cognitive Intelligence
          </p>

          <p className="mt-1 text-slate-500">
            {today}
          </p>

        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4">

          <div className="flex items-center gap-2">

            <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>

            <p className="font-semibold text-green-300">
              AI Systems Online
            </p>

          </div>

          <p className="mt-2 text-sm text-slate-300">
            All services are running normally
          </p>

        </div>

      </div>

      {/* Metrics */}

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="rounded-2xl border border-cyan-500/10 bg-slate-800/40 p-5">

          <BrainCircuit className="text-cyan-400 mb-3" />

          <p className="text-slate-400 text-sm">
            AI Brain
          </p>

          <h3 className="text-2xl font-bold text-white">
            Connected
          </h3>

        </div>

        <div className="rounded-2xl border border-cyan-500/10 bg-slate-800/40 p-5">

          <Activity className="text-green-400 mb-3" />

          <p className="text-slate-400 text-sm">
            Cognitive Load
          </p>

          <h3 className="text-2xl font-bold text-white">
            18%
          </h3>

        </div>

        <div className="rounded-2xl border border-cyan-500/10 bg-slate-800/40 p-5">

          <ShieldCheck className="text-blue-400 mb-3" />

          <p className="text-slate-400 text-sm">
            Workspace
          </p>

          <h3 className="text-2xl font-bold text-white">
            Stable
          </h3>

        </div>

        <div className="rounded-2xl border border-cyan-500/10 bg-slate-800/40 p-5">

          <Cpu className="text-violet-400 mb-3" />

          <p className="text-slate-400 text-sm">
            Optimization
          </p>

          <h3 className="text-2xl font-bold text-white">
            Live
          </h3>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-cyan-500/10 bg-slate-800/30 px-6 py-4">

        <div className="flex items-center gap-3">

          <Sparkles className="text-cyan-400" />

          <p className="text-slate-300">
            Today's Goal
          </p>

        </div>

        <p className="font-semibold text-cyan-300">
          Build Smarter Adaptive Interfaces
        </p>

      </div>

    </section>
  );
}