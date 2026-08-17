"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Palette, Bell, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-[#070B14] p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="text-4xl font-bold">AuraGen Settings</h1>
        <p className="mt-2 text-slate-400">Application preferences and workspace controls.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-6"><Palette className="text-cyan-400"/><h2 className="mt-4 font-bold">Appearance</h2><p className="mt-2 text-sm text-slate-400">AuraGen dark workspace is enabled.</p></div>
          <div className="rounded-2xl border border-violet-500/20 bg-slate-900/70 p-6"><Bell className="text-violet-400"/><h2 className="mt-4 font-bold">Notifications</h2><p className="mt-2 text-sm text-slate-400">Generation and system notifications are enabled.</p></div>
          <div className="rounded-2xl border border-green-500/20 bg-slate-900/70 p-6"><ShieldCheck className="text-green-400"/><h2 className="mt-4 font-bold">Security</h2><p className="mt-2 text-sm text-slate-400">Authentication uses JWT tokens.</p></div>
        </div>
      </div>
    </main>
  );
}
