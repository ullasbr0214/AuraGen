"use client";

import { Sparkles } from "lucide-react";

export default function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Glow Effects */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Icons */}
      <Sparkles
        className="absolute left-24 top-24 animate-pulse text-cyan-400"
        size={26}
      />

      <Sparkles
        className="absolute right-40 top-44 animate-bounce text-violet-400"
        size={18}
      />

      <Sparkles
        className="absolute bottom-24 left-1/3 animate-pulse text-cyan-300"
        size={22}
      />

      <Sparkles
        className="absolute bottom-40 right-20 animate-bounce text-violet-300"
        size={20}
      />
    </div>
  );
}