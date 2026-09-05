import { cn } from "cn";

interface SectionDividerProps {
  /** Which background token the curve reveals — matches the section that follows it. */
  tone?: "background" | "card";
  variant?: "wave" | "blob";
  flip?: boolean;
  className?: string;
}

const PATHS: Record<NonNullable<SectionDividerProps["variant"]>, string> = {
  wave: "M0,64 C240,112 480,16 720,32 C960,48 1200,112 1440,64 L1440,120 L0,120 Z",
  blob: "M0,32 C180,96 360,112 600,72 C880,24 1040,88 1440,40 L1440,120 L0,120 Z",
};

/** Decorative SVG divider. Hidden from screen readers via aria-hidden. */
export function SectionDivider({
  tone = "background",
  variant = "wave",
  flip = false,
  className,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative h-12 w-full overflow-hidden md:h-20",
        flip && "rotate-180",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn(
          "absolute inset-0 h-full w-full",
          tone === "background" ? "fill-background" : "fill-card",
        )}
      >
        <path d={PATHS[variant]} />
      </svg>
    </div>
  );
}
