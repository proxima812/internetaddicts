import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
 site: "https://internetaddicts.ru",
 integrations: [
  mdx(),
  partytown({
   config: {
    forward: ["dataLayer.push"],
   },
  }),
  sitemap(),
  tailwind({
   applyBaseStyles: false,
  }),
  compress(),
  image({
   serviceEntryPoint: "@astrojs/image/sharp",
   logLevel: "debug",
  }),
 ],
 markdown: {
  remarkPlugins: [
   [
    remarkToc,
    {
     heading: "Содержание",
    },
   ],
  ],
 },
});
