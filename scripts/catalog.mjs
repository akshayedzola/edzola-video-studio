#!/usr/bin/env node
/**
 * EdZola Video Studio catalogue: one source of truth for every episode id.
 *
 *   node scripts/catalog.mjs                 build catalog/episodes.json and print counts
 *   node scripts/catalog.mjs --check         CI: unique ids, episode folders match the catalogue
 *   node scripts/catalog.mjs --seed-issues [--only core|sectors] [--limit N] [--dry-run]
 *                                            create one GitHub issue per long-form episode (needs `gh`)
 *
 * Long-form episodes = curated core (catalog/core.json) + sector templates
 * (catalog/sector-topics.json × knowledge/sectors/sectors.json). Shorts and
 * language versions are *derived* ids (<id>--short-1, <id>--hi) and get issues
 * automatically once their parent is published (see .github/workflows/tracker-commands.yml).
 */
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const args = process.argv.slice(2);
const flag = f => args.includes(f);
const opt = f => (args.includes(f) ? args[args.indexOf(f) + 1] : undefined);

const SERIES = {A: 'Technology for Impact, Explained', B: 'How Systems Actually Work', C: 'Building EdZola', S: 'Sector Field Guides'};

export function buildCatalog() {
  const core = read('catalog/core.json').episodes.map(e => ({...e, kind: 'core'}));
  const sectors = read('knowledge/sectors/sectors.json');
  const topics = read('catalog/sector-topics.json');
  const variants = read('catalog/variants.json');
  const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? `{${k}}`);

  const sector = [];
  sectors.forEach((s, i) => {
    const n = String(i + 1).padStart(2, '0');
    const v = {sector: s.sector, thread: s.thread_id};
    const src = [`knowledge/sectors/${s.file}`, 'knowledge/frameworks/map-framework.md'];
    for (const t of topics.per_sector) {
      sector.push({id: `s${n}-${s.slug}-${t.key}`, series: 'S', sector: s.sector, title: fill(t.title, v), format: t.format,
        thesis: fill(t.thesis, v), sources: src, priority: t.key === 'thread' ? 1 : 2, product: false, kind: 'sector'});
    }
    s.stages.forEach((st, j) => {
      const sv = {...v, stage: st.name, headline: st.headline};
      sector.push({id: `s${n}-${s.slug}-stage${j + 1}-${st.slug}`, series: 'S', sector: s.sector, title: fill(topics.per_stage.title, sv),
        format: topics.per_stage.format, thesis: fill(topics.per_stage.thesis, sv), sources: src, priority: 3, product: false, kind: 'sector'});
    });
  });

  const long = [...core, ...sector];
  const shorts = long.flatMap(e => Array.from({length: variants.shorts_per_episode}, (_, k) => `${e.id}--short-${k + 1}`));
  const langs = variants.languages_active;
  const translated = [...long.map(e => e.id), ...shorts].flatMap(id => langs.map(l => `${id}--${l}`));
  return {long, derived: {shorts, translated}, langs, total: long.length + shorts.length + translated.length};
}

function check({long, derived}) {
  const errors = [];
  const ids = long.map(e => e.id);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) errors.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);
  for (const e of long) {
    if (!/^[a-z0-9-]+$/.test(e.id)) errors.push(`bad id ${e.id}`);
    for (const s of e.sources ?? []) if (!fs.existsSync(path.join(ROOT, s))) errors.push(`${e.id}: missing source ${s}`);
  }
  const known = new Set([...ids, ...derived.shorts, ...derived.translated]);
  const dir = path.join(ROOT, 'episodes');
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('_') || f.startsWith('x') || f.startsWith('.')) continue; // templates and reference examples
    if (!known.has(f)) errors.push(`episodes/${f} is not in the catalogue (add it to catalog/core.json or use an existing id)`);
    const sb = path.join(dir, f, 'storyboard.json');
    if (fs.existsSync(sb) && JSON.parse(fs.readFileSync(sb, 'utf8')).video_id !== f) errors.push(`episodes/${f}: storyboard video_id must equal the folder name`);
  }
  return errors;
}

function gh(argv, input) {
  return execFileSync('gh', argv, {encoding: 'utf8', input, stdio: [input ? 'pipe' : 'ignore', 'pipe', 'inherit'], shell: process.platform === 'win32'});
}

export const LABELS = [
  ['episode', '1f6feb', 'A video in the catalogue'],
  ['stage:open', 'ededed', 'Available to claim'],
  ['stage:claimed', 'fbca04', 'Someone is on it (comment /claim)'],
  ['stage:creation', 'e8967a', 'Storyboard and scenes in progress (draft PR open)'],
  ['stage:review', 'a64c35', 'Manual review: PR ready for review'],
  ['stage:approved', '2e6e68', 'Approved and merged; waiting to be published'],
  ['stage:published', '0e8a16', 'Live on YouTube'],
  ['series:A', 'f7c948', SERIES.A], ['series:B', '8ecfca', SERIES.B], ['series:C', 'fae8dc', SERIES.C], ['series:S', 'c2e0c6', SERIES.S],
  ['kind:core', 'd4c5f9', 'Curated core episode'], ['kind:sector', 'c5def5', 'Sector episode'],
  ['kind:short', 'bfdadc', 'Vertical Short cut from a published episode'], ['kind:language', 'fef2c0', 'Language version of a published episode'],
  ['priority:p1', 'b60205', 'Make these first'], ['priority:p2', 'd93f0b', ''], ['priority:p3', 'fbca04', ''],
  ['product', '5319e7', 'Needs sign-off from the product owner'],
  ['playbook', '0052cc', 'Improves the playbook, docs, knowledge or tooling'],
  ['learning-loop', '006b75', 'A lesson to fold back into the playbook'],
  ['stale-claim', 'cccccc', 'Claimed but idle for 14+ days'],
  ['creative-lab', 'ff77c8', 'Experiments with new structures, visual worlds or devices'],
];

export function issueBody(e) {
  return `**Episode id:** \`${e.id}\`
**Series:** ${SERIES[e.series]}${e.sector ? `  ·  **Sector:** ${e.sector}` : ''}
**Format:** \`${e.format}\`  ·  **Priority:** p${e.priority}${e.product ? '  ·  **Product episode** (needs product-owner sign-off)' : ''}

**Thesis:** ${e.thesis}

**Knowledge to start from:**
${(e.sources ?? []).map(s => `- [\`${s}\`](../blob/main/${s})`).join('\n')}

---
**Want to make this video?** Comment \`/claim\`. You'll be assigned and get the next steps. Read the [explainer formula](../blob/main/docs/13-explainer-formula.md) and [CONTRIBUTING](../blob/main/CONTRIBUTING.md) first.
<!-- episode-id:${e.id} -->`;
}

function seedIssues({long}) {
  const only = opt('--only');
  const limit = Number(opt('--limit') ?? Infinity);
  const dry = flag('--dry-run');
  if (!dry) {
    for (const [name, color, desc] of LABELS) gh(['label', 'create', name, '--color', color, '--description', desc, '--force']);
  }
  const existing = new Set(
    JSON.parse(dry ? '[]' : gh(['issue', 'list', '--label', 'episode', '--state', 'all', '--limit', '5000', '--json', 'title']))
      .map(i => (i.title.match(/^\[([a-z0-9-]+)\]/) ?? [])[1]),
  );
  const todo = long.filter(e => (!only || e.kind === (only === 'sectors' ? 'sector' : only)) && !existing.has(e.id)).slice(0, limit);
  for (const e of todo) {
    const labels = ['episode', 'stage:open', `series:${e.series}`, `kind:${e.kind}`, `priority:p${e.priority}`, ...(e.product ? ['product'] : [])];
    if (dry) { console.log(`would create [${e.id}] ${e.title}`); continue; }
    gh(['issue', 'create', '--title', `[${e.id}] ${e.title}`, '--body-file', '-', ...labels.flatMap(l => ['--label', l])], issueBody(e));
    console.log(`created [${e.id}]`);
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1200); // portable sleep: stay under GitHub's content-creation rate limit
  }
  console.log(`${todo.length} issue(s) ${dry ? 'to create' : 'created'}; ${existing.size} already existed`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
const cat = isMain ? buildCatalog() : null;
if (!isMain) {
  // imported as a module (e.g. by tracker.mjs): no CLI side effects
} else if (flag('--check')) {
  const errors = check(cat);
  for (const e of errors) console.log(`ERROR ${e}`);
  if (errors.length) process.exit(1);
  console.log(`✓ catalogue ok: ${cat.long.length} long-form ids, ${cat.total} total`);
} else if (flag('--seed-issues')) {
  seedIssues(cat);
} else {
  fs.writeFileSync(path.join(ROOT, 'catalog/episodes.json'), JSON.stringify({generated: 'node scripts/catalog.mjs', episodes: cat.long}, null, 1));
  const by = k => Object.entries(cat.long.reduce((m, e) => ((m[e[k]] = (m[e[k]] ?? 0) + 1), m), {})).map(([a, b]) => `${a}:${b}`).join(' ');
  console.log(`long-form: ${cat.long.length} (${by('series')})`);
  console.log(`shorts: ${cat.derived.shorts.length}`);
  console.log(`language versions (${cat.langs.join(', ')}): ${cat.derived.translated.length}`);
  console.log(`TOTAL: ${cat.total}`);
}
