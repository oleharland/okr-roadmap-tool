"use client";
import { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import CompanyOKRGroup from "@/components/okr/CompanyOKRGroup";
import ObjectiveForm from "@/components/okr/ObjectiveForm";
import OKRProgressBar from "@/components/okr/OKRProgressBar";
import EmptyState from "@/components/shared/EmptyState";
import { useOKRStore } from "@/stores/useOKRStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { useQuarterStore } from "@/stores/useQuarterStore";
import { calcProgress, getAlignedProductObjectives } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const activeQuarterId = useQuarterStore((s) => s.activeQuarterId);
  const getCompanyObjectives = useOKRStore((s) => s.getCompanyObjectives);
  const getByQuarter = useOKRStore((s) => s.getByQuarter);
  const getLinkedToObjective = useProjectStore((s) => s.getLinkedToObjective);
  const [showForm, setShowForm] = useState(false);

  const companyObjectives = getCompanyObjectives(activeQuarterId);
  const allQuarterObjectives = getByQuarter(activeQuarterId);
  const productObjectives = allQuarterObjectives.filter(
    (o) => o.level === "product"
  );

  const totalObjectives = allQuarterObjectives.length;
  const totalKRs = allQuarterObjectives.reduce(
    (sum, o) => sum + o.keyResults.length,
    0
  );
  const avgProgress =
    allQuarterObjectives.length > 0
      ? Math.round(
          allQuarterObjectives.reduce(
            (sum, o) => sum + calcProgress(o.keyResults),
            0
          ) / allQuarterObjectives.length
        )
      : 0;

  // Calculate on-track vs at-risk key results
  const allKRs = allQuarterObjectives.flatMap((o) => o.keyResults);
  const onTrackKRs = allKRs.filter((kr) => {
    const pct = kr.target === 0 ? 0 : kr.current / kr.target;
    return pct >= 0.5;
  });
  const atRiskKRs = allKRs.filter((kr) => {
    const pct = kr.target === 0 ? 0 : kr.current / kr.target;
    return pct < 0.3;
  });

  const projects = useProjectStore((s) => s.projects);
  const totalProjects = projects.filter(
    (p) => p.quarterId === activeQuarterId
  ).length;

  return (
    <>
      <TopBar title="Dashboard" />
      <div className="flex-1 overflow-y-auto p-8">
        {/* ── Summary stats ────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <Card className="py-4 gap-0">
            <CardContent>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Objectives
              </p>
              <p className="text-2xl font-bold tracking-tight">
                {totalObjectives}
              </p>
            </CardContent>
          </Card>

          <Card className="py-4 gap-0">
            <CardContent>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Key Results
              </p>
              <p className="text-2xl font-bold tracking-tight">{totalKRs}</p>
            </CardContent>
          </Card>

          <Card className="py-4 gap-0">
            <CardContent>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Projects
              </p>
              <p className="text-2xl font-bold tracking-tight">
                {totalProjects}
              </p>
            </CardContent>
          </Card>

          <Card className="py-4 gap-0">
            <CardContent>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                On Track
              </p>
              <p className="text-2xl font-bold tracking-tight text-green-600">
                {onTrackKRs.length}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                of {allKRs.length} KRs
              </p>
            </CardContent>
          </Card>

          <Card className="py-4 gap-0">
            <CardContent>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1">
                At Risk
              </p>
              <p className="text-2xl font-bold tracking-tight text-red-600">
                {atRiskKRs.length}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                of {allKRs.length} KRs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ── Company OKR Overview Grid ────────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Company Objectives
          </h3>
          <Button size="sm" onClick={() => setShowForm(true)}>
            + Add Objective
          </Button>
        </div>

        {companyObjectives.length === 0 ? (
          <EmptyState
            title="No company objectives"
            description="Create your first company-level objective to get started."
          />
        ) : (
          <>
            {/* Overview cards — one per company objective */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-10">
              {companyObjectives.map((obj) => {
                const progress = calcProgress(obj.keyResults);
                const aligned = getAlignedProductObjectives(
                  obj,
                  productObjectives
                );
                const linked = getLinkedToObjective(obj.id);

                return (
                  <Card key={obj.id} className="py-5 gap-0">
                    <CardContent className="space-y-4">
                      <div>
                        <Link
                          href={`/objectives/${obj.id}`}
                          className="text-sm font-semibold hover:text-primary/70 transition-colors leading-snug"
                        >
                          {obj.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          {obj.owner}
                        </p>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Overall progress
                          </span>
                          <span className="text-xs font-semibold tabular-nums">
                            {progress}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Key results summary */}
                      <div className="space-y-1">
                        {obj.keyResults.map((kr) => {
                          const krPct =
                            kr.target === 0
                              ? 0
                              : Math.round(
                                  Math.min(kr.current / kr.target, 1) * 100
                                );
                          return (
                            <div
                              key={kr.id}
                              className="flex items-center gap-2"
                            >
                              <span
                                className={`size-1.5 rounded-full shrink-0 ${
                                  krPct >= 70
                                    ? "bg-green-500"
                                    : krPct >= 30
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                              <span className="text-xs text-muted-foreground truncate flex-1">
                                {kr.title}
                              </span>
                              <span className="text-[11px] tabular-nums text-muted-foreground/70 shrink-0">
                                {krPct}%
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Alignment badges */}
                      <div className="flex items-center gap-3 pt-1">
                        {aligned.length > 0 && (
                          <Badge variant="secondary" className="text-[11px]">
                            {aligned.length} aligned OKR
                            {aligned.length !== 1 ? "s" : ""}
                          </Badge>
                        )}
                        {linked.length > 0 && (
                          <Badge variant="outline" className="text-[11px]">
                            {linked.length} project
                            {linked.length !== 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* ── Detailed breakdown ───────────────────────── */}
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Detailed Breakdown
            </h3>
            <div className="space-y-8">
              {companyObjectives.map((obj) => (
                <CompanyOKRGroup
                  key={obj.id}
                  companyObjective={obj}
                  alignedProductObjectives={getAlignedProductObjectives(
                    obj,
                    productObjectives
                  )}
                  linkedProjects={getLinkedToObjective(obj.id)}
                />
              ))}
            </div>
          </>
        )}

        <ObjectiveForm open={showForm} onClose={() => setShowForm(false)} />
      </div>
    </>
  );
}
