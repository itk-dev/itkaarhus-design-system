# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Breaking:** renamed CSS tokens from `--itk-*` to `--itkaarhus-*` and component
  classes from `.itk-*` to `.itkaarhus-*`. Consuming apps that mirror these must re-sync.
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
