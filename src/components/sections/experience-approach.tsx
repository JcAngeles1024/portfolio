import { Database, Layers, Webhook } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/visuals/reveal";
import { SectionDivider } from "@/components/visuals/section-divider";

const TIMELINE = [
  { label: "Software Engineering Intern / OJT" },
  { label: "Full-Time Software Engineer", sub: "Present" },
];

const PILLARS = [
  {
    icon: Database,
    title: "Database & Data Modeling",
    description:
      "I prioritize clean schema normalization, intentional indexing, and query plan profiling. I rely on tools like EXPLAIN to ensure queries stay efficient, and only denormalize hot read paths when actual production measurements justify the trade-off.",
    tag: "MySQL & Query Optimization",
  },
  {
    icon: Webhook,
    title: "API Design & Integration",
    description:
      "I build APIs with clear request/response contracts, predictable error handling, and consistent data structures so web, mobile, and desktop clients can interact smoothly with shared backend logic.",
    tag: "REST & Realtime WebSockets",
  },
  {
    icon: Layers,
    title: "Maintainable Code & Team Collaboration",
    description:
      "I believe great software is code another engineer can pick up, understand, and build upon without friction. I organize service and data access layers cleanly and keep patterns consistent across the project.",
    tag: "Clean Architecture & Documentation",
  },
];

export function ExperienceApproach() {
  return (
    <section id="approach" className="relative">
      <SectionDivider tone="background" />
      <Container className="grid gap-12 pt-4 pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <p className="font-mono text-xs tracking-wider text-brand-teal uppercase">
              Experience &amp; Approach
            </p>
            <h2 className="mt-3 text-section font-heading font-semibold text-foreground">
              How I approach building software
            </h2>
            <p className="mt-4 text-muted-foreground">
              Practical engineering decisions focused on reliability, performance, and code that is straightforward to maintain.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {TIMELINE.map((stage) => (
                <div
                  key={stage.label}
                  className="flex items-center justify-between rounded-full border border-border bg-card px-4 py-2.5 shadow-xs"
                >
                  <span className="text-sm font-medium text-foreground">
                    {stage.label}
                  </span>
                  {stage.sub && (
                    <span className="font-mono text-xs text-brand-teal">
                      {stage.sub}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-sm text-muted-foreground">
              2.5+ years building full-stack &amp; backend systems
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-5">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="rounded-card border border-border bg-card p-6 shadow-xs transition-colors hover:border-brand/30">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <pillar.icon className="size-4" />
                  </span>
                  <h3 className="font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
                <span className="mt-4 inline-block rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {pillar.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
