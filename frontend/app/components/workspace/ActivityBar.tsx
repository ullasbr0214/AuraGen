"use client";

import { useState } from "react";

import {
  Files,
  Search,
  GitBranch,
  BrainCircuit,
  Package,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

type Panel =
  | "explorer"
  | "search"
  | "git"
  | "ai"
  | "extensions"
  | "settings";

interface Props {
  activePanel?: Panel;
  onPanelChange?: (panel: Panel) => void;
}

const items = [
  {
    id: "explorer",
    label: "Explorer",
    icon: Files,
  },
  {
    id: "search",
    label: "Search",
    icon: Search,
  },
  {
    id: "git",
    label: "Source Control",
    icon: GitBranch,
  },
  {
    id: "ai",
    label: "Aura AI",
    icon: BrainCircuit,
  },
  {
    id: "extensions",
    label: "Extensions",
    icon: Package,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
] as const;

export default function ActivityBar({
  activePanel = "explorer",
  onPanelChange,
}: Props) {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <aside
      className={`flex h-full flex-col rounded-3xl border border-cyan-500/10 bg-slate-900/80 shadow-2xl transition-all duration-300 backdrop-blur-xl ${
        collapsed ? "w-20" : "w-24"
      }`}
    >
      {/* Logo */}

      <div className="flex h-20 items-center justify-center border-b border-slate-800">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 shadow-lg">

          <BrainCircuit
            size={24}
            className="text-white"
          />

        </div>

      </div>

      {/* Navigation */}

      <div className="flex flex-1 flex-col items-center gap-3 py-6">

        {items.map((item) => {
          const Icon = item.icon;

          const active =
            activePanel === item.id;

          return (
            <button
              key={item.id}
              title={item.label}
              onClick={() =>
                onPanelChange?.(
                  item.id as Panel
                )
              }
              className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                active
                  ? "bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-cyan-300"
              }`}
            >
              <Icon size={22} />

              {!collapsed && (
                <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-lg bg-slate-800 px-3 py-2 text-xs text-white opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

      </div>

      {/* Collapse Button */}

      <div className="border-t border-slate-800 p-4">

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="flex h-12 w-12 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
        >
          {collapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </button>

      </div>

    </aside>
  );
}