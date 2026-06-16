# Portfolio Rebuild — Execution Checklist

Granular, checkable tasks mirroring [PORTFOLIO_MASTER_PLAN.md](PORTFOLIO_MASTER_PLAN.md).
Check items off as they ship. Items marked **(manual)** require Laurent's
credentials/access.

## Phase 0 — Foundation & safety
- [ ] Create `legacy/rails` branch from current commit
- [ ] Tag `rails-final-<date>`
- [ ] Scaffold Astro project at repo root (TypeScript strict)
- [ ] Add integrations: `@astrojs/react`, `@astrojs/sitemap`, `@astrojs/mdx`
- [ ] Add Tailwind v4 (`@tailwindcss/vite`) and `motion`
- [ ] Replace Rails `package.json`; add Astro-appropriate `.gitignore`
- [ ] `npm install` succeeds
- [ ] `npm run dev` boots a page
- [ ] `npm run build` produces `dist/`

## Phase 1 — Design system
- [ ] `src/styles/tokens.css` — color tokens (AA-tuned teal/green)
- [ ] Fluid type scale (`clamp()`)
- [ ] Spacing scale (4/8px)
- [ ] Radii / shadow / motion tokens
- [ ] `src/styles/global.css` — reset, base, focus-visible, reduced-motion
- [ ] Self-host display + text fonts (`font-display: swap`)
- [ ] UI primitives: `Container`, `Section`, `Button`, `Card`, `Tag`, `Pill`
- [ ] Tokens/primitives preview verified

## Phase 2 — Content model & assets
- [ ] `src/content/config.ts` — `projects` collection schema (typed)
- [ ] `sensium.mdx`
- [ ] `exad.mdx`
- [ ] `nouri.mdx`
- [ ] `ripped-utopia.mdx`
- [ ] `usf-sport-marketing.mdx`
- [ ] `easyfind.mdx`
- [ ] `src/data/experience.ts` (National Bank -> OpenLane -> Sensium)
- [ ] `src/data/skills.ts` (grouped by use case)
- [ ] `src/data/site.ts` (name, role, socials, email, resume)
- [ ] Migrate imagery into `src/assets/images/` (optimized)
- [ ] Convert `homevid.mov` -> MP4 + WebM + poster
- [ ] Image references resolve via Astro optimizer

## Phase 3 — Application shell
- [ ] `BaseLayout.astro` (lang, head/SEO slot, landmarks, View Transitions)
- [ ] Skip-to-content link
- [ ] Responsive navbar with working mobile menu (accessible island)
- [ ] Active-link state + visible logo
- [ ] Footer (socials, email, resume, back-to-top)
- [ ] Focus management across route changes
- [ ] Keyboard + mobile nav verified

## Phase 4 — Home page
- [ ] Hero (role, value prop, availability, CTAs, Motion entrance)
- [ ] Featured work (Sensium / EXAD / Nouri) with impact lines + tags
- [ ] Experience timeline (impact-first)
- [ ] Skills grouped by use case (no icon wall)
- [ ] Beyond-code (short personal layer)
- [ ] Contact CTA
- [ ] Scroll reveals are reduced-motion-safe
- [ ] "Role + specialty understood in <6s" sanity check

## Phase 5 — Work index & case studies
- [ ] `/work` index grid (featured first)
- [ ] `ProjectLayout` (inverted-pyramid case-study structure)
- [ ] `/work/[slug]` pages generated from collection
- [ ] Sensium multi-platform optimized galleries
- [ ] Keyboard-accessible lightbox island (Esc/arrows, focus trap)
- [ ] Prev/next + cross-links between projects
- [ ] Each case study 400-800 words with >=1 metric + working links

## Phase 6 — Contact backend
- [ ] `functions/` Cloud Function `sendContactEmail`
- [ ] Input validation + honeypot
- [ ] Cloudflare Turnstile verification
- [ ] Rate limiting
- [ ] Resend integration (reply-to = sender)
- [ ] `firebase.json` rewrite `/api/contact` -> function
- [ ] `ContactForm` island (a11y, validation, pending/success/error)
- [ ] **(manual)** Set secrets: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `CONTACT_TO/FROM`
- [ ] Round-trip a test message (emulator or deployed)

## Phase 7 — SEO / performance / accessibility
- [ ] SEO component (title/description/canonical/OG/Twitter)
- [ ] Branded OG share image
- [ ] JSON-LD `Person` + per-project `CreativeWork`/`SoftwareApplication`
- [ ] `@astrojs/sitemap` + `robots.txt`
- [ ] Full favicon set
- [ ] Performance pass (hydration directives, images, fonts, deferred JS)
- [ ] Lighthouse 95+ (target 99-100) on mobile
- [ ] Accessibility audit (contrast AA, keyboard, focus, alt, reduced motion)

## Phase 8 — Deploy & cutover
- [ ] `firebase.json` + `.firebaserc` (Hosting, rewrite, cache headers, clean URLs)
- [ ] GitHub Actions CI (PR preview channel + live on master)
- [ ] Parity check vs. old site (pages, links, images, contact)
- [ ] **(manual)** `firebase login` + project select/create
- [ ] **(manual)** DNS cutover `laurentlefebvre.me` + `www` Heroku -> Firebase
- [ ] Archive Rails app (rely on `legacy/rails` branch)
- [ ] Rewrite `README.md` for the Astro/Firebase project
- [ ] Production smoke test (site + contact form)

## Manual prerequisites (Laurent)
- [ ] **(manual)** Firebase project + billing (for SSR/functions)
- [ ] **(manual)** Resend account + verified sending domain
- [ ] **(manual)** Cloudflare Turnstile keys
- [ ] **(manual)** Resume PDF to link/download
