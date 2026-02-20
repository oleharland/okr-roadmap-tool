"use client";
import Link from "next/link";
import type { Tag, Objective } from "@/types";
import { useProductStore } from "@/stores/useProductStore";
import { calcProgress } from "@/lib/utils";
import OKRProgressBar from "@/components/okr/OKRProgressBar";

interface AlignmentGridProps {
  tags: Tag[];
  objectives: Objective[];
  selectedTagIds: string[];
}

export default function AlignmentGrid({
  tags,
  objectives,
  selectedTagIds,
}: AlignmentGridProps) {
  const products = useProductStore((s) => s.products);

  const filteredTags =
    selectedTagIds.length > 0
      ? tags.filter((t) => selectedTagIds.includes(t.id))
      : tags;

  // Group objectives: company + by product
  const companyObjectives = objectives.filter((o) => o.level === "company");
  const groups = [
    { label: "Company", objectives: companyObjectives },
    ...products.map((p) => ({
      label: p.name,
      objectives: objectives.filter((o) => o.productId === p.id),
    })),
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-2 pr-4 text-xs font-semibold uppercase text-neutral-500 w-40">
              Group
            </th>
            {filteredTags.map((tag) => (
              <th
                key={tag.id}
                className="text-left py-2 px-3 text-xs font-semibold uppercase text-neutral-500"
              >
                {tag.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.label} className="border-b border-neutral-100">
              <td className="py-3 pr-4 font-medium text-neutral-900">
                {group.label}
              </td>
              {filteredTags.map((tag) => {
                const matching = group.objectives.filter((o) =>
                  o.tagIds.includes(tag.id)
                );
                return (
                  <td key={tag.id} className="py-3 px-3 align-top">
                    {matching.length > 0 ? (
                      <div className="space-y-2">
                        {matching.map((obj) => (
                          <div
                            key={obj.id}
                            className="bg-neutral-50 rounded p-2"
                          >
                            <Link
                              href={`/objectives/${obj.id}`}
                              className="text-xs font-medium text-neutral-900 hover:text-primary-600 block truncate"
                            >
                              {obj.title}
                            </Link>
                            <div className="mt-1">
                              <OKRProgressBar
                                percent={calcProgress(obj.keyResults)}
                                size="sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-300">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
