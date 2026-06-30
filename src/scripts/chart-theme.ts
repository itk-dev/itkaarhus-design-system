/**
 * Shared Chart.js theme for the ITK Aarhus design system.
 *
 * Single source of truth is `tokens.css`: we read the `--itkaarhus-*` custom
 * properties off `:root` at runtime, so charts always track the tokens — change
 * a token, the charts follow. Flat fills only; the system uses NO gradients.
 *
 * Usage (per page, in a module script):
 *   import Chart from 'chart.js/auto';
 *   import { applyChartTheme, CHART_PALETTE, token } from '../scripts/chart-theme';
 *   applyChartTheme(Chart);
 *   new Chart(canvas, { ... backgroundColor: CHART_PALETTE ... });
 */
import type { Chart as ChartType } from 'chart.js';

/** Read a single `--itkaarhus-<name>` token value off :root. */
export function token(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--itkaarhus-${name}`)
    .trim();
}

/**
 * Categorical series palette — the documented order for multi-series charts so
 * colours are consistent across the system. Flat token values, no gradients.
 */
export function chartPalette(): string[] {
  return [
    token('blue-500'),
    token('coral-500'),
    token('info-500'),
    token('success-500'),
    token('warning-500'),
    token('gray-400'),
  ];
}

/** Lazily-evaluated palette (must run in the browser, after tokens.css loads). */
export const CHART_PALETTE: string[] =
  typeof document !== 'undefined' ? chartPalette() : [];

/** Semantic state colours for meaning-carrying charts. */
export function stateColors(): Record<string, string> {
  return {
    info: token('info-500'),
    success: token('success-500'),
    warning: token('warning-500'),
    danger: token('danger-500'),
    neutral: token('gray-400'),
  };
}

/**
 * Apply system-wide Chart.js defaults: Inter font, neutral grid/ticks, calm
 * tooltips, subtle bar radius. Call once per page before constructing charts.
 */
export function applyChartTheme(Chart: typeof ChartType): void {
  const grid = token('gray-200');
  const ticks = token('gray-500');
  const ink = token('gray-900');

  Chart.defaults.font.family = token('font-sans') || 'Inter, sans-serif';
  Chart.defaults.font.size = 12;
  Chart.defaults.color = ticks;
  Chart.defaults.borderColor = grid;

  // Legends: compact, point-style markers, neutral ink.
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.plugins.legend.labels.color = ink;

  // Tooltips: white surface, neutral border, dark text — matches DS cards.
  Chart.defaults.plugins.tooltip.backgroundColor = '#fff';
  Chart.defaults.plugins.tooltip.titleColor = ink;
  Chart.defaults.plugins.tooltip.bodyColor = token('gray-700');
  Chart.defaults.plugins.tooltip.borderColor = grid;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 6;
  Chart.defaults.plugins.tooltip.displayColors = true;
  Chart.defaults.plugins.tooltip.boxPadding = 4;
}
