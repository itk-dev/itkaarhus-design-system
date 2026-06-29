# ITK Aarhus Design System

The shared visual design system for **ITK** in Aarhus Kommune — one palette, one
type stack, one set of primitives, used from public sites down to internal tools.
Sourced from the official ITK Farvekoder palette and the `itk.aarhus.dk` brand context.

> **Live preview:** <https://itk-dev.github.io/itkaarhus-design-system/>

No build step. No JavaScript framework. Just static HTML + one CSS file you can
drop into any project.

## Files

- `tokens.css` — the single source of truth: CSS custom properties (colors, type scale, spacing, radii, shadows, focus). Consuming apps mirror these tokens into their own runtime CSS — keep them in sync when tokens change.
- `index.html` — overview page with previews of every section.
- `tokens/colors.html` — palette, shade ramps, and usage rules.
- `tokens/typography.html` — Inter Tight + Source Serif 4 + JetBrains Mono.
- `tokens/spacing.html` — 4px-base spacing, radii, elevation.
- `tokens/logo.html` — logo variants, clear space, misuse.
- `tokens/components.html` — buttons, tags, inputs, cards, callouts, stats, editorial type, KPI cards, semantic badges, expandable table, timeline, nav, breadcrumb.
- `examples/website.html` — full reference layout (a public site rebuilt with the system).
- `assets/logos/` — official logo PNGs (4F = full colour, sort = black, hvid = white).
- `assets/lucide-sprite.svg` — the Lucide icon set used by the system.

## Brand palette

One primary, one complementary secondary, plus state colours. Each role colour
ships a **50→900 shade ramp** (`--itk-{blue,coral,green,amber,red,cyan}-*`);
`500` is the base hue.

| Token | Hex | Role |
|---|---|---|
| `--itk-blue` | `#007BA6` | **Primary** — links, primary buttons, active state |
| `--itk-coral` | `#FF5F31` | **Secondary** — warm complement; highlights, editorial accents |
| `--itk-green` | `#008D3D` | Success, "active" status |
| `--itk-amber` | `#F5B800` | Warning |
| `--itk-red` | `#E44930` | Danger, errors — sharp and rare |
| `--itk-cyan` | `#00A5CD` | Info |
| `--itk-aqua` / `--itk-mint` / `--itk-lime` | `#00B5C9` / `#73BC99` / `#89BD23` | Supporting hues — stats, soft positive, pilot/draft |

Role aliases: `--itk-primary`, `--itk-secondary`, `--itk-success`, `--itk-warning`,
`--itk-danger`, `--itk-info`, each with a `*-soft` surface tint for badges/alerts.

## Type

- **Display & UI:** `Inter Tight` 400/500/600/700 — app chrome, dense surfaces.
- **Serif (editorial):** `Source Serif 4` — opt-in for website-style surfaces
  (heroes, overviews, KPI numbers) via `--itk-font-serif`. Not for app chrome.
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
- Blue leads, coral accents, greens expand, red stays sharp and rare.
- No emoji, no illustrative SVG. **Gradients are reserved for data-viz**
  (e.g. the map heatmap) and the faceted palette swatch — decorative gradients
  are out; use flat brand fills or a single very-subtle wash.
- The faceted triangle palette **is** the expression.

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
