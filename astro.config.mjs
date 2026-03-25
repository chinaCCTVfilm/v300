// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  site: 'https://v300-0nz.pages.dev',   // 改成你的自定义域名
  trailingSlash: 'ignore',
});