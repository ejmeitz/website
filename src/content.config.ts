import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(), shortTitle: z.string(), subtitle: z.string(),
    description: z.string(), category: z.string(), status: z.string(),
    order: z.number(), color: z.enum(['rust', 'green', 'blue']),
    tags: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), href: z.url() })),
  }),
});
const archive = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/archive' }),
  schema: z.object({ title: z.string(), description: z.string(), tags: z.array(z.string()), image: z.string().optional(), alt: z.string().optional() }),
});
export const collections = { projects, archive };
