"use client";

import {
  BrainCircuit,
  Activity,
  CheckCircle2,
  Sparkles,
  Cpu,
} from "lucide-react";

const events = [
  {
    time: "09:41",
    title: "Telemetry Stream",
    message: "Real-time user interaction monitoring started.",
    icon: <Activity className="text-cyan-400" size={18} />,
  },
  {
    time: "09:42",
    title: "Cognitive Analysis",
    message: "Cognitive load is within optimal range.",
    icon: <BrainCircuit className="text-violet-400" size={18} />,
  },
  {
    time: "09:43",
    title: "AI Recommendation",
    message: "Current workspace is optimized for productivity.",
    icon: <Sparkles className="text-yellow-400" size={18} />,
  },
  {
    time: "09:44",
    title: "Self-Healing Engine",
    message: "No layout regeneration required.",
    icon: <Cpu className="text-blue-400" size={18} />,
  },
];

export default function ResponseCard() {
  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            AI Event Feed
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Live cognitive intelligence updates
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">

          <CheckCircle2
            className="text-green-400"
            size={18}
          />

          <span className="text-sm font-semibold text-green-300">
            Active
          </span>

        </div>

      </div>

      {/* Timeline */}

      <div className="mt-8 space-y-5">

        {events.map((event, index) => (

          <div
            key={index}
            className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-800/60 p-4 transition hover:border-cyan-500/20"
          >

            <div className="mt-1">
              {event.icon}
            </div>

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-white">
                  {event.title}
                </h3>

                <span className="text-xs text-slate-500">
                  {event.time}
                </span>

              </div>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {event.message}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* AI Summary */}

      <div className="mt-8 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5">

        <p className="text-sm uppercase tracking-widest text-cyan-300">
          AI Summary
        </p>

        <p className="mt-2 text-slate-300">
          User interaction patterns are stable.
          No significant cognitive overload detected.
          Current interface remains optimized.
        </p>

      </div>

    </section>
  );
}