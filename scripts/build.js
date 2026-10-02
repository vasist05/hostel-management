#!/usr/bin/env node
/**
 * Compiles the JSX source (app.js) into the browser-ready bundle
 * (app.compiled.js) that index.html actually loads.
 *
 * app.compiled.js is generated output: edit app.js instead, and re-run this.
 *
 * Usage:
 *   node scripts/build.js           compile once
 *   node scripts/build.js --watch   compile, then rebuild on every change
 */

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'app.js');
const OUTPUT = path.join(ROOT, 'app.compiled.js');
const CONFIG = path.join(ROOT, 'babel.config.json');

const BANNER = `/*
 * AUTO-GENERATED FILE - DO NOT EDIT.
 * Built from app.js by "npm run build" (see scripts/build.js).
 * Manual changes here are overwritten on the next build; edit app.js instead.
 */
`;

function compile() {
  // cwd/root/configFile are pinned so the build produces identical output no
  // matter which directory the script was launched from.
  const result = babel.transformFileSync(SOURCE, {
    cwd: ROOT,
    root: ROOT,
    configFile: CONFIG,
    sourceMaps: false
  });

  if (!result || !result.code) {
    throw new Error('Babel produced no output for app.js');
  }

  // Write to a temp file and rename, so a browser request landing mid-build can
  // never observe a half-written bundle.
  const temp = `${OUTPUT}.tmp`;
  fs.writeFileSync(temp, BANNER + result.code + '\n', 'utf8');
  fs.renameSync(temp, OUTPUT);

  const bytes = Buffer.byteLength(BANNER + result.code + '\n', 'utf8');
  return bytes;
}

function stamp() {
  return new Date().toTimeString().slice(0, 8);
}

function buildOnce() {
  try {
    const bytes = compile();
    console.log(
      `[build] ${stamp()} app.js -> app.compiled.js (${bytes.toLocaleString()} bytes)`
    );
    return true;
  } catch (err) {
    // Keep the previous good bundle on disk so the page still loads, and make
    // the failure obvious instead of leaving a silently stale file.
    console.error(`[build] ${stamp()} FAILED: ${err.message}`);
    return false;
  }
}

function watch() {
  console.log('[build] watching app.js and babel.config.json for changes... (Ctrl+C to stop)');

  let timer = null;
  const schedule = () => {
    if (timer) clearTimeout(timer);
    // Debounce: editors often emit several events per save.
    timer = setTimeout(() => {
      timer = null;
      buildOnce();
    }, 100);
  };

  for (const file of [SOURCE, CONFIG]) {
    if (fs.existsSync(file)) fs.watch(file, schedule);
  }

  process.on('SIGINT', () => process.exit(0));
  process.on('SIGTERM', () => process.exit(0));
}

if (!fs.existsSync(SOURCE)) {
  console.error(`[build] cannot find ${path.relative(ROOT, SOURCE)}`);
  process.exit(1);
}

const ok = buildOnce();
const watching = process.argv.includes('--watch');

if (watching) {
  watch();
} else if (!ok) {
  process.exit(1);
}
