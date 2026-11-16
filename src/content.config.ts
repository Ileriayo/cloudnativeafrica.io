import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each job is a Markdown file in src/content/jobs/.
// Files starting with "_" (like _TEMPLATE.md) are ignored.
const jobs = defineCollection({
  loader: glob({ base: './src/content/jobs', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    companyUrl: z.url().optional(),
    location: z.string(),
    workplace: z.enum(['Remote', 'On-site', 'Hybrid']),
    employmentType: z
      .enum(['Full-time', 'Part-time', 'Contract', 'Internship'])
      .default('Full-time'),
    payRange: z.string(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    posted: z.coerce.date(),
    closes: z.coerce.date().optional(),
    status: z.enum(['open', 'closed']).default('open'),
    draft: z.boolean().default(false),
    // Optional: a different Google Form for this job only.
    applicationForm: z.url().optional(),
  }),
});

export const collections = { jobs };
