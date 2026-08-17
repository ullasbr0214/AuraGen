"use client";

import useAdaptiveLayout from "../hooks/useAdaptiveLayout";

type Props = {
  cognitiveLoad: number;
};

export default function SelfHealingEngine({
  cognitiveLoad,
}: Props) {
  const layout = useAdaptiveLayout(cognitiveLoad);

  const recommendations = {
    normal: [
      "Show all dashboard widgets",
      "Normal spacing",
      "Sidebar expanded",
    ],
    focus: [
      "Minimize telemetry widgets",
      "Highlight AI Copilot",
      "Increase editor space",
    ],
    simplified: [
      "Hide secondary widgets",
      "Collapse sidebar",
      "Show only essential workspace",
    ],
  };

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-white">
        Self-Healing Engine
      </h2>

      <p className="mt-2 text-slate-400">
        AI recommendations based on cognitive state.
      </p>

      <div className="mt-6">

        <div className="rounded-xl bg-slate-800 p-5">

          <h3 className="text-cyan-400 font-semibold">
            Current Layout Mode
          </h3>

          <p className="mt-2 text-3xl font-bold text-white capitalize">
            {layout}
          </p>

        </div>

      </div>

      <div className="mt-6 space-y-3">

        {recommendations[layout].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-cyan-500/10 bg-slate-800/50 p-4"
          >
            ✅ {item}
          </div>
        ))}

      </div>

    </section>
  );
}