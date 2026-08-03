# CHY3 — chy3xyz site

Marketing site for the CHY3 open-source creative-monetization platform (chy3.xyz). Content-driven, Chinese-first copy, cinematic space theme.

## Project
- Stack: Astro 6 (static-first, `src/pages` routes), React 19 islands, Tailwind CSS 4 via `@tailwindcss/vite`, Framer Motion 12, lucide-react icons, TypeScript strict (`astro/tsconfigs/strict`), Node >= 22.12.
- Entry: `src/pages/index.astro`; global styles `src/styles/global.css`.
- Deploys: static build by default; Vercel or Cloudflare Workers via `ASTRO_DEPLOY_TARGET` env (see `astro.config.mjs`, `wrangler.jsonc`).

## Commands
- `npm run dev` — dev server at localhost:4321
- `npm run build` — static build to `./dist/`
- `npm run build:vercel` / `npm run build:cloudflare` — adapter builds
- `npm run preview` / `npm run preview:cloudflare` — preview builds
- `npm run deploy:cloudflare` — build + `wrangler deploy`
- `npm run check` — `astro check` (type-check; there is no test suite)

## Architecture
- `src/pages/` — routes: `index`, `/projects/`, `/insights/`, `/blog/`, `/roadmap/`, singleton `/platform/`, `/ecosystem/`, `/about/`; `[slug].astro` detail pages use `getStaticPaths` from collections.
- `src/components/` — React islands, hydrated with `client:load` (hero) or `client:visible` (sections). `motion.ts` holds shared Framer Motion constants.
- `src/content/` — Astro Content Collections (markdown): `projects`, `insights`, `roadmap`, `blog`, `pages`; schemas in `src/content.config.ts` (strict zod).
- `src/data/site.ts` — site copy (nav, hero, stats, footer) + shared prop interfaces consumed by components.
- `src/lib/` — `content.ts` fetches/sorts/maps collection entries to component props; `format.ts` UTC date & reading-time formatters.
- `src/layouts/` — `SiteLayout`, `CollectionIndexLayout`, `EntryLayout`, `EditorialEntryLayout`, `SingletonPageLayout`.

## Conventions
- Content copy is zh-CN-first; page `<html lang="zh-CN">`. Keep UI labels in Chinese unless a token is deliberately English.
- Components take props typed by interfaces from `src/data/site.ts`; pages map entries through `toXxx()` mappers in `src/lib/content.ts` — don't pass raw collection entries to components.
- Framer Motion: always reuse `aeonEase`, `inViewViewport`, `fadeUpTransition` from `src/components/motion.ts`; never inline ad-hoc easings.
- Theme is dual-mode via `html[data-theme='dark'|'light']` CSS variables in `src/styles/global.css` (`--body-*`, `--shell-*`, `--color-*`, fonts Orbitron/Space Grotesk). `ThemeToggle` persists to `localStorage` key `chy3-theme`. New colors go in the `@theme` block or the `data-theme` var sets — hardcode colors only for one-off motion accents.
- Content schemas are strict: every frontmatter field must match `src/content.config.ts` (e.g. `statusTone: 'green'|'blue'|'gold'`); add defaults there rather than loosening types.
- Dates: `publishedAt` coerced via `z.coerce.date()`; format with `src/lib/format.ts` (UTC, en-US Intl).
- Code style: 2-space indent, single quotes, no semicolons, `interface XxxProps`, default-export components (follows repo + Astro defaults).

## Notes
- (stub — add project-specific gotchas here as they come up)
