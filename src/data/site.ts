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

export const siteNav: NavLink[] = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Roadmap', href: '/roadmap/' },
  { label: 'Platform', href: '/platform/' },
  { label: 'Ecosystem', href: '/ecosystem/' },
  { label: 'About', href: '/about/' },
];

export const heroLeftNav: NavLink[] = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Platform', href: '/platform/' },
];

export const heroRightNav: NavLink[] = [
  { label: 'Ecosystem', href: '/ecosystem/' },
  { label: 'Roadmap', href: '/roadmap/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
];

export const mobileNav: NavLink[] = [...heroLeftNav, ...heroRightNav];

export const heroContent: HeroContent = {
  eyebrow: '创意变现',
  subtitle: '技术驱动',
  paragraph:
    'CHY3 致力于构建开源创意变现基础设施，将技术创新转化为可持续的价值创造。我们开发工具、平台和方法论，帮助创作者和开发者将灵感落地为可盈利的产品。',
  primaryCta: {
    href: '/projects/',
    label: '探索项目',
  },
  secondaryCta: {
    href: '/platform/',
    label: '了解平台',
  },
  utilityLabel: 'chy3.xyz',
};

export const stats: StatBlockProps[] = [
  { value: '12+', label: '开源项目' },
  { value: '2.4K+', label: 'GitHub Stars' },
  { value: '8+', label: '活跃贡献者' },
  { value: '100%', label: '开源共建' },
];

export const footerMeta: FooterMeta = {
  title: 'CHY3',
  description:
    '开源创意变现基础设施。构建工具、平台和方法论，帮助创作者将创意转化为可持续价值。',
};

export const footerDirectory: NavLink[] = [...siteNav];

export const footerPolicies: string[] = ['GitHub', 'Privacy', 'Terms'];
