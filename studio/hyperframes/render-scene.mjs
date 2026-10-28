#!/usr/bin/env node
/**
 * Render one HyperFrames scene of an episode, timed by its narration. Cross-platform
 * (macOS, Windows, Linux); needs Node >= 22.
 *
 *   node studio/hyperframes/render-scene.mjs <episode-id> <scene-id> [timing.json] [--draft] [--snap "1,5,9"]
 *
 * - Timing: $EDZOLA_VIDEO_HOME/build/<id>/timing.json (after `npm run narrate`), else the
 *   committed episodes/<id>/timing.preview.json, so you can design scenes before voicing.
 * - Stages the scene as index.html in $EDZOLA_VIDEO_HOME/build/<id>/hf/<scene>/ with the kit,
 *   fonts, brand assets and GSAP; writes cues.js; fills {{DURATION}}.
 * - Runs `hyperframes check` (set HF_ALLOW_CHECK_FAIL=1 to continue anyway), then renders to
 *   build/<id>/scenes/<scene>.mp4, or with --snap writes stills to build/<id>/scenes/<scene>-snaps/.
 */
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const HOME = process.env.EDZOLA_VIDEO_HOME ?? path.join(os.homedir(), '.edzola-video-studio');
const HF_VERSION = '0.8.181';
const GSAP_VERSION = '3.14.2';

export function renderScene(ep, scene, {timing, snap, draft} = {}) {
  if (Number(process.versions.node.split('.')[0]) < 22) throw new Error('HyperFrames needs Node 22+ (node -v)');
  const src = path.join(ROOT, 'episodes', ep, 'scenes', `${scene}.html`);
  if (!fs.existsSync(src)) throw new Error(`missing ${src}`);
  const built = path.join(HOME, 'build', ep, 'timing.json');
  const preview = path.join(ROOT, 'episodes', ep, 'timing.preview.json');
  timing ??= fs.existsSync(built) ? built : preview;
  if (!fs.existsSync(timing)) throw new Error(`no timing for ${ep}: run \`npm run narrate -- ${ep}\` first`);

  // Engine: pinned HyperFrames + GSAP, installed once outside the repo.
  const work = path.join(HOME, 'hyperframes');
  const cli = path.join(work, 'node_modules', 'hyperframes', 'package.json');
  if (!fs.existsSync(cli)) {
    fs.mkdirSync(work, {recursive: true});
    if (!fs.existsSync(path.join(work, 'package.json'))) fs.writeFileSync(path.join(work, 'package.json'), '{"private":true}\n');
    execFileSync('npm', ['install', '--no-fund', '--no-audit', `hyperframes@${HF_VERSION}`, `gsap@${GSAP_VERSION}`],
      {cwd: work, stdio: 'inherit', shell: process.platform === 'win32'});
  }
  const pkg = JSON.parse(fs.readFileSync(cli, 'utf8'));
  const binRel = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin.hyperframes ?? Object.values(pkg.bin)[0];
  const hf = (...args) => execFileSync(process.execPath, [path.join(work, 'node_modules', 'hyperframes', binRel), ...args],
    {cwd: work, stdio: 'inherit', env: {...process.env, HYPERFRAMES_SKIP_SKILLS: '1', HYPERFRAMES_TELEMETRY_DISABLED: '1', DO_NOT_TRACK: '1'}});

  // Stage the scene.
  const stage = path.join(HOME, 'build', ep, 'hf', scene);
  const out = path.join(HOME, 'build', ep, 'scenes');
  for (const d of [path.join(stage, 'fonts'), path.join(stage, 'brand'), out]) fs.mkdirSync(d, {recursive: true});
  const board = JSON.parse(fs.readFileSync(path.join(ROOT, 'episodes', ep, 'storyboard.json'), 'utf8'));
  const t = JSON.parse(fs.readFileSync(timing, 'utf8')).scenes.find(s => s.id === scene);
  if (!t) throw new Error(`scene ${scene} not in ${timing}`);
  const cues = {scene, duration: t.duration, series: board.series ?? '', captions: (board.captions ?? 'burned') === 'burned',
    beats: t.beats.map(b => ({start: b.start, end: b.end, captions: b.captions}))};
  fs.writeFileSync(path.join(stage, 'cues.js'), `window.CUES = ${JSON.stringify(cues)};\n`);
  fs.writeFileSync(path.join(stage, 'index.html'), fs.readFileSync(src, 'utf8').replaceAll('{{DURATION}}', t.duration.toFixed(3)));
  for (const f of ['brand.css', 'kit.js']) fs.copyFileSync(path.join(HERE, 'kit', f), path.join(stage, f));
  fs.copyFileSync(path.join(work, 'node_modules', 'gsap', 'dist', 'gsap.min.js'), path.join(stage, 'gsap.min.js'));
  for (const f of fs.readdirSync(path.join(ROOT, 'assets', 'fonts'))) if (f.endsWith('.ttf')) fs.copyFileSync(path.join(ROOT, 'assets', 'fonts', f), path.join(stage, 'fonts', f));
  for (const f of fs.readdirSync(path.join(ROOT, 'assets', 'brand'))) if (/\.(svg|png)$/.test(f)) fs.copyFileSync(path.join(ROOT, 'assets', 'brand', f), path.join(stage, 'brand', f));
  console.log(`staged ${scene}: ${t.duration.toFixed(2)}s, ${t.beats.length} beats (timing: ${path.basename(timing)})`);

  try {
    hf('check', stage);
  } catch {
    console.log(`hyperframes check failed for ${scene}`);
    if (!process.env.HF_ALLOW_CHECK_FAIL) throw new Error(`check failed: ${scene}`);
  }
  if (snap) {
    hf('snapshot', stage, '--at', snap, '-o', path.join(out, `${scene}-snaps`));
    console.log(`snapshots: ${path.join(out, `${scene}-snaps`)}`);
  } else {
    hf('render', stage, '--fps', '30', '--quality', draft ? 'draft' : 'delivery', '-o', path.join(out, `${scene}.mp4`));
    console.log(`rendered: ${path.join(out, `${scene}.mp4`)}`);
  }
  return path.join(out, `${scene}.mp4`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [ep, scene, ...rest] = process.argv.slice(2);
  if (!ep || !scene) {
    console.log('usage: node studio/hyperframes/render-scene.mjs <episode-id> <scene-id> [timing.json] [--draft] [--snap "1,5"]');
    process.exit(1);
  }
  const snapAt = rest.indexOf('--snap');
  const snap = snapAt > -1 ? rest[snapAt + 1] : undefined;
  const timing = rest.find((a, i) => !a.startsWith('--') && i !== snapAt + 1);
  try {
    renderScene(ep, scene, {timing, snap, draft: rest.includes('--draft')});
  } catch (e) {
    console.error(String(e.message ?? e));
    process.exit(2);
  }
}
