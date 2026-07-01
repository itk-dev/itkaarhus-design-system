# ITK Aarhus Design System

The shared visual design system from **ITK Aarhus** for the digital products it
builds for Aarhus Kommune — one palette, one type stack, one set of primitives,
used from public sites down to internal tools. Aarhus Kommune is the institutional
brand, expressed quietly as a footer endorsement; each product carries its own name
in the header.

> **Live preview:** <https://itk-dev.github.io/itkaarhus-design-system/>

The reference site is built with [Astro](https://astro.build) so it can be served
locally with a single command. The tokens themselves are still plain CSS — one
file you can drop into any project, no framework required.

## Files

- `public/tokens.css` — the single source of truth: CSS custom properties (colors, type scale, spacing, radii, shadows, focus). Consuming apps mirror these tokens into their own runtime CSS — keep them in sync when tokens change.
- `src/layouts/Layout.astro` — shared page shell: the persistent left **sidebar** and the `<head>` (fonts, favicon, `tokens.css`).
- `src/styles/sidebar.css` — sidebar styling (replaces the old top-bar `ds-nav.css`).
- `src/pages/index.astro` — overview page with previews of every section.
- `src/pages/colors.astro` — palette, color scales, and usage rules.
- `src/pages/typography.astro` — Inter + Newsreader (system monospace).
- `src/pages/spacing.astro` — 4px-base spacing, radii, elevation.
- `src/pages/logo.astro` — Aarhus Kommune endorsement mark, product header lockup, clear space, misuse.
- `src/pages/components.astro` — buttons, tags & status, inputs, cards, callouts, stats, editorial type, KPI cards, graphs & diagrams, expandable table, timeline, nav, breadcrumb.
- `src/scripts/chart-theme.ts` — shared Chart.js theme: reads the `--itkaarhus-*` tokens at runtime and exposes the categorical palette + defaults (flat fills, no gradients).
- `src/pages/examples/*.astro` — thin wrappers that iframe each applied example, keeping the sidebar in place.
- `public/examples/` — the standalone example documents (a fictional "Mit Aarhus" municipal product): `website-landing.html`, `website-content.html`, `website-about.html`, `app-dashboard.html`, `app-data-tables.html`, `app-statistics.html`, plus shared `site.css` (public site chrome) and `app.css` (logged-in app shell).
- `public/assets/logos/` — the Aarhus Kommune marks (`AAK_02_*.svg`) + favicon (`aak-favicon.ico`).
- `public/assets/lucide-sprite.svg` — the Lucide icon set used by the system.

## Color palette

Two brand colours, four state colours, and a neutral gray scale. Every colour
ships a **50→900 scale** (`-50` lightest → `-900` darkest); `500` is the base hue.

| Scale | Base hex | Role |
|---|---|---|
| `--itkaarhus-blue-*` | `#007BA6` | **Primary** — links, primary buttons, focus, active state |
| `--itkaarhus-coral-*` | `#FF5F31` | **Secondary** — warm complement; highlights, editorial accents (not an error colour) |
| `--itkaarhus-info-*` | `#00A5CD` | State — informational |
| `--itkaarhus-success-*` | `#008D3D` | State — success / "active" |
| `--itkaarhus-warning-*` | `#F5B800` | State — warning |
| `--itkaarhus-danger-*` | `#CC1F33` | State — danger, errors (a true cool red, kept distinct from coral; sharp and rare) |
| `--itkaarhus-gray-*` | — | Neutral — text, surfaces, borders (`50`→`900`; numbered only) |

`--itkaarhus-white` is true white for page backgrounds. Role aliases:
`--itkaarhus-primary` (+ `-hover`), `--itkaarhus-secondary`, and
`--itkaarhus-{info,success,warning,danger}` — each state with a `*-soft` surface
tint for badges/alerts.

## Type

- **Display, UI & body:** `Inter` 400/500/600/700 — app chrome, dense dashboards,
  long-form prose, and small text.
- **Serif (editorial):** `Newsreader` — opt-in for website-style surfaces
  (heroes, overviews, KPI numbers) via `--itkaarhus-font-serif`. Not for app chrome.
- **Mono:** system default (`ui-monospace, …`) — the DS ships no web monospace font.
- Scale (px): 12, 14, 16, 18, 22, 28, 36, 48, 64, 88
- **Eyebrows:** plain uppercase labels in app chrome; the leading rule ("the dash")
  is reserved for the editorial / serif voice.
- Tone: Danish-first, calm, gov-grade. Negative letter-spacing on display sizes.

## Icons

- **Lucide** line icons (24px viewBox, `currentColor`, stroke 2). The icon set
  ships as `public/assets/lucide-sprite.svg` — reference a symbol with
  `<svg class="icon"><use href="assets/lucide-sprite.svg#lucide-NAME"></use></svg>`
  (resolve the path against the site base).
  Don't hand-roll SVG paths. (Consuming apps may wrap this in their own helper —
  e.g. a `{{ ui.icon('name') }}` Twig macro — but the sprite is the source.)

## Graphs & diagrams

- **Charts use [Chart.js](https://www.chartjs.org/)** (bar, line/area, donut,
  sparkline), themed from the tokens at runtime via `src/scripts/chart-theme.ts`
  (it reads `--itkaarhus-*` off `:root`). **Flat fills only — no gradients** —
  drawn from the categorical palette: blue, coral, info, success, warning, gray.
- **Heatmaps and progress/meter bars are hand-rolled CSS** (no library) —
  intensity uses the blue scale (`blue-100` → `blue-500`).
- Astro pages bundle Chart.js via `import 'chart.js/auto'`. The standalone
  `public/examples/` pages load a vendored copy at `examples/vendor/chart.umd.min.js`,
  copied from the npm dependency by `npm run sync:vendor` (run automatically on
  `dev`/`build`; the `vendor/` dir is git-ignored).
- Canvas charts carry an `aria-label` summary, since canvas content isn't
  readable by assistive tech.

## Principles

- Clarity over cleverness — calm, gov-grade, long-form Danish.
- Blue leads, coral accents sparingly, state colours carry meaning, red stays sharp and rare.
- No emoji, no illustrative SVG, **no gradient backgrounds** — flat brand fills only.
- The palette **is** the expression — let the colours do the lifting.

## Viewing locally

Install dependencies once, then start the dev server:

```sh
npm install
npm run dev
# then visit the printed URL (http://localhost:4321/itkaarhus-design-system/)
```

To build the static site and preview the production output:

```sh
npm run build    # outputs to dist/
npm run preview
```

The site is served under the `/itkaarhus-design-system/` base path (matching
GitHub Pages), configured in `astro.config.mjs`.

## Publishing

`main` is continuous — merge PRs into it freely; **merging does not deploy.** A
release is shipped by **pushing a bare-semver tag** (e.g. `0.2.0`), which triggers
`.github/workflows/pages.yml` to build the Astro site on Node 22 and deploy `dist/`
to GitHub Pages → <https://itk-dev.github.io/itkaarhus-design-system/>.

To cut a release once `main` holds the changes you want to ship:

```sh
git checkout main && git pull --ff-only
# roll CHANGELOG [Unreleased] → [<tag>] - <date>, bump VERSION + package.json, commit (via a PR)
git tag 0.2.0            # bare semver, no "v" prefix — match the existing tags
git push origin 0.2.0    # this is the release; it triggers the deploy
```

> **Repo setting (one-time):** the deploy runs in the `github-pages` environment,
> which restricts *which refs may deploy*. Because we deploy from tags, that
> environment must allow tag refs — under **Settings → Environments → github-pages
> → Deployment branches and tags**, add a tag rule matching `*.*.*` (alongside the
> `main` branch). Without it, a tagged deploy is rejected with *"Tag … is not
> allowed to deploy to github-pages due to environment protection rules"* before
> the build even starts. This lives in repo settings, not in `pages.yml`.

Tag naming and the changelog/version bump follow the ITK Dev release flow — see the
`/itkdev-release` skill. A manual `workflow_dispatch` run is available as a fallback.
