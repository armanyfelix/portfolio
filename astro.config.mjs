// @ts-check

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server",
	site: "https://armanyfelix.dev",
	integrations: [sitemap(), react()],
	vite: {
		plugins: [tailwind()],
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true, // IMPORTANTE: Esto permite ver logs en dev
		},
		imageService: "compile",
	}),
});
