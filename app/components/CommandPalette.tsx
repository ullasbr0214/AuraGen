"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Brain,
  FolderOpen,
  Save,
  Settings,
  Moon,
  History,
} from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    window.addEventListener("keydown", down);

    return () =>
      window.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-24">

      <Command className="w-[650px] rounded-2xl border border-cyan-500/20 bg-slate-900 shadow-2xl">

        <Command.Input
          placeholder="Search Aura commands..."
          className="w-full border-b border-slate-700 bg-transparent p-5 text-white outline-none"
        />

        <Command.List className="max-h-[400px] overflow-auto p-2">

          <Command.Item className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-slate-800">
            <Brain size={18} />
            Generate Dashboard
          </Command.Item>

          <Command.Item className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-slate-800">
            <Brain size={18} />
            Generate Login Page
          </Command.Item>

          <Command.Item className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-slate-800">
            <Save size={18} />
            Save Project
          </Command.Item>

          <Command.Item className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-slate-800">
            <FolderOpen size={18} />
            Open Project
          </Command.Item>

          <Command.Item className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-slate-800">
            <History size={18} />
            AI History
          </Command.Item>

          <Command.Item className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-slate-800">
            <Moon size={18} />
            Change Theme
          </Command.Item>

          <Command.Item className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-slate-800">
            <Settings size={18} />
            Settings
          </Command.Item>

        </Command.List>

      </Command>

    </div>
  );
}