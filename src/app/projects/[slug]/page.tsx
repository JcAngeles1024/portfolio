import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MetricChip } from "@/components/ui/metric-chip";
import { mdxComponents } from "@/components/mdx-components";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.oneLiner,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { frontmatter, content } = project;
  const links = Object.entries(frontmatter.links ?? {});

  return (
    <article className="pt-40 pb-28">
      <Container className="max-w-3xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to projects
        </Link>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-section font-heading font-semibold text-foreground">
          {frontmatter.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{frontmatter.oneLiner}</p>
        <p className="mt-2 text-sm text-brand-teal">{frontmatter.role}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {frontmatter.metrics.map((metric) => (
            <MetricChip key={metric}>{metric}</MetricChip>
          ))}
        </div>

        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {links.map(([key, href]) => {
              let label = "Visit link";
              if (key === "staging") label = "View staging";
              else if (key === "live") label = "Visit website";
              else if (key === "repo") label = "View repository";
              else if (key === "download") label = "Download app";
              else if (key === "appStore") label = "App Store";
              else if (key === "playStore") label = "Google Play";

              return (
                <a
                  key={key}
                  href={href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand/80"
                >
                  {label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              );
            })}
          </div>
        )}

        <div className="mt-12 border-t border-border pt-4">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </Container>
    </article>
  );
}
