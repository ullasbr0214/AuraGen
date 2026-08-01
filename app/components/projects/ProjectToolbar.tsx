"use client";

import {
  Plus,
  FolderOpen,
  RefreshCw,
} from "lucide-react";

interface Props {
  onNew: () => void;
}

export default function ProjectToolbar({
  onNew,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-cyan-500/10 bg-slate-900/70 p-4">

      <div className="flex items-center gap-3">

        <FolderOpen className="text-cyan-400" />

        <div>

          <h3 className="font-semibold text-white">
            Project Manager
          </h3>

          <p className="text-sm text-slate-400">
            Organize your AuraGen work
          </p>

        </div>

      </div>

      <div className="flex gap-3">

        <button className="rounded-xl border border-slate-700 p-3 hover:bg-slate-800">
          <RefreshCw className="text-cyan-400" size={18} />
        </button>

        <button
          onClick={onNew}
          className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-400"
        >
          <div className="flex items-center gap-2">
            <Plus size={18} />
            New Project
          </div>
        </button>

      </div>

    </div>
  );
}