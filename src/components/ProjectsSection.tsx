'use client';

import { MotionConfig, motion, useInView } from 'framer-motion';
import { ArrowRight, Box, Code, Zap } from 'lucide-react';
import { useRef } from 'react';

import type { ProjectCardProps } from '../data/site';
import { defaultLang, localizePath, useTranslations, type Lang } from '../i18n/ui';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface ProjectsSectionProps {
  lang?: Lang;
  projects: ProjectCardProps[];
}

const iconMap = {
  box: Box,
  code: Code,
  zap: Zap,
} as const;

const toneStyles = {
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  gold: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
} as const;

function ProjectCard({ description, href, icon, status, statusTone, title, index, lang }: ProjectCardProps & { index: number; lang: Lang }) {
  const t = useTranslations(lang);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = iconMap[icon];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: aeonEase }}
      className="group relative overflow-hidden border border-white/10 bg-deep-space-card p-7 transition-colors duration-300 hover:border-accent-blue/50"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(74,158,255,0),rgba(74,158,255,0.92),rgba(74,158,255,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-6">
        <Icon className="mt-1 text-white/16" size={28} strokeWidth={1.4} />
        <span
          className={`rounded-full border px-3 py-1 font-display text-[10px] uppercase tracking-[0.22em] ${toneStyles[statusTone]}`}
        >
          {status}
        </span>
      </div>
      <h3 className="mt-14 break-words font-display text-[2rem] leading-none text-white sm:text-[2.1rem]">{title}</h3>
      <p className="mt-5 max-w-xs text-[1.05rem] leading-8 text-white/68">{description}</p>
      <a
        href={href}
        className="mt-12 inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.26em] text-white/58 transition-colors duration-300 hover:text-accent-blue"
      >
        {t['projects.viewProject']} <ArrowRight size={14} />
      </a>
    </motion.article>
  );
}

export default function ProjectsSection({ projects, lang = defaultLang }: ProjectsSectionProps) {
  const t = useTranslations(lang);
  const projectsHref = localizePath('/projects/', lang);
  return (
    <MotionConfig reducedMotion="user">
      <section id="projects" className="bg-section-dark py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="flex items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.26em] text-accent-blue">
                <Code size={16} strokeWidth={1.6} />
                <span>{t['projects.eyebrow']}</span>
              </div>
              <h2 className="mt-5 break-words font-display text-[2.85rem] leading-none font-bold text-white sm:text-6xl">
                {t['projects.title']}
              </h2>
            </div>
            <a
              href={projectsHref}
              className="group hidden items-center gap-2 font-display text-[12px] uppercase tracking-[0.24em] text-white/55 transition-colors duration-300 hover:text-white md:inline-flex"
            >
              {t['projects.viewAll']} <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={16} />
            </a>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} lang={lang} index={index} {...project} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
