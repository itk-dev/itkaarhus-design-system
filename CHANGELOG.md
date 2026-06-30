# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Graphs & diagrams (Chart.js, themed from tokens) on the Components page, and an app Statistics example.

## [0.2.0] - 2026-06-30

### Added

- Five "Min Aarhus" applied examples — Website (landing, content, about) and App (dashboard, data tables).

### Changed

- Migrated the reference site to Astro (`npm run dev`/`build`) with a persistent left sidebar; applied examples load in an iframe.
- New type stack: Inter (sans/display) and Newsreader (editorial serif); monospace falls back to the system default.
- Reworked the Components page (buttons, inputs, cards) and consolidated tags + semantic badges into one AA-contrast `.itkaarhus-tag`.
- Reframed everything as the ITK Aarhus Design System; refreshed the overview/typography pages for ITK's internal-tools context.
- Deploy now ships on a pushed semver tag (build on Node 22) instead of every push to `main`.
- **Breaking:** `danger` is now a true cool red (`#CC1F33`), distinct from coral — consuming apps mirroring `--itkaarhus-danger-*` must re-sync.

## [0.1.0]

### Added

- Initial extraction of the design system from `itk-workspace` into its own repo, published to GitHub Pages.
- `tokens.css` — brand palette, neutral scale, type stack, spacing, radii, elevation, and focus ring as CSS custom properties.
- Reference pages (colors, typography, spacing, logo, components) and an applied website example.

### Changed

- **Breaking:** renamed tokens `--itk-*` → `--itkaarhus-*` and classes `.itk-*` → `.itkaarhus-*` — consuming apps must re-sync.
- **Breaking:** consolidated the palette to blue + coral, four state colours, and one gray scale (each a full 50→900 scale).
- Rebranded away from ITK to a quiet Aarhus Kommune footer endorsement; removed all ITK logo assets.
