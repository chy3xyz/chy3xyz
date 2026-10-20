# CHY3 — chy3.xyz

Bilingual marketing site for **CHY3**, an open-source creative-monetization infrastructure project. The site is built with [zdoc](https://github.com/chy3xyz/zdoc): Markdown content, SuperHTML layouts, and a hand-written design system. No Astro, no Tailwind, no JavaScript framework.

## Stack

- **zdoc 0.16.2** — a Zig static-site generator (a fork of Zine). Content lives in SuperMD files; layouts are SuperHTML templates.
- **Bilingual by build** — English at the root, Chinese under `/zh/`, through zdoc's multilingual site config and `translation_key` page matching.
- **Design system** — hand-written CSS. Archivo (variable) for display and body, JetBrains Mono for labels and data. One signal accent: vermilion `#ff5a36` on near-black `#07090b`. Self-hosted fonts.
- **Motion** — a small vanilla IntersectionObserver script for scroll reveals and a reading-progress bar. Everything is visible without JavaScript.

## Commands

```bash
npm run build     # clean + build the site into dist/
npm run preview   # serve dist/ at http://localhost:4321
npm run dev       # zdoc dev server (http://localhost:1990)
```

The first build downloads the zdoc release binary for your platform into `.cache/zdoc/`. To use an existing binary instead:

```bash
ZDOC_BIN=/path/to/zdoc npm run build
```

Requires Node.js 20+ for the build scripts. zdoc itself has no runtime dependencies.

## Structure

```text
site/
  zine.ziggy              # multilingual site config, locales, static assets
  content/en-US/          # English pages (output at /)
  content/zh-CN/          # Chinese pages (output at /zh/)
  i18n/en-US.ziggy        # UI copy, English
  i18n/zh-CN.ziggy        # UI copy, Chinese
  layouts/                # SuperHTML templates
    templates/base.shtml  # chrome, head, navigation, footer
    index.shtml           # home
    projects-index.shtml  # collection layouts
    insights-index.shtml
    blog-index.shtml
    roadmap-index.shtml
    article.shtml         # project / insight / journal / milestone detail
    page.shtml            # platform / ecosystem / about
  assets/
    style.css             # the design system
    app.js                # reveal + progress + mobile menu behaviour
    fonts/                # self-hosted Archivo and JetBrains Mono
    favicon.svg, og.jpg, hero-galaxy.jpg
scripts/
  zdoc.mjs                # resolves/builds with zdoc, downloads it if needed
  serve.mjs               # dependency-free static server for dist/
```

## Adding a page

Content is a SuperMD file. The filename becomes the URL:

- `site/content/en-US/projects/idea-forge.smd` → `/projects/idea-forge/`
- `site/content/zh-CN/projects/idea-forge.smd` → `/zh/projects/idea-forge/`

Every page has frontmatter:

```yaml
---
.title = "IdeaForge — Idea Incubation Engine",
.date = .date("2026-03-01T00:00:00"),
.layout = "article.shtml",
.description = "One-line summary used for cards and metadata.",
.translation_key = "project-idea-forge",
.custom = .{
  .kind = "project",
  .kicker = "Project / 01",
  .status = "Active",
  .status_tone = "live",
  .repo = "chy3xyz/idea-forge",
  .repo_url = "https://github.com/chy3xyz/idea-forge",
  .language = "TypeScript",
  .stars = "856",
  .facts = [
    .{ .label = "Repository", .value = "chy3xyz/idea-forge" },
    .{ .label = "Language", .value = "TypeScript" },
    .{ .label = "GitHub stars", .value = "856" },
  ],
},
---
```

Body headings use a single `#`; `site/zine.ziggy` sets `supermd.headings_h2 = true`, so they render as `<h2>`.

## Bilingual copy

UI strings live in `site/i18n/en-US.ziggy` and `site/i18n/zh-CN.ziggy`. Both files must keep the same keys. Templates read them with:

```html
<span :text="$i18n.get('nav_projects')"></span>
```

Keys are Ziggy identifiers, so use underscores (`nav_projects`), not dots. Page copy (titles, descriptions, facts) lives in each locale's content tree. Set the same `translation_key` on corresponding pages so the language switcher and `hreflang` links connect them.

## Design notes

- **Palette:** `--ink #07090b`, `--paper #f1ede4`, `--signal #ff5a36`, warm neutral greys. No second accent colour; status dots use paper, signal, or an outline.
- **Type:** Archivo with a slight width stretch for display; JetBrains Mono for metadata. Chinese falls back to PingFang SC / Noto Sans SC.
- **Geometry:** square corners for interactive elements, hairline rules, numbered sections, oversized wordmark. Orbit diagrams are CSS, not images; the galaxy photograph is used only as atmosphere in the hero.
- **Motion:** `prefers-reduced-motion` disables animations. Add `?noanim=1` to a URL to disable reveal animations for screenshots.

## Deploy to GitHub Pages

`npm run build` writes a static `dist/`. The repository deploys to GitHub Pages through `.github/workflows/pages.yml` on every push to `main`, and publishes the custom domain `chy3.xyz`.

The domain is registered at **Dynadot** (`ns1.dyna-ns.net` / `ns2.dyna-ns.net`). GitHub Pages needs these records at the DNS host:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `chy3xyz.github.io` |

The repo contains `site/assets/CNAME` (published as `dist/CNAME`) with `chy3.xyz`. In the repository's **Settings → Pages**, the source is **GitHub Actions** and the custom domain is `chy3.xyz`. GitHub issues the TLS certificate automatically after the DNS records resolve; once the certificate exists, enable **Enforce HTTPS** in Settings → Pages (the API rejects enforcement before the certificate is issued).

All internal links are root-relative, so the site must be served from a domain root. If it is hosted under a subpath instead, adjust `url_path_prefix` (simple sites) or `output_prefix_override` / host settings in `zine.ziggy`.
