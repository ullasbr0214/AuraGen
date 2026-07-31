"use client";

import {
  LayoutDashboard,
  BrainCircuit,
  Activity,
  BarChart3,
  Sparkles,
  Settings,
  UserCircle2,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Assistant",
    icon: Sparkles,
  },
  {
    title: "Telemetry",
    icon: Activity,
  },
  {
    title: "Analytics",
    icon: BarChart3,
  },
  {
    title: "Cognitive Engine",
    icon: BrainCircuit,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
  className={`${
    collapsed ? "w-20" : "w-72"
  } min-h-screen border-r border-cyan-500/10 bg-slate-900/70 backdrop-blur-xl transition-all duration-300`}
>

      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-7">

        <div className="mb-6 flex justify-end">
  <button
    onClick={() => setCollapsed(!collapsed)}
    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-400"
  >
    {collapsed ? (
      <PanelLeftOpen size={20} />
    ) : (
      <PanelLeftClose size={20} />
    )}
  </button>
</div>

        <div className="flex items-center gap-3">

  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 text-xl font-bold text-white shadow-lg">
    A
  </div>

  <div>

    <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-3xl font-extrabold text-transparent">
      AuraGen
    </h1>

    <p className="text-xs text-slate-500">
      AI Workspace
    </p>

  </div>

</div>

      </div>

      {/* AI Status */}
      <div className="m-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">

        <p className="text-xs uppercase tracking-widest text-cyan-300">
          AI Brain
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          AI Online
        </h3>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full w-[92%] rounded-full bg-cyan-400"></div>
        </div>

        <p className="mt-2 text-sm text-slate-300">
          Gemini AI Connected
        </p>

      </div>

      <div className="mx-5 mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">

  <p className="text-xs uppercase tracking-widest text-green-300">
    Backend
  </p>

  <h3 className="mt-2 text-xl font-bold text-white">
    Connected
  </h3>

  <p className="mt-2 text-sm text-green-300">
    Socket.IO Active
  </p>

</div>

      {/* Navigation */}
      <nav className="flex-1 px-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
  key={item.title}
  className={`group relative mb-3 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all duration-300 hover:translate-x-1
  ${
    item.title === "Dashboard"
      ? "border border-cyan-500/30 bg-cyan-500/10"
      : "border border-transparent hover:border-cyan-500/20 hover:bg-cyan-500/10"
  }`}
>
              <Icon
                size={22}
                className="text-cyan-400 transition group-hover:scale-110"
              />

              <span className="font-medium text-slate-200">
                {item.title}
              </span>
            </button>
          );
        })}

      </nav>

      {/* Bottom Profile */}
      {/* Bottom Profile */}
<div className="border-t border-slate-800 p-5">

  <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4">

    <div className="flex items-center gap-3">

      <UserCircle2
        size={46}
        className="text-violet-400"
      />

      <div>

        <p className="font-semibold text-white">
          Ullas B R
        </p>

        <p className="text-sm text-green-400">
          ● Frontend Developer
        </p>

      </div>

    </div>

    <div className="mt-5 border-t border-slate-700 pt-4 text-center">

      <p className="text-xs text-slate-500">
        AuraGen v1.0.0
      </p>

      <p className="mt-1 text-xs text-cyan-400">
        Self-Healing AI Workspace
      </p>

    </div>

  </div>

</div>

    </aside>
  );
}