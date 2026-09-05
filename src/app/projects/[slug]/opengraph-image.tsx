import { ImageResponse } from "next/og";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.frontmatter.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#05060a",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#2dd4bf",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Case Study
        </div>
        <div style={{ display: "flex", fontSize: 60, fontWeight: 700, marginTop: 20, maxWidth: 950 }}>
          {project?.frontmatter.title ?? "Portfolio Project"}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9aa3b2", marginTop: 24, maxWidth: 850 }}>
          {project?.frontmatter.oneLiner ?? ""}
        </div>
      </div>
    ),
    { ...size },
  );
}
