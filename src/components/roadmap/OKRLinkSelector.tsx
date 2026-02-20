"use client";
import type { OKRLinkTarget } from "@/types";
import { useOKRStore } from "@/stores/useOKRStore";
import { useQuarterStore } from "@/stores/useQuarterStore";
import { Checkbox } from "@/components/ui/checkbox";

interface OKRLinkSelectorProps {
  value: OKRLinkTarget[];
  onChange: (links: OKRLinkTarget[]) => void;
}

export default function OKRLinkSelector({
  value,
  onChange,
}: OKRLinkSelectorProps) {
  const activeQuarterId = useQuarterStore((s) => s.activeQuarterId);
  const getByQuarter = useOKRStore((s) => s.getByQuarter);
  const objectives = getByQuarter(activeQuarterId);

  function isLinked(objectiveId: string) {
    return value.some((link) => link.objectiveId === objectiveId);
  }

  function toggleObjective(objectiveId: string) {
    if (isLinked(objectiveId)) {
      onChange(value.filter((link) => link.objectiveId !== objectiveId));
    } else {
      onChange([...value, { objectiveId }]);
    }
  }

  return (
    <div className="space-y-1 max-h-48 overflow-y-auto">
      {objectives.length === 0 && (
        <p className="text-xs text-muted-foreground">No objectives this quarter.</p>
      )}
      {objectives.map((obj) => (
        <label
          key={obj.id}
          className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
        >
          <Checkbox
            checked={isLinked(obj.id)}
            onCheckedChange={() => toggleObjective(obj.id)}
          />
          <span className="text-sm truncate">{obj.title}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {obj.level === "company" ? "Company" : "Product"}
          </span>
        </label>
      ))}
    </div>
  );
}
