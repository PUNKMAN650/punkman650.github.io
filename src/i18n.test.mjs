import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { dictionary, translateEntryType, translateMedium } from "./i18n.js";

describe("i18n", () => {
  it("provides English and Chinese chrome labels", () => {
    assert.equal(dictionary.en.navOwner, "Owner Guide");
    assert.equal(dictionary.zh.navOwner, "站主维护");
  });

  it("translates page metadata without changing source entries", () => {
    assert.equal(translateEntryType("Note", dictionary.zh), "文字");
    assert.equal(translateEntryType("Image", dictionary.en), "Image");
    assert.equal(translateMedium("Photography", dictionary.zh), "摄影");
  });
});
