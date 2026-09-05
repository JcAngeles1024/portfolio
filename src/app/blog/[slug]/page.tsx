import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { mdxComponents } from "@/components/mdx-components";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <article className="pt-40 pb-28">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to blog
        </Link>

        <time className="mt-6 block font-mono text-xs text-muted-foreground">
          {frontmatter.date}
        </time>
        <h1 className="mt-2 text-section font-heading font-semibold text-foreground">
          {frontmatter.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {frontmatter.description}
        </p>

        <div className="mt-12 border-t border-border pt-4">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </Container>
    </article>
  );
}
