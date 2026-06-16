/*
  One-off asset generator: builds the social share image and the PNG
  apple-touch-icon from inline SVG using sharp.
  Run:  node scripts/gen-assets.mjs
*/
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const ACCENT = "#2ee6a6";
const ACCENT2 = "#6ff4cb";
const BG = "#061a17";
const BG2 = "#04120f";

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BG}"/>
      <stop offset="1" stop-color="${BG2}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${ACCENT2}"/>
      <stop offset="1" stop-color="${ACCENT}"/>
    </linearGradient>
    <radialGradient id="orb" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1080" cy="90" r="320" fill="url(#orb)"/>
  <rect x="2" y="2" width="1196" height="626" rx="28" fill="none" stroke="#1b463f" stroke-width="2"/>
  <g font-family="Helvetica, Arial, sans-serif">
    <circle cx="92" cy="92" r="10" fill="${ACCENT}"/>
    <text x="116" y="100" fill="#a4c8bd" font-size="26" font-weight="600" letter-spacing="6">LAURENT LEFEBVRE</text>
    <text x="90" y="300" fill="#e9f8f2" font-size="86" font-weight="700">Software &amp; Mobile</text>
    <text x="90" y="396" fill="url(#accent)" font-size="86" font-weight="700">(iOS) Engineer</text>
    <text x="90" y="476" fill="#a4c8bd" font-size="30" font-weight="400">Polished, cross-platform mobile products — shipped end to end.</text>
    <text x="90" y="566" fill="#6f968c" font-size="24" font-weight="500" letter-spacing="1">laurentlefebvre.me</text>
  </g>
</svg>`;

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

await mkdir("public/og", { recursive: true });

await sharp(Buffer.from(ogSvg)).png().toFile("public/og/default.png");
console.log("✓ public/og/default.png");

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
