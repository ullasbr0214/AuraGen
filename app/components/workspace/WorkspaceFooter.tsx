"use client";

import {
  Cpu,
  Database,
  Wifi,
  Clock3,
  Save,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function WorkspaceFooter() {
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <footer className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl">

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">

        {/* Backend */}

        <StatusCard
          icon={<Database size={22} className="text-green-400" />}
          title="Backend"
          value="Connected"
          color="text-green-400"
        />

        {/* Gemini */}

        <StatusCard
          icon={<Cpu size={22} className="text-cyan-400" />}
          title="Gemini AI"
          value="Online"
          color="text-cyan-400"
        />

        {/* Socket */}

        <StatusCard
          icon={<Wifi size={22} className="text-violet-400" />}
          title="Socket.IO"
          value="Active"
          color="text-violet-400"
        />

        {/* Session */}

        <StatusCard
          icon={<Clock3 size={22} className="text-yellow-400" />}
          title="Session"
          value={formatTime(sessionTime)}
          color="text-yellow-400"
        />

        {/* Auto Save */}

        <StatusCard
          icon={<Save size={22} className="text-blue-400" />}
          title="Auto Save"
          value="Enabled"
          color="text-blue-400"
        />

        {/* Security */}

        <StatusCard
          icon={<ShieldCheck size={22} className="text-emerald-400" />}
          title="Security"
          value="Protected"
          color="text-emerald-400"
        />

      </div>

      <div className="mt-6 border-t border-slate-800 pt-4 text-center">

        <p className="text-sm text-slate-500">
          AuraGen AI Workspace • Version 2.0.0 • Built with Next.js,
          Tailwind CSS, TypeScript & Gemini AI
        </p>

      </div>

    </footer>
  );
}

function StatusCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10">

      <div className="mb-3 flex items-center gap-3">
        {icon}

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <p className={`font-semibold ${color}`}>
            {value}
          </p>
        </div>
      </div>

    </div>
  );
}