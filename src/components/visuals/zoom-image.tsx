"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image, { type ImageProps } from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ZoomImage(props: ImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Zoom
      wrapElement="span"
      classDialog={mounted && resolvedTheme === "dark" ? "zoom-dark" : "zoom-light"}
      zoomMargin={40}
      zoomImg={{
        src: props.src as string,
        alt: props.alt as string,
      }}
    >
      <Image {...props} />
    </Zoom>
  );
}
