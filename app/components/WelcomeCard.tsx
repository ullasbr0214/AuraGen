"use client";

import {
  BrainCircuit,
  Activity,
  ShieldCheck,
  Cpu,
  Sparkles,
  CalendarDays,
} from "lucide-react";

import { useTelemetryContext } from "../context/TelemetryContext";

export default function WelcomeCard() {
  const { telemetry } = useTelemetryContext();

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

  const cognitiveLoad = Math.min(
    100,
    Math.round(
      telemetry.clicks * 3 +
      telemetry.rapidClicks * 5 +
      telemetry.hesitationTime / 10 +
      telemetry.velocity / 8
    )
  );

  const productivity = Math.max(
    0,
    100 - cognitiveLoad
  );

  const goal =
    hour < 12
      ? "Complete today's AI tasks"
      : hour < 18
      ? "Build smarter adaptive interfaces"
      : "Review and optimize today's work";

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-8 shadow-2xl">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="font-semibold uppercase tracking-[0.25em] text-cyan-400">
            AI Command Center
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-white">
            {greeting}, Ullas 👋
          </h2>

          <p className="mt-2 text-slate-400">
            Adaptive Workspace powered by Cognitive Intelligence
          </p>

          <div className="mt-4 flex items-center gap-2 text-slate-400">

            <CalendarDays
              size={18}
              className="text-cyan-400"
            />

            <span suppressHydrationWarning>
              {today}
            </span>

          </div>

        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-5">

          <div className="flex items-center gap-2">

            <div className="h-3 w-3 animate-pulse rounded-full bg-green-400" />

            <p className="font-semibold text-green-300">
              AI Systems Online
            </p>

          </div>

          <p className="mt-3 text-sm text-slate-300">
            Aura AI • Backend • Socket.IO
          </p>

          <p className="mt-1 text-xs text-cyan-300">
            Monitoring Active
          </p>

        </div>

      </div>

      {/* Metrics */}

      <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
                {/* AI Brain */}

        <MetricCard
          title="AI Brain"
          value="Connected"
          icon={<BrainCircuit className="text-cyan-400" size={28} />}
          color="bg-cyan-500/10"
        />

        {/* Cognitive Load */}

        <MetricCard
          title="Cognitive Load"
          value={`${cognitiveLoad}%`}
          icon={<Activity className="text-green-400" size={28} />}
          color="bg-green-500/10"
        />

        {/* Workspace */}

        <MetricCard
          title="Workspace"
          value="Stable"
          icon={<ShieldCheck className="text-blue-400" size={28} />}
          color="bg-blue-500/10"
        />

        {/* Productivity */}

        <MetricCard
          title="Productivity"
          value={`${productivity}%`}
          icon={<Cpu className="text-violet-400" size={28} />}
          color="bg-violet-500/10"
        />

      </div>

      {/* Today's Goal */}

      <div className="mt-10 rounded-2xl border border-cyan-500/10 bg-slate-800/30 p-6">

        <div className="flex items-center gap-3">

          <Sparkles
            className="text-cyan-400"
            size={22}
          />

          <h3 className="text-lg font-semibold text-white">
            Today's Goal
          </h3>

        </div>

        <p className="mt-4 text-cyan-300 text-lg font-medium">
          {goal}
        </p>

        <p className="mt-2 text-slate-400">
          AuraGen continuously monitors your interactions and adapts the interface
          to reduce cognitive load while improving productivity.
        </p>

      </div>

      {/* Footer */}

      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-cyan-500/10 bg-slate-800/40 px-6 py-5 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm text-slate-400">
            Current Cognitive Status
          </p>

          <p className="mt-1 text-xl font-bold text-cyan-300">
            {cognitiveLoad < 40
              ? "Stable"
              : cognitiveLoad < 70
              ? "Moderate"
              : "High"}
          </p>

        </div>

        <div className="w-full md:w-72">

          <div className="h-3 overflow-hidden rounded-full bg-slate-700">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-700"
              style={{
                width: `${cognitiveLoad}%`,
              }}
            />

          </div>

        </div>

      </div>

    </section>
  );
}

function MetricCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className={`rounded-2xl border border-cyan-500/10 ${color} p-5`}>

      <div className="mb-4">
        {icon}
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        {value}
      </h3>

    </div>
  );
}