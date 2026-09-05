import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/visuals/reveal";
import { SectionDivider } from "@/components/visuals/section-divider";
import { ProjectCard } from "@/components/sections/project-card";
import { getAllProjects } from "@/lib/projects";

export function ProjectsShowcase() {
  const projects = getAllProjects();

  return (
    <section id="projects" className="relative bg-card">
      <SectionDivider tone="card" />
      <Container className="pt-4 pb-24">
        <Reveal>
          <p className="font-mono text-xs tracking-wider text-brand-teal uppercase">
            Featured Projects
          </p>
          <h2 className="mt-3 text-section font-heading font-semibold text-foreground">
            Featured Work &amp; Technical Highlights
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A selection of projects where I owned backend architecture, database optimization, desktop systems, and generative AI pipelines.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.frontmatter.slug} delay={i * 0.08}>
              <ProjectCard
                slug={project.frontmatter.slug}
                title={project.frontmatter.title}
                oneLiner={project.frontmatter.oneLiner}
                tags={project.frontmatter.tags}
                metrics={project.frontmatter.metrics}
                accentColor={project.frontmatter.accentColor}
                links={project.frontmatter.links}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
