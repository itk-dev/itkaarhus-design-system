# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Reworked the Components page: buttons split into variants × sizes × states with
  token-aligned colours (the danger variant replaces the old "accent"); inputs gained
  a custom select caret with proper spacing plus checkbox, radio, and toggle controls;
  card footers use the sans font instead of mono.
- Consolidated "Tags & status" and "Semantic badges" into one `.itkaarhus-tag`
  component with semantic role modifiers (soft `-100` surface + dark text). Tag text
  steps were chosen for AA contrast (≥ 4.5:1); dropped the removed mint/lime variants.
- Added per-section sub-items under **Components** in the sidebar, shown when that
  page is active.

- Replaced the type stack: **Inter** (was Inter Tight) for sans/display, **Newsreader**
  (was Source Serif 4) for the opt-in editorial serif. Dropped the bundled monospace
  font — `--itkaarhus-font-mono` now resolves to the system default.
- Reworked the overview and typography pages to fit the design system's purpose
  (internal tools for Aarhus Kommune staff and collaborators) rather than the legacy
  public-site framing.
- Defined the **eyebrow** convention: a plain uppercase label in app chrome; the
  leading rule ("the dash") is reserved for the editorial / serif voice.

- Migrated the reference site to **Astro** so it can be served locally
  (`npm run dev`) and built for deploy. Pages are now `.astro` files under
  `src/pages/` sharing a layout; tokens and the applied example stay plain
  static files in `public/`.
- Replaced the top-bar navigation with a **persistent left sidebar** that sits
  in the same place on every page, with grouped links and active-page state.
- The applied example now loads in an **iframe** on its own page, so the
  sidebar stays visible while browsing the full demo site.
- GitHub Pages now deploys the Astro build output (`dist/`) instead of the repo root.

- **Breaking:** renamed CSS tokens from `--itk-*` to `--itkaarhus-*` and component
  classes from `.itk-*` to `.itkaarhus-*`. Consuming apps that mirror these must re-sync.
- **Breaking:** consolidated the colour palette. Removed the supporting hues
  (`aqua`, `mint`, `lime`) and the standalone `green`; renamed neutrals
  `ink`/`paper`/`slate-*` → `gray-{50..900}` + `white`, and the state colours
  `cyan`/`green`/`amber`/`red` → `info`/`success`/`warning`/`danger`. The palette is
  now blue + coral (brand), four state colours, and one gray scale — each a full
  50→900 scale. Rebuilt the Colors reference page with elaborated usage guidance.
- Rebranded away from ITK: Aarhus Kommune now appears only as a quiet footer
  endorsement, and the header uses a small product emblem + a `[Product name]`
  placeholder.
- **Removed** all ITK logo assets (`itk-*.png`, `alt/`) and references — the ITK
  marks are no longer part of the design system.
- Bumped GitHub Pages workflow actions off the deprecated Node 20 runtime
  (`checkout@v5`, `upload-pages-artifact@v4`).

### Added

- Initial extraction of the **Aarhus Kommune Design System** from the `itk-workspace`
  project into its own repository, so it can be iterated on and published
  independently (GitHub Pages).
- `tokens.css` — design tokens as CSS custom properties: brand palette with a
  blue primary, coral secondary, state colours, and 50→900 shade ramps;
  neutral scale; type stack (Inter Tight + Source Serif 4 + JetBrains Mono);
  spacing, radii, elevation, focus ring.
- `index.html` — landing page / entry point.
- `tokens/` — reference pages: colors (palette + ramps), typography (sans +
  serif specimen), spacing & elevation, logo, components.
- `examples/website.html` — applied example on a public website.
- `assets/logos/` — Aarhus Kommune marks + favicon; `assets/lucide-sprite.svg` — the Lucide icon set.
- GitHub Actions workflow to deploy the static site to GitHub Pages on push to `main`.
