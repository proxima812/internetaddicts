import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
 site: "https://internetaddicts.ru",
 compressHTML: true,
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
