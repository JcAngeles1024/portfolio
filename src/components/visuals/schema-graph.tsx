"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Cpu, Database, Layout, Server } from "lucide-react";

interface StackNode {
  id: string;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  icon: typeof Layout;
}

const NODES: StackNode[] = [
  {
    id: "frontend",
    title: "Frontend & UI",
    subtitle: "Angular • Vue • Next.js • React Native",
    x: 24,
    y: 22,
    icon: Layout,
  },
  {
    id: "backend",
    title: "Backend & APIs",
    subtitle: "Laravel • NestJS • Node.js • REST",
    x: 74,
    y: 18,
    icon: Server,
  },
  {
    id: "ai_desktop",
    title: "Desktop & AI",
    subtitle: "Electron • .NET • AI Assistant",
    x: 78,
    y: 72,
    icon: Cpu,
  },
  {
    id: "database",
    title: "Database & Data",
    subtitle: "MySQL • Relational Schema",
    x: 24,
    y: 78,
    icon: Database,
  },
];

const EDGES: [string, string][] = [
  ["frontend", "backend"],
  ["backend", "ai_desktop"],
  ["ai_desktop", "database"],
  ["database", "frontend"],
  ["backend", "database"],
];

/** Interactive full-stack flow diagram; nodes are draggable with spring physics. */
export function SchemaGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="relative mx-auto w-full max-w-95">
      <div
        ref={containerRef}
        className="glass-panel relative aspect-square w-full overflow-hidden rounded-panel"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {EDGES.map(([a, b], i) => {
            const na = nodeMap[a];
            const nb = nodeMap[b];
            return (
              <g key={`${a}-${b}`}>
                <line
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="var(--border)"
                  strokeWidth={0.5}
                />
                <motion.circle
                  cx={na.x}
                  cy={na.y}
                  r={1.2}
                  fill="var(--color-brand-teal)"
                  initial={{ cx: na.x, cy: na.y }}
                  animate={{ cx: [na.x, nb.x, na.x], cy: [na.y, nb.y, na.y] }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {NODES.map((node) => (
          <motion.div
            key={node.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.3}
            dragSnapToOrigin
            whileDrag={{ scale: 1.05, zIndex: 20 }}
            style={{ left: `${node.x}%`, top: `${node.y}%`, translate: "-50% -50%" }}
            className="absolute z-10 flex w-32 cursor-grab flex-col rounded-xl border border-border bg-card/95 p-2 shadow-elevated backdrop-blur-sm active:cursor-grabbing sm:w-36"
          >
            <div className="flex items-center gap-1.5">
              <node.icon className="size-3.5 shrink-0 text-brand" />
              <span className="truncate text-xs font-semibold text-foreground">
                {node.title}
              </span>
            </div>
            <span className="mt-0.5 truncate font-mono text-[9.5px] text-muted-foreground">
              {node.subtitle}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Interactive instruction badge */}
      <div className="bg-card/95 border border-border p-2 shadow-elevated backdrop-blur-sm absolute -right-2 -bottom-4 z-20 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:-right-4">
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
        </span>
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold text-foreground">
            Full-Stack Architecture
          </span>
        </div>
      </div>
    </div>
  );
}
