"use client";
import { create } from "zustand";
import type { Quarter } from "@/types";
import { QUARTER_LIST, DEFAULT_QUARTER_ID } from "@/lib/constants";

interface QuarterStore {
  quarters: Quarter[];
  activeQuarterId: string;
  setActiveQuarter: (id: string) => void;
  getQuarter: (id: string) => Quarter | undefined;
}

export const useQuarterStore = create<QuarterStore>((set, get) => ({
  quarters: QUARTER_LIST,
  activeQuarterId: DEFAULT_QUARTER_ID,
  setActiveQuarter: (id) => set({ activeQuarterId: id }),
  getQuarter: (id) => get().quarters.find((q) => q.id === id),
}));
