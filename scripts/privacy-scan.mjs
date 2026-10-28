#!/usr/bin/env node
/**
 * Guardrail scan for files changed in a pull request (or any paths given).
 *   node scripts/privacy-scan.mjs <file...>
 * Fails on: emails, Indian mobile numbers, Aadhaar-like and PAN-like IDs,
 * credential patterns, media/binary files that belong in Releases, and files
 * over 5 MB. False positive? Add the exact string to scripts/privacy-allow.txt
 * in the same PR and explain it to the reviewer.
 */
import fs from 'node:fs';
import path from 'node:path';

const ALLOW = new Set(
  fs.existsSync('scripts/privacy-allow.txt')
    ? fs.readFileSync('scripts/privacy-allow.txt', 'utf8').split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('#'))
    : [],
);
const RULES = [
  ['email address', /[\w.+-]+@[\w-]+\.(?:com|org|in|net|io|ai|co|edu|gov)\b/g],
  ['phone number', /(?:\+91[\s-]?)?\b[6-9]\d{9}\b/g],
  ['Aadhaar-like number', /\b\d{4}\s\d{4}\s\d{4}\b|\b\d{12}\b/g],
  ['PAN-like ID', /\b[A-Z]{5}\d{4}[A-Z]\b/g],
  ['API key / token', /\b(?:sk-[A-Za-z0-9]{20,}|gh[pous]_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|xox[abp]-[A-Za-z0-9-]{10,})\b/g],
  ['private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
];
const BLOCKED_EXT = new Set(['.mp4', '.mov', '.webm', '.wav', '.m4a', '.mp3', '.onnx', '.bin', '.safetensors', '.pt', '.zip']);
const TEXT_EXT = new Set(['.md', '.json', '.html', '.css', '.js', '.mjs', '.ts', '.tsx', '.py', '.sh', '.txt', '.yml', '.yaml', '.srt', '.csv']);

const problems = [];
for (const file of process.argv.slice(2)) {
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) continue;
  const ext = path.extname(file).toLowerCase();
  if (BLOCKED_EXT.has(ext)) { problems.push(`${file}: ${ext} files don't go in git (use GitHub Releases / YouTube)`); continue; }
  if (fs.statSync(file).size > 5e6) { problems.push(`${file}: larger than 5 MB`); continue; }
  if (!TEXT_EXT.has(ext) || file === 'scripts/privacy-scan.mjs') continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const [name, re] of RULES) {
    for (const m of text.matchAll(re)) {
      if (ALLOW.has(m[0])) continue;
      const line = text.slice(0, m.index).split('\n').length;
      problems.push(`${file}:${line}: looks like a ${name} ("${m[0].slice(0, 6)}…")`);
    }
  }
}
for (const p of problems) console.log(`✗ ${p}`);
if (problems.length) {
  console.log('\nNever commit personal data or credentials. See GUARDRAILS.md.');
  process.exit(1);
}
console.log(`✓ privacy scan: ${process.argv.length - 2} file(s) clean`);
