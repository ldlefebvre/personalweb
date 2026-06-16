// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build
export default defineConfig({
  site: "https://www.laurentlefebvre.me",
  output: "static",
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Allow optimizing a small set of trusted remote logos if ever needed.
    remotePatterns: [{ protocol: "https" }],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
