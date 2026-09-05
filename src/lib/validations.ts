import { z } from "zod";

export const PROJECT_ACCENT_COLORS = ["indigo", "teal", "violet", "amber"] as const;
export type ProjectAccentColor = (typeof PROJECT_ACCENT_COLORS)[number];

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  oneLiner: z.string(),
  role: z.string(),
  tags: z.array(z.string()).min(1),
  metrics: z.array(z.string()).min(1).max(4),
  accentColor: z.enum(PROJECT_ACCENT_COLORS),
  order: z.number(),
  links: z
    .object({
      staging: z.url().optional(),
      live: z.url().optional(),
      repo: z.url().optional(),
      download: z.url().optional(),
      appStore: z.url().optional(),
      playStore: z.url().optional(),
    })
    .optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(5000, "Message is too long."),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const blogFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.iso.date(),
  tags: z.array(z.string()).default([]),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;


