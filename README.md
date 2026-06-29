# Aarhus Kommune Design System

The shared visual design system for digital products in **Aarhus Kommune** — one
palette, one type stack, one set of primitives, used from public sites down to
internal tools. Aarhus Kommune is the institutional brand, expressed quietly as a
footer endorsement; each product carries its own name in the header.

> **Live preview:** <https://itk-dev.github.io/itkaarhus-design-system/>

The reference site is built with [Astro](https://astro.build) so it can be served
locally with a single command. The tokens themselves are still plain CSS — one
file you can drop into any project, no framework required.

## Files

- `public/tokens.css` — the single source of truth: CSS custom properties (colors, type scale, spacing, radii, shadows, focus). Consuming apps mirror these tokens into their own runtime CSS — keep them in sync when tokens change.
- `src/layouts/Layout.astro` — shared page shell: the persistent left **sidebar** and the `<head>` (fonts, favicon, `tokens.css`).
- `src/styles/sidebar.css` — sidebar styling (replaces the old top-bar `ds-nav.css`).
- `src/pages/index.astro` — overview page with previews of every section.
- `src/pages/colors.astro` — palette, shade ramps, and usage rules.
- `src/pages/typography.astro` — Inter + Newsreader (system monospace).
- `src/pages/spacing.astro` — 4px-base spacing, radii, elevation.
- `src/pages/logo.astro` — Aarhus Kommune endorsement mark, product header lockup, clear space, misuse.
- `src/pages/components.astro` — buttons, tags, inputs, cards, callouts, stats, editorial type, KPI cards, semantic badges, expandable table, timeline, nav, breadcrumb.
- `src/pages/applied.astro` — wraps the full reference site in an iframe, keeping the sidebar in place.
- `public/website.html` — full reference layout (a public site rebuilt with the system), served as a standalone document and shown via the Applied page's iframe.
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
| `--itkaarhus-danger-*` | `#E44930` | State — danger, errors (sharp and rare) |
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
  ships as `assets/lucide-sprite.svg` — reference a symbol with
  `<svg class="icon"><use href="lucide-sprite.svg#lucide-NAME"></use></svg>`.
  Don't hand-roll SVG paths. (Consuming apps may wrap this in their own helper —
  e.g. a `{{ ui.icon('name') }}` Twig macro — but the sprite is the source.)

## Principles

- Clarity over cleverness — calm, gov-grade, long-form Danish.
- Blue leads, coral accents sparingly, state colours carry meaning, red stays sharp and rare.
- No emoji, no illustrative SVG. **Gradients are reserved for data-viz**
  (e.g. the map heatmap) — decorative gradients are out; use flat brand fills or
  a single very-subtle wash.
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

Pushing to `main` builds the Astro site and deploys `dist/` to GitHub Pages via
`.github/workflows/pages.yml` → <https://itk-dev.github.io/itkaarhus-design-system/>.
