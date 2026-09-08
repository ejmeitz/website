import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { redirects } from './src/data/redirects.mjs';

const base = (process.env.BASE_PATH || '/website').replace(/\/$/, '');
const excluded = new Set(Object.keys(redirects).map(route => `${base}/${route}/`));

export default defineConfig({
  site: process.env.SITE_URL || 'https://ejmeitz.github.io',
  base: process.env.BASE_PATH || '/website',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') && !excluded.has(new URL(page).pathname) })],
  devToolbar: { enabled: false },
});
