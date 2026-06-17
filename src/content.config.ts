import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogs = defineCollection({
  loader: glob({
    base: "./src/blogs",
    pattern: "**/index.md",
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string().optional(),
    description: z.string(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

const workex = defineCollection({
  loader: glob({ base: "./src/workex", pattern: "index.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { blogs, workex };
