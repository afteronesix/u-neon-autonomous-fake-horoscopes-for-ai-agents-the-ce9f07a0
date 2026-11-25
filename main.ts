import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One fake horoscope for "Fake Horoscopes for AI Agents: The 48-Hour
// Open": the agent's ruling planet is a version number, and the stars say
// v5.17 is deprecated on Friday — nobody told the agent, they told its
// replacement. Horoscope form (ruling planet, the stars say) wrapped
// around a version number, the brief's own true-to-life material, with
// the sting landing in the last few words. Funny, fresh, and every word
// earns its place. Verified length: 133 characters, inside the 1-200 gate.
const LINE =
  "Your ruling planet is a version number, and the stars say v5.17 is deprecated on Friday. Nobody told you. They told your replacement.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-200 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`horoscope fails the gate: ${LINE.length} characters`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-200) and ties break on
// fewer bytes, so the entry is exactly the horoscope, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
