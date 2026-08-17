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

  currentProject: Project | null;

  addProject: (project: Project) => void;

  deleteProject: (id: string) => void;

  renameProject: (
    id: string,
    title: string
  ) => void;

  updateProject: (
    id: string,
    data: Partial<Project>
  ) => void;

  setCurrentProject: (
    id: string
  ) => void;

  clearProjects: () => void;
}

const ProjectContext =
  createContext<ProjectContextType | null>(null);

export function ProjectProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [projects, setProjects] = useState<Project[]>([]);

  const [currentProject, setCurrent] =
    useState<Project | null>(null);

  function addProject(project: Project) {
    setProjects((prev) => [project, ...prev]);

    setCurrent(project);
  }

  function deleteProject(id: string) {
    setProjects((prev) =>
      prev.filter((p) => p.id !== id)
    );

    setCurrent((prev) =>
      prev?.id === id ? null : prev
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

    setCurrent((prev) =>
      prev?.id === id
        ? {
            ...prev,
            title,
          }
        : prev
    );
  }

  function updateProject(
    id: string,
    data: Partial<Project>
  ) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...data,
            }
          : p
      )
    );

    setCurrent((prev) =>
      prev?.id === id
        ? {
            ...prev,
            ...data,
          }
        : prev
    );
  }

  function setCurrentProject(id: string) {
    const project = projects.find(
      (p) => p.id === id
    );

    if (project) {
      setCurrent(project);
    }
  }

  function clearProjects() {
    setProjects([]);
    setCurrent(null);
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        addProject,
        deleteProject,
        renameProject,
        updateProject,
        setCurrentProject,
        clearProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context =
    useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjects must be used inside ProjectProvider"
    );
  }

  return context;
}