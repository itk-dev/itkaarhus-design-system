# Aarhus Kommune Design System

The shared visual design system for digital products in **Aarhus Kommune** — one
palette, one type stack, one set of primitives, used from public sites down to
internal tools. Aarhus Kommune is the institutional brand, expressed quietly as a
footer endorsement; each product carries its own name in the header.

> **Live preview:** <https://itk-dev.github.io/itkaarhus-design-system/>

No build step. No JavaScript framework. Just static HTML + one CSS file you can
drop into any project.

## Files

- `tokens.css` — the single source of truth: CSS custom properties (colors, type scale, spacing, radii, shadows, focus). Consuming apps mirror these tokens into their own runtime CSS — keep them in sync when tokens change.
- `index.html` — overview page with previews of every section.
- `tokens/colors.html` — palette, shade ramps, and usage rules.
- `tokens/typography.html` — Inter Tight + Source Serif 4 + JetBrains Mono.
- `tokens/spacing.html` — 4px-base spacing, radii, elevation.
- `tokens/logo.html` — Aarhus Kommune endorsement mark, product header lockup, clear space, misuse.
- `tokens/components.html` — buttons, tags, inputs, cards, callouts, stats, editorial type, KPI cards, semantic badges, expandable table, timeline, nav, breadcrumb.
- `examples/website.html` — full reference layout (a public site rebuilt with the system).
- `assets/logos/` — the Aarhus Kommune marks (`AAK_02_*.svg`) + favicon (`aak-favicon.ico`).
- `assets/lucide-sprite.svg` — the Lucide icon set used by the system.

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

- **Display & UI:** `Inter Tight` 400/500/600/700 — app chrome, dense surfaces.
- **Serif (editorial):** `Source Serif 4` — opt-in for website-style surfaces
  (heroes, overviews, KPI numbers) via `--itkaarhus-font-serif`. Not for app chrome.
- **Mono:** `JetBrains Mono` 400/500
- Scale (px): 12, 14, 16, 18, 22, 28, 36, 48, 64, 88
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

The HTML reference pages are static. Open them directly in a browser:

```sh
open index.html
```

Or serve the repo root if you prefer real URLs:

```sh
python3 -m http.server 8001
# then visit http://localhost:8001/
```

## Publishing

Pushing to `main` deploys the repo root to GitHub Pages via
`.github/workflows/pages.yml` → <https://itk-dev.github.io/itkaarhus-design-system/>.
