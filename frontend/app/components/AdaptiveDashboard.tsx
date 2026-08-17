"use client";

import useAdaptiveLayout from "../hooks/useAdaptiveLayout";
import {
  LayoutDashboard,
  Focus,
  Minimize2,
  CheckCircle,
} from "lucide-react";

type AdaptiveDashboardProps = {
  cognitiveLoad: number;
};

export default function AdaptiveDashboard({
  cognitiveLoad,
}: AdaptiveDashboardProps) {
  const layout = useAdaptiveLayout(cognitiveLoad);

  const config = {
    normal: {
      title: "Normal Layout",
      color: "text-green-400",
      bg: "border-green-500/20 bg-green-500/10",
      icon: <LayoutDashboard className="text-green-400" />,
      items: [
        "All widgets are visible",
        "Sidebar expanded",
        "Normal spacing",
        "Balanced dashboard",
      ],
    },

    focus: {
      title: "Focus Mode",
      color: "text-yellow-400",
      bg: "border-yellow-500/20 bg-yellow-500/10",
      icon: <Focus className="text-yellow-400" />,
      items: [
        "Reduce distractions",
        "Highlight AI Copilot",
        "Expand Code Workspace",
        "Minimize secondary widgets",
      ],
    },

    simplified: {
      title: "Simplified Mode",
      color: "text-red-400",
      bg: "border-red-500/20 bg-red-500/10",
      icon: <Minimize2 className="text-red-400" />,
      items: [
        "Collapse sidebar",
        "Hide analytics",
        "Keep essential panels",
        "Enable Self-Healing UI",
      ],
    },
  };

  const current = config[layout];

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-xl">

      <div className="flex items-center gap-3">

        {current.icon}

        <div>

          <h2 className={`text-2xl font-bold ${current.color}`}>
            {current.title}
          </h2>

          <p className="text-slate-400">
            Adaptive interface based on live cognitive load.
          </p>

        </div>

      </div>

      <div
        className={`mt-6 rounded-2xl border p-5 ${current.bg}`}
      >
        <div className="space-y-4">

          {current.items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3"
            >
              <CheckCircle
                size={18}
                className={current.color}
              />

              <span className="text-slate-200">
                {item}
              </span>

            </div>
          ))}

        </div>
      </div>

    </section>
  );
}