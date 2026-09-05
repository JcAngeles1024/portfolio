import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import { ZoomImage } from "@/components/visuals/zoom-image";

const IMAGE_SIZES: Record<string, { width: number; height: number; type: "landscape" | "portrait" | "square" }> = {
  "/mobile-chat.png": { width: 828, height: 1792, type: "portrait" },
  "/mobile-map.png": { width: 828, height: 1792, type: "portrait" },
  "/mytaskowl-software.png": { width: 715, height: 905, type: "portrait" },
  "/oliie-studio-landing-page.png": { width: 1586, height: 1232, type: "landscape" },
  "/ollie-studio-agent.png": { width: 1140, height: 1084, type: "square" },
  "/ollie-studio-diagram.png": { width: 1835, height: 1091, type: "landscape" },
  "/ollie-studio-slides.png": { width: 1909, height: 1143, type: "landscape" },
  "/web-landing-page.png": { width: 1911, height: 1063, type: "landscape" },
  "/web-maps.png": { width: 1580, height: 956, type: "landscape" },
  "/web-project-boards.png": { width: 1904, height: 1062, type: "landscape" },
  "/web-time-tracking.png": { width: 1522, height: 587, type: "landscape" },
};

export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  h2: (props) => (
    <h2
      className="mt-12 text-xl font-semibold text-foreground first:mt-0"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mt-4 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-4 space-y-2.5 text-muted-foreground" {...props} />
  ),
  li: (props) => (
    <li className="ml-5 list-disc pl-1.5 leading-relaxed marker:text-brand-teal" {...props} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  img: (props) => {
    const src = props.src as string;
    const sizeInfo = IMAGE_SIZES[src];
    
    if (sizeInfo) {
      let wrapperClasses = "my-10 block overflow-hidden rounded-xl sm:rounded-2xl border border-border/40 bg-muted/10 shadow-xl transition-all duration-300 hover:shadow-2xl [&+span]:mt-0";
      
      if (sizeInfo.type === "portrait") {
        // Constrain portrait images so they look like phones/windows and don't stretch tall
        wrapperClasses = cn(wrapperClasses, "max-w-[300px] mx-auto shadow-2xl");
      } else if (sizeInfo.type === "square") {
        wrapperClasses = cn(wrapperClasses, "max-w-xl mx-auto");
      }

      return (
        <span className={wrapperClasses}>
          <ZoomImage
            src={src}
            alt={props.alt || ""}
            width={sizeInfo.width}
            height={sizeInfo.height}
            className="h-auto w-full object-cover"
            sizes={
              sizeInfo.type === "portrait" 
                ? "300px" 
                : sizeInfo.type === "square" 
                  ? "(max-width: 768px) 100vw, 36rem" 
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            }
          />
        </span>
      );
    }
    
    return (
      <span className="my-10 block overflow-hidden rounded-xl sm:rounded-2xl border border-border/40 bg-muted/10 shadow-xl [&+span]:mt-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <ZoomImage {...(props as any)} className="h-auto w-full object-cover" alt={props.alt || ""} />
      </span>
    );
  },
  ImageGrid: ({ children }) => (
    <div className="my-12 grid grid-cols-1 gap-8 sm:grid-cols-2 items-center [&>p]:contents [&>p>span]:!my-0 [&>span]:!my-0">
      {children}
    </div>
  ),
};
