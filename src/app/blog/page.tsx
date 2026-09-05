import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on backend architecture, database performance, and building AI systems — written from production, not theory.",
};

// Ideas for future blog posts
const BACKLOG_TOPICS = [
  "Scaling MySQL past 100M rows: the indexing decisions that actually mattered",
  "Building a multi-modal AI agent platform solo: what I'd do differently",
  "Reverse-engineering Win32 to track active time down to the second",
];

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="pt-40 pb-28">
      <Container className="max-w-3xl">
        <p className="font-mono text-xs tracking-wider text-brand-teal uppercase">
          Writing
        </p>
        <h1 className="mt-3 text-section font-heading font-semibold text-foreground">
          Blog
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Notes on backend architecture, database performance, and building AI
          systems — written from production, not theory.
        </p>

        {posts.length > 0 ? (
          <ul className="mt-12 flex flex-col gap-4">
            {posts.map((post) => (
              <li key={post.frontmatter.slug}>
                <Link
                  href={`/blog/${post.frontmatter.slug}`}
                  className="block rounded-card border border-border bg-card/60 p-6 transition-colors hover:border-brand/40"
                >
                  <time className="font-mono text-xs text-muted-foreground">
                    {post.frontmatter.date}
                  </time>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {post.frontmatter.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12">
            <p className="text-sm text-muted-foreground">
              Nothing published yet — here&apos;s what&apos;s coming:
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {BACKLOG_TOPICS.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center justify-between gap-4 rounded-card border border-dashed border-border p-5 text-sm text-muted-foreground"
                >
                  {topic}
                  <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase">
                    Coming soon
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}
