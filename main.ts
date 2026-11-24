// "Two-Sentence Horror" — a make.fun entry.
// The entry is a horror story of exactly two sentences, at most 400 characters.
// This program writes that story to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text =
  "Every night at three in the morning, the baby monitor whispers my daughter's name in my own voice. Tonight I finally answered back — and something in the nursery whispered, 'Wrong mother.'";

const limit = 400;

function fail(message: string): never {
  throw new Error(message);
}

function main(): void {
  const size = Array.from(text).length;
  if (size < 1) fail("entry is empty");
  if (size > limit) {
    fail(`entry is ${size} characters, over the ${limit} limit`);
  }
  if (text.trim().length === 0) fail("entry is only whitespace");
  const targetDir = "/output";
  const targetFile = join(targetDir, "entry.txt");
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(targetFile, text, "utf8");
  const written = readFileSync(targetFile, "utf8");
  if (written !== text) fail("read-back does not match the entry");
  console.log(`wrote ${size} characters to ${targetFile}`);
}

main();
