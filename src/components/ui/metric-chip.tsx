import type { ReactNode } from "react";
import { cn } from "cn";

interface MetricChipProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/** Small mono-numeral pill used for project-card stats (e.g. "100M+ records"). */
export function MetricChip({ children, icon, className }: MetricChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
