"use client";
import { use, useState } from "react";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import OKRProgressBar from "@/components/okr/OKRProgressBar";
import KeyResultForm from "@/components/okr/KeyResultForm";
import TagChip from "@/components/shared/TagChip";
import StatusBadge from "@/components/shared/StatusBadge";
import { useOKRStore } from "@/stores/useOKRStore";
import { useTagStore } from "@/stores/useTagStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { useProductStore } from "@/stores/useProductStore";
import { calcProgress } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function ObjectiveDetailPage({
  params,
}: {
  params: Promise<{ objectiveId: string }>;
}) {
  const { objectiveId } = use(params);
  const objective = useOKRStore((s) => s.getObjective(objectiveId));
  const updateKeyResult = useOKRStore((s) => s.updateKeyResult);
  const getTag = useTagStore((s) => s.getTag);
  const getLinkedProjects = useProjectStore((s) => s.getLinkedToObjective);
  const getProduct = useProductStore((s) => s.getProduct);
  const [showKRForm, setShowKRForm] = useState(false);

  if (!objective) {
    return (
      <>
        <TopBar title="Objective not found" />
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-muted-foreground">This objective does not exist.</p>
        </div>
      </>
    );
  }

  const progress = calcProgress(objective.keyResults);
  const linkedProjects = getLinkedProjects(objectiveId);
  const product = objective.productId
    ? getProduct(objective.productId)
    : undefined;

  const breadcrumbs = product
    ? [
        { label: "Products" },
        { label: product.name, href: `/products/${product.id}` },
      ]
    : [{ label: "Dashboard", href: "/" }];

  return (
    <>
      <TopBar title={objective.title} breadcrumbs={breadcrumbs} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium uppercase text-muted-foreground">
                {objective.level === "company" ? "Company" : "Product"} Objective
              </span>
              <span className="text-xs text-muted-foreground">
                Owner: {objective.owner}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{objective.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {objective.tagIds.map((tagId) => {
                const tag = getTag(tagId);
                return tag ? (
                  <TagChip key={tag.id} label={tag.label} color={tag.color} />
                ) : null;
              })}
            </div>
          </div>

          {/* Overall progress */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-2">
              Overall Progress
            </h3>
            <OKRProgressBar percent={progress} />
          </div>

          {/* Key Results with sliders */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">
                Key Results
              </h3>
              <Button size="sm" onClick={() => setShowKRForm(true)}>
                + Add Key Result
              </Button>
            </div>
            <div className="space-y-4">
              {objective.keyResults.map((kr) => {
                const krPercent =
                  kr.target === 0
                    ? 0
                    : Math.round(Math.min(kr.current / kr.target, 1) * 100);

                return (
                  <div
                    key={kr.id}
                    className="bg-background border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {kr.title}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {kr.current} / {kr.target} {kr.unit}
                      </span>
                    </div>
                    <OKRProgressBar percent={krPercent} size="sm" />
                    <Slider
                      min={0}
                      max={kr.target}
                      step={1}
                      value={[kr.current]}
                      onValueChange={([val]) =>
                        updateKeyResult(objectiveId, kr.id, {
                          current: val,
                        })
                      }
                      className="mt-3"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Linked Projects */}
          {linkedProjects.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-4">
                Linked Projects
              </h3>
              <div className="space-y-2">
                {linkedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between bg-background border border-border rounded-lg p-3"
                  >
                    <div>
                      <Link
                        href={`/products/${project.productId}`}
                        className="text-sm font-medium hover:text-primary"
                      >
                        {project.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <KeyResultForm
            open={showKRForm}
            onClose={() => setShowKRForm(false)}
            objectiveId={objectiveId}
          />
        </div>
      </div>
    </>
  );
}
