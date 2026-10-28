/**
 * EdZola Video Studio pipeline.
 *
 *   npx tsx pipeline/build.ts validate <episode-id>
 *   npx tsx pipeline/build.ts narrate  <episode-id>
 *   npx tsx pipeline/build.ts listen   <episode-id>   (transcribe + diff against script)
 *   npx tsx pipeline/build.ts render   <episode-id>   (validate + narrate + render + mux + QA)
 *   npx tsx pipeline/build.ts say "<text>" [voice]     (pronunciation check)
 *
 * Source of truth is the repo (episodes/<id>/storyboard.json).
 * Heavy, regenerable artefacts (node_modules, models, per-beat audio, raw
 * renders) live in $EDZOLA_VIDEO_HOME (default ~/.edzola-video-studio).
 */
import Ajv2020 from 'ajv/dist/2020.js';
import {execFileSync, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(STUDIO, '..');
const HOME = process.env.EDZOLA_VIDEO_HOME ?? path.join(os.homedir(), '.edzola-video-studio');
const PY = path.join(HOME, '.venv', 'bin', 'python');
const MODELS = path.join(HOME, 'models');

const readJson = (p: string) => JSON.parse(fs.readFileSync(p, 'utf8'));
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const srtTime = (s: number) => {
  const ms = Math.round(s * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000);
  const sec = Math.floor((ms % 60000) / 1000), r = ms % 1000;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')},${String(r).padStart(3, '0')}`;
};

function paths(id: string) {
  const episode = path.join(ROOT, 'episodes', id);
  return {
    episode,
    storyboard: path.join(episode, 'storyboard.json'),
    output: path.join(episode, 'output'),
    build: path.join(HOME, 'build', id),
  };
}

// ---------------------------------------------------------------- validate

const BANNED = ['disrupt', 'unlock', 'unleash', 'supercharge', 'leverage', 'digital transformation journey', 'game-changer', 'revolutionise', 'revolutionize'];
// Brand terminology (Design System brand skill): preferred term for each.
const PREFER: [RegExp, string][] = [
  [/\bNGOs?\b/, 'nonprofit(s)'],
  [/\bclients?\b/i, 'partners'],
  [/\bprograms?\b/i, 'programme(s)'],
  [/\borganization/i, 'organisation'],
  [/\bdeveloping countries\b/i, 'LMICs or the country name'],
];
const PII = [
  {name: 'email address', re: /[\w.+-]+@[\w-]+\.[\w.]+/},
  {name: 'phone number', re: /(?:\+91[\s-]?)?\b[6-9]\d{9}\b/},
  {name: 'Aadhaar-like 12-digit number', re: /\b\d{4}\s?\d{4}\s?\d{4}\b/},
];

export function validate(id: string): {errors: string[]; warnings: string[]} {
  const p = paths(id);
  const board = readJson(p.storyboard);
  const schema = readJson(path.join(ROOT, 'schemas', 'storyboard.schema.json'));
  const manifest = readJson(path.join(STUDIO, 'templates.manifest.json')).templates;
  const errors: string[] = [];
  const warnings: string[] = [];

  const ajv = new (Ajv2020 as any)({allErrors: true, strict: false});
  if (!ajv.validate(schema, board)) {
    for (const e of ajv.errors) errors.push(`schema ${e.instancePath || '/'} ${e.message}`);
  }

  const hyperframes = board.renderer === 'hyperframes';
  for (const scene of board.scenes ?? []) {
    const tpl = manifest[scene.template];
    if (hyperframes) {
      if (!scene.composition) errors.push(`${scene.id}: hyperframes scenes need a "composition" path`);
      else if (!fs.existsSync(path.join(p.episode, scene.composition))) warnings.push(`${scene.id}: composition ${scene.composition} not built yet`);
    } else if (!tpl) {
      errors.push(`${scene.id}: unknown template "${scene.template}" (see studio/templates.manifest.json)`);
      continue;
    }
    scene.beats.forEach((beat: any, bi: number) => {
      const where = `${scene.id} beat ${bi + 1}`;
      for (const a of hyperframes ? [] : beat.do ?? []) {
        if (!tpl.actions.includes(a.action)) errors.push(`${where}: template ${scene.template} has no action "${a.action}"`);
      }
      const text: string = beat.text;
      if (text.length > 200) warnings.push(`${where}: beat is ${text.length} chars; split it (aim for one spoken sentence)`);
      if (/[—–]/.test(text)) warnings.push(`${where}: em/en dash in narration (brand voice rule); use a full stop or comma`);
      for (const w of BANNED) if (text.toLowerCase().includes(w)) warnings.push(`${where}: banned brand word "${w}"`);
      for (const [re, use] of PREFER) if (re.test(text)) warnings.push(`${where}: "${text.match(re)![0]}" (brand prefers ${use})`);
    });
    const blob = JSON.stringify(scene);
    for (const {name, re} of PII) if (re.test(blob)) errors.push(`${scene.id}: looks like it contains a ${name}. Never put PII in a storyboard.`);
  }

  for (const src of board.sources ?? []) {
    if (!fs.existsSync(path.join(ROOT, src))) errors.push(`source not found: ${src}`);
  }

  for (const c of board.claims ?? []) {
    if (c.status === 'needs_evidence') {
      const msg = `claim needs evidence: "${c.claim}"`;
      (['approved', 'published'].includes(board.status) ? errors : warnings).push(msg);
    }
  }
  return {errors, warnings};
}

function runValidate(id: string) {
  const {errors, warnings} = validate(id);
  for (const w of warnings) console.log(`  warn  ${w}`);
  for (const e of errors) console.log(`  ERROR ${e}`);
  if (errors.length) {
    console.log(`✗ ${id}: ${errors.length} error(s)`);
    process.exit(1);
  }
  console.log(`✓ ${id}: storyboard valid (${warnings.length} warning(s))`);
}

// ----------------------------------------------------------------- narrate

function narrate(id: string) {
  const p = paths(id);
  fs.mkdirSync(p.build, {recursive: true});
  const out = execFileSync(
    PY,
    ['-I', path.join(STUDIO, 'pipeline', 'narrate.py'), p.storyboard, path.join(STUDIO, 'lexicon.json'), p.build, MODELS],
    {encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit']},
  );
  console.log(`✓ narration ${out.trim()}`);
}

// ------------------------------------------------------------------ listen

/** Transcribe narration and flag beats that don't sound like the script. */
function listen(id: string) {
  const p = paths(id);
  const out = path.join(p.output, 'listen.json');
  fs.mkdirSync(p.output, {recursive: true});
  const res = execFileSync(
    PY,
    ['-I', path.join(STUDIO, 'pipeline', 'listen.py'), path.join(p.build, 'narration.wav'), path.join(p.build, 'timing.json'), out],
    {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], env: {...process.env, HF_HOME: path.join(HOME, 'hf')}},
  );
  const report = readJson(out);
  for (const f of report.flagged) console.log(`  listen ${f.scene} beat ${f.beat}: expected "${f.expected}" heard "${f.heard}"`);
  console.log(`✓ listen-back ${res.trim()}`);
  return report.flagged.length as number;
}

// ------------------------------------------------------------------ render

function buildEpisodeJson(id: string) {
  const p = paths(id);
  const board = readJson(p.storyboard);
  const timing = readJson(path.join(p.build, 'timing.json'));
  const scenes = board.scenes.map((s: any, i: number) => {
    const t = timing.scenes[i];
    if (t.id !== s.id) throw new Error(`timing out of date for ${s.id}; re-run narrate`);
    return {
      id: s.id,
      type: s.type,
      template: s.template,
      props: s.props,
      start: t.start,
      duration: t.duration,
      beats: s.beats.map((b: any, bi: number) => ({
        text: b.text,
        do: b.do ?? [],
        start: t.beats[bi].start,
        end: t.beats[bi].end,
        captions: t.beats[bi].captions,
      })),
    };
  });
  const built = {video_id: board.video_id, title: board.title, series: board.series, captions: board.captions ?? 'burned', total: timing.total, scenes};
  const dir = path.join(STUDIO, 'src', '.build');
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, 'episode.json'), JSON.stringify(built, null, 2));
  return {board, timing, built};
}

function writeSidecars(id: string, board: any, timing: any) {
  const p = paths(id);
  let n = 1;
  const srt: string[] = [];
  const chapters: string[] = [];
  timing.scenes.forEach((ts: any, i: number) => {
    const chapter = board.scenes[i].chapter;
    if (chapter) chapters.push(`${fmt(ts.start)} ${chapter}`);
    for (const b of ts.beats)
      for (const c of b.captions) srt.push(`${n++}\n${srtTime(ts.start + c.start)} --> ${srtTime(ts.start + c.end)}\n${c.text}\n`);
  });
  fs.writeFileSync(path.join(p.output, `${id}.srt`), srt.join('\n'));
  fs.writeFileSync(path.join(p.output, 'chapters.txt'), chapters.join('\n') + '\n');
  // YouTube ignores chapter lists with a chapter shorter than 10 s.
  const starts = timing.scenes.map((ts: any, i: number) => (board.scenes[i].chapter ? ts.start : null)).filter((x: any) => x !== null);
  starts.forEach((s: number, i: number) => {
    const end = starts[i + 1] ?? timing.total;
    if (end - s < 10) console.log(`  warn  chapter at ${fmt(s)} is ${(end - s).toFixed(1)}s; YouTube needs >= 10s, merge it`);
  });
}

function ff(args: string[]) {
  return execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']});
}

async function render(id: string) {
  runValidate(id);
  narrate(id);
  const p = paths(id);
  const {board, timing} = buildEpisodeJson(id);
  fs.mkdirSync(p.output, {recursive: true});

  const started = Date.now();
  if (board.renderer === 'hyperframes') {
    renderHyperframes(id, board, timing);
  } else {
    await renderRevideo(p.build);
  }
  console.log(`✓ rendered video in ${((Date.now() - started) / 1000).toFixed(0)}s`);

  // Mux the audio stem and normalise to YouTube loudness (-14 LUFS integrated, -1.5 dBTP).
  // HyperFrames episodes get the full sound design (effects + ducked music bed).
  const master = path.join(p.output, `${id}.mp4`);
  let audio = path.join(p.build, 'narration.wav');
  const music = board.music ?? 'none';
  if (board.renderer === 'hyperframes') {
    const musicArg = music.startsWith('procedural:') || music === 'none' ? music : path.join(ROOT, 'assets', 'music', music);
    const out = execFileSync(PY, ['-I', path.join(STUDIO, 'pipeline', 'mix.py'), p.build, path.join(ROOT, 'assets', 'sfx'), musicArg], {encoding: 'utf8'});
    console.log(`✓ mix ${out.trim().split('\n').pop()}`);
    audio = path.join(p.build, 'mix.wav');
  }
  const bed = board.renderer !== 'hyperframes' && board.music ? path.join(ROOT, 'assets', 'music', board.music) : null;
  const inputs = ['-i', path.join(p.build, 'video.mp4'), '-i', audio, ...(bed ? ['-stream_loop', '-1', '-i', bed] : [])];
  const filter = bed
    ? '[2:a]volume=-24dB[m];[1:a][m]amix=inputs=2:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11[a]'
    : '[1:a]loudnorm=I=-14:TP=-1.5:LRA=11[a]';
  ff([...inputs, '-filter_complex', filter, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', String(timing.total), '-movflags', '+faststart', master]);
  writeSidecars(id, board, timing);

  // Review aids: thumbnail candidate + contact sheet (one frame every 4 s).
  const hook = timing.scenes[0];
  ff(['-ss', String(hook.start + hook.duration - 1), '-i', master, '-frames:v', '1', path.join(p.output, 'thumbnail.png')]);
  const tiles = Math.ceil(timing.total / 4);
  ff(['-i', master, '-vf', `fps=1/4,scale=480:-1,tile=4x${Math.ceil(tiles / 4)}:padding=6:color=white`, '-frames:v', '1', path.join(p.output, 'contact-sheet.png')]);

  const flagged = listen(id);
  qa(id, timing.total, flagged);
}

/** One HyperFrames composition per scene, timed by narration, then joined. */
function renderHyperframes(id: string, board: any, timing: any) {
  const p = paths(id);
  const script = path.join(STUDIO, 'hyperframes', 'render-scene.sh');
  const list: string[] = [];
  for (const scene of board.scenes) {
    const t0 = Date.now();
    execFileSync('bash', [script, id, scene.id], {stdio: ['ignore', 'ignore', 'inherit']});
    const clip = path.join(p.build, 'scenes', `${scene.id}.mp4`);
    list.push(`file '${clip.replace(/'/g, "'\\''")}'`);
    console.log(`  scene ${scene.id} rendered in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  const listFile = path.join(p.build, 'scenes.txt');
  fs.writeFileSync(listFile, list.join('\n') + '\n');
  // Re-encode on join so every scene shares one clean timeline (scene lengths are whole frames).
  ff(['-f', 'concat', '-safe', '0', '-i', listFile, '-c:v', 'libx264', '-crf', '18', '-preset', 'medium',
      '-pix_fmt', 'yuv420p', '-r', '30', '-an', '-t', String(timing.total), path.join(p.build, 'video.mp4')]);
}

async function renderRevideo(outDir: string) {
  const {renderVideo} = await import('@revideo/renderer');
  process.chdir(STUDIO);
  await renderVideo({
    projectFile: './src/project.tsx',
    settings: {
      outDir,
      outFile: 'video.mp4',
      logProgress: true,
      workers: Number(process.env.RENDER_WORKERS ?? 2),
      puppeteer: {headless: 'shell'} as any,
      viteConfig: {server: {fs: {allow: [ROOT, HOME]}}, logLevel: 'warn'},
    },
  });
}

// ---------------------------------------------------------------------- QA

function qa(id: string, expected: number, listenFlags?: number) {
  const p = paths(id);
  const master = path.join(p.output, `${id}.mp4`);
  const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_format', '-show_streams', master], {encoding: 'utf8'}));
  const v = probe.streams.find((s: any) => s.codec_type === 'video');
  const duration = Number(probe.format.duration);
  // ffmpeg analysis filters report on stderr; spawnSync captures it without throwing.
  const analyse = (filterArgs: string[]) =>
    spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', master, ...filterArgs, '-f', 'null', '-'], {encoding: 'utf8'}).stderr;
  const blacks = analyse(['-vf', 'blackdetect=d=0.5:pix_th=0.1', '-an']);
  const ebur = analyse(['-af', 'ebur128=peak=true', '-vn']).split('Summary:').pop() ?? '';
  const lufs = Number((ebur.match(/I:\s+(-?[\d.]+) LUFS/) ?? [])[1]);
  const peak = Number((ebur.match(/Peak:\s+(-?[\d.]+) dBFS/) ?? [])[1]);
  const report = {
    file: path.relative(ROOT, master),
    resolution: `${v.width}x${v.height}`,
    fps: v.r_frame_rate,
    duration_s: Number(duration.toFixed(2)),
    expected_s: expected,
    duration_ok: Math.abs(duration - expected) < 0.2,
    loudness_lufs: lufs,
    loudness_ok: Math.abs(lufs + 14) <= 1.5,
    true_peak_dbfs: peak,
    black_segments: (blacks.match(/black_start/g) ?? []).length,
    listen_back_flags: listenFlags ?? null,
    size_mb: Number((Number(probe.format.size) / 1e6).toFixed(1)),
    checked_at: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(p.output, 'qa.json'), JSON.stringify(report, null, 2));
  console.log('QA', JSON.stringify(report, null, 2));
  console.log('\nHuman review still required: see docs/07-editorial-review.md checklist.');
}

// --------------------------------------------------------------------- say

function say(text: string, voice = 'bf_emma') {
  const dir = path.join(HOME, 'build', '_say');
  fs.mkdirSync(dir, {recursive: true});
  const board = {voice: {engine: 'kokoro', voice, lang: voice.startsWith('b') ? 'en-gb' : 'en-us'}, scenes: [{id: 'say', beats: [{text}]}]};
  const sb = path.join(dir, 'storyboard.json');
  fs.writeFileSync(sb, JSON.stringify(board));
  execFileSync(PY, ['-I', path.join(STUDIO, 'pipeline', 'narrate.py'), sb, path.join(STUDIO, 'lexicon.json'), dir, MODELS], {stdio: 'inherit'});
  console.log(`spoken as: ${readJson(path.join(dir, 'timing.json')).scenes[0].beats[0].spoken}`);
  execFileSync('afplay', [path.join(dir, 'narration.wav')]);
}

// -------------------------------------------------------------------- main

const [cmd, arg, extra] = process.argv.slice(2);
const usage = 'usage: build.ts <validate|narrate|render> <episode-id>  |  build.ts say "<text>" [voice]';
if (!cmd || !arg) {
  console.log(usage);
  process.exit(1);
}
if (cmd === 'validate') runValidate(arg);
else if (cmd === 'narrate') narrate(arg);
else if (cmd === 'listen') listen(arg);
else if (cmd === 'render') await render(arg);
else if (cmd === 'say') say(arg, extra);
else {
  console.log(usage);
  process.exit(1);
}
