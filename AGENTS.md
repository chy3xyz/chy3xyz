# CHY3 — chy3xyz site

Bilingual (en/zh) marketing site for the CHY3 open-source creative-monetization platform (chy3.xyz). Content-driven, cinematic dark editorial theme. Default language is English.

## Project

- **Stack:** zdoc 0.16.2 (Zig static-site generator, a Zine fork), SuperMD content, SuperHTML layouts, hand-written CSS/JS. No Astro, no Tailwind, no React, no bundler.
- **Bilingual:** English at root paths (`/`, `/projects/`), Chinese under `/zh/`. zdoc multilingual site config + `translation_key` page matching; language switcher uses `$page.locales()`.
- **Source root:** `site/`. Build output: `dist/`.
- **Entry config:** `site/zine.ziggy` (locales, content dirs, assets, static assets, `supermd.headings_h2 = true`).
- **Layouts:** `site/layouts/templates/base.shtml` plus page layouts `index`, `projects-index`, `insights-index`, `blog-index`, `roadmap-index`, `article`, `page`.
- **Assets:** `site/assets/style.css` (design system), `site/assets/app.js`, self-hosted fonts, `favicon.svg`, `og.jpg`, `hero-galaxy.jpg`, `CNAME` (published to `dist/CNAME`, custom domain `chy3.xyz`).
- **Scripts:** `scripts/zdoc.mjs` resolves a local `zdoc` / `ZDOC_BIN` or downloads v0.16.2 to `.cache/zdoc/`; runs `zdoc release` from `site/`. `scripts/serve.mjs` serves `dist/` with no dependencies.
- **Deploy:** `.github/workflows/pages.yml` builds `dist/` and deploys to GitHub Pages on pushes to `main`. Pages source is GitHub Actions, custom domain `chy3.xyz`; `site/assets/CNAME` is a static asset so it lands at `dist/CNAME`.

## Commands

- `npm run build` — clean `dist/` and build the site
- `npm run preview` — serve `dist/` at http://localhost:4321
- `npm run dev` — zdoc dev server at http://localhost:1990
- `ZDOC_BIN=/path/to/zdoc npm run build` — use an existing binary

## Architecture

- `site/content/en-US/` and `site/content/zh-CN/` mirror each other. Each page is one `.smd` file; the path becomes the URL.
- Home: `index.smd` with `layout = "index.shtml"`. Collections: `projects/index.smd` etc. with collection layouts. Entries: `layout = "article.shtml"`. Singletons: `platform.smd`, `ecosystem.smd`, `about.smd` with `page.shtml`.
- `custom` frontmatter carries design data: `kind`, `kicker`, `status`, `status_tone`, `repo`, `repo_url`, `language`, `stars`, `category`, `read_time`, `desk`, `author`, `quarter`, `eyebrow`, `highlights`, `facts`.
- UI copy is in `site/i18n/{en-US,zh-CN}.ziggy`, read as `$i18n.get('key')`.

## Conventions

- **Never hardcode UI copy in layouts.** Add a key to both i18n files and read it with `$i18n.get('key')`. Keys are identifiers: underscores, no dots. Both locale dictionaries must have identical keys.
- **Page copy is localized in content**, not i18n: titles, descriptions, statuses, facts, and highlights are authored per locale.
- **Internal links:** use `$site.page('projects').link()` or `$page.link()`; do not hardcode paths like `/projects/`.
- **Frontmatter:** Ziggy syntax. `.date = .date("YYYY-MM-DDT00:00:00")` is required. Strings use double quotes. Custom maps use `.custom = .{ ... }`.
- **Dynamic custom values:** use `$page.custom.get('key')`, not dot access. For optional values in `:if`, use `$page.custom.get?('key')` and `$if`. Attributes are evaluated even when an element's `:if` is false, so give defaults with `getOr('key', 'fallback')` when an attribute might read a missing value.
- **Loops:** `:loop` repeats the *children* of the element it is on, not the element itself. To repeat a sibling element (a card, a grid item, a link), wrap it in a non-rendering `<ctx :loop="...">...</ctx>`. `$loop` is not available in the loop element's own attributes; use a `<ctx>` wrapper and reference it in children.
- **Conditionals:** `:if="expr"` on an element renders the element and children only when true; `$if` is the unwrapped optional inside. Use `<ctx :if="...">` for a non-rendering conditional wrapper.
- **Layouts:** child layouts `<extend template="base.shtml">` and define blocks matching base's `<super>` locations: `<head id="head">` and `<main id="main">`. Do not add `</html>` to child layouts.
- **SuperMD headings:** body headings use a single `#`; `headings_h2 = true` makes them render as `<h2>`.
- **Dates:** Go layout strings. Use `2006.01.02` for ISO-style display; `2006` is the year token (not `2026`).
- **Assets:** reference with `$site.asset('style.css').link()`. Fonts, favicon, and OG image must be listed in `static_assets` in `zine.ziggy`; CSS `url()` resources are not discovered by zdoc.
- **Design system:** all tokens and components live in `site/assets/style.css`. One accent (`--signal: #ff5a36`). Archivo + JetBrains Mono. Square corners, hairline rules. Do not introduce a second accent or a new radius system.
- **Motion:** CSS + the small script in `app.js`. Respect `prefers-reduced-motion`. `?noanim=1` disables reveal animations for screenshots.
- **Code style:** 2-space indent; CSS uses two-space indentation. JavaScript follows the existing `app.js` style (semicolons, single quotes).

## Gotchas

- The zdoc v0.16.2 release binary exposes the older Zine CLI: use `zdoc release` from `site/` (the build script does this). The newer source tree also keeps the `release` command as an alias, so this stays compatible.
- `zdoc release --force` writes into `dist/` but does not remove stale files; `scripts/zdoc.mjs` deletes `dist/` before each build.
- The base layout is fixed/sticky; scroll offsets use the `--head-h` variable in `style.css`.
- Home sections have anchor IDs (`#projects`, `#platform`, `#insight`, `#signals`, `#roadmap`, `#contribute`) for in-page links and screenshot QA.
