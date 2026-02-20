"use client";
import type { Project, ProjectStatus } from "@/types";
import { useProjectStore } from "@/stores/useProjectStore";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttTimeline,
  GanttHeader,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttFeatureItem,
  GanttToday,
  type GanttFeature,
} from "@/components/kibo-ui/gantt";

interface GanttChartProps {
  projects: Project[];
  quarterStart: string;
  quarterEnd: string;
}

const STATUS_COLORS: Record<ProjectStatus, string> = {
  "in-progress": "#6366f1", // primary/indigo
  planned: "#a3a3a3", // neutral
  done: "#22c55e", // green
  blocked: "#ef4444", // red
};

const STATUS_ORDER: Record<ProjectStatus, number> = {
  "in-progress": 0,
  planned: 1,
  blocked: 2,
  done: 3,
};

const STATUS_LABELS: Record<ProjectStatus, string> = {
  "in-progress": "In Progress",
  planned: "Planned",
  done: "Done",
  blocked: "Blocked",
};

function projectToFeature(project: Project): GanttFeature {
  const qStart = new Date();
  const startDate = project.startDate
    ? new Date(project.startDate)
    : qStart;
  const endDate = project.endDate
    ? new Date(project.endDate)
    : new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // default 30 days

  return {
    id: project.id,
    name: project.title,
    startAt: startDate,
    endAt: endDate,
    status: {
      id: project.status,
      name: STATUS_LABELS[project.status],
      color: STATUS_COLORS[project.status],
    },
  };
}

export default function GanttChart({
  projects,
}: GanttChartProps) {
  const updateProject = useProjectStore((s) => s.updateProject);

  // Group projects by status
  const grouped = projects.reduce(
    (acc, project) => {
      const status = project.status;
      if (!acc[status]) acc[status] = [];
      acc[status].push(project);
      return acc;
    },
    {} as Record<ProjectStatus, Project[]>
  );

  // Order the groups
  const orderedStatuses = (
    Object.keys(grouped) as ProjectStatus[]
  ).sort((a, b) => STATUS_ORDER[a] - STATUS_ORDER[b]);

  function handleMove(id: string, startDate: Date, endDate: Date | null) {
    updateProject(id, {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate ? endDate.toISOString().split("T")[0] : undefined,
    });
  }

  return (
    <div className="space-y-3">
      {/* Legend */}
      <div className="flex gap-3">
        {(["in-progress", "planned", "done", "blocked"] as const).map((s) => (
          <StatusBadge key={s} status={s} />
        ))}
      </div>

      {/* Kibo UI Gantt */}
      <GanttProvider range="monthly" zoom={100} className="h-[500px] rounded-lg border border-border">
        <GanttSidebar>
          {orderedStatuses.map((status) => (
            <GanttSidebarGroup key={status} name={STATUS_LABELS[status]}>
              {grouped[status].map((project) => (
                <GanttSidebarItem
                  key={project.id}
                  feature={projectToFeature(project)}
                />
              ))}
            </GanttSidebarGroup>
          ))}
        </GanttSidebar>
        <GanttTimeline>
          <GanttHeader />
          <GanttFeatureList>
            {orderedStatuses.map((status) => (
              <GanttFeatureListGroup key={status}>
                {grouped[status].map((project) => {
                  const feature = projectToFeature(project);
                  return (
                    <GanttFeatureItem
                      key={feature.id}
                      {...feature}
                      onMove={handleMove}
                    >
                      <div
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: STATUS_COLORS[project.status] }}
                      />
                      <p className="flex-1 truncate text-xs">{project.title}</p>
                    </GanttFeatureItem>
                  );
                })}
              </GanttFeatureListGroup>
            ))}
          </GanttFeatureList>
          <GanttToday />
        </GanttTimeline>
      </GanttProvider>
    </div>
  );
}
