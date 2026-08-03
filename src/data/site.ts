import { localizePath, useTranslations, type Lang } from '../i18n/ui';

export interface NavLink {
  href: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  subtitle: string;
  paragraph: string;
  primaryCta: NavLink;
  secondaryCta: NavLink;
  utilityLabel: string;
}

export interface ProjectCardProps {
  description: string;
  href: string;
  icon: 'box' | 'code' | 'zap';
  status: string;
  statusTone: 'green' | 'blue' | 'gold';
  title: string;
}

export interface StatBlockProps {
  label: string;
  value: string;
}

export interface RoadmapItemProps {
  quarter: string;
  status: string;
  statusKey?: 'planned' | 'in-progress' | 'shipped';
  href: string;
  title: string;
  summary: string;
}

export interface InsightContent {
  archiveHref: string;
  archiveLabel: string;
  body: string;
  cta: NavLink;
  image: string;
  label: string;
  readTime: string;
  title: string;
}

export interface FooterMeta {
  description: string;
  title: string;
}

/** Path order matches the `nav` entries in src/i18n/ui.ts. */
export const siteNavPaths = ['/projects/', '/insights/', '/blog/', '/roadmap/', '/platform/', '/ecosystem/', '/about/'];

export const heroLeftPaths = ['/projects/', '/insights/', '/platform/'];

export const heroRightPaths = ['/ecosystem/', '/roadmap/', '/blog/', '/about/'];

export const statValues = ['12+', '2.4K+', '8+', '100%'];

export function navFor(lang: Lang, paths: string[]): NavLink[] {
  const t = useTranslations(lang);
  return paths.map((path, index) => ({
    href: localizePath(path, lang),
    label: t.nav[index] ?? path,
  }));
}

export function heroContentFor(lang: Lang): HeroContent {
  const t = useTranslations(lang);
  return {
    eyebrow: t['hero.eyebrow'],
    subtitle: t['hero.subtitle'],
    paragraph: t['hero.paragraph'],
    primaryCta: {
      href: localizePath('/projects/', lang),
      label: t['hero.primaryCta'],
    },
    secondaryCta: {
      href: localizePath('/platform/', lang),
      label: t['hero.secondaryCta'],
    },
    utilityLabel: t['hero.utility'],
  };
}

export function statsFor(lang: Lang): StatBlockProps[] {
  const t = useTranslations(lang);
  return statValues.map((value, index) => ({
    value,
    label: t.stats[index],
  }));
}

export function footerMetaFor(lang: Lang): FooterMeta {
  const t = useTranslations(lang);
  return {
    title: 'CHY3',
    description: t['footer.description'],
  };
}

export function footerDirectoryFor(lang: Lang): NavLink[] {
  return navFor(lang, siteNavPaths);
}

export function footerPoliciesFor(lang: Lang): string[] {
  const t = useTranslations(lang);
  return [...t['footer.policies']];
}
