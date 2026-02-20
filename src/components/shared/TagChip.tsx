"use client";
import { cn } from "@/lib/utils";

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  green: { bg: "bg-green-100", text: "text-green-700" },
  blue: { bg: "bg-primary-100", text: "text-primary-700" },
  purple: { bg: "bg-violet-100", text: "text-violet-700" },
  orange: { bg: "bg-orange-100", text: "text-orange-700" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-700" },
  red: { bg: "bg-red-100", text: "text-red-700" },
  gray: { bg: "bg-neutral-100", text: "text-neutral-700" },
};

interface TagChipProps {
  label: string;
  color: string;
  onRemove?: () => void;
}

export default function TagChip({ label, color, onRemove }: TagChipProps) {
  const colors = COLOR_MAP[color] || COLOR_MAP.gray;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        colors.bg,
        colors.text
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:opacity-70 ml-0.5"
          aria-label={`Remove ${label}`}
        >
          &times;
        </button>
      )}
    </span>
  );
}
