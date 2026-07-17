"use client";

import {
  MousePointer2,
  Gauge,
  Mouse,
  ScrollText,
  Keyboard,
  Timer,
} from "lucide-react";

type TelemetryCardProps = {
  mouseX: number;
  mouseY: number;
  velocity: number;
  clicks: number;
  rapidClicks: number;
  hesitationTime: number;
  scrollCount: number;
  keyPresses: number;
};

function TelemetryItem(
  title: string,
  value: string | number,
  icon: React.ReactNode,
  color: string
) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5 transition hover:border-cyan-500/30 hover:bg-slate-800">

      <div className="flex items-center gap-3">

        <div className={`rounded-xl p-3 ${color}`}>
          {icon}
        </div>

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h3 className="text-xl font-bold text-white">
            {value}
          </h3>

        </div>

      </div>

    </div>
  );
}

export default function TelemetryCard({
  mouseX,
  mouseY,
  velocity,
  clicks,
  rapidClicks,
  hesitationTime,
  scrollCount,
  keyPresses,
}: TelemetryCardProps) {
  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Live Telemetry Engine
          </h2>

          <p className="mt-1 text-slate-400">
            Real-time user interaction monitoring
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">

          <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>

          <span className="text-sm font-semibold text-green-300">
            Monitoring
          </span>

        </div>

      </div>

      {/* Grid */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {TelemetryItem(
          "Mouse Position",
          `${mouseX}, ${mouseY}`,
          <MousePointer2 className="text-cyan-300" />,
          "bg-cyan-500/10"
        )}

        {TelemetryItem(
          "Mouse Velocity",
          `${velocity.toFixed(2)} px/s`,
          <Gauge className="text-blue-300" />,
          "bg-blue-500/10"
        )}

        {TelemetryItem(
          "Total Clicks",
          clicks,
          <Mouse className="text-violet-300" />,
          "bg-violet-500/10"
        )}

        {TelemetryItem(
          "Rapid Clicks",
          rapidClicks,
          <Mouse className="text-red-300" />,
          "bg-red-500/10"
        )}

        {TelemetryItem(
          "Scroll Events",
          scrollCount,
          <ScrollText className="text-orange-300" />,
          "bg-orange-500/10"
        )}

        {TelemetryItem(
          "Key Presses",
          keyPresses,
          <Keyboard className="text-green-300" />,
          "bg-green-500/10"
        )}

        {TelemetryItem(
          "Hesitation Time",
          `${hesitationTime.toFixed(1)} s`,
          <Timer className="text-yellow-300" />,
          "bg-yellow-500/10"
        )}

      </div>

    </section>
  );
}