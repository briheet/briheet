// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: {
      excludeLangs: ["mermaid"],
    },
  },
  site: "https://www.briheet.com",
  base: "/",
  trailingSlash: "ignore",
});
