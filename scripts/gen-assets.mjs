/*
  Asset generator: builds social share images (Open Graph cards), the PNG
  icons, and a stable public headshot from inline SVG using sharp.

  - public/og/default.png        → site-wide share card (home, /work, fallback)
  - public/og/<slug>.png         → one branded card per project case study
  - public/laurent-lefebvre.jpg  → stable headshot URL for Person schema
  - public/apple-touch-icon.png  → 180x180 icon
  - public/favicon-32.png        → 32x32 icon

  Run:  node scripts/gen-assets.mjs
*/
import sharp from "sharp";
import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ACCENT = "#2ee6a6";
const ACCENT2 = "#6ff4cb";
const BG = "#061a17";
const BG2 = "#04120f";
const EYEBROW = "#a4c8bd";
const MUTED = "#6f968c";
const LIGHT = "#e9f8f2";

const PROJECTS_DIR = "src/content/projects";

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Lighten a #rrggbb color toward white by `t` (0..1) for legibility on dark bg.
function lighten(hex, t) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return ACCENT;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (c) => Math.round(c + (255 - c) * t);
  const to2 = (c) => c.toString(16).padStart(2, "0");
  return `#${to2(mix(r))}${to2(mix(g))}${to2(mix(b))}`;
}

function card({ eyebrow, titleLines, subtitle, meta, footer, accent }) {
  const a1 = lighten(accent, 0.62);
  const a2 = lighten(accent, 0.3);
  const titleSize = titleLines.some((l) => l.length > 12) ? 66 : 84;
  const titleStartY = titleLines.length > 1 ? 286 : 318;
  const titleEls = titleLines
    .map(
      (line, i) =>
        `<text x="90" y="${titleStartY + i * (titleSize + 8)}" fill="${
          i === titleLines.length - 1 ? "url(#accent)" : LIGHT
        }" font-size="${titleSize}" font-weight="700" letter-spacing="-1">${esc(line)}</text>`,
    )
    .join("\n    ");

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BG}"/>
      <stop offset="1" stop-color="${BG2}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${a1}"/>
      <stop offset="1" stop-color="${a2}"/>
    </linearGradient>
    <radialGradient id="orb" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1080" cy="90" r="340" fill="url(#orb)"/>
  <rect x="2" y="2" width="1196" height="626" rx="28" fill="none" stroke="#1b463f" stroke-width="2"/>
  <g font-family="Helvetica, Arial, sans-serif">
    <circle cx="92" cy="92" r="10" fill="${lighten(accent, 0.55)}"/>
    <text x="116" y="100" fill="${EYEBROW}" font-size="24" font-weight="600" letter-spacing="5">${esc(
      eyebrow,
    )}</text>
    ${titleEls}
    ${
      subtitle
        ? `<text x="90" y="${titleStartY + titleLines.length * (titleSize + 8) + 26}" fill="${EYEBROW}" font-size="30" font-weight="400">${esc(
            subtitle,
          )}</text>`
        : ""
    }
    ${
      meta
        ? `<text x="90" y="556" fill="${MUTED}" font-size="23" font-weight="500" letter-spacing="0.5">${esc(
            meta,
          )}</text>`
        : ""
    }
    <text x="1110" y="556" text-anchor="end" fill="${MUTED}" font-size="22" font-weight="500" letter-spacing="0.5">${esc(
      footer,
    )}</text>
  </g>
</svg>`;
}

// Minimal YAML frontmatter reader for the fields we need.
function frontmatter(raw) {
  const m = /^---\s*([\s\S]*?)\s*---/.exec(raw);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([a-zA-Z0-9_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[kv[1]] = v;
  }
  return out;
}

await mkdir("public/og", { recursive: true });

// ---- Site-wide default card (home, /work, fallback) -----------------------
const defaultSvg = card({
  eyebrow: "LAURENT LEFEBVRE",
  titleLines: ["Software & Mobile", "Engineer"],
  subtitle: "Polished, cross-platform mobile apps — shipped end to end.",
  meta: "iOS · Kotlin Multiplatform · Flutter · Full-Stack",
  footer: "laurentlefebvre.me",
  accent: ACCENT,
});
await sharp(Buffer.from(defaultSvg)).png().toFile("public/og/default.png");
console.log("✓ public/og/default.png");

// ---- Per-project case-study cards -----------------------------------------
const files = (await readdir(PROJECTS_DIR)).filter((f) => f.endsWith(".mdx"));
for (const file of files) {
  const slug = path.basename(file, ".mdx");
  const fm = frontmatter(await readFile(path.join(PROJECTS_DIR, file), "utf8"));
  const meta = [fm.role, fm.period].filter(Boolean).join("  ·  ");
  const svg = card({
    eyebrow: "CASE STUDY · LAURENT LEFEBVRE",
    titleLines: [fm.title ?? slug],
    subtitle: fm.tagline ?? "",
    meta,
    footer: `laurentlefebvre.me/work/${slug}`,
    accent: fm.accent || ACCENT,
  });
  await sharp(Buffer.from(svg)).png().toFile(`public/og/${slug}.png`);
  console.log(`✓ public/og/${slug}.png`);
}

// ---- Stable headshot URL for Person structured data -----------------------
await sharp("src/assets/images/me.jpg")
  .resize(640, 640, { fit: "cover", position: "top" })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("public/laurent-lefebvre.jpg");
console.log("✓ public/laurent-lefebvre.jpg");

// ---- Icons ----------------------------------------------------------------
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${ACCENT2}"/>
      <stop offset="1" stop-color="${ACCENT}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="${BG}"/>
  <path d="M20 16 h7 v25 h14 v7 H20 Z" fill="url(#g)"/>
</svg>`;

await sharp(Buffer.from(iconSvg), { density: 384 })
  .resize(180, 180)
  .png()
  .toFile("public/apple-touch-icon.png");
console.log("✓ public/apple-touch-icon.png");

await sharp(Buffer.from(iconSvg), { density: 384 })
  .resize(32, 32)
  .png()
  .toFile("public/favicon-32.png");
console.log("✓ public/favicon-32.png");
