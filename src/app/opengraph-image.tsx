import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jose Carl Angeles — Full Stack Software Engineer";

export default function Image() {
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
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            color: "#2dd4bf",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Full Stack Software Engineer
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, marginTop: 20, maxWidth: 950 }}>
          Jose Carl Angeles
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9aa3b2", marginTop: 24, maxWidth: 850 }}>
          Backend architecture, relational database optimization, and full-stack web platforms.
        </div>
      </div>
    ),
    { ...size },
  );
}
