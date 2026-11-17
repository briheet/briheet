// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { shiftHeadings } from "./src/lib/shift-headings.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  image: {
    // Post images are converted to webp and get a responsive srcset.
    layout: "constrained",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: satteri({ mdastPlugins: [shiftHeadings] }),
    syntaxHighlight: {
      excludeLangs: ["mermaid"],
    },
  },
  site: "https://www.briheet.com",
  base: "/",
  trailingSlash: "ignore",
});
