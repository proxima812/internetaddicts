import markdoc from "@astrojs/markdoc"
import mdx from "@astrojs/mdx"
import netlify from "@astrojs/netlify/functions"
import partytown from "@astrojs/partytown"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import keystatic from "@keystatic/astro"
import { defineConfig } from "astro/config"
import { SITE_URL } from "./src/consts"

// https://astro.build/config
export default defineConfig({
	site: `${SITE_URL}`,
	integrations: [
		react(),
		markdoc(),
		keystatic(),
		mdx(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		sitemap({
			filter: page => page !== `${SITE_URL}/keystatic/`,
		}),
		tailwind({
			applyBaseStyles: false,
		}),
	],
	output: "hybrid",
	adapter: netlify(),
})
