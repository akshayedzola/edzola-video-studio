#!/usr/bin/env node
/**
 * Regenerate TRACKER.md from GitHub issues (the source of truth for stages).
 *   node scripts/tracker.mjs            (needs `gh` authenticated, or GH_TOKEN in CI)
 */
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildCatalog} from './catalog.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STAGES = [
  ['stage:open', 'Open'], ['stage:claimed', 'Claimed'], ['stage:creation', 'Creation'],
  ['stage:review', 'Manual review'], ['stage:approved', 'Approved'], ['stage:published', 'Published'],
];

const issues = JSON.parse(execFileSync('gh', ['issue', 'list', '--label', 'episode', '--state', 'all', '--limit', '10000',
  '--json', 'number,title,labels,assignees,updatedAt,closedAt,url'], {encoding: 'utf8'}));
const stageOf = i => (STAGES.find(([l]) => i.labels.some(x => x.name === l)) ?? ['?', 'Unknown'])[1];
const count = {};
for (const i of issues) count[stageOf(i)] = (count[stageOf(i)] ?? 0) + 1;
const cat = buildCatalog();
const published = count.Published ?? 0;
const days = d => Math.floor((Date.now() - new Date(d)) / 864e5);
const idOf = i => (i.title.match(/^\[([^\]]+)\]/) ?? [])[1] ?? '';
const titleOf = i => i.title.replace(/^\[[^\]]+\]\s*/, '');

const inflight = issues
  .filter(i => ['Claimed', 'Creation', 'Manual review', 'Approved'].includes(stageOf(i)))
  .sort((a, b) => STAGES.findIndex(s => s[1] === stageOf(b)) - STAGES.findIndex(s => s[1] === stageOf(a)));
const recent = issues.filter(i => stageOf(i) === 'Published').sort((a, b) => new Date(b.closedAt) - new Date(a.closedAt)).slice(0, 15);
// Creative treatment of each published episode, so makers can avoid repeating recent combinations.
const creativeOf = id => {
  const p = path.join(ROOT, 'episodes', id, 'storyboard.json');
  const c = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')).creative : null;
  return c ? `${c.structure} · ${c.visual_world}` : '–';
};
const bar = n => '█'.repeat(Math.round((n / cat.total) * 40)).padEnd(40, '░');

const md = `# Video tracker

*Generated from GitHub issues by \`scripts/tracker.mjs\`. Don't edit by hand; the issues are the source of truth.*

**Goal:** ${cat.total.toLocaleString('en-IN')} videos (${cat.long.length} long-form · ${cat.derived.shorts.length} Shorts · ${cat.derived.translated.length} language versions)
**Published:** ${published} · \`${bar(published)}\` ${((published / cat.total) * 100).toFixed(1)}%

| Stage | Episodes |
|---|---|
${STAGES.map(([l, n]) => `| [${n}](../../issues?q=label%3Aepisode+label%3A${encodeURIComponent(l)}) | ${count[n] ?? 0} |`).join('\n')}
| Not yet opened as issues (Shorts and languages unlock after publishing) | ${cat.total - issues.length} |

## In flight

| Episode | Title | Stage | Who | Idle (days) |
|---|---|---|---|---|
${inflight.map(i => `| [${idOf(i)}](${i.url}) | ${titleOf(i)} | ${stageOf(i)} | ${i.assignees.map(a => '@' + a.login).join(' ') || '–'} | ${days(i.updatedAt)} |`).join('\n') || '| – | Nothing in flight yet. Comment `/claim` on an open episode! | | | |'}

## Recently published

| Episode | Title | Structure · visual world |
|---|---|---|
${recent.map(i => `| [${idOf(i)}](${i.url}) | ${titleOf(i)} | ${creativeOf(idOf(i))} |`).join('\n') || '| – | _None yet._ | |'}

Pick a different structure + world from the last three in your series ([docs/16](docs/16-creative-range.md)).

## Start here

- Pick a **p1** episode: [open, priority 1](../../issues?q=is%3Aopen+label%3Aepisode+label%3Astage%3Aopen+label%3Apriority%3Ap1)
- How it works: [CONTRIBUTING.md](CONTRIBUTING.md)
`;
fs.writeFileSync(path.join(ROOT, 'TRACKER.md'), md);
console.log(`TRACKER.md: ${issues.length} episode issues, ${published} published`);
