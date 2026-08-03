# CHY3 — chy3xyz site

Bilingual (en/zh) marketing site for the CHY3 open-source creative-monetization platform (chy3.xyz). Content-driven, cinematic space theme. Default language is English.

## Project
- Stack: Astro 6 (static-first, `src/pages` routes), React 19 islands, Tailwind CSS 4 via `@tailwindcss/vite`, Framer Motion 12, lucide-react icons, TypeScript strict (`astro/tsconfigs/strict`), Node >= 22.12.
- Bilingual via Astro i18n routing: English lives at root paths (`/`, `/projects/`), Chinese under `/zh/` (`/zh/`, `/zh/projects/`). Language switcher in header/hero maps current path via `switchLangHref`.
- Entry: `src/pages/index.astro` (en) + `src/pages/zh/index.astro` (zh); global styles `src/styles/global.css`.
- Deploys: static build by default; Vercel or Cloudflare Workers via `ASTRO_DEPLOY_TARGET` env (see `astro.config.mjs`, `wrangler.jsonc`).

## Commands
- `npm run dev` — dev server at localhost:4321
- `npm run build` — static build to `./dist/`
- `npm run build:vercel` / `npm run build:cloudflare` — adapter builds
- `npm run preview` / `npm run preview:cloudflare` — preview builds
- `npm run deploy:cloudflare` — build + `wrangler deploy`
- `npm run check` — `astro check` (type-check; there is no test suite)

## Architecture
- `src/pages/` — routes, duplicated per locale: en at root, zh under `zh/`. `index`, `/projects/`, `/insights/`, `/blog/`, `/roadmap/`, singleton `/platform/`, `/ecosystem/`, `/about/`; `[slug].astro` detail pages use `getStaticPaths` from collections.
- `src/i18n/ui.ts` — single source of truth for UI copy (`ui.en` / `ui.zh`), `useTranslations`, `localizePath`, `switchLangHref`. Both locale dicts must keep identical keys.
- `src/components/` — React islands, hydrated with `client:load` (hero) or `client:visible` (sections). Components with UI copy take a `lang` prop. `motion.ts` holds shared Framer Motion constants.
- `src/content/` — Astro Content Collections (markdown): `projects`, `insights`, `roadmap`, `blog`, `pages`; schemas in `src/content.config.ts` (strict zod).
- `src/data/site.ts` — nav path structure + `xxxFor(lang)` factories that assemble per-locale props from the i18n dict.
- `src/lib/` — `content.ts` fetches/sorts/maps collection entries to component props (locale-aware via `localizedField`); `format.ts` UTC date & reading-time formatters.
- `src/layouts/` — `SiteLayout` (html/lang/header/lang-switcher), `CollectionIndexLayout`, `EntryLayout`, `EditorialEntryLayout`, `SingletonPageLayout` — all accept a `lang` prop.

## Conventions
- **Bilingual, default en.** English at root paths, Chinese under `/zh/`. Never hardcode UI copy in pages/components — add a key to both dicts in `src/i18n/ui.ts` and read via `useTranslations(lang)`.
- Content entries are single files (Chinese body); bilingual via `titleEn`/`summaryEn` (and `categoryEn`/`deskEn`/`eyebrowEn`/`labelEn`/`valueEn` for pages) frontmatter fields. English site shows `*En` when present, falling back to Chinese via `localizedField(lang, zh, en)` in `src/lib/content.ts`.
- When duplicating a page for `zh/`, copy the en page and set `const lang: Lang = 'zh'` — keep structure identical, translate only page-level intro/description.
- All internal hrefs in components/pages must go through `localizePath(path, lang)` (or come from `data/site.ts` factories); never hardcode `/projects/` etc.
- Components take props typed by interfaces from `src/data/site.ts`; pages map entries through `toXxx()` mappers in `src/lib/content.ts` — don't pass raw collection entries to components.
- Framer Motion: always reuse `aeonEase`, `inViewViewport`, `fadeUpTransition` from `src/components/motion.ts`; never inline ad-hoc easings.
- Theme is dual-mode via `html[data-theme='dark'|'light']` CSS variables in `src/styles/global.css` (`--body-*`, `--shell-*`, `--color-*`, fonts Orbitron/Space Grotesk). `ThemeToggle` persists to `localStorage` key `chy3-theme`. New colors go in the `@theme` block or the `data-theme` var sets — hardcode colors only for one-off motion accents.
- Content schemas are strict: every frontmatter field must match `src/content.config.ts` (e.g. `statusTone: 'green'|'blue'|'gold'`); add defaults there rather than loosening types.
- Dates: `publishedAt` coerced via `z.coerce.date()`; format with `src/lib/format.ts` (UTC, en-US Intl).
- Code style: 2-space indent, single quotes, no semicolons, `interface XxxProps`, default-export components (follows repo + Astro defaults).

## Notes
- (stub — add project-specific gotchas here as they come up)
