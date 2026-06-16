# Laurent Lefebvre — Portfolio

A world-class personal portfolio, repositioned around a **Software & Mobile
(iOS) Engineer** identity. Built as a fast, accessible, content-driven static
site with a few interactive islands.

**Live:** [laurentlefebvre.me](https://www.laurentlefebvre.me)

> The previous Ruby on Rails version of this site is preserved on the
> `legacy/rails` branch and the `rails-final-2026-06-15` tag.

---

## Stack

- **[Astro 5](https://astro.build)** — static output, islands architecture (near-zero JS by default)
- **React 19** — islands only where interactivity is needed (contact form, image lightbox)
- **[Tailwind CSS v4](https://tailwindcss.com)** — layered on CSS custom-property design tokens
- **[Motion](https://motion.dev)** — the case-study lightbox
- **Astro Content Collections** — project case studies as typed MDX
- **Self-hosted variable fonts** — Sora (display), Inter (text), JetBrains Mono (accents)
- **Firebase Hosting + Cloud Functions** — static hosting + the contact endpoint
- **[Resend](https://resend.com)** + **[Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)** — contact delivery + spam protection

See [`docs/PORTFOLIO_RESEARCH.md`](docs/PORTFOLIO_RESEARCH.md),
[`docs/PORTFOLIO_MASTER_PLAN.md`](docs/PORTFOLIO_MASTER_PLAN.md), and
[`docs/PORTFOLIO_TODO.md`](docs/PORTFOLIO_TODO.md) for the full rationale and plan.

## Requirements

- **Node 20.18+** (Node 22 LTS recommended). The repo was built/tested on Node 20.18.

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Project structure

```
src/
  components/       # .astro structure + .tsx islands (ui/, home/, work/, contact/, seo/)
  content/projects/ # one MDX case study per project (frontmatter + narrative)
  content.config.ts # typed schema for the projects collection
  data/             # site.ts, experience.ts, skills.ts, nav.ts (typed content)
  layouts/          # BaseLayout.astro
  pages/            # index.astro, work/index.astro, work/[slug].astro, 404.astro
  styles/           # tokens.css (design tokens) + global.css
  assets/images/    # optimized at build via Astro <Image>
  lib/images.ts     # lazy resolver for project imagery
functions/          # Firebase Cloud Function: contact form (Resend + Turnstile)
scripts/            # gen-assets.mjs (OG image/icons), shoot.mjs (screenshot QA)
docs/               # research paper, master plan, checklist
```

## Editing content

- **Identity / socials / contact** → `src/data/site.ts`
- **Experience timeline** → `src/data/experience.ts` *(confirm the placeholder dates)*
- **Skills** → `src/data/skills.ts`
- **Projects** → add/edit an `.mdx` file in `src/content/projects/`. Frontmatter
  holds structured data (stack, links, gallery, metrics); the body is the
  narrative. Gallery image paths are relative to `src/assets/images/project/`.

Regenerate the social/share image and app icons after a branding change:

```bash
node scripts/gen-assets.mjs
```

## Contact form

The static site POSTs to `/api/contact`, which Firebase Hosting rewrites to the
`sendContactEmail` Cloud Function (`functions/index.js`). The function validates
input, checks a honeypot + Cloudflare Turnstile, rate-limits by IP, and sends via
Resend with reply-to set to the sender.

Set the public Turnstile site key for the widget in a root `.env`:

```
PUBLIC_TURNSTILE_SITE_KEY=...
```

Set the backend secrets (not committed):

```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set TURNSTILE_SECRET_KEY
# and CONTACT_TO / CONTACT_FROM as function env (see .env.example)
```

## Deployment (Firebase)

1. Put your project id in `.firebaserc` (replace `REPLACE_WITH_FIREBASE_PROJECT_ID`).
2. `firebase login` and select the project.
3. `npm run build` then `firebase deploy` (Hosting + Functions).

CI/CD is wired in `.github/workflows/firebase-deploy.yml`:
PRs deploy a Hosting **preview channel**; pushes to `master` deploy Hosting (live)
and the Cloud Function. Configure repo secret `FIREBASE_SERVICE_ACCOUNT` and repo
variable `FIREBASE_PROJECT_ID`.

### DNS cutover (manual)

Keep the Heroku/Rails site live until parity is confirmed, then point
`laurentlefebvre.me` and `www` at Firebase Hosting via your domain registrar
(Firebase console → Hosting → Add custom domain provides the records).

## Accessibility & performance

Semantic landmarks, a skip link, visible focus states, WCAG-AA-tuned color
tokens, and full `prefers-reduced-motion` support. The landing page ships only a
few KB of JS up front; React/Motion load lazily and only where used. All imagery
is optimized to WebP/AVIF at build.
