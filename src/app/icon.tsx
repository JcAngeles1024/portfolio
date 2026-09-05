import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

export default function Icon() {
  const avatarPath = join(process.cwd(), "public/avatar.jpg");
  const avatar = readFileSync(avatarPath);
  const base64Avatar = avatar.toString("base64");
  const src = `data:image/jpeg;base64,${base64Avatar}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Avatar"
        />
      </div>
    ),
    { ...size }
  );
}
