"use client";

import { useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
} from "lucide-react";

import { useProjects } from "@/app/context/ProjectContext";
import ProjectCard from "./ProjectCard";
import NewProjectDialog from "./NewProjectDialog";

export default function ProjectSidebar() {
  const {
    projects,
    deleteProject,
    renameProject,
    setCurrentProject,
  } = useProjects();

  const [search, setSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const filteredProjects = projects.filter((project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="rounded-3xl border border-cyan-500/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <FolderKanban
            className="text-cyan-400"
            size={26}
          />

          <div>

            <h2 className="text-2xl font-bold text-white">
              Projects
            </h2>

            <p className="text-sm text-slate-400">
              Manage AI projects
            </p>

          </div>

        </div>

        <button
          onClick={() => setOpenDialog(true)}
          className="rounded-xl bg-cyan-500 p-3 transition hover:bg-cyan-400"
        >
          <Plus size={18} />
        </button>

      </div>

      {/* Search */}

      <div className="relative mt-6">

        <Search
          size={18}
          className="absolute left-4 top-3 text-slate-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search project..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-500"
        />

      </div>

      {/* Counter */}

      <div className="mt-5 text-sm text-cyan-300">

        Total Projects

        <span className="ml-2 font-bold">
          {filteredProjects.length}
        </span>

      </div>

      {/* List */}

      <div className="mt-6 space-y-4">

        {filteredProjects.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center">

            <FolderKanban
              className="mx-auto text-cyan-400"
              size={42}
            />

            <h3 className="mt-4 font-semibold text-white">
              No Projects
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Create your first AuraGen project.
            </p>

          </div>

        ) : (

          filteredProjects.map((project) => (

            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() =>
                deleteProject(project.id)
              }
              onRename={() => {
                const title = prompt(
                  "Rename Project",
                  project.title
                );

                if (title) {
                  renameProject(
                    project.id,
                    title
                  );
                }
              }}
              onOpen={() =>
                setCurrentProject(project.id)
              }
            />

          ))

        )}

      </div>

      <NewProjectDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
      />

    </section>
  );
}