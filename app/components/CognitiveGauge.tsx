"use client";

import useTelemetry from "../hooks/useTelemetry";
import { Brain, Activity } from "lucide-react";

export default function CognitiveGauge() {
  const {
    cognitiveLoad,
    stressLevel,
    focusLevel,
    productivity,
  } = useTelemetry();

  const color =
    cognitiveLoad >= 80
      ? "bg-red-500"
      : cognitiveLoad >= 50
      ? "bg-yellow-500"
      : "bg-cyan-500";

  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}
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

      {/* Circular Gauge */}
      <div className="mt-8 flex justify-center">
        <div className="relative h-48 w-48">

          <svg
            className="absolute inset-0 -rotate-90"
            width="192"
            height="192"
          >
            <circle
              cx="96"
              cy="96"
              r="82"
              stroke="#1e293b"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="96"
              cy="96"
              r="82"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              className={`transition-all duration-700 ${
                cognitiveLoad >= 80
                  ? "text-red-400"
                  : cognitiveLoad >= 50
                  ? "text-yellow-400"
                  : "text-cyan-400"
              }`}
              strokeDasharray={515}
              strokeDashoffset={
                515 - (515 * cognitiveLoad) / 100
              }
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-cyan-400">
              {cognitiveLoad}%
            </h1>

            <p className="mt-1 text-slate-300">
              Cognitive Load
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="h-3 w-full rounded-full bg-slate-700">

          <div
            className={`h-3 rounded-full ${color} transition-all duration-700`}
            style={{
              width: `${cognitiveLoad}%`,
            }}
          />

        </div>
      </div>

      {/* Status Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4">

        <StatusCard
          title="Focus"
          value={`${focusLevel}%`}
        />

        <StatusCard
          title="Stress"
          value={stressLevel}
        />

        <StatusCard
          title="Productivity"
          value={`${Math.round(productivity)}%`}
        />

        <StatusCard
          title="Status"
          value={
            cognitiveLoad >= 80
              ? "High Load 🔴"
              : cognitiveLoad >= 50
              ? "Medium Load 🟡"
              : "Low Load 🟢"
          }
        />

      </div>

      {/* AI Recommendation */}
      <div className="mt-8 rounded-2xl bg-slate-800/60 p-4">

        <div className="flex items-center gap-2">

          <Activity
            className="text-cyan-400"
            size={18}
          />

          <h3 className="font-semibold text-white">
            AI Recommendation
          </h3>

        </div>

        <p className="mt-2 leading-7 text-sm text-slate-300">

          {cognitiveLoad >= 80 &&
            "High cognitive load detected. Reduce visual complexity, hide secondary widgets, and prioritize the most important actions."}

          {cognitiveLoad >= 50 &&
            cognitiveLoad < 80 &&
            "Moderate cognitive load detected. Consider simplifying the interface and reducing distractions to maintain focus."}

          {cognitiveLoad < 50 &&
            "The user is interacting comfortably. The current workspace is optimized and additional contextual information can be displayed safely."}

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
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10">

      <p className="text-xs uppercase text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}