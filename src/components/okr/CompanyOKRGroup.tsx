"use client";
import type { Objective, Project } from "@/types";
import ObjectiveCard from "./ObjectiveCard";
import ProjectCard from "@/components/roadmap/ProjectCard";

interface CompanyOKRGroupProps {
  companyObjective: Objective;
  alignedProductObjectives: Objective[];
  linkedProjects: Project[];
}

export default function CompanyOKRGroup({
  companyObjective,
  alignedProductObjectives,
  linkedProjects,
}: CompanyOKRGroupProps) {
  return (
    <section className="space-y-3">
      <ObjectiveCard objective={companyObjective} />

      {alignedProductObjectives.length > 0 && (
        <div className="ml-10 space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Aligned Product OKRs
          </p>
          <div className="space-y-3">
            {alignedProductObjectives.map((obj) => (
              <ObjectiveCard key={obj.id} objective={obj} />
            ))}
          </div>
        </div>
      )}

      {linkedProjects.length > 0 && (
        <div className="ml-10 space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Linked Projects
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {linkedProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
