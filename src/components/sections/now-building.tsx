import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/visuals/reveal";

const NOW_BUILDING_TEXT =
  "Building full-stack web & mobile features, refining real-time tracking systems, and exploring modern developer tools.";

export function NowBuilding() {
  return (
    <section className="pb-8">
      <Container>
        <Reveal>
          <div className="mx-auto flex w-fit max-w-full items-center gap-3 rounded-full border border-border bg-card/60 px-5 py-2.5">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
            </span>
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Now: </span>
              {NOW_BUILDING_TEXT}
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
