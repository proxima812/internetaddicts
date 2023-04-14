import { defineConfig } from "astro/config";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
 site: "https://internetaddicts.ru",
 integrations: [
  mdx(),
  partytown({
   config: { debug: false },
  }),
  sitemap(),
 ],
});
