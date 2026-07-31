"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { Project } from "../types/project";

interface ProjectContextType {
  projects: Project[];

  addProject: (project: Project) => void;

  deleteProject: (id: string) => void;

  renameProject: (
    id: string,
    title: string
  ) => void;
}

const ProjectContext =
  createContext<ProjectContextType | null>(null);

export function ProjectProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [projects, setProjects] = useState<Project[]>([]);

  function addProject(project: Project) {
    setProjects((prev) => [project, ...prev]);
  }

  function deleteProject(id: string) {
    setProjects((prev) =>
      prev.filter((p) => p.id !== id)
    );
  }

  function renameProject(
    id: string,
    title: string
  ) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              title,
            }
          : p
      )
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        deleteProject,
        renameProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context)
    throw new Error(
      "useProjects must be used inside ProjectProvider"
    );

  return context;
}
