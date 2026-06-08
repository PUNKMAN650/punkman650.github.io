import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { entries } from "../src/content.js";
import { sortEntriesNewestFirst } from "../src/archive.js";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "src/app.js",
  "src/archive.js",
  "src/content.js",
  "src/styles.css"
];

for (const file of requiredFiles) {
  await access(resolve(root, file));
}

const sorted = sortEntriesNewestFirst(entries);
if (sorted.length < 1) {
  throw new Error("Expected at least one content entry.");
}

console.log(`Static site verified with ${sorted.length} entries.`);
