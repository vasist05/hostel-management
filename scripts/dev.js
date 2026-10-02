#!/usr/bin/env node
/**
 * Development runner.
 *
 * Starts two processes and keeps their lifetimes tied together:
 *   1. the frontend bundle watcher, so app.compiled.js is rebuilt the moment
 *      app.js changes (no more hand-maintained bundle);
 *   2. the backend dev server (nodemon), which restarts on its own changes.
 *
 * Usage: npm run dev
 */

const { spawn } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const isWindows = process.platform === 'win32';
const children = [];
let shuttingDown = false;

// `command` is spawned directly when useShell is false (safe for paths that
// contain spaces, such as the Node executable itself). When useShell is true the
// whole command line is passed as a single string, which avoids child_process's
// DEP0190 warning about unescaped args being concatenated.
function start(label, command, args, useShell) {
  const child = useShell
    ? spawn(command, { cwd: ROOT, stdio: 'inherit', shell: true })
    : spawn(command, args, { cwd: ROOT, stdio: 'inherit' });

  children.push({ label, child });

  child.on('exit', (code, signal) => {
    if (shuttingDown) return;
    console.log(`\n[dev] ${label} exited (${signal || code}). Shutting down the other process.`);
    shutdown(typeof code === 'number' ? code : 1);
  });

  child.on('error', (err) => {
    console.error(`[dev] could not start ${label}: ${err.message}`);
    shutdown(1);
  });

  return child;
}

function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const { label, child } of children) {
    if (child.exitCode !== null || child.signalCode !== null) continue;

    if (isWindows) {
      // npm and nodemon spawn grandchildren, so kill the whole tree.
      spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    } else {
      child.kill('SIGTERM');
    }

    console.log(`[dev] stopped ${label}`);
  }

  // Give the kill a beat to land before the parent exits.
  setTimeout(() => process.exit(code), 300);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

console.log('[dev] frontend bundle watcher + backend dev server starting...\n');

// Node runs directly (no shell). npm needs a shell on Windows, where it is a
// .cmd shim rather than an executable.
start('build', process.execPath, [path.join(__dirname, 'build.js'), '--watch'], false);
start('backend', 'npm --prefix backend run dev', [], true);
