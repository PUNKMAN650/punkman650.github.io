import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  filterEntriesByKind,
  getEntryBySlug,
  getLatestEntries,
  groupEntriesByYearMonth,
  sortEntriesNewestFirst
} from "./archive.js";

const entries = [
  {
    date: "2026.06.08",
    type: "Note",
    title: "On quiet interfaces",
    medium: "Writing",
    tags: ["design"],
    slug: "quiet-interfaces"
  },
  {
    date: "2026.06.10",
    type: "Image",
    title: "Window Study 01",
    medium: "Photography",
    tags: ["light"],
    slug: "window-study-01"
  },
  {
    date: "2026.05.21",
    type: "Project",
    title: "Field Index",
    medium: "Mixed",
    tags: ["archive"],
    slug: "field-index"
  }
];

describe("archive helpers", () => {
  it("sorts entries newest first by full date", () => {
    assert.deepEqual(sortEntriesNewestFirst(entries).map((entry) => entry.slug), [
      "window-study-01",
      "quiet-interfaces",
      "field-index"
    ]);
  });

  it("returns only requested entry kind", () => {
    assert.deepEqual(filterEntriesByKind(entries, "Writing").map((entry) => entry.slug), [
      "quiet-interfaces"
    ]);
  });

  it("returns all entries when filter is All", () => {
    assert.equal(filterEntriesByKind(entries, "All").length, 3);
  });

  it("limits latest entries after sorting", () => {
    assert.deepEqual(getLatestEntries(entries, 2).map((entry) => entry.slug), [
      "window-study-01",
      "quiet-interfaces"
    ]);
  });

  it("finds an entry by slug", () => {
    assert.equal(getEntryBySlug(entries, "field-index").title, "Field Index");
  });

  it("groups entries by year and month", () => {
    assert.deepEqual(groupEntriesByYearMonth(entries).map((group) => group.label), [
      "2026.06",
      "2026.05"
    ]);
  });
});
