"use client";

import {
  BrainCircuit,
  Save,
  Rocket,
  Settings,
  Moon,
  Sun,
  Bell,
  UserCircle2,
  FolderKanban,
} from "lucide-react";
import { useState } from "react";
import { useProjects } from "@/app/context/ProjectContext";

export default function WorkspaceHeader() {
  const { currentProject } = useProjects();

  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl">

      <div className="flex flex-wrap items-center justify-between gap-5">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 shadow-lg">

            <BrainCircuit
              size={28}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Aura AI Workspace
            </h2>

            <div className="mt-1 flex items-center gap-2">

              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

              <span className="text-sm text-green-300">
                AI Online
              </span>

            </div>

          </div>

        </div>

        {/* Center */}

        <div className="flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3">

          <FolderKanban
            size={20}
            className="text-cyan-300"
          />

          <div>

            <p className="text-xs uppercase tracking-wide text-cyan-300">
              Current Project
            </p>

            <p className="font-semibold text-white">
              {currentProject?.title ?? "No Project Selected"}
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 transition hover:bg-cyan-500/20">

            <Save
              size={18}
              className="text-cyan-300"
            />

          </button>

          <button className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 transition hover:bg-green-500/20">

            <Rocket
              size={18}
              className="text-green-300"
            />

          </button>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="rounded-xl border border-slate-700 bg-slate-800 p-3 transition hover:border-cyan-500"
          >
            {darkMode ? (
              <Sun
                size={18}
                className="text-yellow-400"
              />
            ) : (
              <Moon
                size={18}
                className="text-cyan-300"
              />
            )}
          </button>

          <button className="rounded-xl border border-slate-700 bg-slate-800 p-3 transition hover:border-cyan-500">

            <Bell
              size={18}
              className="text-slate-300"
            />

          </button>

          <button className="rounded-xl border border-slate-700 bg-slate-800 p-3 transition hover:border-cyan-500">

            <Settings
              size={18}
              className="text-slate-300"
            />

          </button>

          <button className="rounded-full border border-violet-500/20 bg-violet-500/10 p-2 transition hover:bg-violet-500/20">

            <UserCircle2
              size={34}
              className="text-violet-300"
            />

          </button>

        </div>

      </div>

    </header>
  );
}