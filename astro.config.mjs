// @ts-check
import cloudflare from '@astrojs/cloudflare';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const deployTarget = process.env.ASTRO_DEPLOY_TARGET;

const adapter =
  deployTarget === 'vercel'
    ? vercel()
    : deployTarget === 'cloudflare'
      ? cloudflare({
          imageService: 'compile',
          prerenderEnvironment: 'node',
        })
      : undefined;

export default defineConfig({
  site: 'https://chy3.xyz',
  ...(adapter ? { adapter } : {}),
  integrations: [react()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
