"use client";
import { create } from "zustand";
import type { Tag } from "@/types";
import { mockTags } from "@/data/mock-tags";

interface TagStore {
  tags: Tag[];
  getTag: (id: string) => Tag | undefined;
  addTag: (tag: Tag) => void;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
}

export const useTagStore = create<TagStore>((set, get) => ({
  tags: mockTags,
  getTag: (id) => get().tags.find((t) => t.id === id),
  addTag: (tag) => set((s) => ({ tags: [...s.tags, tag] })),
  updateTag: (id, updates) =>
    set((s) => ({
      tags: s.tags.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  deleteTag: (id) => set((s) => ({ tags: s.tags.filter((t) => t.id !== id) })),
}));
