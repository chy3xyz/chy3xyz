'use client';

import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight, Telescope } from 'lucide-react';

import type { InsightContent } from '../data/site';
import { fadeUpTransition, inViewViewport } from './motion';

interface InsightSectionProps {
  content: InsightContent;
}

function renderTitleLines(title: string) {
  return title.split('/').map((part) => part.trim()).filter(Boolean);
}

export default function InsightSection({ content }: InsightSectionProps) {
  const titleLines = renderTitleLines(content.title);

  return (
    <MotionConfig reducedMotion="user">
      <section id="insights" className="discovery-surface relative isolate overflow-hidden py-20 sm:py-24 lg:py-28">
        <img
          src={content.image}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
        />
        <div className="discovery-overlay absolute inset-0 -z-10" />

        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,460px)] lg:items-center lg:gap-12 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="max-w-3xl"
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.26em] text-warm-gold">
                <Telescope size={16} strokeWidth={1.6} />
                <span>{content.label}</span>
              </div>
              <a
                href={content.archiveHref}
                className="discovery-meta group hidden items-center gap-2 font-display text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 hover:text-white md:inline-flex"
              >
                {content.archiveLabel} <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={14} />
              </a>
            </div>
            <h2 className="discovery-title mt-5 font-display text-[2.5rem] leading-[0.94] font-bold sm:text-[3.35rem] lg:text-[5.2rem]">
              {titleLines.map((line) => (
                <span className="block" key={line}>{line}</span>
              ))}
            </h2>
            <p className="discovery-copy mt-6 max-w-2xl text-[1.05rem] leading-8 sm:mt-7 sm:text-[1.2rem] sm:leading-9">{content.body}</p>
            <div className="discovery-meta mt-6 flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.22em] sm:mt-7">
              <span className="inline-block h-1 w-1 rounded-full bg-warm-gold" />
              {content.readTime}
            </div>
            <div className="mt-10 flex flex-wrap gap-3 sm:mt-12">
              <a
                href={content.cta.href}
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-white px-8 font-display text-[11px] uppercase tracking-[0.24em] text-navy-text transition-colors duration-300 hover:bg-accent-blue hover:text-white"
              >
                {content.cta.label} <ArrowRight size={14} />
              </a>
              <a
                href={content.archiveHref}
                className="discovery-meta inline-flex min-h-12 items-center justify-center gap-3 border border-white/14 px-8 font-display text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 hover:border-accent-blue hover:text-accent-blue md:hidden"
              >
                {content.archiveLabel} <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 56 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
            className="relative aspect-[4/5] overflow-hidden border border-white/10"
          >
            <img
              src={content.image}
              alt={content.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.06),transparent_50%)]" />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
