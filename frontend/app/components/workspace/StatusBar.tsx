"use client";

import {
  GitBranch,
  Cpu,
  Wifi,
  FileCode2,
  MousePointer2,
  CheckCircle2,
  Globe,
  Braces,
} from "lucide-react";

export default function StatusBar() {
  return (
    <footer className="flex h-12 items-center justify-between rounded-b-2xl border-t border-cyan-500/10 bg-slate-950 px-5 text-sm">

      {/* Left */}

      <div className="flex items-center gap-6">

        <StatusItem
          icon={<GitBranch size={16} />}
          text="main"
          color="text-orange-400"
        />

        <StatusItem
          icon={<CheckCircle2 size={16} />}
          text="No Problems"
          color="text-green-400"
        />

        <StatusItem
          icon={<Braces size={16} />}
          text="TypeScript"
          color="text-blue-400"
        />

        <StatusItem
          icon={<FileCode2 size={16} />}
          text="page.tsx"
          color="text-cyan-400"
        />

      </div>

      {/* Center */}

      <div className="hidden lg:flex items-center gap-6">

        <StatusItem
          icon={<Cpu size={16} />}
          text="Gemini Online"
          color="text-violet-400"
        />

        <StatusItem
          icon={<Wifi size={16} />}
          text="Socket Connected"
          color="text-green-400"
        />

        <StatusItem
          icon={<Globe size={16} />}
          text="Backend Active"
          color="text-cyan-400"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <StatusItem
          icon={<MousePointer2 size={16} />}
          text="Ln 42, Col 15"
          color="text-slate-300"
        />

        <span className="text-slate-500">
          AuraGen v2.0
        </span>

      </div>

    </footer>
  );
}

function StatusItem({
  icon,
  text,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  color: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${color}`}
    >
      {icon}

      <span>{text}</span>
    </div>
  );
}