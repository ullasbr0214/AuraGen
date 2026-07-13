"use client";

import {
  LayoutDashboard,
  BrainCircuit,
  Activity,
  BarChart3,
  Sparkles,
  Settings,
  UserCircle2,
} from "lucide-react";

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
  return (
    <aside className="w-72 min-h-screen border-r border-cyan-500/10 bg-slate-900/70 backdrop-blur-xl">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">

        <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-4xl font-extrabold text-transparent">
          AuraGen
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Self-Healing AI Workspace
        </p>

      </div>

      {/* AI Status */}
      <div className="m-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">

        <p className="text-xs uppercase tracking-widest text-cyan-300">
          AI Brain
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          Connected
        </h3>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full w-[92%] rounded-full bg-cyan-400"></div>
        </div>

        <p className="mt-2 text-sm text-slate-300">
          Neural Engine Running
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="group mb-3 flex w-full items-center gap-4 rounded-xl border border-transparent px-4 py-3 text-left transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/10"
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

        </div>

      </div>

    </aside>
  );
}