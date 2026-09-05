import {
  LaravelIcon,
  MysqlIcon,
  NodejsIcon,
  NestjsIcon,
  TypescriptIcon,
  JavascriptIcon,
  AngularIcon,
  VueIcon,
  ReactIcon,
  NextjsIcon,
  ElectronIcon,
  DotnetIcon,
  PythonIcon,
  PhpIcon,
  TailwindIcon,
} from "@/components/icons/tech-icons";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/visuals/reveal";

const TECH_ITEMS = [
  { name: "Laravel", category: "Backend", icon: LaravelIcon, color: "text-[#FF2D20]" },
  { name: "Nest.js", category: "Backend", icon: NestjsIcon, color: "text-[#E0234E]" },
  { name: "Node.js", category: "Backend", icon: NodejsIcon, color: "text-[#5FA04E]" },
  { name: "MySQL", category: "Database", icon: MysqlIcon, color: "text-[#4479A1]" },
  { name: "Angular", category: "Frontend", icon: AngularIcon, color: "text-[#DD0031]" },
  { name: "Vue.js", category: "Frontend", icon: VueIcon, color: "text-[#4FC08D]" },
  { name: "React / Native", category: "Frontend", icon: ReactIcon, color: "text-[#61DAFB]" },
  { name: "Next.js", category: "Framework", icon: NextjsIcon, color: "text-foreground" },
  { name: "TypeScript", category: "Language", icon: TypescriptIcon, color: "text-[#3178C6]" },
  { name: "JavaScript", category: "Language", icon: JavascriptIcon, color: "text-[#F7DF1E]" },
  { name: "Python", category: "Language", icon: PythonIcon, color: "text-[#3776AB]" },
  { name: "PHP", category: "Language", icon: PhpIcon, color: "text-[#777BB4]" },
  { name: ".NET / C#", category: "Runtime / Desktop", icon: DotnetIcon, color: "text-[#512BD4]" },
  { name: "Electron", category: "Desktop", icon: ElectronIcon, color: "text-[#9FEAF9]" },
  { name: "Tailwind CSS", category: "Styling", icon: TailwindIcon, color: "text-[#06B6D4]" },
];

export function TechStack() {
  return (
    <section className="relative pt-6 pb-12">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <p className="font-mono text-xs font-semibold tracking-wider text-brand-teal uppercase">
              Core Technologies &amp; Frameworks
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {TECH_ITEMS.map((item) => (
              <div
                key={item.name}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-card hover:shadow-md"
              >
                <item.icon className={`size-5 shrink-0 transition-transform group-hover:scale-110 ${item.color}`} />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
