import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

export default defineConfig({
    site: "https://internetaddicts.ru/",
    prefetch: {
        defaultStrategy: "viewport",
    },
    integrations: [solid(), mdx(), sitemap(), icon(), keystatic(), react()],
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: vercel(),
    output: "static",
});