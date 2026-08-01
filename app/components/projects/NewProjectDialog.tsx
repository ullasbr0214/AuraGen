"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useProjects } from "@/app/context/ProjectContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NewProjectDialog({
  open,
  onClose,
}: Props) {
  const { addProject } = useProjects();

  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");

  if (!open) return null;

  const createProject = () => {
    if (!title.trim()) return;

    addProject({
      id: crypto.randomUUID(),
      title,
      prompt,
      code: "",
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setPrompt("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            New Project
          </h2>

          <button onClick={onClose}>
            <X className="text-slate-400 hover:text-white" />
          </button>
        </div>

        <input
          placeholder="Project Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />

        <textarea
          rows={5}
          placeholder="Describe your project..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />

        <button
          onClick={createProject}
          className="mt-6 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-400"
        >
          Create Project
        </button>
      </div>
    </div>
  );
}