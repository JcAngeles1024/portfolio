import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/visuals/reveal";
import { CountUp } from "@/components/visuals/count-up";

const METRICS = [
  {
    value: 4,
    suffix: "",
    label: "production systems built & architected",
  },
  {
    value: 100,
    suffix: "M+",
    label: "records managed & optimized across databases",
  },
  {
    value: 6,
    suffix: "",
    label: "AI generation modes integrated",
  },
  {
    value: 2.5,
    suffix: "+ yrs",
    decimals: 1,
    label: "full-stack & backend engineering experience",
  },
];

export function MetricsBar() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-0">
            {METRICS.map((metric, i) => (
              <div
                key={metric.label}
                className="flex flex-col items-center border-border text-center md:items-start md:border-l md:pl-8 md:text-left"
                style={i === 0 ? { borderLeftWidth: 0, paddingLeft: 0 } : undefined}
              >
                <span className="font-mono text-4xl font-semibold text-foreground sm:text-5xl">
                  <CountUp
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals ?? 0}
                  />
                </span>
                <span className="mt-2 max-w-40 text-sm text-muted-foreground">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
