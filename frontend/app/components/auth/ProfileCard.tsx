"use client";

import {
  UserCircle2,
  Mail,
  ShieldCheck,
  Cpu,
  LogOut,
} from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">

      <div className="flex flex-col items-center">

        <UserCircle2
          size={100}
          className="text-cyan-400"
        />

        <h1 className="mt-4 text-3xl font-bold text-white">
          Ullas B R
        </h1>

        <p className="mt-1 text-slate-400">
          Frontend Developer
        </p>

      </div>

      <div className="mt-8 space-y-4">

        <Info
          icon={<Mail size={18} />}
          title="Email"
          value="ullas@example.com"
        />

        <Info
          icon={<ShieldCheck size={18} />}
          title="Role"
          value="AI Workspace User"
        />

        <Info
          icon={<Cpu size={18} />}
          title="Generated Components"
          value="24"
        />

      </div>

      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 py-3 font-semibold text-white transition hover:scale-[1.02]">

        <LogOut size={18} />

        Logout

      </button>

    </div>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/60 p-4">

      <div className="text-cyan-400">
        {icon}
      </div>

      <div>

        <p className="text-xs uppercase text-slate-400">
          {title}
        </p>

        <p className="font-semibold text-white">
          {value}
        </p>

      </div>

    </div>
  );
}
