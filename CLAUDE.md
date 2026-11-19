# CLAUDE.md — ITK Aarhus Design System

Instructions for Claude Code (and other AI coding agents) when applying this design system to a project.

## What this is

The design system from **ITK Aarhus** for the digital products it builds for Aarhus Kommune. It's an Astro site plus an assets-only Composer package (`itk-dev/itkaarhus-design-system`). The package payload lives in `assets/`: `tokens.css` (every brand color, color scale, type ramp, spacing step, radius, shadow, and focus ring as CSS custom properties), `components.css` (all namespaced `.itkaarhus-*` component classes), `lucide-sprite.svg`, and `logos/` (the Aarhus Kommune emblem, `aak-emblem.svg` dark / `aak-emblem-hvid.svg` white). Reference pages live under `src/pages/`; applied examples (the fictional "Mit Aarhus" product) under `public/examples/`. `npm run sync:assets` (automatic on dev/build) copies `assets/` into `public/` for serving — those copies are git-ignored; **edit only `assets/`**.

Products built on this system carry their **own name** — in the chrome the product name is a literal `[Product name]` placeholder you swap per product.

When asked to "use this design system", "apply the styling", or similar:

1. Load `assets/tokens.css` then `assets/components.css` — via the Composer package (`vendor/itk-dev/itkaarhus-design-system/assets/`), the published GitHub Pages URLs, or a copy.
2. Style with the custom properties — never hardcode values that exist as tokens.
3. Reuse the `.itkaarhus-*` component classes from `components.css` before writing new CSS.
4. Match the look of the applied examples in `public/examples/` for layout, typography, and color usage.

## Brand voice

**Aarhus Kommune is the institutional brand, expressed quietly.** It signs a product as a footer endorsement, not a banner at the top.

- **Footer endorsement** — small "En del af" label + the Aarhus Kommune mark, low and unobtrusive. Use `public/assets/logos/AAK_02_venstrejusteret_sh.svg` (dark) on light backgrounds, `AAK_02_venstrejusteret_hvid.svg` (white) on dark.
- **Header** — a small emblem (the Aarhus Kommune crest, ~24–32px) + the product name. Use `assets/logos/aak-emblem.svg` (dark) on light chrome, `aak-emblem-hvid.svg` (white) on dark — crisp SVG, emblem only, no wordmark. **No ITK wordmark**, no large Aarhus Kommune logo in the header.
- **Favicon** — `public/assets/logos/aak-favicon.ico` on every page.
- **Product name** — always the literal placeholder `[Product name]` until a real product name is assigned; keep it consistent so it's a trivial find-and-replace.

## Token discipline

**Use the token, not the value.** Tokens use the `--itkaarhus-*` prefix (renamed from the original `--itk-*`). If a consuming app still mirrors the old `--itk-*` names, it must re-sync.

| Don't | Do |
| --- | --- |
| `color: #007BA6;` | `color: var(--itkaarhus-primary);` (theme-aware) — a raw `var(--itkaarhus-blue-500)` only where the colour must stay fixed in both themes |
| `color: #FF5F31;` | `color: var(--itkaarhus-secondary);` or `var(--itkaarhus-coral-500);` |
| `padding: 16px;` | `padding: var(--itkaarhus-space-4);` |
| `border-radius: 6px;` | `border-radius: var(--itkaarhus-radius-2);` |
| `font-family: "Newsreader", serif;` | `font-family: var(--itkaarhus-font-serif);` |
| `box-shadow: 0 4px 10px ...;` | `box-shadow: var(--itkaarhus-shadow-2);` |
| `background: #fff; color: #111318;` | `background: var(--itkaarhus-bg-raised); color: var(--itkaarhus-text);` |

If a missing token is genuinely needed, add it to `assets/tokens.css` rather than inlining the value. Any colour that depends on the theme (surfaces, text, borders, accents, soft fills) must come from a **semantic token** — see "Light & dark themes".

## Color roles

Two brand colours, four state colours, one guidance colour, one neutral scale. Every colour ships a **50→900 scale** (e.g. `--itkaarhus-blue-{50..900}`); `500` is the base hue, lighter steps for surfaces/soft fills, darker steps for text/borders/hover.

- **`--itkaarhus-blue-*` (primary)** — primary actions, links, focus ring, default brand surface. Most UI chrome is blue. Use `-200` for accents on dark backgrounds.
- **`--itkaarhus-coral-*` (secondary)** — warm complement to the blue. Highlights, editorial accents, secondary emphasis, used sparingly. **Not** an error colour.
- **State:** **`--itkaarhus-info-*`** (cyan), **`--itkaarhus-success-*`** (green), **`--itkaarhus-warning-*`** (amber), **`--itkaarhus-danger-*`** (red). Reserve for meaning, never decoration. Danger stays sharp and rare; never a large fill.
- **`--itkaarhus-purple-*` (guidance)** — help and instructions offered next to the content (a page's "how do I" text, onboarding hints). Not a state and not decoration; keep it out of charts and status. Role alias `--itkaarhus-guidance` (+ `-soft`).
- **`--itkaarhus-gray-*`** (`50`→`900`, numbered only) — body copy, surfaces, borders, muted text. `--itkaarhus-white` is true white for page backgrounds.

There are no decorative/supporting hues — the palette is deliberately just these. Role aliases: `--itkaarhus-primary` (+ `-hover`), `--itkaarhus-secondary` (+ `-hover`), `--itkaarhus-{info,success,warning,danger}` (+ `--itkaarhus-danger-hover`), `--itkaarhus-guidance`; each role has a `*-soft` surface with a `*-soft-text` partner for badges/tags, and the states have `*-text` for coloured text on page surfaces.

## Light & dark themes

Dark is **opt-in**: no `data-theme` on `<html>` (or `data-theme="light"`) is light and unchanged; `data-theme="dark"` is dark; `data-theme="auto"` follows `prefers-color-scheme`. A stored choice lives in `localStorage` under `itkaarhus-theme` and is applied by a tiny inline `<head>` script before first paint (snippet in the README). The light and dark values sit in two blocks at the end of `assets/tokens.css`; the dark block is duplicated for `auto` under the media query, and `npm run check:tokens` (part of `build`) fails if the copies differ — edit both.

- **Semantic tokens** (use these for anything theme-dependent): surfaces `--itkaarhus-bg`, `-bg-muted`, `-bg-raised`, `-bg-inverse`; text `--itkaarhus-text`, `-text-muted`, `-text-subtle`, `-text-label`, `-text-disabled`, `-text-on-accent`, `-text-on-inverse`; borders `--itkaarhus-border-subtle`, `-border`, `-border-strong`; the role aliases above with their `-soft` / `-soft-text` / `-text` partners (plus `--itkaarhus-neutral-soft` / `-soft-text`, `--itkaarhus-primary-soft` / `-soft-text`, `--itkaarhus-secondary-soft` / `-soft-text`); `--itkaarhus-heatmap-{0..5}` (+ `-text`); `--itkaarhus-shadow-{1,2,3}`; `--itkaarhus-focus`. The Colors page (`/colors#themes`) shows every token in both themes, generated from `tokens.css`.
- **Raw scale steps** stay for colours that must not change with the theme: swatches that depict a palette colour, flat brand media placeholders, boxes that show a logo on a specific ground.
- **Accent fills carry `--itkaarhus-text-on-accent`**, never a hardcoded white — in dark the accents are light (300/400 steps) and take dark text.
- **`--itkaarhus-bg-inverse` stays dark** in both themes (footer, CTA band), so white logos and white text on it never swap.
- **Logos swap, never recolour**: on a surface that turns dark, render the dark and white file with `.itkaarhus-light-only` / `.itkaarhus-dark-only` (in `components.css`).
- **Charts**: resolve colours with `color()` from `src/scripts/chart-theme.ts` and rebuild on `onThemeChange()`.
- Every new reference page or example must work in both themes; check with the sidebar theme switch.

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
- **Ruled** (a leading 24px × 1px `::before` rule — "the dash") — **only** on the **editorial / serif voice** (heroes, overviews, website-style surfaces, paired with a Newsreader heading). The rule signals that voice; don't add it to app chrome, and don't omit it on editorial surfaces. See the Eyebrows section of the Typography page (`src/pages/typography.astro`, route `/typography`) for both.

## Icons

- **Lucide** line icons (24px viewBox, `currentColor`, stroke 2), shipped as `assets/lucide-sprite.svg` (served at `assets/lucide-sprite.svg` under the site base). Reference a symbol (resolve the path against the site base, e.g. `${base}assets/lucide-sprite.svg`):
  ```html
  <svg class="icon" width="16" height="16"><use href="assets/lucide-sprite.svg#lucide-chevron-down"></use></svg>
  ```
- Don't hand-roll SVG paths. Add a new icon by copying its inner SVG from lucide.dev into a new `<symbol id="lucide-NAME">` in the sprite.

## Graphs & diagrams

- **Charts use Chart.js** (the team's established tool — see the legacy `itk-workspace`). Bar, line/area, donut, sparkline.
- **Theme from tokens, never hardcode chart colours.** Use `src/scripts/chart-theme.ts` (`applyChartTheme`, `chartPalette`, `stateColors`, `color`, `token`, `onThemeChange`) — `color()` resolves any token, semantic ones included, to the current theme's value; rebuild charts in `onThemeChange()`. The categorical series order is blue → coral → info → success → warning → gray; semantic charts use the state colours.
- **No gradients in charts** — flat fills only (the system-wide no-gradient rule applies here too). For intensity (heatmaps), use the `--itkaarhus-heatmap-{0..5}` ramp (blue scale; reversed in dark).
- **Heatmaps and meters are hand-rolled CSS**, not Chart.js. **Every `<canvas>` needs an `aria-label`** summarising the data (canvas is opaque to assistive tech).
- Astro pages: `import 'chart.js/auto'` (bundled). Standalone `public/examples/` pages load `examples/vendor/chart.umd.min.js` (copied from the dep by `npm run sync:vendor`; never edit or commit it — it's git-ignored).

## Spacing & layout

- 4px base scale: `--itkaarhus-space-1` (4px) → `--itkaarhus-space-9` (96px). Container `--itkaarhus-container` (1200px), `--itkaarhus-gutter` (24px).
- Radii: `--itkaarhus-radius-0`…`--itkaarhus-radius-4`, plus `--itkaarhus-radius-pill` for chips/badges. Keep functional surfaces subtle (≈4–10px).
- Elevation: `--itkaarhus-shadow-1` (subtle), `--itkaarhus-shadow-2` (cards), `--itkaarhus-shadow-3` (modals). Three steps, no more.
- Always use `--itkaarhus-focus` on `:focus-visible`. Don't remove focus styling without replacing it.

## Logo

- **Brand mark — Aarhus Kommune.** `public/assets/logos/AAK_02_venstrejusteret_sh.svg` (dark) on light; `AAK_02_venstrejusteret_hvid.svg` (white) on dark; `AAK_02_hoejrejusteret_dark.svg` (right-aligned alt). Use small, as a footer endorsement. Maintain clear space; do not recolour or recreate the mark — always use the supplied SVGs.
- **Header emblem.** `assets/logos/aak-emblem.svg` (dark) / `aak-emblem-hvid.svg` (white) — the crest only, derived from the supplied lockups, intrinsic 32px tall — paired with the product name. The favicon (`public/assets/logos/aak-favicon.ico`) stays the `.ico`; where it is shown as an image it is a dark crest, so pair it with `aak-emblem-hvid.svg` via `.itkaarhus-dark-only` for dark surfaces.
- **Dark theme.** Dark surfaces get the `-hvid` files (`aak-emblem-hvid.svg`, `AAK_02_venstrejusteret_hvid.svg`); `AAK_02_hoejrejusteret_dark.svg` has no white variant — light surfaces only. See the Logo page's "Logos in the dark theme" section.
- The old ITK marks have been **removed** from the design system entirely — don't reintroduce them.
- See the Logo page (`src/pages/logo.astro`, route `/logo`).

## Principles to defer to

1. **Clarity over cleverness.** Plain Danish copy and obvious affordances beat decorative flourishes.
2. **Blue leads, coral accents sparingly, state colours carry meaning, red stays sharp and rare.**
3. **No emoji, no illustrative SVG, no gradient backgrounds.** Use flat brand fills; the only gradient in the system is a deliberate *misuse* demo on the Logo page.

## Reference

- `assets/tokens.css` — all tokens
- `assets/components.css` — all `.itkaarhus-*` component classes
- `src/pages/*.astro` — visual reference per category (colors, typography, spacing, components, logo)
- `public/examples/` — the applied "Mit Aarhus" examples (website + app) shown in iframes; the canonical "this is what good looks like"

## Working on this repo

- Astro, no framework integration. `npm run dev` to serve, `npm run build` to output `dist/`.
- Served under the `/itkaarhus-design-system/` base path; build asset/page URLs from `import.meta.env.BASE_URL` so they resolve on GitHub Pages.
- Reference pages live in `src/pages/` and share `src/layouts/Layout.astro` (the sidebar + `<head>`). The applied examples are standalone HTML in `public/examples/`, iframed by thin wrappers in `src/pages/examples/`.
- **Releasing/deploying:** `main` is continuous and does **not** deploy; a release ships by pushing a bare-semver tag (e.g. `0.2.0`), which triggers the Pages build + deploy. See the README "Publishing" section and the `/itkdev-release` skill — don't push tags without the user's go-ahead.
