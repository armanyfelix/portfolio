// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from "@tailwindcss/vite"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import node from "@astrojs/node"

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://armanyfelix.dev",
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [
      tailwind(),
    ],
    // resolve: {
      // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      // alias: {
        // Mapear TODAS las importaciones problemáticas de roughjs
        // 'roughjs/bin/rough': 'roughjs/bin/rough.js',
        // 'roughjs/bin/fillers/hachure-filler': 'roughjs/bin/fillers/hachure-filler.js',
        // 'roughjs/bin/fillers/zigzag-line-filler': 'roughjs/bin/fillers/zigzag-line-filler.js',
        // 'roughjs/bin/fillers/hatch-filler': 'roughjs/bin/fillers/hatch-filler.js',
        // 'roughjs/bin/fillers/dot-filler': 'roughjs/bin/fillers/dot-filler.js',
        // 'roughjs/bin/fillers/dashed-filler': 'roughjs/bin/fillers/dashed-filler.js',
        // 'roughjs/bin/fillers/zigzag-filler': 'roughjs/bin/fillers/zigzag-filler.js',
        // Si hay más errores, puedes usar este patrón genérico
    //     'roughjs/bin/': 'roughjs/bin/',
    //   }
    // },
    // ssr: {
    //   noExternal: ['roughjs', '@excalidraw/excalidraw']
    // }
},
adapter: node({
  mode: "standalone",
}),
})
