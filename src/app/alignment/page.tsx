"use client";
import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import AlignmentGrid from "@/components/alignment/AlignmentGrid";
import TagChip from "@/components/shared/TagChip";
import { useTagStore } from "@/stores/useTagStore";
import { useOKRStore } from "@/stores/useOKRStore";
import { useQuarterStore } from "@/stores/useQuarterStore";
import { cn } from "@/lib/utils";

export default function AlignmentPage() {
  const tags = useTagStore((s) => s.tags);
  const activeQuarterId = useQuarterStore((s) => s.activeQuarterId);
  const getByQuarter = useOKRStore((s) => s.getByQuarter);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const objectives = getByQuarter(activeQuarterId);

  function toggleTag(tagId: string) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  }

  return (
    <>
      <TopBar title="Alignment" />
      <div className="flex-1 overflow-y-auto p-6">
        {/* Tag filter */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase text-neutral-500 tracking-wider mb-2">
            Filter by Tag
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={cn(
                  "transition-opacity",
                  selectedTagIds.length > 0 &&
                    !selectedTagIds.includes(tag.id) &&
                    "opacity-40"
                )}
              >
                <TagChip label={tag.label} color={tag.color} />
              </button>
            ))}
            {selectedTagIds.length > 0 && (
              <button
                onClick={() => setSelectedTagIds([])}
                className="text-xs text-neutral-500 hover:text-neutral-700 underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <AlignmentGrid
          tags={tags}
          objectives={objectives}
          selectedTagIds={selectedTagIds}
        />
      </div>
    </>
  );
}
