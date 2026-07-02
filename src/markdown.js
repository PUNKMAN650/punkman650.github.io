function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  const escaped = escapeHtml(value);
  return escaped
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+|assets\/[^)\s]+)\)/g, '<img alt="$1" src="$2" />')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

export function entryToMarkdown(entry) {
  if (entry.bodyMarkdown) {
    return entry.bodyMarkdown;
  }

  if (Array.isArray(entry.body)) {
    return entry.body.join("\n\n");
  }

  return "";
}

export function renderMarkdown(markdown) {
  const blocks = String(markdown ?? "")
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      if (block.startsWith("### ")) {
        return `<h3>${inlineMarkdown(block.slice(4))}</h3>`;
      }
      if (block.startsWith("## ")) {
        return `<h2>${inlineMarkdown(block.slice(3))}</h2>`;
      }
      if (block.startsWith("# ")) {
        return `<h1>${inlineMarkdown(block.slice(2))}</h1>`;
      }
      if (block.startsWith("> ")) {
        return `<blockquote>${inlineMarkdown(block.replace(/^> /gm, ""))}</blockquote>`;
      }
      if (/^- /m.test(block)) {
        const items = block
          .split("\n")
          .filter((line) => line.startsWith("- "))
          .map((line) => `<li>${inlineMarkdown(line.slice(2))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      if (/^\d+\. /m.test(block)) {
        const items = block
          .split("\n")
          .filter((line) => /^\d+\. /.test(line))
          .map((line) => `<li>${inlineMarkdown(line.replace(/^\d+\. /, ""))}</li>`)
          .join("");
        return `<ol>${items}</ol>`;
      }
      if (/^!\[[^\]]*\]\((https?:\/\/[^)\s]+|assets\/[^)\s]+)\)$/.test(block)) {
        return `<figure>${inlineMarkdown(block)}</figure>`;
      }
      return `<p>${inlineMarkdown(block).replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}
