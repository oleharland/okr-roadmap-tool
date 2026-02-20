export interface Tag {
  id: string;
  label: string;
  color: string; // tailwind color class e.g. "blue", "green"
}

export interface Quarter {
  id: string;
  label: string; // e.g. "Q1 2025"
  startDate: string; // ISO date
  endDate: string; // ISO date
}

export interface Product {
  id: string;
  name: string;
  description: string;
  color: string; // tailwind color class
}

export interface KeyResult {
  id: string;
  objectiveId: string;
  title: string;
  current: number;
  target: number;
  unit: string; // e.g. "%", "users", "ms"
}

export type ObjectiveLevel = "company" | "product";

export interface Objective {
  id: string;
  title: string;
  description: string;
  level: ObjectiveLevel;
  productId?: string; // set when level === "product"
  quarterId: string;
  tagIds: string[];
  keyResults: KeyResult[];
  owner: string;
}

export interface OKRLinkTarget {
  objectiveId: string;
  keyResultId?: string; // optional — can link to objective or specific KR
}

export type ProjectStatus = "planned" | "in-progress" | "done" | "blocked";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  productId: string;
  quarterId: string;
  startDate?: string;
  endDate?: string;
  tagIds: string[];
  okrLinks: OKRLinkTarget[];
  owner: string;
}
