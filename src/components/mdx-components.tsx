import type { MDXRemoteProps } from "next-mdx-remote/rsc";

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
};
