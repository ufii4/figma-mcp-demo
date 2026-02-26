// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ufii4.github.io',
  base: '/figma-mcp-demo',
  integrations: [mdx(), sitemap()],
});
