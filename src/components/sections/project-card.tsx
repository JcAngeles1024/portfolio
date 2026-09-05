"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { MetricChip } from "@/components/ui/metric-chip";
import type { ProjectAccentColor, ProjectFrontmatter } from "@/lib/validations";

interface ProjectCardProps {
  slug: string;
  title: string;
  oneLiner: string;
  tags: string[];
  metrics: string[];
  accentColor: ProjectAccentColor;
  links?: ProjectFrontmatter["links"];
}

/** Static Tailwind class strings per accent so the JIT compiler can see and generate them. */
const ACCENT = {
  indigo: {
    text: "text-brand",
    washBg: "bg-brand/20",
    glow: "group-hover:shadow-glow-lg",
  },
  teal: {
    text: "text-brand-teal",
    washBg: "bg-brand-teal/20",
    glow: "group-hover:shadow-glow-teal",
  },
  violet: {
    text: "text-violet-400",
    washBg: "bg-violet-400/20",
    glow: "group-hover:shadow-[0_0_48px_rgb(167_139_250_/_0.35)]",
  },
  amber: {
    text: "text-brand-amber",
    washBg: "bg-brand-amber/20",
    glow: "group-hover:shadow-[0_0_40px_rgb(245_185_66_/_0.3)]",
  },
} satisfies Record<ProjectAccentColor, { text: string; washBg: string; glow: string }>;

export function ProjectCard({
  slug,
  title,
  oneLiner,
  tags,
  metrics,
  accentColor,
  links,
}: ProjectCardProps) {
  const accent = ACCENT[accentColor];

  // Collect all available external links to feature on the card.
  const externalLinks: { href: string; label: string }[] = [];
  if (links) {
    if (links.live) externalLinks.push({ href: links.live, label: "Live Site" });
    if (links.staging) externalLinks.push({ href: links.staging, label: "Staging" });
    if (links.download) externalLinks.push({ href: links.download, label: "App Page" });
    if (links.appStore) externalLinks.push({ href: links.appStore, label: "App Store" });
    if (links.playStore) externalLinks.push({ href: links.playStore, label: "Google Play" });
    if (links.repo) externalLinks.push({ href: links.repo, label: "Repository" });
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card p-7 shadow-elevated transition-shadow duration-300",
        accent.glow,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-10 -right-10 size-40 rounded-full blur-3xl",
          accent.washBg,
        )}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-4 text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{oneLiner}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <MetricChip key={metric}>{metric}</MetricChip>
          ))}
        </div>

        <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/projects/${slug}`}
            className={cn(
              "group/link inline-flex shrink-0 items-center gap-1.5 text-sm font-medium",
              accent.text,
            )}
          >
            View project details
            <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>

          {externalLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight className="size-3" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
