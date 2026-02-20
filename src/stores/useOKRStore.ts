"use client";
import { create } from "zustand";
import type { Objective, KeyResult } from "@/types";
import { mockObjectives } from "@/data/mock-objectives";

interface OKRStore {
  objectives: Objective[];
  getObjective: (id: string) => Objective | undefined;
  getByQuarter: (quarterId: string) => Objective[];
  getByProduct: (productId: string) => Objective[];
  getCompanyObjectives: (quarterId: string) => Objective[];
  addObjective: (objective: Objective) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  deleteObjective: (id: string) => void;
  addKeyResult: (objectiveId: string, kr: KeyResult) => void;
  updateKeyResult: (
    objectiveId: string,
    krId: string,
    updates: Partial<KeyResult>
  ) => void;
  deleteKeyResult: (objectiveId: string, krId: string) => void;
}

export const useOKRStore = create<OKRStore>((set, get) => ({
  objectives: mockObjectives,

  getObjective: (id) => get().objectives.find((o) => o.id === id),

  getByQuarter: (quarterId) =>
    get().objectives.filter((o) => o.quarterId === quarterId),

  getByProduct: (productId) =>
    get().objectives.filter((o) => o.productId === productId),

  getCompanyObjectives: (quarterId) =>
    get().objectives.filter(
      (o) => o.level === "company" && o.quarterId === quarterId
    ),

  addObjective: (objective) =>
    set((s) => ({ objectives: [...s.objectives, objective] })),

  updateObjective: (id, updates) =>
    set((s) => ({
      objectives: s.objectives.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
    })),

  deleteObjective: (id) =>
    set((s) => ({ objectives: s.objectives.filter((o) => o.id !== id) })),

  addKeyResult: (objectiveId, kr) =>
    set((s) => ({
      objectives: s.objectives.map((o) =>
        o.id === objectiveId
          ? { ...o, keyResults: [...o.keyResults, kr] }
          : o
      ),
    })),

  updateKeyResult: (objectiveId, krId, updates) =>
    set((s) => ({
      objectives: s.objectives.map((o) =>
        o.id === objectiveId
          ? {
              ...o,
              keyResults: o.keyResults.map((kr) =>
                kr.id === krId ? { ...kr, ...updates } : kr
              ),
            }
          : o
      ),
    })),

  deleteKeyResult: (objectiveId, krId) =>
    set((s) => ({
      objectives: s.objectives.map((o) =>
        o.id === objectiveId
          ? { ...o, keyResults: o.keyResults.filter((kr) => kr.id !== krId) }
          : o
      ),
    })),
}));
