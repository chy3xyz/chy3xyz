# CHY3

<div align="center">

**CHY3**

A cinematic, content-driven creative monetization platform site built with **Astro 6**, **React 19**, **Tailwind CSS 4**, and **Framer Motion**. Designed for showcasing open-source projects, insights, and platform capabilities.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-6.x-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=061826)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?logo=framer&logoColor=white)](https://motion.dev)

</div>

## Overview

CHY3 is an open-source creative monetization infrastructure platform. This site serves as the public face of the `chy3xyz` GitHub organization, showcasing projects, sharing insights on the creator economy, and documenting the platform roadmap.

- 🌐 **Website**: [chy3.xyz](https://chy3.xyz)
- 🐙 **GitHub**: [github.com/chy3xyz](https://github.com/chy3xyz)

## Current State

The site features a responsive home page, typed markdown collections, light/dark mode, theme-aware branding, animated statistics, and archive/detail pages for projects, insights, roadmap, and blog.

- Full-bleed cinematic hero with animated star field and angled desktop navigation
- Sticky glassmorphism header with scroll-aware hide/reveal
- Light/dark theme toggle with persisted user preference
- Animated count-up stats section
- Project, insight, roadmap, and blog collection pages
- Markdown-powered detail pages with Astro Content Collections
- Responsive desktop, tablet, and mobile layouts
- Framer Motion polish for all interactive elements

## ✨ Features

- ⚡ **Astro 6 + TypeScript** — Static-first site with typed content schemas
- ⚛️ **React islands** — Interactive hero, theme toggle, stats, and motion sections
- 🎨 **Tailwind CSS 4** — Custom theme tokens and light/dark design variables
- 🎬 **Framer Motion** — Entrance animations, section reveals, and hover affordances
- 📝 **Astro Content Collections** — Validated markdown for projects, insights, roadmap, and blog
- 📱 **Responsive** — Desktop, tablet, and mobile layouts
- ☁️ **Deploy-Ready** — Vercel and Cloudflare Workers support

## 🚀 Quick Start

### Prerequisites

- Node.js `>= 22.12.0`
- npm

### Installation

```bash
git clone https://github.com/chy3xyz/chy3xyz.git
cd chy3xyz
npm install
npm run dev
```

Visit `http://localhost:4321` to view the site.

## 📋 Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build the default static production site to `./dist/` |
| `npm run build:vercel` | Build with `@astrojs/vercel` adapter |
| `npm run build:cloudflare` | Build with `@astrojs/cloudflare` adapter |
| `npm run preview` | Preview the production build locally |
| `npm run preview:cloudflare` | Build and preview with Wrangler |
| `npm run deploy:cloudflare` | Build and deploy to Cloudflare Workers |
| `npm run check` | Run Astro checks |

## ☁️ Deployment

### Cloudflare Workers

```bash
npm run deploy:cloudflare
```

The Cloudflare adapter is configured with `prerenderEnvironment: 'node'` for static prerendering compatibility.

## 📂 Project Structure

```text
chy3xyz/
├── public/
│   ├── brand/          # Theme-aware CHY3 logo assets
│   ├── images/         # Site imagery
│   └── images-src/     # Source illustrations
├── src/
│   ├── components/     # React islands and UI sections
│   ├── content/        # Markdown content collections
│   │   ├── blog/
│   │   ├── insights/
│   │   ├── pages/
│   │   ├── projects/
│   │   └── roadmap/
│   ├── data/           # Site configuration and types
│   ├── layouts/        # Shared page and entry layouts
│   ├── lib/            # Content mapping and formatting utilities
│   ├── pages/          # File-based routes
│   └── styles/         # Global CSS and theme tokens
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.jsonc
```

## 📝 Content Management

All content is file-based in `src/content/`. Validated by `src/content.config.ts`.

### Projects

Path: `src/content/projects/`

Frontmatter: `title`, `summary`, `status`, `statusTone` (green/blue/gold), `icon` (box/code/zap), `order`, `repo`, `language`, `stars`

### Insights

Path: `src/content/insights/`

Frontmatter: `title`, `summary`, `category`, `readTime`, `publishedAt`, `image`

### Roadmap

Path: `src/content/roadmap/`

Frontmatter: `title`, `summary`, `status` (planned/in-progress/shipped), `quarter`, `order`

### Blog

Path: `src/content/blog/`

Frontmatter: `title`, `summary`, `publishedAt`, `author`, `desk`, `image`

### Pages

Path: `src/content/pages/`

Frontmatter: `title`, `summary`, `eyebrow`, `image`, `highlights`
