"use client";
import type { Project, ProjectStatus } from "@/types";
import { STATUS_CONFIG } from "@/lib/constants";
import ProjectCard from "./ProjectCard";

interface BoardViewProps {
  projects: Project[];
}

const COLUMNS: ProjectStatus[] = ["planned", "in-progress", "done", "blocked"];

export default function BoardView({ projects }: BoardViewProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {COLUMNS.map((status) => {
        const columnProjects = projects.filter((p) => p.status === status);
        const config = STATUS_CONFIG[status];

        return (
          <div key={status} className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-sm font-medium ${config.color}`}>
                {config.label}
              </span>
              <span className="text-xs text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded-full">
                {columnProjects.length}
              </span>
            </div>
            <div className="space-y-3 flex-1">
              {columnProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
