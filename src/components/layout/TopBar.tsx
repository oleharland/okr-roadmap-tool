"use client";
import { useQuarterStore } from "@/stores/useQuarterStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TopBarProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function TopBar({ title, breadcrumbs }: TopBarProps) {
  const { quarters, activeQuarterId, setActiveQuarter } = useQuarterStore();

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs?.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {crumb.href ? (
              <a href={crumb.href} className="text-muted-foreground hover:text-foreground">
                {crumb.label}
              </a>
            ) : (
              <span className="text-muted-foreground">{crumb.label}</span>
            )}
            <span className="text-neutral-300">/</span>
          </span>
        ))}
        <h2 className="text-foreground font-semibold">{title}</h2>
      </div>

      <Select value={activeQuarterId} onValueChange={setActiveQuarter}>
        <SelectTrigger className="w-[130px] h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {quarters.map((q) => (
            <SelectItem key={q.id} value={q.id}>
              {q.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  );
}
