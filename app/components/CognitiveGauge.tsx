"use client";

import { useEffect, useState } from "react";
import {
  BrainCircuit,
  Activity,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function CognitiveGauge() {
  const [load, setLoad] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(Math.floor(Math.random() * 31) + 60);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const focus = Math.max(100 - load + 10, 50);
  const stress = Math.min(load - 40, 100);
  const productivity = Math.min(focus + 5, 100);

  const status =
    load < 70
      ? "Optimal"
      : load < 85
      ? "Moderate"
      : "High";

  const recommendation =
    load < 70
      ? "Current workspace is optimized."
      : load < 85
      ? "Monitor user interaction."
      : "Recommend generating a simplified interface.";

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
            <BrainCircuit className="text-cyan-400" />
            Cognitive Intelligence
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Real-time AI cognitive analysis
          </p>

        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          Live
        </div>

      </div>

      {/* Circular Display */}
      <div className="mt-8 flex flex-col items-center">

        <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-cyan-500/20 bg-slate-800">

          <div className="text-center">

            <p className="text-5xl font-extrabold text-cyan-400">
              {load}%
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Cognitive Load
            </p>

          </div>

        </div>

        <div className="mt-5 w-full h-3 rounded-full bg-slate-700 overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-700"
            style={{ width: `${load}%` }}
          />

        </div>

      </div>

      {/* Metrics */}

      <div className="mt-8 grid grid-cols-2 gap-4">

        <Metric
          icon={<Activity className="text-green-400" />}
          title="Focus"
          value={`${focus}%`}
        />

        <Metric
          icon={<TrendingUp className="text-yellow-400" />}
          title="Stress"
          value={`${stress}%`}
        />

        <Metric
          icon={<ShieldCheck className="text-blue-400" />}
          title="Status"
          value={status}
        />

        <Metric
          icon={<Sparkles className="text-violet-400" />}
          title="Productivity"
          value={`${productivity}%`}
        />

      </div>

      {/* Recommendation */}

      <div className="mt-6 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-4">

        <p className="text-sm uppercase tracking-widest text-cyan-300">
          AI Recommendation
        </p>

        <p className="mt-2 text-slate-300">
          {recommendation}
        </p>

      </div>

    </section>
  );
}

type MetricProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function Metric({ icon, title, value }: MetricProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4">

      <div className="flex items-center gap-2">

        {icon}

        <span className="text-sm text-slate-400">
          {title}
        </span>

      </div>

      <p className="mt-2 text-xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}