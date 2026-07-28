"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Activity,
  CheckCircle2,
  Sparkles,
  Cpu,
  Trash2,
  Clock3,
} from "lucide-react";

type AIEvent = {
  id: number;
  title: string;
  message: string;
  status: "success" | "processing" | "info";
  time: string;
};

export default function ResponseCard() {
  const [events, setEvents] = useState<AIEvent[]>([
    {
      id: 1,
      title: "Telemetry Ready",
      message: "AuraGen is waiting for telemetry events.",
      status: "info",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const clearEvents = () => {
    setEvents([]);
  };

  const getIcon = (status: AIEvent["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="text-green-400" size={18} />;
      case "processing":
        return <Cpu className="text-yellow-400" size={18} />;
      default:
        return <Activity className="text-cyan-400" size={18} />;
    }
  };

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <BrainCircuit className="text-cyan-400" size={28} />

          <div>
            <h2 className="text-2xl font-bold text-white">
              AI Event Feed
            </h2>

            <p className="text-sm text-slate-400">
              Live cognitive intelligence updates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">

          <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300">
            Active
          </span>

          <button
            onClick={clearEvents}
            className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
          >
            <Trash2 size={16} />
            Clear
          </button>

        </div>

      </div>

      {/* Counter */}

      <div className="mt-5 text-sm text-cyan-300">
        Total Events :{" "}
        <span className="font-bold">{events.length}</span>
      </div>

      {/* Timeline */}

      <div className="mt-8 space-y-5">

        {events.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-cyan-500/20 p-10 text-center">

            <Sparkles
              className="mx-auto text-cyan-400"
              size={42}
            />

            <h3 className="mt-5 text-xl font-bold text-white">
              No Events
            </h3>

            <p className="mt-2 text-slate-400">
              Waiting for Aura AI...
            </p>

          </div>

        ) : (

          events.map((event) => (

            <div
              key={event.id}
              className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 transition hover:border-cyan-500/30"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  {getIcon(event.status)}

                  <div>

                    <h3 className="font-semibold text-white">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-300">
                      {event.message}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">

                  <Clock3 size={14} />

                  {event.time}

                </div>

              </div>

            </div>

          ))

        )}

      </div>

      {/* AI Summary */}

      <div className="mt-8 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5">

        <p className="text-sm uppercase tracking-widest text-cyan-300">
          AI Summary
        </p>

        <p className="mt-3 text-slate-300 leading-7">
          AuraGen monitors telemetry, analyzes user interactions,
          generates adaptive React components, and maintains an
          intelligent event timeline. Once backend integration is
          complete, all events will update automatically in real time.
        </p>

      </div>

    </section>
  );
}