"use client";

import { useAura } from "../context/AuraContext";
import { Brain, Activity } from "lucide-react";


export default function CognitiveGauge() {
 const {
  cognitiveLoad,
  stressLevel,
  focusScore,
} = useAura();

  const color =
    cognitiveLoad >= 80
      ? "bg-red-500"
      : cognitiveLoad >= 50
      ? "bg-yellow-500"
      : "bg-cyan-500";

  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Cognitive Intelligence
          </h2>

          <p className="text-slate-400">
            Real-time AI cognitive analysis
          </p>
        </div>

        <Brain className="text-cyan-400" size={34} />

      </div>

      <div className="mt-8 flex justify-center">

        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-8 border-cyan-500">

          <div className="text-center">

            <h1 className="text-5xl font-bold text-cyan-400">
              {cognitiveLoad}%
            </h1>

            <p className="text-slate-300">
              Cognitive Load
            </p>

          </div>

        </div>

      </div>

      <div className="mt-8">

        <div className="h-3 w-full rounded-full bg-slate-700">

          <div
            className={`h-3 rounded-full ${color} transition-all duration-700`}
            style={{ width: `${cognitiveLoad}%` }}
          />

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <StatusCard
  title="Focus"
  value={`${focusScore}%`}
/>

        <StatusCard title="Stress" value={stressLevel} />

        <StatusCard
  title="Productivity"
  value={`${focusScore}%`}
/>

        <StatusCard
          title="Status"
          value={
            cognitiveLoad >= 80
              ? "Critical"
              : cognitiveLoad >= 50
              ? "Moderate"
              : "Stable"
          }
        />

      </div>

      <div className="mt-8 rounded-2xl bg-slate-800/60 p-4">

        <div className="flex items-center gap-2">

          <Activity className="text-cyan-400" size={18} />

          <h3 className="font-semibold text-white">
            AI Recommendation
          </h3>

        </div>

        <p className="mt-2 text-sm text-slate-300">

          {cognitiveLoad >= 80 &&
            "Reduce distractions. Simplify the dashboard immediately."}

          {cognitiveLoad >= 50 &&
            cognitiveLoad < 80 &&
            "User is experiencing moderate cognitive load."}

          {cognitiveLoad < 50 &&
            "Current workspace is optimized for productivity."}

        </p>

      </div>

    </div>
  );
}

function StatusCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">

      <p className="text-xs uppercase text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}