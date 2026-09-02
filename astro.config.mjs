import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://paranjapeblueridge.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory'
  },
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['lucide-react', 'clsx', 'tailwind-merge'],
    },
  },
});
