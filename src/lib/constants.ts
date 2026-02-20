import type { ProjectStatus } from "@/types";

export const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; color: string; bg: string }
> = {
  planned: { label: "Planned", color: "text-neutral-600", bg: "bg-neutral-100" },
  "in-progress": {
    label: "In Progress",
    color: "text-primary-700",
    bg: "bg-primary-100",
  },
  done: { label: "Done", color: "text-green-700", bg: "bg-green-100" },
  blocked: { label: "Blocked", color: "text-red-700", bg: "bg-red-100" },
};

export const QUARTER_LIST = [
  {
    id: "q1-2025",
    label: "Q1 2025",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
  },
  {
    id: "q2-2025",
    label: "Q2 2025",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
  },
  {
    id: "q3-2025",
    label: "Q3 2025",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
  },
  {
    id: "q4-2025",
    label: "Q4 2025",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
  },
];

export const DEFAULT_QUARTER_ID = "q1-2025";

