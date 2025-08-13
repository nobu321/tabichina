import { defineCollection, z } from 'astro:content';

const articleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('編集部'),
    tags: z.array(z.string()).default([]),
    category: z.enum(['info', 'setup', 'howto']).default('info'),
    order: z.number().min(1).max(10),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    // SEO関連
    canonicalUrl: z.string().optional(),
    metaKeywords: z.array(z.string()).default([]),
  }),
});

export const collections = {
  articles: articleCollection,
};