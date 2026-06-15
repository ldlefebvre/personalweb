# Sensium Portfolio Integration — Master TODO

Granular checklist for featuring Sensium as the lead project. See
[`SENSIUM_INTEGRATION_MASTER_PLAN.md`](SENSIUM_INTEGRATION_MASTER_PLAN.md) for context.

Status legend: `[x]` done · `[ ]` open.

## Phase 1 — Assets
- [x] Create `app/assets/images/project/sensium/` with subfolders: `iphone`, `ipad`,
      `android`, `android-tablet`, `chromebook`, `mac`, `watch`, `wear`, `vision`.
- [x] Copy logo → `project/sensium_logo.png` (from `best_logo_512px_1mb.png`).
- [x] Copy iPhone 6.9" shots (`store_01..store_11`) → `sensium/iphone/`.
- [x] Copy iPad 13" shots (`store_01..store_10`) → `sensium/ipad/`.
- [x] Copy Android phone shots (`store_01..store_10`) → `sensium/android/`.
- [x] Copy Android tablet shots → `sensium/android-tablet/`.
- [x] Copy Chromebook shots → `sensium/chromebook/`.
- [x] Copy macOS shots (`mac_01..mac_13`) → `sensium/mac/`.
- [x] Copy Apple Watch shots (`watch_01..03`) → `sensium/watch/`.
- [x] Copy Wear OS shots (`wear_01..04`) + feature graphic → `sensium/wear/`.
- [x] Copy visionOS shots (`vision_01..05`) → `sensium/vision/`.
- [x] Copy Android feature graphic → `sensium/feature_graphic_1024x500.png`.

## Phase 2 — Feature box (`app/views/pages/project.html.erb`)
- [x] Add `.sensium-box` as the first child of `.project-container` (above EXAD).
- [x] Logo, name, tagline, and pitch copy.
- [x] Platform badge strip (10 platforms).
- [x] `View Web App` → https://sensium.wine.
- [x] App Store + Google Play "Coming Soon" pseudo-buttons.
- [x] `View Project Details` → `#sensium-details`.
- [x] Render `projects/sensium_details` before `exad_details`.

## Phase 3 — Detail partial (`app/views/projects/_sensium_details.html.erb`)
- [x] Hero card (garnet) with name, tagline, 3 iPhone shots + benefit-first overview.
- [x] Highlights/stats strip (1,534 grapes, 4 modes, 10 platforms, offline, privacy, premium).
- [x] "One brain, every screen" platform strip + KMP note.
- [x] Four Pillars: Train, Grapes, Compare, Blind (captioned iPhone shots + accurate copy).
- [x] "Beyond the Daily Loop": SAT Rebuild & Exam Mode + Premium & account.
- [x] iPad gallery — all 10 store states (captioned).
- [x] Mac gallery — all 13 surfaces (captioned).
- [x] Apple Watch gallery (captioned).
- [x] Wear OS gallery (captioned).
- [x] Apple Vision Pro gallery incl. immersive study room (captioned).
- [x] Android phone / Android tablet / Chromebook galleries — all 10 store states each (captioned).
- [x] "How each platform ships" availability table.
- [x] "Under the Hood" architecture card (feature graphic + tech tags + engineering summary).
- [x] `loading="lazy"` + `decoding="async"` on every gallery image (perf — section is default-open with ~85 images).
- [x] DRY: shared 10-state caption list reused across iPad/Android/tablet/Chromebook.
- [x] Prev/next nav buttons.

## Phase 4 — Stimulus + nav chain
- [x] `project_controller.js` default section → `sensium-details`.
- [x] EXAD left nav button → `#sensium-details`.
- [x] EasyFind right nav button → `#sensium-details` (loop).
- [x] Accessible click-to-zoom lightbox for all project detail screenshots (Esc / click-out
      to close, caption carried through; benefits every project, not just Sensium).

## Phase 5 — Styling
- [x] Create `app/assets/stylesheets/project/_sensium_details.scss` (garnet/cream brand).
- [x] `@import "sensium_details";` in `project/_index.scss`.
- [x] Style `.sensium-box`, platform badges, coming-soon buttons.
- [x] Style `#sensium-details` (cards, image grids, wide/watch/large variants, nav).

## Phase 6 — Documentation
- [x] `docs/SENSIUM_INTEGRATION_MASTER_PLAN.md`.
- [x] `docs/SENSIUM_INTEGRATION_TODO.md` (this file).

## Phase 7 — Verification
- [x] `ReadLints` clean on edited views, JS, and SCSS.
- [ ] Run `bin/rails server`, open `/project`, confirm Sensium is first and details render
      by default with no broken images. *(manual — run locally)*
- [ ] Spot-check responsive layout at mobile widths. *(manual — run locally)*

## Backlog / at launch
- [ ] Replace "Coming Soon" with live App Store + Google Play URLs.
- [ ] Optional: add a Sensium demo video to the feature box.
- [ ] Optional: add Vision Pro immersive `vision_04_study_room.png` once captured on a real headset.
