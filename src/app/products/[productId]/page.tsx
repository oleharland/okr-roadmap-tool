"use client";
import { use, useState } from "react";
import TopBar from "@/components/layout/TopBar";
import ObjectiveCard from "@/components/okr/ObjectiveCard";
import ObjectiveForm from "@/components/okr/ObjectiveForm";
import GanttChart from "@/components/roadmap/GanttChart";
import ProjectForm from "@/components/roadmap/ProjectForm";
import EmptyState from "@/components/shared/EmptyState";
import { useProductStore } from "@/stores/useProductStore";
import { useOKRStore } from "@/stores/useOKRStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { useQuarterStore } from "@/stores/useQuarterStore";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const product = useProductStore((s) => s.getProduct(productId));
  const activeQuarterId = useQuarterStore((s) => s.activeQuarterId);
  const getQuarter = useQuarterStore((s) => s.getQuarter);
  const getByProduct = useOKRStore((s) => s.getByProduct);
  const getProjectsByProduct = useProjectStore((s) => s.getByProduct);
  const [showObjForm, setShowObjForm] = useState(false);
  const [showProjForm, setShowProjForm] = useState(false);

  if (!product) {
    return (
      <>
        <TopBar title="Product not found" />
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-muted-foreground">This product does not exist.</p>
        </div>
      </>
    );
  }

  const objectives = getByProduct(productId).filter(
    (o) => o.quarterId === activeQuarterId
  );
  const projects = getProjectsByProduct(productId).filter(
    (p) => p.quarterId === activeQuarterId
  );
  const quarter = getQuarter(activeQuarterId);

  return (
    <>
      <TopBar title={product.name} breadcrumbs={[{ label: "Products" }]} />
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="okrs" className="w-full">
          <div className="border-b border-border px-6">
            <TabsList className="bg-transparent h-auto p-0 gap-6">
              <TabsTrigger
                value="okrs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm font-medium"
              >
                OKRs
              </TabsTrigger>
              <TabsTrigger
                value="roadmap"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm font-medium"
              >
                Roadmap
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="okrs" className="p-6 mt-0">
            <div className="flex justify-end mb-4">
              <Button size="sm" onClick={() => setShowObjForm(true)}>
                + Add Objective
              </Button>
            </div>
            {objectives.length === 0 ? (
              <EmptyState
                title="No objectives"
                description={`No objectives found for ${product.name} this quarter.`}
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {objectives.map((obj) => (
                  <ObjectiveCard key={obj.id} objective={obj} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="roadmap" className="p-6 mt-0">
            <div className="flex justify-end mb-4">
              <Button size="sm" onClick={() => setShowProjForm(true)}>
                + Add Project
              </Button>
            </div>
            {projects.length === 0 ? (
              <EmptyState
                title="No projects"
                description={`No roadmap projects found for ${product.name} this quarter.`}
              />
            ) : (
              <GanttChart
                projects={projects}
                quarterStart={quarter?.startDate ?? "2025-01-01"}
                quarterEnd={quarter?.endDate ?? "2025-03-31"}
              />
            )}
          </TabsContent>
        </Tabs>

        <ObjectiveForm
          open={showObjForm}
          onClose={() => setShowObjForm(false)}
          defaultProductId={productId}
        />
        <ProjectForm
          open={showProjForm}
          onClose={() => setShowProjForm(false)}
          defaultProductId={productId}
        />
      </div>
    </>
  );
}
