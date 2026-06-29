# CLAUDE.md — ITK Aarhus Design System

Instructions for Claude Code (and other AI coding agents) when applying this design system to a project.

## What this is

A static, no-build design system: one stylesheet (`tokens.css`) defining every brand color, shade ramp, type ramp, spacing step, radius, shadow, and focus ring as CSS custom properties; HTML reference pages under `tokens/`; and a canonical applied example in `examples/website.html`.

When asked to "use the ITK design system", "apply ITK styling", or similar:

1. Link `tokens.css` (or the published version on GitHub Pages).
2. Style with the custom properties — never hardcode values that exist as tokens.
3. Match the look of `examples/website.html` for layout, typography, and color usage.

## Token discipline

**Use the token, not the value.**

| Don't | Do |
| --- | --- |
| `color: #007BA6;` | `color: var(--itk-blue);` or `var(--itk-primary);` |
| `color: #FF5F31;` | `color: var(--itk-secondary);` or `var(--itk-coral);` |
| `padding: 16px;` | `padding: var(--itk-space-4);` |
| `border-radius: 6px;` | `border-radius: var(--itk-radius-2);` |
| `font-family: "Source Serif 4", serif;` | `font-family: var(--itk-font-serif);` |
| `box-shadow: 0 4px 10px ...;` | `box-shadow: var(--itk-shadow-2);` |

If a missing token is genuinely needed, add it to `tokens.css` rather than inlining the value.

## Color roles

One primary, one complementary secondary, plus state colours. Role colours ship a **50→900 shade ramp** (`--itk-{blue,coral,green,amber,red,cyan}-{50..900}`); `500` is the base hue.

- **`--itk-blue` (primary)** — primary actions, links, focus ring, default brand surface. Most UI chrome is blue.
- **`--itk-coral` (secondary)** — warm complement to the blue. Highlights, editorial accents, secondary emphasis. **Not** an error colour.
- **`--itk-green` (success)**, **`--itk-amber` (warning)**, **`--itk-red` (danger)**, **`--itk-cyan` (info)** — semantic state colours. Red stays sharp and rare; never the primary brand colour in a layout.
- **`--itk-aqua`, `--itk-mint`, `--itk-lime`** — supporting hues for charts, stats, soft positive, pilot/draft tags.
- **Neutrals** (`--itk-ink`, `--itk-slate-700`…`--itk-slate-50`, `--itk-paper`) — body copy, surfaces, borders, muted text.

Role aliases: `--itk-primary`, `--itk-secondary`, `--itk-success`, `--itk-warning`, `--itk-danger`, `--itk-info`, each with a `*-soft` surface tint for badges/alerts.

## Typography

- **`--itk-font-display` / `--itk-font-sans`** — Inter Tight. UI chrome and dense surfaces. Headings use tight letter-spacing.
- **`--itk-font-serif`** — Source Serif 4. **Opt-in** for editorial / website surfaces (heroes, overviews, KPI numbers). Not for app chrome.
- **`--itk-font-mono`** — JetBrains Mono. Code, numeric IDs, technical metadata, eyebrow labels.
- Load fonts from Google Fonts as in `index.html`:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
- Type scale runs `--itk-text-xs` (12px) → `--itk-text-5xl` (88px). Pick the named step.
- Body copy is Danish-first (æøå). Don't substitute fonts that lack Danish glyph support.

## Icons

- **Lucide** line icons (24px viewBox, `currentColor`, stroke 2), shipped as `assets/lucide-sprite.svg`. Reference a symbol:
  ```html
  <svg class="icon" width="16" height="16"><use href="lucide-sprite.svg#lucide-chevron-down"></use></svg>
  ```
- Don't hand-roll SVG paths. Add a new icon by copying its inner SVG from lucide.dev into a new `<symbol id="lucide-NAME">` in the sprite.

## Spacing & layout

- 4px base scale: `--itk-space-1` (4px) → `--itk-space-9` (96px). Container `--itk-container` (1200px), `--itk-gutter` (24px).
- Radii: `--itk-radius-0`…`--itk-radius-4`, plus `--itk-radius-pill` for chips/badges. Keep functional surfaces subtle (≈4–10px).
- Elevation: `--itk-shadow-1` (subtle), `--itk-shadow-2` (cards), `--itk-shadow-3` (modals). Three steps, no more.
- Always use `--itk-focus` on `:focus-visible`. Don't remove focus styling without replacing it.

## Logo

- Primary mark: `assets/logos/itk-4f-1.png` (four-colour) on light backgrounds.
- Dark backgrounds: `assets/logos/itk-hvid-*.png` (white). Monochrome: `assets/logos/itk-sort-*.png` (black).
- Maintain clear space; do not recolor the mark. See `tokens/logo.html`.

## Principles to defer to

1. **Clarity over cleverness.** Plain Danish copy and obvious affordances beat decorative flourishes.
2. **Blue leads, coral accents, greens expand, red stays sharp and rare.**
3. **No emoji, no illustrative SVG.** Gradients are reserved for data-viz and the faceted palette swatch — decorative gradients are out; use flat brand fills or a single very-subtle wash.

## Reference

- `tokens.css` — all tokens
- `tokens/*.html` — visual reference per category
- `examples/website.html` — the canonical "this is what good looks like"
