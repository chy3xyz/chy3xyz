'use client';

import { MotionConfig, motion, useInView } from 'framer-motion';
import { ArrowRight, Route } from 'lucide-react';
import { useRef } from 'react';

import type { RoadmapItemProps } from '../data/site';
import { aeonEase, fadeUpTransition, inViewViewport } from './motion';

interface RoadmapSectionProps {
  items: RoadmapItemProps[];
}

const statusStyles: Record<string, string> = {
  '计划中': 'bg-slate-500/15 text-slate-400 border-slate-500/25',
  '开发中': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  '已发布': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
};

function RoadmapItem({ quarter, status, title, summary, href, index }: RoadmapItemProps & { index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: aeonEase }}
      className="group relative grid gap-5 border-b border-white/10 py-7 transition-colors duration-300 hover:border-accent-blue/40 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8"
    >
      <div className="flex items-start gap-4 sm:block">
        <span className="rounded-full border border-white/15 px-4 py-2 font-display text-[11px] uppercase tracking-[0.22em] text-white/62 sm:inline-block">
          {quarter}
        </span>
        <span
          className={`rounded-full border px-3 py-1 font-display text-[10px] uppercase tracking-[0.20em] sm:mt-3 sm:inline-block ${statusStyles[status] ?? statusStyles['计划中']}`}
        >
          {status}
        </span>
      </div>
      <div>
        <h3 className="break-words font-display text-[1.65rem] leading-none text-white transition-colors duration-300 group-hover:text-accent-blue sm:text-[1.9rem]">
          {title}
        </h3>
        <p className="mt-3 text-[1.02rem] leading-7 text-white/62 sm:text-[1.05rem]">{summary}</p>
        <a
          href={href}
          className="mt-5 inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.26em] text-white/52 transition-colors duration-300 hover:text-accent-blue"
        >
          了解更多 <ArrowRight size={14} />
        </a>
      </div>
    </motion.div>
  );
}

export default function RoadmapSection({ items }: RoadmapSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="roadmap" className="bg-dark-space py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewViewport}
            transition={fadeUpTransition}
          >
            <div className="flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.26em] text-warm-gold">
              <Route size={16} strokeWidth={1.6} />
              <span>产品路线图</span>
            </div>
            <h2 className="mt-5 break-words font-display text-[2.85rem] leading-none font-bold text-white sm:text-6xl">
              Product Roadmap
            </h2>
          </motion.div>

          <div className="mt-14 max-w-4xl">
            {items.map((item, index) => (
              <RoadmapItem key={`${item.quarter}-${item.title}`} index={index} {...item} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
