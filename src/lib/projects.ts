import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projectFrontmatterSchema, type ProjectFrontmatter } from "@/lib/validations";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
}

let cache: Project[] | null = null;

export function getAllProjects(): Project[] {
  if (cache) return cache;

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((filename) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = projectFrontmatterSchema.parse(data);
    return { frontmatter, content };
  });

  cache = projects.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
  return cache;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.frontmatter.slug === slug);
}
