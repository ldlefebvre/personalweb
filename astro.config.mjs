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
  // Match Firebase Hosting (cleanUrls: true, trailingSlash: false) so the
  // canonical tags and sitemap point at the exact URLs that are served — no
  // redirect hop, no trailing-slash duplicates.
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    react(),
    mdx(),
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
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
