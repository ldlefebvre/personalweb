/*
  Post-build cleanup: Astro's image glob emits the original PNG/JPG sources into
  dist/_astro even though the HTML only ever references the optimized WebP
  variants. This prunes any source image that no built HTML references, so the
  deploy ships only what visitors actually load.
*/
import { readFileSync, readdirSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const ASSETS = join(DIST, "_astro");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const html = walk(DIST)
  .filter((f) => f.endsWith(".html"))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");

let removed = 0;
let bytes = 0;
for (const name of readdirSync(ASSETS)) {
  if (!/\.(png|jpe?g)$/i.test(name)) continue;
  if (!html.includes(name)) {
    const p = join(ASSETS, name);
    bytes += statSync(p).size;
    rmSync(p);
    removed++;
  }
}

console.log(
  `[clean-dist] pruned ${removed} unreferenced source image(s), freed ${(bytes / 1e6).toFixed(1)} MB`,
);
