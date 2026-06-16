import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const galleryItem = z.object({
  src: z.string(),
  caption: z.string().optional(),
  wide: z.boolean().default(false),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    role: z.string(),
    period: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    tier: z.enum(["lead", "primary", "secondary"]).default("secondary"),
    accent: z.string().default("#2ee6a6"),
    summary: z.string(),
    impact: z.string(),
    logo: z.string(),
    cover: z.string().optional(),
    platforms: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          primary: z.boolean().default(false),
        }),
      )
      .default([]),
    gallery: z.array(galleryItem).default([]),
    galleryNote: z.string().optional(),
  }),
});

export const collections = { projects };
