"use client";
import Link from "next/link";
import type { Project } from "@/types";
import { useTagStore } from "@/stores/useTagStore";
import { useOKRStore } from "@/stores/useOKRStore";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/shared/StatusBadge";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getTag = useTagStore((s) => s.getTag);
  const getObjective = useOKRStore((s) => s.getObjective);

  return (
    <Card className="py-3 gap-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{project.title}</CardTitle>
        <CardAction>
          <StatusBadge status={project.status} />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        {project.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}

        {project.okrLinks.length > 0 && (
          <div className="space-y-1">
            {project.okrLinks.map((link) => {
              const obj = getObjective(link.objectiveId);
              if (!obj) return null;
              return (
                <Link
                  key={link.objectiveId + (link.keyResultId || "")}
                  href={`/objectives/${link.objectiveId}`}
                  className="block text-xs text-primary hover:text-primary/70 truncate transition-colors"
                >
                  {obj.title}
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tagIds.map((tagId) => {
              const tag = getTag(tagId);
              return tag ? (
                <Badge key={tag.id} variant="secondary" className="text-xs font-normal">
                  {tag.label}
                </Badge>
              ) : null;
            })}
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{project.owner}</span>
        </div>

        {(project.startDate || project.endDate) && (
          <p className="text-xs text-muted-foreground/70">
            {project.startDate && new Date(project.startDate).toLocaleDateString()}
            {project.startDate && project.endDate && " — "}
            {project.endDate && new Date(project.endDate).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
