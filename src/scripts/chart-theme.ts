/**
 * Shared Chart.js theme for the ITK Aarhus design system.
 *
 * Single source of truth is `tokens.css`: colours are read off the page at
 * runtime, so charts always track the tokens — change a token, the charts
 * follow. Semantic tokens (`--itkaarhus-text`, `--itkaarhus-primary`, …) differ
 * per theme, so they are resolved to concrete colours through a probe element,
 * and charts are rebuilt when the theme changes. Flat fills only; the system
 * uses NO gradients.
 *
 * Usage (per page, in a module script):
 *   import Chart from 'chart.js/auto';
 *   import { applyChartTheme, chartPalette, color, onThemeChange } from '../scripts/chart-theme';
 *   const draw = () => {
 *     applyChartTheme(Chart);
 *     return [new Chart(canvas, { ... backgroundColor: chartPalette() ... })];
 *   };
 *   let charts = draw();
 *   onThemeChange(() => { charts.forEach((c) => c.destroy()); charts = draw(); });
 */
import type { Chart as ChartType } from 'chart.js';

/** Read a raw `--itkaarhus-<name>` token value off :root (scale steps, fonts). */
export function token(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--itkaarhus-${name}`)
    .trim();
}

let probe: HTMLElement | null = null;

/**
 * Resolve any `--itkaarhus-<name>` colour token — raw or semantic — to the
 * concrete colour it has in the current theme (e.g. `rgb(0, 123, 166)`).
 * `getPropertyValue` would return the unresolved `var(...)` chain for
 * semantic tokens, which a canvas cannot use.
 */
export function color(name: string): string {
  if (!probe) {
    probe = document.createElement('span');
    probe.hidden = true;
    document.body.append(probe);
  }
  probe.style.color = `var(--itkaarhus-${name})`;
  return getComputedStyle(probe).color;
}

/**
 * Categorical series palette — the documented order for multi-series charts so
 * colours are consistent across the system: blue → coral → info → success →
 * warning → gray. Role tokens, so dark gets the lighter, AA-safe steps.
 */
export function chartPalette(): string[] {
  return [
    color('primary'),
    color('secondary'),
    color('info'),
    color('success'),
    color('warning'),
    color('gray-400'),
  ];
}

/** Semantic state colours for meaning-carrying charts. */
export function stateColors(): Record<string, string> {
  return {
    info: color('info'),
    success: color('success'),
    warning: color('warning'),
    danger: color('danger'),
    neutral: color('gray-400'),
  };
}

/**
 * Apply system-wide Chart.js defaults for the current theme: Inter font,
 * neutral grid/ticks, calm tooltips. Call before constructing charts, and again
 * before rebuilding them after a theme change.
 */
export function applyChartTheme(Chart: typeof ChartType): void {
  const grid = color('border');
  const ticks = color('text-subtle');
  const ink = color('text');

  Chart.defaults.font.family = token('font-sans') || 'Inter, sans-serif';
  Chart.defaults.font.size = 12;
  Chart.defaults.color = ticks;
  Chart.defaults.borderColor = grid;

  // Legends: compact, point-style markers, neutral ink.
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.plugins.legend.labels.color = ink;

  // Tooltips: raised surface, neutral border, primary ink — matches DS cards.
  Chart.defaults.plugins.tooltip.backgroundColor = color('bg-raised');
  Chart.defaults.plugins.tooltip.titleColor = ink;
  Chart.defaults.plugins.tooltip.bodyColor = color('text-muted');
  Chart.defaults.plugins.tooltip.borderColor = grid;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 6;
  Chart.defaults.plugins.tooltip.displayColors = true;
  Chart.defaults.plugins.tooltip.boxPadding = 4;
}

/**
 * Call `callback` whenever the effective theme may have changed: the
 * `data-theme` attribute on <html> changes, or the OS colour scheme flips
 * (which matters for `data-theme="auto"`). Returns an unsubscribe function.
 */
export function onThemeChange(callback: () => void): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const scheme = matchMedia('(prefers-color-scheme: dark)');
  scheme.addEventListener('change', callback);
  return () => {
    observer.disconnect();
    scheme.removeEventListener('change', callback);
  };
}
