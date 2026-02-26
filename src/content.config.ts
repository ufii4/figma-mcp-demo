import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stepSchema = z.object({
  title: z.string(),
  instruction: z.string(),
  code: z.string().optional(),
  codeFilename: z.string().optional(),
  preview: z.string(), // inline HTML for live preview
});

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    duration: z.string(),
    order: z.number(),
    accentColor: z.string().optional(),
    steps: z.array(stepSchema),
  }),
});

export const collections = { lessons };
