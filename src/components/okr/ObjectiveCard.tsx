"use client";
import Link from "next/link";
import type { Objective } from "@/types";
import { useTagStore } from "@/stores/useTagStore";
import { calcProgress } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OKRProgressBar from "./OKRProgressBar";
import KeyResultRow from "./KeyResultRow";

interface ObjectiveCardProps {
  objective: Objective;
}

export default function ObjectiveCard({ objective }: ObjectiveCardProps) {
  const getTag = useTagStore((s) => s.getTag);
  const progress = calcProgress(objective.keyResults);

  return (
    <Card className="py-4 gap-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">
          <Link
            href={`/objectives/${objective.id}`}
            className="hover:text-primary/70 transition-colors"
          >
            {objective.title}
          </Link>
        </CardTitle>
        <CardAction>
          <span className="text-xs text-muted-foreground">{objective.owner}</span>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        <OKRProgressBar percent={progress} />

        {objective.keyResults.length > 0 && (
          <div className="pt-1">
            {objective.keyResults.map((kr) => (
              <KeyResultRow key={kr.id} kr={kr} />
            ))}
          </div>
        )}

        {objective.tagIds.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {objective.tagIds.map((tagId) => {
              const tag = getTag(tagId);
              return tag ? (
                <Badge key={tag.id} variant="secondary" className="text-xs font-normal">
                  {tag.label}
                </Badge>
              ) : null;
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
