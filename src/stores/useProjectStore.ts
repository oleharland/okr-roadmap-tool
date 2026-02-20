"use client";
import { create } from "zustand";
import type { Project } from "@/types";
import { mockProjects } from "@/data/mock-projects";

interface ProjectStore {
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  getByProduct: (productId: string) => Project[];
  getByQuarter: (quarterId: string) => Project[];
  getLinkedToObjective: (objectiveId: string) => Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: mockProjects,

  getProject: (id) => get().projects.find((p) => p.id === id),

  getByProduct: (productId) =>
    get().projects.filter((p) => p.productId === productId),

  getByQuarter: (quarterId) =>
    get().projects.filter((p) => p.quarterId === quarterId),

  getLinkedToObjective: (objectiveId) =>
    get().projects.filter((p) =>
      p.okrLinks.some((link) => link.objectiveId === objectiveId)
    ),

  addProject: (project) =>
    set((s) => ({ projects: [...s.projects, project] })),

  updateProject: (id, updates) =>
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),

  deleteProject: (id) =>
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
}));
