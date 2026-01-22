// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from "@tailwindcss/vite"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://armanyfelix.dev",
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [
      tailwind(),
    ],
},
adapter: cloudflare(),
})