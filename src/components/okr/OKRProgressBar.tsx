"use client";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface OKRProgressBarProps {
  percent: number;
  size?: "sm" | "md";
}

export default function OKRProgressBar({
  percent,
  size = "md",
}: OKRProgressBarProps) {
  const clamped = Math.min(Math.max(percent, 0), 100);

  return (
    <div className="flex items-center gap-2">
      <Progress
        value={clamped}
        className={cn(size === "sm" ? "h-1" : "h-1.5")}
      />
      <span
        className={cn(
          "tabular-nums font-medium text-muted-foreground shrink-0",
          size === "sm" ? "text-[11px]" : "text-xs"
        )}
      >
        {clamped}%
      </span>
    </div>
  );
}
