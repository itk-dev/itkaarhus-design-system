# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial extraction of the **ITK Aarhus Design System** from the `itk-workspace`
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
- `assets/logos/` — logo variants; `assets/lucide-sprite.svg` — the Lucide icon set.
- GitHub Actions workflow to deploy the static site to GitHub Pages on push to `main`.
