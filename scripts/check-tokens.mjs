// Fails when the two copies of the dark-theme declarations in assets/tokens.css
// (data-theme="dark" and data-theme="auto" under prefers-color-scheme: dark)
// differ. CSS has no way to share one declaration block between a selector and
// a media query, so the block is duplicated and this check keeps it honest.
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../assets/tokens.css', import.meta.url), 'utf8');
const blocks = [...css.matchAll(/\/\* @dark-tokens:start \*\/([\s\S]*?)\/\* @dark-tokens:end \*\//g)].map((m) =>
  m[1]
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .filter(Boolean),
);

if (blocks.length !== 2) {
  console.error(`check:tokens — expected 2 @dark-tokens blocks in assets/tokens.css, found ${blocks.length}.`);
  process.exit(1);
}

const [dark, auto] = blocks;
const length = Math.max(dark.length, auto.length);
for (let i = 0; i < length; i++) {
  if (dark[i] !== auto[i]) {
    console.error('check:tokens — the data-theme="dark" and data-theme="auto" dark blocks differ:');
    console.error(`  dark: ${dark[i] ?? '(missing)'}`);
    console.error(`  auto: ${auto[i] ?? '(missing)'}`);
    process.exit(1);
  }
}

console.log(`check:tokens — dark blocks in sync (${dark.length} lines).`);
