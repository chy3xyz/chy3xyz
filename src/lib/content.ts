import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

import type {
  InsightContent,
  ProjectCardProps,
  RoadmapItemProps,
} from '../data/site';
import { formatReadingTime } from './format';

export type ProjectEntry = CollectionEntry<'projects'>;
export type InsightEntry = CollectionEntry<'insights'>;
export type RoadmapEntry = CollectionEntry<'roadmap'>;
export type BlogEntry = CollectionEntry<'blog'>;
export type PageEntry = CollectionEntry<'pages'>;
export type SingletonPageId = 'about' | 'platform' | 'ecosystem';

export function estimateReadingTime(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getReadingTimeLabel(body: string) {
  return formatReadingTime(estimateReadingTime(body));
}

export async function getProjectEntries() {
  const entries = await getCollection('projects');
  return entries.sort((left, right) => left.data.order - right.data.order);
}

export async function getInsightEntries() {
  const entries = await getCollection('insights');
  return entries.sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());
}

export async function getRoadmapEntries() {
  const entries = await getCollection('roadmap');
  return entries.sort((left, right) => left.data.order - right.data.order);
}

export async function getBlogEntries() {
  const entries = await getCollection('blog');
  return entries.sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());
}

export async function getPageEntry(id: SingletonPageId) {
  const entry = await getEntry('pages', id);
  if (!entry) {
    throw new Error(`Missing singleton page content for ${id}`);
  }
  return entry;
}

export function toProjectCard(entry: ProjectEntry): ProjectCardProps {
  return {
    title: entry.data.title,
    description: entry.data.summary,
    status: entry.data.status,
    statusTone: entry.data.statusTone,
    icon: entry.data.icon,
    href: `/projects/${entry.id}/`,
  };
}

export function toInsightContent(entry: InsightEntry): InsightContent {
  return {
    label: entry.data.category,
    title: entry.data.title,
    body: entry.data.summary,
    readTime: entry.data.readTime,
    cta: {
      href: `/insights/${entry.id}/`,
      label: '阅读全文',
    },
    archiveHref: '/insights/',
    archiveLabel: '查看全部洞察',
    image: entry.data.image,
  };
}

export function toRoadmapItem(entry: RoadmapEntry): RoadmapItemProps {
  const statusLabels: Record<string, string> = {
    planned: '计划中',
    'in-progress': '开发中',
    shipped: '已发布',
  };

  return {
    quarter: entry.data.quarter,
    status: statusLabels[entry.data.status] ?? entry.data.status,
    title: entry.data.title,
    summary: entry.data.summary,
    href: `/roadmap/${entry.id}/`,
  };
}
