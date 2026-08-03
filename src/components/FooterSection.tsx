import { MotionConfig, motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import type { FooterMeta, NavLink } from '../data/site';
import { defaultLang, useTranslations, type Lang } from '../i18n/ui';
import BrandLogo from './BrandLogo';
import { aeonEase } from './motion';

interface FooterSectionProps {
  directory: NavLink[];
  lang?: Lang;
  meta: FooterMeta;
  policies: string[];
}

export default function FooterSection({ directory, lang = defaultLang, meta, policies }: FooterSectionProps) {
  const t = useTranslations(lang);
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.footer
        id="site-footer"
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.85, ease: aeonEase }}
        className="bg-footer-bg py-18 sm:py-22"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,0.95fr)_minmax(0,0.8fr)]">
            <div className="max-w-2xl">
              <BrandLogo className="w-[min(100%,22rem)] sm:w-[28rem]" />
              <p className="mt-6 max-w-xl text-[1.1rem] leading-8 text-white/60">{meta.description}</p>
            </div>

            <div>
              <h3 className="font-display text-[11px] uppercase tracking-[0.26em] text-white/80">{t['footer.directory']}</h3>
              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {directory.map((item) => (
                  <li key={item.label}>
                    <a className="text-[1.1rem] text-white/60 transition-colors duration-300 hover:text-accent-blue" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-[11px] uppercase tracking-[0.26em] text-white/80">{t['footer.connect']}</h3>
              <div className="mt-6 space-y-3 text-[1.1rem] text-white/60">
                <p>
                  <a href="https://github.com/chy3xyz" className="transition-colors duration-300 hover:text-accent-blue">github.com/chy3xyz</a>
                </p>
                <p>
                  <a href="https://chy3.xyz" className="transition-colors duration-300 hover:text-accent-blue">chy3.xyz</a>
                </p>
                <p>{t['footer.community']}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-white/8 pt-8 text-[0.95rem] uppercase tracking-[0.08em] text-white/42 md:flex-row md:items-center md:justify-between">
            <p>© 2026 CHY3. ALL RIGHTS RESERVED.</p>
            <div className="flex flex-wrap gap-6">
              {policies.map((policy) => (
                <span key={policy}>{policy}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </MotionConfig>
  );
}
