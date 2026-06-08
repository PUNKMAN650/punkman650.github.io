import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { entries } from "../src/content.js";
import { sortEntriesNewestFirst } from "../src/archive.js";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "admin/index.html",
  "admin/admin.css",
  "admin/admin.js",
  "content/site.json",
  "src/app.js",
  "src/archive.js",
  "src/content.js",
  "src/i18n.js",
  "src/styles.css"
];

for (const file of requiredFiles) {
  await access(resolve(root, file));
}

const sorted = sortEntriesNewestFirst(entries);
if (sorted.length < 1) {
  throw new Error("Expected at least one content entry.");
}

const siteContent = JSON.parse(
  await import("node:fs/promises").then((fs) => fs.readFile(resolve(root, "content/site.json"), "utf8"))
);
if (!siteContent.profile?.name || !Array.isArray(siteContent.entries)) {
  throw new Error("content/site.json must include profile.name and entries[].");
}

console.log(`Static site verified with ${sorted.length} entries.`);
