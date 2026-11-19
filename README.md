# ITK Aarhus Design System

The shared visual design system from **ITK Aarhus** for the digital products it
builds for Aarhus Kommune — one palette, one type stack, one set of primitives,
used from public sites down to internal tools. Aarhus Kommune is the institutional
brand, expressed quietly as a footer endorsement; each product carries its own name
in the header.

> **Live preview:** <https://itk-dev.github.io/itkaarhus-design-system/>

The reference site is built with [Astro](https://astro.build) so it can be served
locally with a single command. The design system itself is plain CSS — token and
component files you can drop into any project, no framework required.

## Using as a Composer package

The repo is an assets-only Composer package (`itk-dev/itkaarhus-design-system`).
Add it as a VCS repository and require it:

```jsonc
// composer.json of the consuming project
{
  "repositories": [
    { "type": "vcs", "url": "https://github.com/itk-dev/itkaarhus-design-system" }
  ],
  "require": {
    "itk-dev/itkaarhus-design-system": "^0.4"
  }
}
```

The payload installs to `vendor/itk-dev/itkaarhus-design-system/assets/`:

- `tokens.css` — every `--itkaarhus-*` custom property (colors, type, spacing, radii, shadows, focus), plus the semantic light/dark theme tokens. Load first.
- `components.css` — the namespaced `.itkaarhus-*` component classes (buttons, links, tags, inputs, cards, callouts, stats, KPI cards, tables, timeline, breadcrumb, heatmap, meters). Requires `tokens.css`.
- `lucide-sprite.svg` — the Lucide icon sprite.
- `logos/aak-emblem.svg` / `logos/aak-emblem-hvid.svg` — the Aarhus Kommune emblem (crest only, no wordmark; intrinsic 32px tall) in dark and white, for the product header / sidebar mark.

Copy or serve those files from your app's public path (there is no PHP
autoload — nothing else in the package is needed at runtime). The same files are
also published on GitHub Pages at
`https://itk-dev.github.io/itkaarhus-design-system/{tokens.css,components.css,assets/lucide-sprite.svg,assets/logos/aak-emblem.svg}`.

## Files

- `assets/tokens.css` — the single source of truth for tokens: CSS custom properties (colors, type scale, spacing, radii, shadows, focus) and the light/dark semantic blocks.
- `assets/components.css` — all shared `.itkaarhus-*` component rules, extracted from the reference pages, plus the `.itkaarhus-light-only` / `.itkaarhus-dark-only` visibility utilities.
- `assets/lucide-sprite.svg` — the Lucide icon set used by the system.
- `assets/logos/` — the emblem-only Aarhus Kommune marks (`aak-emblem.svg` dark, `aak-emblem-hvid.svg` white), derived from the supplied `AAK_02_*` lockups.
- `npm run sync:assets` copies the payload files above into `public/` (run automatically on `dev`/`build`) so the site serves them at stable URLs; the copies are git-ignored — edit only `assets/`.
- `scripts/check-tokens.mjs` — `npm run check:tokens` (run on `build`) fails if the two copies of the dark token block in `tokens.css` drift apart.
- `src/layouts/Layout.astro` — shared page shell: the persistent left **sidebar** (with the Light / Dark / System theme switch) and the `<head>` (fonts, favicon, the no-flash theme script); imports `assets/tokens.css` and `assets/components.css`.
- `src/styles/sidebar.css` — sidebar styling (replaces the old top-bar `ds-nav.css`).
- `src/pages/index.astro` — overview page with previews of every section.
- `src/pages/colors.astro` — palette, color scales, and usage rules.
- `src/pages/typography.astro` — Inter + Newsreader (system monospace).
- `src/pages/spacing.astro` — 4px-base spacing, radii, elevation.
- `src/pages/logo.astro` — Aarhus Kommune endorsement mark, product header lockup, clear space, misuse.
- `src/pages/components.astro` — buttons, tags & status, inputs, cards, callouts, stats, editorial type, KPI cards, graphs & diagrams, expandable table, timeline, nav, breadcrumb; the component rules themselves live in `assets/components.css`.
- `src/scripts/chart-theme.ts` — shared Chart.js theme: resolves the `--itkaarhus-*` tokens for the current theme at runtime, exposes the categorical palette + defaults (flat fills, no gradients) and `onThemeChange()` to rebuild charts when the theme flips.
- `src/pages/examples/*.astro` — thin wrappers that iframe each applied example, keeping the sidebar in place.
- `public/examples/` — the standalone example documents (a fictional "Mit Aarhus" municipal product): `website-landing.html`, `website-content.html`, `website-about.html`, `app-dashboard.html`, `app-data-tables.html`, `app-statistics.html`, plus shared `site.css` (public site chrome) and `app.css` (logged-in app shell).
- `public/assets/logos/` — the Aarhus Kommune marks (`AAK_02_*.svg`) + favicon (`aak-favicon.ico`).

## Color palette

Two brand colours, four state colours, a guidance colour and a neutral gray
scale. Every colour ships a **50→900 scale** (`-50` lightest → `-900` darkest);
`500` is the base hue.

| Scale | Base hex | Role |
|---|---|---|
| `--itkaarhus-blue-*` | `#007BA6` | **Primary** — links, primary buttons, focus, active state |
| `--itkaarhus-coral-*` | `#FF5F31` | **Secondary** — warm complement; highlights, editorial accents (not an error colour) |
| `--itkaarhus-info-*` | `#00A5CD` | State — informational |
| `--itkaarhus-success-*` | `#008D3D` | State — success / "active" |
| `--itkaarhus-warning-*` | `#F5B800` | State — warning |
| `--itkaarhus-danger-*` | `#CC1F33` | State — danger, errors (a true cool red, kept distinct from coral; sharp and rare) |
| `--itkaarhus-purple-*` | `#7356B8` | **Guidance** — help and instructions next to the content; not a state and not decoration |
| `--itkaarhus-gray-*` | — | Neutral — text, surfaces, borders (`50`→`900`; numbered only) |

`--itkaarhus-white` is true white for page backgrounds. The raw scales are the
same in both themes; everything theme-dependent goes through the semantic tokens
below.

## Light & dark themes

Dark is **opt-in**. A product that does nothing keeps today's light look.

| `<html>` attribute | Result |
|---|---|
| none | light (default, unchanged) |
| `data-theme="light"` | light, explicitly |
| `data-theme="dark"` | dark |
| `data-theme="auto"` | follows the OS `prefers-color-scheme` |

To offer a choice, put `data-theme="auto"` on `<html>` and apply a stored
preference before first paint with this inline script, first thing in `<head>`
(no flash of the wrong theme; without JavaScript the page still follows the OS):

```html
<html lang="da" data-theme="auto">
<head>
  <meta charset="utf-8">
  <script>
    (function () {
      try {
        var t = localStorage.getItem('itkaarhus-theme');
        if (t === 'light' || t === 'dark' || t === 'auto') document.documentElement.dataset.theme = t;
      } catch (e) {}
    })();
  </script>
```

A theme switch then sets `document.documentElement.dataset.theme` and stores the
same value under `itkaarhus-theme`. The `sun`, `moon` and `monitor` icons in
`lucide-sprite.svg` are there for that switch. `data-theme` also works on any
element, to scope a light or dark island (e.g. a side-by-side preview); such an
element must set its own `background` / `color` from the tokens.

### Semantic tokens

Use these for anything that changes between themes — never a raw scale step or
a hardcoded hex. Light values are today's colours. The
[Colors page](https://itk-dev.github.io/itkaarhus-design-system/colors#themes)
shows both themes side by side, generated from `tokens.css`.

| Group | Tokens | Light → dark |
|---|---|---|
| Surfaces | `--itkaarhus-bg` · `-bg-muted` · `-bg-raised` · `-bg-inverse` | white · gray-50 · white · gray-900 → gray-900 · `#171a20` · `#1c2028` · `#08090c` |
| Text | `--itkaarhus-text` · `-text-muted` · `-text-subtle` · `-text-label` · `-text-disabled` | gray-900 · 700 · 500 · 800 · 400 → gray-100 · 300 · 400 · 200 · 600 |
| Text on fills | `--itkaarhus-text-on-accent` · `-text-on-inverse` | white · white → gray-900 · gray-100 |
| Borders | `--itkaarhus-border-subtle` · `-border` · `-border-strong` | gray-100 · 200 · 300 → `#22262e` · gray-800 · gray-700 |
| Roles | `--itkaarhus-primary` (+ `-hover`) · `-secondary` (+ `-hover`) · `-info` · `-success` · `-warning` · `-danger` (+ `-hover`) · `-guidance` | the `500` steps (hovers 600/700) → `300`/`400` steps (hovers 200/300) |
| State text | `--itkaarhus-{info,success,warning,danger}-text` | info-800 · success-700 · warning-900 · danger-700 → the dark role steps |
| Soft fills | `--itkaarhus-{primary,secondary,neutral,info,success,warning,danger,guidance}-soft` + `-soft-text` | `100` (primary `50`) with `700`–`900` text → `900` with `200` text (neutral gray-800 / gray-200) |
| Heatmap | `--itkaarhus-heatmap-{0..5}` + `-text` | blue-100 → 500 ramp → blue-900 → 300 ramp |
| Elevation, focus | `--itkaarhus-shadow-{1,2,3}` · `--itkaarhus-focus` | stronger black shadows and a blue-300 ring in dark |

### Dark rules

- **Accents move lighter.** In dark the role tokens point at steps that keep
  ≥ 4.5:1 on every dark surface, so accent fills (primary/danger buttons, checked
  toggles, callout icons) carry **dark** text: always pair them with
  `--itkaarhus-text-on-accent`, never a hardcoded white.
- **Surfaces rise in lightness:** page `bg` → `bg-muted` → `bg-raised`. The four
  hex values above are dark-only surface steps between gray-800 and gray-900.
- **The inverse band stays dark** in both themes (footer, CTA), so it keeps the
  white logos and white text.
- **Logos are swapped, not recoloured.** On a surface that turns dark, show the
  white file in dark with the visibility utilities:
  ```html
  <img class="itkaarhus-light-only" src="…/logos/aak-emblem.svg" alt="Aarhus Kommune">
  <img class="itkaarhus-dark-only" src="…/logos/aak-emblem-hvid.svg" alt="Aarhus Kommune">
  ```
  The white emblem-only mark `aak-emblem-hvid.svg` already ships in
  `assets/logos/`; the white footer endorsement is
  `AAK_02_venstrejusteret_hvid.svg` (site-only, under `public/assets/logos/`).
  `aak-favicon.ico` is a dark crest; `AAK_02_hoejrejusteret_dark.svg` has no
  white variant — keep it to light surfaces.
- **Flat fills only**, no gradients or glows, in dark too.
- The theme tokens are plain custom-property overrides (no `light-dark()`), so
  browsers that predate the newer colour functions still render the light theme
  exactly as before.
- The applied examples in `public/examples/` support both themes and follow the
  reference site's theme switch.

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
  ships as `assets/lucide-sprite.svg` (served at `assets/lucide-sprite.svg` on the
  site) — reference a symbol with
  `<svg class="icon"><use href="assets/lucide-sprite.svg#lucide-NAME"></use></svg>`
  (resolve the path against the site base).
  Don't hand-roll SVG paths. (Consuming apps may wrap this in their own helper —
  e.g. a `{{ ui.icon('name') }}` Twig macro — but the sprite is the source.)

## Graphs & diagrams

- **Charts use [Chart.js](https://www.chartjs.org/)** (bar, line/area, donut,
  sparkline), themed from the tokens at runtime via `src/scripts/chart-theme.ts`
  (it resolves the `--itkaarhus-*` tokens for the current theme, and
  `onThemeChange()` lets a page rebuild its charts when the theme flips).
  **Flat fills only — no gradients** — drawn from the categorical palette:
  blue, coral, info, success, warning, gray (role tokens, so dark gets the
  lighter steps).
- **Heatmaps and progress/meter bars are hand-rolled CSS** (no library) —
  intensity uses the `--itkaarhus-heatmap-{0..5}` ramp from the blue scale.
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

The same bare-semver tags double as the **Composer package versions** — consumers
requiring `itk-dev/itkaarhus-design-system` via a VCS repository resolve `^0.4`
etc. from these tags, so a tag push releases both the site and the package.
