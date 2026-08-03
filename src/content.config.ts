import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.string(),
    statusTone: z.enum(['green', 'blue', 'gold']),
    icon: z.enum(['box', 'code', 'zap']),
    order: z.number(),
    repo: z.string(),
    language: z.string(),
    stars: z.string(),
    coverImage: z.string().default('/images/project-article-01.png'),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    readTime: z.string(),
    publishedAt: z.coerce.date(),
    image: z.string().default('/images/insight-article-01.png'),
  }),
});

const roadmap = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/roadmap' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['planned', 'in-progress', 'shipped']),
    quarter: z.string(),
    image: z.string().default('/images/roadmap-article-01.png'),
    order: z.number(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string(),
    desk: z.string(),
    image: z.string().default('/images/blog-article-01.png'),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    eyebrow: z.string(),
    image: z.string().default('/images/singleton-about.png'),
    highlights: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ).default([]),
  }),
});

export const collections = {
  projects,
  insights,
  roadmap,
  blog,
  pages,
};
