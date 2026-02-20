"use client";
import type { ProjectStatus } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DOT_COLORS: Record<ProjectStatus, string> = {
  planned: "bg-neutral-400",
  "in-progress": "bg-primary-500",
  done: "bg-green-500",
  blocked: "bg-red-500",
};

interface StatusBadgeProps {
  status: ProjectStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant="secondary" className="gap-1.5 font-normal text-xs">
      <span className={cn("size-1.5 rounded-full", DOT_COLORS[status])} />
      {config.label}
    </Badge>
  );
}
