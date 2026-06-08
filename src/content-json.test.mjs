import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

describe("editable content JSON", () => {
  it("contains profile and editable entries", async () => {
    const payload = JSON.parse(await readFile("content/site.json", "utf8"));
    assert.equal(payload.profile.name, "ESTWEN BRENCH / Visual Notes");
    assert.ok(Array.isArray(payload.entries));
    assert.ok(payload.entries.length >= 1);
  });

  it("keeps every entry editable by slug", async () => {
    const payload = JSON.parse(await readFile("content/site.json", "utf8"));
    for (const entry of payload.entries) {
      assert.ok(entry.date);
      assert.ok(entry.title);
      assert.ok(entry.slug);
      assert.ok(Array.isArray(entry.body));
    }
  });
});
