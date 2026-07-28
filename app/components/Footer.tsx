"use client";

import {
  BrainCircuit,
  Globe,
  Mail,
  Heart,
  Cpu,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 rounded-3xl border border-cyan-500/10 bg-slate-900/70 backdrop-blur-xl">

      {/* Top */}

      <div className="grid gap-8 px-8 py-8 md:grid-cols-3">

        {/* Left */}

        <div>

          <div className="flex items-center gap-3">

            <BrainCircuit
              className="text-cyan-400"
              size={30}
            />

            <h2 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-3xl font-bold text-transparent">
              AuraGen
            </h2>

          </div>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Self-Healing Generative UI powered by
            Cognitive Intelligence, Telemetry Analytics
            and Adaptive AI.
          </p>

        </div>

        {/* Center */}

        <div>

          <h3 className="mb-4 font-semibold text-white">
            Project Status
          </h3>

          <div className="space-y-3">

            <Status label="Frontend" value="Completed" />

            <Status label="Backend" value="Connected" />

            <Status label="AI Engine" value="Running" />

            <Status label="Socket.IO" value="Active" />

          </div>

        </div>

        {/* Right */}

        <div>

          <h3 className="mb-4 font-semibold text-white">
            Connect
          </h3>

          <div className="space-y-4">

            <Social
  icon={<Globe size={18} />}
  text="GitHub"
/>

            <Social
  icon={<Globe size={18} />}
  text="LinkedIn"
/>

            <Social
              icon={<Mail size={18} />}
              text="Email"
            />

          </div>

        </div>

      </div>

      {/* Divider */}

      <div className="border-t border-slate-800" />

      {/* Bottom */}

      <div className="flex flex-col items-center justify-between gap-4 px-8 py-6 md:flex-row">

        <div className="flex items-center gap-2 text-slate-400">

          <Cpu
            size={18}
            className="text-cyan-400"
          />

          <span>
            AuraGen v1.0 • AI Workspace
          </span>

        </div>

        <div className="flex items-center gap-2 text-slate-400">

          <Heart
            size={16}
            className="text-red-400"
          />

          <span>
            Built by Ullas B R • © {year}
          </span>

        </div>

      </div>

    </footer>
  );
}

function Status({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-800/60 px-4 py-3">

      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-semibold text-green-400">
        {value}
      </span>

    </div>
  );
}

function Social({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <button className="flex w-full items-center gap-3 rounded-xl bg-slate-800/60 px-4 py-3 transition hover:bg-cyan-500/10">

      <div className="text-cyan-400">
        {icon}
      </div>

      <span className="text-slate-300">
        {text}
      </span>

    </button>
  );
}