import type { KeyResult } from "@/types";
import OKRProgressBar from "./OKRProgressBar";

interface KeyResultRowProps {
  kr: KeyResult;
}

export default function KeyResultRow({ kr }: KeyResultRowProps) {
  const percent =
    kr.target === 0
      ? 0
      : Math.round(Math.min(kr.current / kr.target, 1) * 100);

  return (
    <div className="flex items-center gap-4 py-2 rounded-md px-2 -mx-2 hover:bg-muted/50 transition-colors">
      <span className="flex-1 text-sm text-muted-foreground truncate">
        {kr.title}
      </span>
      <span className="text-xs text-muted-foreground/70 tabular-nums whitespace-nowrap">
        {kr.current}/{kr.target} {kr.unit}
      </span>
      <div className="w-20 shrink-0">
        <OKRProgressBar percent={percent} size="sm" />
      </div>
    </div>
  );
}
