import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

import type {
  InsightContent,
  ProjectCardProps,
  RoadmapItemProps,
} from '../data/site';
import { localizePath, useTranslations, type Lang } from '../i18n/ui';
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

/** Pick the English field when present on the English site, falling back to the Chinese original. */
export function localizedField(lang: Lang, zh: string, en?: string) {
  return lang === 'en' ? en ?? zh : zh;
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

export function toProjectCard(entry: ProjectEntry, lang: Lang): ProjectCardProps {
  return {
    title: localizedField(lang, entry.data.title, entry.data.titleEn),
    description: localizedField(lang, entry.data.summary, entry.data.summaryEn),
    status: entry.data.status,
    statusTone: entry.data.statusTone,
    icon: entry.data.icon,
    href: localizePath(`/projects/${entry.id}/`, lang),
  };
}

export function toInsightContent(entry: InsightEntry, lang: Lang): InsightContent {
  const t = useTranslations(lang);
  return {
    label: localizedField(lang, entry.data.category, entry.data.categoryEn),
    title: localizedField(lang, entry.data.title, entry.data.titleEn),
    body: localizedField(lang, entry.data.summary, entry.data.summaryEn),
    readTime: entry.data.readTime,
    cta: {
      href: localizePath(`/insights/${entry.id}/`, lang),
      label: t['insights.readMore'],
    },
    archiveHref: localizePath('/insights/', lang),
    archiveLabel: t['insights.archive'],
    image: entry.data.image,
  };
}

export function toRoadmapItem(entry: RoadmapEntry, lang: Lang): RoadmapItemProps {
  const t = useTranslations(lang);
  const statusLabel = t['roadmap.status'][entry.data.status];

  return {
    quarter: entry.data.quarter,
    status: statusLabel,
    statusKey: entry.data.status,
    title: localizedField(lang, entry.data.title, entry.data.titleEn),
    summary: localizedField(lang, entry.data.summary, entry.data.summaryEn),
    href: localizePath(`/roadmap/${entry.id}/`, lang),
  };
}
