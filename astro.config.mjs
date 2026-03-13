// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server",
	site: "https://armanyfelix.dev",
	integrations: [sitemap(), react()],
	vite: {
		plugins: [tailwind()],
		ssr: {
			noExternal: ["gsap"],
		},
	},
	adapter: cloudflare({
		platformProxy: {
			enabled: true, // IMPORTANTE: Esto permite ver logs en dev
		},
		imageService: "compile",
	}),
	env: {
		schema: {
			EMAIL_SENDER: envField.string({ context: "server", access: "public" }),
			EMAIL_RECEIVER: envField.string({ context: "server", access: "secret" }),
			BREVO_API_KEY: envField.string({
				context: "server",
				access: "secret",
			}),
		},
	},
});
