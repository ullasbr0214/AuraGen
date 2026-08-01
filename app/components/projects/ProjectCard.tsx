"use client";

import { Project } from "@/app/types/project";
import {
  FolderOpen,
  Trash2,
  Pencil,
  CalendarDays,
} from "lucide-react";

interface Props {
  project: Project;
  onDelete: () => void;
  onRename: () => void;
  onOpen: () => void;
}

export default function ProjectCard({
  project,
  onDelete,
  onRename,
  onOpen,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="font-semibold text-white">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-slate-400">
            {project.prompt}
          </p>

        </div>

        <FolderOpen
          className="text-cyan-400"
          size={22}
        />

      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">

        <CalendarDays size={14} />

        {project.createdAt}

      </div>

      <div className="mt-5 flex gap-2">

        <button
          onClick={onOpen}
          className="flex-1 rounded-xl bg-cyan-500 py-2 text-sm font-medium text-white transition hover:bg-cyan-400"
        >
          Open
        </button>

        <button
          onClick={onRename}
          className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-2 hover:bg-yellow-500/20"
        >
          <Pencil
            size={16}
            className="text-yellow-300"
          />
        </button>

        <button
          onClick={onDelete}
          className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 hover:bg-red-500/20"
        >
          <Trash2
            size={16}
            className="text-red-400"
          />
        </button>

      </div>

    </div>
  );
}