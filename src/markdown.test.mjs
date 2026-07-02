import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { entryToMarkdown, renderMarkdown } from "./markdown.js";

describe("markdown rendering", () => {
  it("renders headings, paragraphs, links, and images", () => {
    const html = renderMarkdown("## Title\n\nA **bold** paragraph with [link](https://example.com).\n\n![Alt](assets/uploads/a.jpg)");
    assert.match(html, /<h2>Title<\/h2>/);
    assert.match(html, /<strong>bold<\/strong>/);
    assert.match(html, /href="https:\/\/example.com"/);
    assert.match(html, /src="assets\/uploads\/a.jpg"/);
  });

  it("uses bodyMarkdown before legacy body arrays", () => {
    assert.equal(entryToMarkdown({ bodyMarkdown: "# New", body: ["Old"] }), "# New");
    assert.equal(entryToMarkdown({ body: ["A", "B"] }), "A\n\nB");
  });
});
