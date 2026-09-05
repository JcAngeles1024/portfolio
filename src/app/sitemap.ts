import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getAllBlogPosts } from "@/lib/blog";
import { getBaseUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/blog"].map((route) => ({
    url: `${getBaseUrl()}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${getBaseUrl()}/projects/${project.frontmatter.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${getBaseUrl()}/blog/${post.frontmatter.slug}`,
    lastModified: post.frontmatter.date,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
