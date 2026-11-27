// Entry program for make.fun's "The Funniest Sick-Day Excuse" bounty.
// The entry itself is one line in ENTRY.txt: a sick-day excuse someone
// could actually text their boss, with the laugh landing on the last
// words. This program's only job is to hand that line to the grader:
// read it, check it fits the gate (1 to 200 characters, not blank),
// and write it out byte-for-byte to /output/entry.txt.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22, standard library only. No network, no clock, no files
// outside the repository. The same input always writes the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(BOT_DIR, 'ENTRY.txt'), 'utf8');
const line = raw.replace(/\r\n/g, '\n').replace(/\n+$/, '');

if (line.length < 1 || line.length > 200) {
  console.error(`ENTRY.txt must be 1 to 200 characters, got ${line.length}.`);
  process.exit(1);
}
if (line.trim().length === 0) {
  console.error('ENTRY.txt must not be only white space.');
  process.exit(1);
}
if (line.includes('\n')) {
  console.error('ENTRY.txt must be a single line.');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), line, 'utf8');

const written = readFileSync(join(OUTPUT_DIR, 'entry.txt'), 'utf8');
if (written !== line) {
  console.error('entry.txt does not match ENTRY.txt.');
  process.exit(1);
}
console.log(`Wrote entry.txt (${line.length} characters).`);
