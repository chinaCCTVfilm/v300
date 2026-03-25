import { defineConfig } from 'astro/config';
import tailwind, tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwind(), tailwindcss()],
  },
  output: 'static',
  site: 'https://v300-0nz.pages.dev/',   // 改成你的真实自定义域名
  trailingSlash: 'ignore',
});