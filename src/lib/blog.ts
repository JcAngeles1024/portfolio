import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { blogFrontmatterSchema, type BlogFrontmatter } from "@/lib/validations";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  frontmatter: BlogFrontmatter;
  content: string;
}

let cache: BlogPost[] | null = null;

export function getAllBlogPosts(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) return (cache = []);

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = blogFrontmatterSchema.parse(data);
    return { frontmatter, content };
  });

  cache = posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  return cache;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.frontmatter.slug === slug);
}
