#!/usr/bin/env node
/**
 * Generates `themes/<id>-color-theme.json` from the palettes in
 * `src/palettes/` and keeps `contributes.themes` in package.json in sync.
 *
 *   node src/build/index.mjs           writes the files
 *   node src/build/index.mjs --check   fails if anything is stale (CI)
 */
import { readFile, writeFile, readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { palettes } from '../palettes/index.mjs';
import { buildTheme } from './theme.mjs';
import { deriveLight } from './light.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const THEMES_DIR = path.join(ROOT, 'themes');
const PKG_PATH = path.join(ROOT, 'package.json');

const check = process.argv.includes('--check');

// don't blow up when the output is cut short (`npm run build | head`)
process.stdout.on('error', (e) => { if (e.code !== 'EPIPE') throw e; });

const stale = [];

/** Writes the file (or compares it, under --check) and reports. */
async function emit(filePath, content) {
  const rel = path.relative(ROOT, filePath);
  let current = null;
  try {
    current = await readFile(filePath, 'utf8');
  } catch {
    /* new file */
  }

  if (current === content) {
    console.log(`  = ${rel}`);
    return;
  }
  if (check) {
    stale.push(rel);
    console.log(`  ! ${rel} is stale`);
    return;
  }
  await writeFile(filePath, content, 'utf8');
  console.log(`  ${current === null ? '+' : '~'} ${rel}`);
}

function themeFileName(palette) {
  return `${palette.id}-color-theme.json`;
}

async function main() {
  // every palette yields two variants: the hand-written dark one and the
  // light one derived from it
  const all = palettes.flatMap((palette) => [palette, deriveLight(palette)]);

  const ids = new Set();
  for (const palette of all) {
    if (ids.has(palette.id)) throw new Error(`duplicate palette id: ${palette.id}`);
    ids.add(palette.id);
  }

  console.log(`Building ${all.length} theme(s) (${palettes.length} palettes x dark/light):`);
  for (const palette of all) {
    const theme = buildTheme(palette);
    await emit(
      path.join(THEMES_DIR, themeFileName(palette)),
      `${JSON.stringify(theme, null, 2)}\n`,
    );
  }

  // package.json: contributes.themes derived from the palette registry
  const pkgRaw = await readFile(PKG_PATH, 'utf8');
  const pkg = JSON.parse(pkgRaw);
  pkg.contributes = pkg.contributes ?? {};
  pkg.contributes.themes = all.map((palette) => ({
    label: palette.label,
    uiTheme: palette.type === 'light' ? 'vs' : 'vs-dark',
    path: `./themes/${themeFileName(palette)}`,
  }));
  await emit(PKG_PATH, `${JSON.stringify(pkg, null, 2)}\n`);

  // orphaned themes (palette removed or renamed)
  const expected = new Set(all.map(themeFileName));
  const existing = await readdir(THEMES_DIR).catch(() => []);
  for (const file of existing) {
    if (!file.endsWith('-color-theme.json') || expected.has(file)) continue;
    const rel = path.relative(ROOT, path.join(THEMES_DIR, file));
    if (check) {
      stale.push(rel);
      console.log(`  ! ${rel} is orphaned`);
    } else {
      await unlink(path.join(THEMES_DIR, file));
      console.log(`  - ${rel} (orphaned, removed)`);
    }
  }

  if (check && stale.length) {
    console.error(`\nStale output. Run \`npm run build\` and commit:\n  ${stale.join('\n  ')}`);
    process.exit(1);
  }
  console.log(check ? '\nUp to date.' : '\nDone.');
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
