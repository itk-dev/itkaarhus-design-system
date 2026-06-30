# CLAUDE.md — ITK Aarhus Design System

Instructions for Claude Code (and other AI coding agents) when applying this design system to a project.

## What this is

The design system from **ITK Aarhus** for the digital products it builds for Aarhus Kommune. It's an Astro site: one stylesheet (`public/tokens.css`) defining every brand color, shade ramp, type ramp, spacing step, radius, shadow, and focus ring as CSS custom properties; reference pages under `src/pages/`; and applied examples (the fictional "Min Aarhus" product) under `public/examples/`.

Products built on this system carry their **own name** — in the chrome the product name is a literal `[Product name]` placeholder you swap per product.

When asked to "use this design system", "apply the styling", or similar:

1. Link `tokens.css` (or the published version on GitHub Pages).
2. Style with the custom properties — never hardcode values that exist as tokens.
3. Match the look of `examples/website.html` for layout, typography, and color usage.

## Brand voice

**Aarhus Kommune is the institutional brand, expressed quietly.** It signs a product as a footer endorsement, not a banner at the top.

- **Footer endorsement** — small "En del af" label + the Aarhus Kommune mark, low and unobtrusive. Use `assets/logos/AAK_02_venstrejusteret_sh.svg` (dark) on light backgrounds, `AAK_02_venstrejusteret_hvid.svg` (white) on dark.
- **Header** — a small emblem (`assets/logos/aak-favicon.ico`, the Aarhus Kommune crest, ~24–28px) + the product name. **No ITK wordmark**, no large Aarhus Kommune logo in the header.
- **Favicon** — `assets/logos/aak-favicon.ico` on every page.
- **Product name** — always the literal placeholder `[Product name]` until a real product name is assigned; keep it consistent so it's a trivial find-and-replace.

## Token discipline

**Use the token, not the value.** Tokens use the `--itkaarhus-*` prefix (renamed from the original `--itk-*`). If a consuming app still mirrors the old `--itk-*` names, it must re-sync.

| Don't | Do |
| --- | --- |
| `color: #007BA6;` | `color: var(--itkaarhus-blue-500);` or `var(--itkaarhus-primary);` |
| `color: #FF5F31;` | `color: var(--itkaarhus-secondary);` or `var(--itkaarhus-coral-500);` |
| `padding: 16px;` | `padding: var(--itkaarhus-space-4);` |
| `border-radius: 6px;` | `border-radius: var(--itkaarhus-radius-2);` |
| `font-family: "Newsreader", serif;` | `font-family: var(--itkaarhus-font-serif);` |
| `box-shadow: 0 4px 10px ...;` | `box-shadow: var(--itkaarhus-shadow-2);` |

If a missing token is genuinely needed, add it to `tokens.css` rather than inlining the value.

## Color roles

Two brand colours, four state colours, one neutral scale. Every colour ships a **50→900 scale** (e.g. `--itkaarhus-blue-{50..900}`); `500` is the base hue, lighter steps for surfaces/soft fills, darker steps for text/borders/hover.

- **`--itkaarhus-blue-*` (primary)** — primary actions, links, focus ring, default brand surface. Most UI chrome is blue. Use `-200` for accents on dark backgrounds.
- **`--itkaarhus-coral-*` (secondary)** — warm complement to the blue. Highlights, editorial accents, secondary emphasis, used sparingly. **Not** an error colour.
- **State:** **`--itkaarhus-info-*`** (cyan), **`--itkaarhus-success-*`** (green), **`--itkaarhus-warning-*`** (amber), **`--itkaarhus-danger-*`** (red). Reserve for meaning, never decoration. Danger stays sharp and rare; never a large fill.
- **`--itkaarhus-gray-*`** (`50`→`900`, numbered only) — body copy, surfaces, borders, muted text. `--itkaarhus-white` is true white for page backgrounds.

There are no decorative/supporting hues — the palette is deliberately just these. Role aliases: `--itkaarhus-primary` (+ `-hover`), `--itkaarhus-secondary`, and `--itkaarhus-{info,success,warning,danger}`, each state with a `*-soft` surface tint for badges/alerts.

## Typography

- **`--itkaarhus-font-display` / `--itkaarhus-font-sans`** — Inter. UI chrome, dense dashboards, long-form prose, and small text all use it. Headings use tight letter-spacing.
- **`--itkaarhus-font-serif`** — Newsreader. **Opt-in** for editorial / website surfaces (heroes, overviews, KPI numbers). Not for app chrome.
- **`--itkaarhus-font-mono`** — the system monospace stack (`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`). The DS ships **no** web monospace font; use it only where monospace genuinely helps (code, logs), not as a styling bias.
- Load fonts from Google Fonts as in `src/layouts/Layout.astro` (Inter + Newsreader only; no mono):
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">
  ```
- Type scale runs `--itkaarhus-text-xs` (12px) → `--itkaarhus-text-5xl` (88px). Pick the named step.
- Body copy is Danish-first (æøå). Don't substitute fonts that lack Danish glyph support.

### Eyebrows

A small uppercase label above a heading. There are two treatments, and the difference is meaningful — keep it consistent:

- **Plain** (no leading rule) — the default for all **app chrome**: page-header eyebrows, card kickers, table-section labels, dashboards.
- **Ruled** (a leading 24px × 1px `::before` rule — "the dash") — **only** on the **editorial / serif voice** (heroes, overviews, website-style surfaces, paired with a Newsreader heading). The rule signals that voice; don't add it to app chrome, and don't omit it on editorial surfaces. See the Eyebrows section of `tokens/typography` for both.

## Icons

- **Lucide** line icons (24px viewBox, `currentColor`, stroke 2), shipped as `assets/lucide-sprite.svg`. Reference a symbol:
  ```html
  <svg class="icon" width="16" height="16"><use href="lucide-sprite.svg#lucide-chevron-down"></use></svg>
  ```
- Don't hand-roll SVG paths. Add a new icon by copying its inner SVG from lucide.dev into a new `<symbol id="lucide-NAME">` in the sprite.

## Spacing & layout

- 4px base scale: `--itkaarhus-space-1` (4px) → `--itkaarhus-space-9` (96px). Container `--itkaarhus-container` (1200px), `--itkaarhus-gutter` (24px).
- Radii: `--itkaarhus-radius-0`…`--itkaarhus-radius-4`, plus `--itkaarhus-radius-pill` for chips/badges. Keep functional surfaces subtle (≈4–10px).
- Elevation: `--itkaarhus-shadow-1` (subtle), `--itkaarhus-shadow-2` (cards), `--itkaarhus-shadow-3` (modals). Three steps, no more.
- Always use `--itkaarhus-focus` on `:focus-visible`. Don't remove focus styling without replacing it.

## Logo

- **Brand mark — Aarhus Kommune.** `assets/logos/AAK_02_venstrejusteret_sh.svg` (dark) on light; `AAK_02_venstrejusteret_hvid.svg` (white) on dark; `AAK_02_hoejrejusteret_dark.svg` (right-aligned alt). Use small, as a footer endorsement. Maintain clear space; do not recolour or recreate the mark — always use the supplied SVGs.
- **Header emblem.** `assets/logos/aak-favicon.ico` (the crest), paired with the product name.
- The old ITK marks have been **removed** from the design system entirely — don't reintroduce them.
- See `tokens/logo.html`.

## Principles to defer to

1. **Clarity over cleverness.** Plain Danish copy and obvious affordances beat decorative flourishes.
2. **Blue leads, coral accents sparingly, state colours carry meaning, red stays sharp and rare.**
3. **No emoji, no illustrative SVG.** Gradients are reserved for data-viz — decorative gradients are out; use flat brand fills or a single very-subtle wash.

## Reference

- `tokens.css` — all tokens
- `tokens/*.html` — visual reference per category
- `examples/website.html` — the canonical "this is what good looks like"
