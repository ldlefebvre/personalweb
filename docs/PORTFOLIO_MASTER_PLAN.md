# Portfolio World-Class Rebuild — Master Plan

This is the full, step-by-step plan to rebuild `laurentlefebvre.me` from a
primitive Rails/Bootstrap site into a world-class **Astro + React-islands**
portfolio on **Firebase**, repositioned around Laurent's **Software / Mobile
(iOS) Engineer** identity.

Read alongside:
- [PORTFOLIO_RESEARCH.md](PORTFOLIO_RESEARCH.md) — the "why" (best-practice research).
- [PORTFOLIO_TODO.md](PORTFOLIO_TODO.md) — the checkbox execution list.

Every step below states **what** we do and **why** it matters, so the reasoning
survives even if the executor changes.

---

## Decisions locked in

- **Stack:** Full rebuild on **Astro v5** (static output) + **React 19** islands.
- **Styling:** **Tailwind v4** layered on CSS-custom-property **design tokens**.
- **Motion:** **Motion** (Framer Motion) in islands + native **View Transitions**.
- **Hosting:** **Firebase Hosting** (static) + **Cloud Functions** for the
  contact endpoint; **Resend** for transactional email.
- **Positioning:** Lead as **Software / Mobile (iOS) Engineer**; small, tasteful
  personal layer; de-emphasize finance / sport-management / crypto.
- **Visual identity:** **Evolve** the existing teal + neon-green into a refined,
  accessible design system (keep the DNA, fix the craft).

---

## Target structure

```
personalweb/
  astro.config.mjs          # Astro + integrations (react, sitemap, mdx)
  tailwind.config.* / CSS    # Tailwind v4 (CSS-first config)
  tsconfig.json
  package.json
  firebase.json             # Hosting + rewrites to the contact function
  .firebaserc
  src/
    components/             # .astro structural + .tsx islands
      ui/                  # Button, Card, Section, Tag, Container primitives
      home/                # Hero, FeaturedWork, ExperienceTimeline, Skills, BeyondCode, ContactCTA
      work/                # ProjectCard, Gallery, Lightbox
      seo/                 # SEO head, JSON-LD
    content/
      projects/            # one MDX file per project (Sensium, EXAD, ...)
      config.ts            # content collection schemas (typed)
    data/                  # experience.ts, skills.ts, site.ts (typed data)
    layouts/               # BaseLayout.astro, ProjectLayout.astro
    pages/
      index.astro
      work/index.astro
      work/[slug].astro
      404.astro
    styles/
      tokens.css           # design tokens (colors, type, space, motion)
      global.css           # base/reset + Tailwind layers
    assets/
      images/project/...   # optimized imagery (migrated from Rails)
  functions/               # Firebase Cloud Functions (contact form)
  docs/                    # this plan + research + todo
```

The current Rails app is preserved on a `legacy/rails` branch and a
`rails-final-*` tag before any destructive change, so it remains fully
recoverable and live until cutover.

---

## Phase 0 — Foundation & safety

**Goal:** a running Astro project, with the old site safely preserved.

1. **Preserve Rails.** Create branch `legacy/rails` and tag `rails-final-<date>`
   from the current commit. *Why:* the live site must stay recoverable; we never
   destroy working production code without a snapshot.
2. **Scaffold Astro at repo root** with TypeScript (strict). Add integrations:
   `@astrojs/react`, `@astrojs/sitemap`, `@astrojs/mdx`, Tailwind v4
   (`@tailwindcss/vite`), and `motion`. *Why:* islands + content collections +
   built-in image/SEO tooling are the core of the performance and DX wins.
3. **Replace the trivial Rails `package.json`** and add an Astro-appropriate
   `.gitignore` (node_modules, dist, .firebase, .env). *Why:* clean Node project
   hygiene.
4. **Verify** `npm install` and `npm run dev` boot a blank page. *Why:* prove the
   toolchain before building on it.

**Exit criteria:** `npm run dev` serves a page; `npm run build` produces `dist/`.

---

## Phase 1 — Design system

**Goal:** the refined teal/green identity as reusable tokens + primitives.

1. **`src/styles/tokens.css`** — define semantic CSS custom properties:
   - Color: `--bg`, `--surface`, `--surface-2`, `--primary`, `--accent`,
     `--accent-soft`, `--text`, `--text-muted`, `--border`, `--ring`. Derived
     from the current palette (deep teal background, neon-green accent) but tuned
     to **WCAG AA**.
   - Typography: a **fluid type scale** with `clamp()` (`--step--1` … `--step-6`).
   - Space: a 4/8px scale (`--space-2xs` … `--space-3xl`).
   - Radii, shadows, and **motion tokens** (`--dur-*`, `--ease-*`).
   *Why:* one source of truth replaces hundreds of hardcoded `rgba()` literals and
   the dozens of brittle breakpoints.
2. **`src/styles/global.css`** — modern reset, base element styles, Tailwind
   layers, `:focus-visible` rings, selection colors, and a `prefers-reduced-motion`
   block. *Why:* accessible, consistent base.
3. **Self-host fonts** (one display + one text face) with `font-display: swap`.
   *Why:* removes the conflicting/unloaded font declarations and the render-blocking
   Google Fonts request.
4. **UI primitives** in `src/components/ui/`: `Container`, `Section`, `Button`,
   `Card`, `Tag`, `Pill`. *Why:* composable, consistent building blocks for every
   page.

**Exit criteria:** a tokens/primitives preview renders with consistent spacing,
type, color, and focus states.

---

## Phase 2 — Content model & asset migration

**Goal:** content is typed data, and all imagery is optimized.

1. **Content collections** (`src/content/config.ts`): a `projects` collection with
   a typed schema (title, slug, tagline, role, period, summary, problem,
   contributions, stack[], platforms[], links{}, featured, order, hero image,
   gallery[]). *Why:* type-safe, data-driven case studies instead of hardcoded
   ERB markup.
2. **Project MDX** under `src/content/projects/`: `sensium.mdx`, `exad.mdx`,
   `nouri.mdx`, `ripped-utopia.mdx`, `usf-sport-marketing.mdx`, `easyfind.mdx`,
   with copy ported and sharpened from the current site and the Sensium docs.
3. **Typed data** in `src/data/`: `experience.ts` (National Bank -> OpenLane ->
   Sensium), `skills.ts` (grouped by use case), `site.ts` (name, role, socials,
   email, resume URL). *Why:* single edit point; no markup duplication.
4. **Migrate + optimize imagery** from `app/assets/images/` into
   `src/assets/images/` so Astro can emit responsive AVIF/WebP. Convert
   `homevid.mov` to compressed **MP4 + WebM** with a poster. *Why:* the current
   multi-MB PNG galleries and `.mov` are the biggest performance liabilities.

**Exit criteria:** content queries return typed entries; images resolve through
Astro's optimizer.

---

## Phase 3 — Application shell

**Goal:** the global frame every page shares.

1. **`BaseLayout.astro`** — `<html lang>`, head (SEO slot), skip-link, semantic
   `header`/`main`/`footer`, View Transitions enabled. *Why:* accessible structure
   + cinematic page transitions at zero JS cost.
2. **Navbar** — a single responsive nav with a **working mobile menu** (an
   accessible disclosure island), active-link state, and a visible logo. *Why:*
   the current nav is hidden on home, has dead JS, and relies on magic-number
   margins; navigation is a core Usability axis.
3. **Footer** — social links, email, resume, copyright, back-to-top. *Why:*
   secondary navigation + conversion surface.
4. **A11y scaffolding** — skip-to-content link, focus management on route change,
   landmark roles. *Why:* WCAG baseline.

**Exit criteria:** nav works on mobile + desktop, keyboard accessible; transitions
animate; skip link functions.

---

## Phase 4 — Home page

**Goal:** the conversion-focused one-page narrative.

Sections, in order (each a component; islands hydrate lazily):
1. **Hero** — name, "Software & Mobile (iOS) Engineer," concise value prop,
   availability, primary CTAs (View work / Contact), subtle Motion entrance.
2. **Featured work** — Sensium (lead), EXAD, Nouri cards with impact one-liners +
   stack tags, scroll-revealed.
3. **Experience timeline** — National Bank -> OpenLane -> Sensium, impact-first.
4. **Skills** — grouped by use case (Mobile / Web-Backend / Data-Cloud /
   Tooling), *not* an icon wall.
5. **Beyond code** — one short, tasteful paragraph (WSET wine -> inspired
   Sensium; competitive sport) for memorability.
6. **Contact CTA** — clear next step into the contact form.

*Why this order:* mirrors the research — positioning first, proof second, story
third, conversion throughout.

**Exit criteria:** home communicates role + specialty in <6s; motion is purposeful
and reduced-motion-safe.

---

## Phase 5 — Work index & case studies

**Goal:** deep, scannable, quantified case studies.

1. **`/work`** — index grid of all projects (featured first), generated from the
   collection.
2. **`/work/[slug]`** — `ProjectLayout` renders each case study with the inverted-
   pyramid structure: impact headline, overview block (role/problem/stack/links),
   pivotal decisions, and an evidence layer of optimized galleries.
3. **Sensium first**, carrying its rich multi-platform galleries (iPhone, iPad,
   Mac, Watch, Vision Pro, Android, tablet, Chromebook, Wear OS) into an optimized,
   captioned gallery with a **keyboard-accessible lightbox** island (Esc/arrows,
   focus trap) — replacing the current document-wide listener approach.
4. **Cross-links** and prev/next navigation between projects.

**Exit criteria:** every project has a 400-800 word, metric-bearing case study with
working links and optimized media.

---

## Phase 6 — Contact backend

**Goal:** a reliable, spam-resistant contact form (no Rails mailer).

1. **`functions/`** — a Firebase Cloud Function `sendContactEmail` that validates
   input, checks a **honeypot** + **Cloudflare Turnstile**, **rate-limits** by IP,
   and sends via **Resend** to Laurent (with reply-to set to the sender). *Why:*
   modern deliverability + abuse protection vs. the old Gmail SMTP flow.
2. **Hosting rewrite** `/api/contact` -> the function in `firebase.json`. *Why:*
   same-origin endpoint, no CORS friction, clean URL.
3. **`ContactForm` island** — accessible labels, inline validation, optimistic
   pending state, success/error messaging, Turnstile widget. *Why:* the form is a
   primary conversion path and must feel trustworthy.
4. **Secrets** via Functions config / `.env` (never committed): `RESEND_API_KEY`,
   `TURNSTILE_SECRET_KEY`, `CONTACT_TO`, `CONTACT_FROM`.

**Exit criteria:** local emulator (or deployed) round-trips a test message; spam
controls active; secrets are not in git.

---

## Phase 7 — SEO, performance, accessibility

**Goal:** the measurable quality bar.

1. **SEO component** — per-page `<title>`/description, canonical, Open Graph +
   Twitter cards with a branded share image. *Why:* discoverability + link
   previews.
2. **JSON-LD** — `Person` (Laurent + sameAs socials) and `CreativeWork`/
   `SoftwareApplication` per project. *Why:* rich entity understanding.
3. **`@astrojs/sitemap`**, `robots.txt`, full **favicon set**. *Why:* crawlability.
4. **Performance pass** — audit island hydration directives, image formats/sizes,
   font loading, and defer non-critical JS; target **Lighthouse 95+/ideally
   99-100** on mobile.
5. **Accessibility audit** — contrast (AA), keyboard nav, focus order, `alt` text,
   reduced motion; fix findings.

**Exit criteria:** Lighthouse green across the board; manual a11y checks pass.

---

## Phase 8 — Deploy & cutover

**Goal:** live on Firebase, old site retired safely.

1. **`firebase.json` / `.firebaserc`** — Hosting (serve `dist/`), the function
   rewrite, cache headers, clean-URL config. *Why:* production hosting config.
2. **GitHub Actions CI** — build + deploy to a **preview channel** on PRs and to
   live on `master`. *Why:* safe, repeatable deploys with preview URLs.
3. **Parity check** — verify every page, link, image, and the contact flow against
   the old site. *Why:* no regressions at cutover.
4. **DNS cutover** — point `laurentlefebvre.me` (and `www`) from Heroku to
   Firebase Hosting; keep Rails live until DNS propagates and parity is confirmed.
   *(Requires registrar access — a documented manual step.)*
5. **Archive Rails** — move the Rails app aside (or rely on the `legacy/rails`
   branch) and **rewrite `README.md`** for the new Astro/Firebase project. *Why:*
   a clean, honest repo that itself reflects engineering quality.

**Exit criteria:** the Astro site serves on the production domain; contact form
works in production; README documents the new stack; Rails preserved.

---

## Manual steps that require Laurent (credentials/access)

These cannot be done from code alone and are flagged in the TODO:
- Firebase project selection/creation + `firebase login`.
- Resend account + **verified sending domain** + `RESEND_API_KEY`.
- Cloudflare **Turnstile** site/secret keys.
- DNS changes at the domain registrar for the Heroku -> Firebase cutover.
- A resume PDF to link/download.

Everything else is implemented in code and left ready to deploy.
