"use client";

import { Bot, Wifi, Cpu, Activity } from "lucide-react";
import { useAura } from "../context/AuraContext";

export default function AIStatusCard() {
  const { aiStatus } = useAura();

  const getStatusColor = () => {
    switch (aiStatus) {
      case "Completed":
        return "text-green-400";
      case "Failed":
        return "text-red-400";
      case "Generating UI...":
      case "Rendering...":
      case "Sending Prompt...":
        return "text-yellow-400";
      default:
        return "text-cyan-400";
    }
  };

  return (
    <section className="mt-6 rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Bot className="text-cyan-400" size={28} />

        <div>
          <h2 className="text-xl font-bold text-white">
            Aura AI Status
          </h2>

          <p className="text-sm text-slate-400">
            Real-time AI Pipeline Monitoring
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl bg-slate-800/60 p-4">
          <div className="flex items-center gap-2">
            <Activity className={getStatusColor()} size={18} />
            <span className="text-slate-400">Status</span>
          </div>

          <p className={`mt-2 text-lg font-semibold ${getStatusColor()}`}>
            {aiStatus}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-4">
          <div className="flex items-center gap-2">
            <Wifi className="text-green-400" size={18} />
            <span className="text-slate-400">Socket</span>
          </div>

          <p className="mt-2 text-lg font-semibold text-green-400">
            Connected
          </p>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-4">
          <div className="flex items-center gap-2">
            <Cpu className="text-cyan-400" size={18} />
            <span className="text-slate-400">AI Model</span>
          </div>

          <p className="mt-2 text-lg font-semibold text-cyan-300">
            Gemini
          </p>
        </div>
      </div>
    </section>
  );
}