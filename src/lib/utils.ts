import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { KeyResult, Objective, ProjectStatus } from "@/types";
import { STATUS_CONFIG } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calcProgress(keyResults: KeyResult[]): number {
  if (keyResults.length === 0) return 0;
  const total = keyResults.reduce((sum, kr) => {
    const progress = kr.target === 0 ? 0 : kr.current / kr.target;
    return sum + Math.min(progress, 1);
  }, 0);
  return Math.round((total / keyResults.length) * 100);
}

export function statusColor(status: ProjectStatus) {
  return STATUS_CONFIG[status];
}

export function getAlignedProductObjectives(
  companyObjective: Objective,
  allObjectives: Objective[]
): Objective[] {
  const companyTags = new Set(companyObjective.tagIds);
  return allObjectives.filter(
    (o) =>
      o.level === "product" && o.tagIds.some((tagId) => companyTags.has(tagId))
  );
}

