export const defaultLang = 'en';

export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;

export function isLang(value: string): value is Lang {
  return value === 'en' || value === 'zh';
}

export function useTranslations(lang: Lang) {
  return ui[lang] ?? ui[defaultLang];
}

/** Prefix a site path for non-default locales: '/projects/' → '/zh/projects/'. */
export function localizePath(path: string, lang: Lang) {
  if (lang === defaultLang) {
    return path;
  }
  return path === '/' ? '/zh/' : `/zh${path}`;
}

/** Href for the language switcher: current path mapped to the other locale. */
export function switchLangHref(path: string, lang: Lang) {
  if (lang === defaultLang) {
    return localizePath(path, 'zh');
  }
  return path.replace(/^\/zh/, '') || '/';
}

export const ui = {
  en: {
    'nav': ['Projects', 'Insights', 'Blog', 'Roadmap', 'Platform', 'Ecosystem', 'About'],
    'header.label': 'Public Network',
    'lang.switch': '中文',
    'theme.light': 'Switch to light mode',
    'theme.dark': 'Switch to dark mode',
    'hero.eyebrow': 'Creative Monetization',
    'hero.subtitle': 'Technology-Driven',
    'hero.paragraph':
      'CHY3 builds open-source creative monetization infrastructure, turning technological innovation into sustainable value creation. We develop tools, platforms, and methodologies that help creators and developers turn inspiration into profitable products.',
    'hero.primaryCta': 'Explore Projects',
    'hero.secondaryCta': 'Discover the Platform',
    'hero.utility': 'chy3.xyz',
    'stats': ['Open-Source Projects', 'GitHub Stars', 'Active Contributors', 'Open-Source Collaboration'],
    'footer.description':
      'Open-source creative monetization infrastructure. We build tools, platforms, and methodologies that help creators turn ideas into sustainable value.',
    'footer.directory': 'Directory',
    'footer.connect': 'Connect',
    'footer.community': 'Open-source community · Global collaboration',
    'footer.policies': ['GitHub', 'Privacy', 'Terms'],
    'footer.copyright': '© 2026 CHY3. ALL RIGHTS RESERVED.',
    'insights.archive': 'View all insights',
    'insights.readMore': 'Read more',
    'projects.eyebrow': 'Open-Source',
    'projects.title': 'Open Source Projects',
    'projects.viewAll': 'View All',
    'projects.viewProject': 'View Project',
    'projects.repo': 'Repository',
    'insights.read': 'Read insight',
    'blog.read': 'Read article',
    'roadmap.eyebrow': 'Platform Roadmap',
    'roadmap.title': 'Product Roadmap',
    'roadmap.learnMore': 'Learn more',
    'hero.openMenu': 'Open menu',
    'hero.closeMenu': 'Close menu',
    'roadmap.status': {
      planned: 'Planned',
      'in-progress': 'In Progress',
      shipped: 'Shipped',
    },
    'roadmap.viewDetails': 'View details',
    'roadmap.quarter': 'Quarter',
    'roadmap.order': 'Order',
    'detail.published': 'Published',
    'detail.author': 'Author',
    'detail.column': 'Column',
    'detail.status': 'Status',
    'detail.language': 'Language',
    'detail.category': 'Category',
    'detail.readTime': 'Read time',
    'detail.projectEyebrow': 'Project',
    'detail.roadmapEyebrow': 'Roadmap Item',
    'back.projects': 'All projects',
    'back.insights': 'All insights',
    'back.blog': 'All articles',
    'back.roadmap': 'Back to roadmap',
    'coreSignals': 'Core Signals',
    'articleData': 'Article Data',
    'site.tagline': 'Creative Monetization Infrastructure',
    'site.description':
      'CHY3 open-source creative monetization infrastructure — tools, platforms, and methodologies that help creators turn ideas into sustainable value.',
    'index.title': 'CHY3 — Creative Monetization Infrastructure',
  },
  zh: {
    'nav': ['项目', '洞察', '博客', '路线图', '平台', '生态', '关于'],
    'header.label': '公共网络',
    'lang.switch': 'EN',
    'theme.light': '切换到浅色模式',
    'theme.dark': '切换到深色模式',
    'hero.eyebrow': '创意变现',
    'hero.subtitle': '技术驱动',
    'hero.paragraph':
      'CHY3 致力于构建开源创意变现基础设施,将技术创新转化为可持续的价值创造。我们开发工具、平台和方法论,帮助创作者和开发者将灵感落地为可盈利的产品。',
    'hero.primaryCta': '探索项目',
    'hero.secondaryCta': '了解平台',
    'hero.utility': 'chy3.xyz',
    'stats': ['开源项目', 'GitHub Stars', '活跃贡献者', '开源共建'],
    'footer.description':
      '开源创意变现基础设施。构建工具、平台和方法论,帮助创作者将创意转化为可持续价值。',
    'footer.directory': '目录',
    'footer.connect': '联系',
    'footer.community': '开源社区 · 全球协作',
    'footer.policies': ['GitHub', '隐私', '条款'],
    'footer.copyright': '© 2026 CHY3. 保留所有权利。',
    'insights.archive': '查看全部洞察',
    'insights.readMore': '阅读全文',
    'projects.eyebrow': '开源项目',
    'projects.title': '开源项目',
    'projects.viewAll': '查看全部',
    'projects.viewProject': '查看项目',
    'projects.repo': '仓库',
    'insights.read': '阅读洞察',
    'blog.read': '阅读文章',
    'roadmap.eyebrow': '产品路线图',
    'roadmap.title': '产品路线图',
    'roadmap.learnMore': '了解更多',
    'hero.openMenu': '打开菜单',
    'hero.closeMenu': '关闭菜单',
    'roadmap.status': {
      planned: '计划中',
      'in-progress': '开发中',
      shipped: '已发布',
    },
    'roadmap.viewDetails': '查看详情',
    'roadmap.quarter': '季度',
    'roadmap.order': '排序',
    'detail.published': '发布',
    'detail.author': '作者',
    'detail.column': '栏目',
    'detail.status': '状态',
    'detail.language': '语言',
    'detail.category': '分类',
    'detail.readTime': '阅读时长',
    'detail.projectEyebrow': '项目',
    'detail.roadmapEyebrow': '路线图条目',
    'back.projects': '所有项目',
    'back.insights': '所有洞察',
    'back.blog': '所有文章',
    'back.roadmap': '返回路线图',
    'coreSignals': '核心信号',
    'articleData': '文章数据',
    'site.tagline': '创意变现基础设施',
    'site.description': 'CHY3 开源创意变现基础设施 — 构建工具、平台和方法论,帮助创作者将创意转化为可持续价值。',
    'index.title': 'CHY3 — 创意变现基础设施',
  },
} as const;

export type UiDict = typeof ui[typeof defaultLang];
