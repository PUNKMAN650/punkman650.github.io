const repo = "PUNKMAN650/punkman650.github.io";
const branch = "main";
const contentPath = "content/site.json";
const uploadDir = "assets/uploads";

const tokenInput = document.querySelector("#token");
const loadButton = document.querySelector("#load-content");
const forgetButton = document.querySelector("#forget-token");
const saveButton = document.querySelector("#save-content");
const addButton = document.querySelector("#add-entry");
const statusEl = document.querySelector("#status");
const authPanel = document.querySelector("#auth-panel");
const editorPanel = document.querySelector("#editor-panel");
const entriesEditor = document.querySelector("#entries-editor");

let siteContent = null;
let contentSha = null;

const apiBase = `https://api.github.com/repos/${repo}`;

function setStatus(message) {
  statusEl.textContent = message;
}

function getToken() {
  return tokenInput.value.trim();
}

function headers() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${getToken()}`,
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

function decodeBase64(value) {
  const binary = atob(value.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function option(value, selected) {
  return `<option value="${value}" ${value === selected ? "selected" : ""}>${value}</option>`;
}

async function githubJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers(),
      ...(options.headers ?? {})
    }
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message ?? `GitHub request failed: ${response.status}`);
  }
  return payload;
}

async function loadContent() {
  if (!getToken()) {
    setStatus("请先输入 GitHub token。");
    return;
  }

  setStatus("正在验证写入权限...");
  const repoInfo = await githubJson(apiBase);
  const canWrite =
    repoInfo.permissions?.push || repoInfo.permissions?.admin || repoInfo.permissions?.maintain;
  if (!canWrite) {
    setStatus("这个 token 没有仓库写入权限，不能进入编辑器。请使用你的站主 token。");
    return;
  }

  setStatus("权限通过，正在加载内容...");
  const payload = await githubJson(`${apiBase}/contents/${contentPath}?ref=${branch}`);
  contentSha = payload.sha;
  siteContent = JSON.parse(decodeBase64(payload.content));
  sessionStorage.setItem("visual-notes-admin-token", getToken());
  renderEditor();
  authPanel.hidden = true;
  editorPanel.hidden = false;
  setStatus("已进入编辑器。没有仓库写权限的人无法加载、上传或保存。");
}

function profileInput(id) {
  return document.querySelector(`#${id}`);
}

function renderEditor() {
  profileInput("profile-name").value = siteContent.profile.name;
  profileInput("profile-short-name").value = siteContent.profile.shortName;
  profileInput("profile-year").value = siteContent.profile.year;
  profileInput("profile-location").value = siteContent.profile.location;

  entriesEditor.innerHTML = siteContent.entries.map(renderEntryForm).join("");
  bindEntryEvents();
  refreshAllPreviews();
}

function entryMarkdown(entry) {
  if (entry.bodyMarkdown) {
    return entry.bodyMarkdown;
  }
  if (Array.isArray(entry.body)) {
    return entry.body.join("\n\n");
  }
  return "";
}

function renderEntryForm(entry, index) {
  const tags = Array.isArray(entry.tags) ? entry.tags.join(", ") : "";
  const markdown = entryMarkdown(entry);
  const imageSrc = entry.image?.startsWith("http") ? entry.image : `../${entry.image}`;
  const imagePreview = entry.image ? `<img class="image-preview" alt="" src="${imageSrc}" />` : "";

  return `
    <details class="entry-card" open data-index="${index}">
      <summary>${entry.date || "New date"} / ${entry.title || "Untitled"}</summary>
      <div class="entry-fields">
        <label>日期
          <input data-field="date" value="${escapeAttr(entry.date ?? "")}" placeholder="2026.07.02" />
        </label>
        <label>类型
          <select data-field="type">
            ${option("Note", entry.type)}
            ${option("Image", entry.type)}
            ${option("Project", entry.type)}
          </select>
        </label>
        <label>标题
          <input data-field="title" value="${escapeAttr(entry.title ?? "")}" />
        </label>
        <label>媒介
          <select data-field="medium">
            ${option("Writing", entry.medium)}
            ${option("Photography", entry.medium)}
            ${option("Design", entry.medium)}
            ${option("Mixed", entry.medium)}
          </select>
        </label>
        <label>标签，用英文逗号分隔
          <input data-field="tags" value="${escapeAttr(tags)}" />
        </label>
        <label>Slug
          <input data-field="slug" value="${escapeAttr(entry.slug ?? "")}" />
        </label>
        <label class="full">摘要
          <textarea data-field="excerpt">${escapeHtml(entry.excerpt ?? "")}</textarea>
        </label>
        <label class="full">封面 / 列表图片路径
          <input data-field="image" value="${escapeAttr(entry.image ?? "")}" placeholder="assets/uploads/photo.jpg" />
          ${imagePreview}
        </label>
      </div>

      <div class="composer-layout">
        <section>
          <div class="composer-toolbar">
            <button type="button" data-generate-slug>用标题生成 slug</button>
            <button type="button" data-insert-heading>插入小标题</button>
            <button type="button" data-insert-quote>插入引用</button>
          </div>
          <label class="full">Markdown 正文
            <textarea class="markdown-editor" data-field="bodyMarkdown" placeholder="可以直接写 Markdown。支持标题、段落、列表、引用、链接和图片。">${escapeHtml(markdown)}</textarea>
          </label>
          <div class="upload-row">
            <label>上传图片并插入正文
              <input type="file" accept="image/*" data-upload-inline />
            </label>
            <label>导入 .md 文件
              <input type="file" accept=".md,text/markdown,text/plain" data-import-md />
            </label>
          </div>
        </section>
        <section class="preview-pane">
          <p>Preview</p>
          <div class="markdown-preview" data-preview></div>
        </section>
      </div>

      <div class="entry-actions">
        <button type="button" class="danger" data-delete>删除这个条目</button>
      </div>
    </details>
  `;
}

function renderPreviewMarkdown(markdown) {
  return String(markdown)
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) return `<h3>${escapeHtml(block.slice(4))}</h3>`;
      if (block.startsWith("## ")) return `<h2>${escapeHtml(block.slice(3))}</h2>`;
      if (block.startsWith("# ")) return `<h1>${escapeHtml(block.slice(2))}</h1>`;
      if (block.startsWith("> ")) return `<blockquote>${escapeHtml(block.replace(/^> /gm, ""))}</blockquote>`;
      if (block.startsWith("![")) {
        const match = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (match) return `<figure><img alt="${escapeAttr(match[1])}" src="../${escapeAttr(match[2])}" /></figure>`;
      }
      return `<p>${escapeHtml(block).replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
}

function refreshPreview(card) {
  const markdown = card.querySelector('[data-field="bodyMarkdown"]').value;
  card.querySelector("[data-preview]").innerHTML = renderPreviewMarkdown(markdown);
}

function refreshAllPreviews() {
  document.querySelectorAll(".entry-card").forEach(refreshPreview);
}

function readEditor() {
  siteContent.profile.name = profileInput("profile-name").value.trim();
  siteContent.profile.shortName = profileInput("profile-short-name").value.trim();
  siteContent.profile.year = profileInput("profile-year").value.trim();
  siteContent.profile.location = profileInput("profile-location").value.trim();

  siteContent.entries = Array.from(document.querySelectorAll(".entry-card")).map((card) => {
    const read = (field) => card.querySelector(`[data-field="${field}"]`)?.value.trim() ?? "";
    const markdown = read("bodyMarkdown");
    return {
      date: read("date"),
      type: read("type"),
      title: read("title"),
      medium: read("medium"),
      tags: read("tags").split(",").map((tag) => tag.trim()).filter(Boolean),
      slug: read("slug") || slugify(read("title")),
      excerpt: read("excerpt"),
      image: read("image") || undefined,
      bodyMarkdown: markdown,
      body: markdown.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)
    };
  });
}

function insertAtCursor(textarea, value) {
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  textarea.value = `${textarea.value.slice(0, start)}${value}${textarea.value.slice(end)}`;
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd = start + value.length;
  refreshPreview(textarea.closest(".entry-card"));
}

function bindEntryEvents() {
  document.querySelectorAll(".markdown-editor").forEach((textarea) => {
    textarea.addEventListener("input", () => refreshPreview(textarea.closest(".entry-card")));
  });

  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".entry-card");
      const title = card.querySelector('[data-field="title"]').value || "Untitled";
      if (confirm(`确认删除「${title}」？保存到 GitHub 后才会正式生效。`)) {
        card.remove();
      }
    });
  });

  document.querySelectorAll("[data-generate-slug]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".entry-card");
      const title = card.querySelector('[data-field="title"]').value;
      card.querySelector('[data-field="slug"]').value = slugify(title);
    });
  });

  document.querySelectorAll("[data-insert-heading]").forEach((button) => {
    button.addEventListener("click", () => {
      const textarea = button.closest(".entry-card").querySelector('[data-field="bodyMarkdown"]');
      insertAtCursor(textarea, "\n\n## 小标题\n\n");
    });
  });

  document.querySelectorAll("[data-insert-quote]").forEach((button) => {
    button.addEventListener("click", () => {
      const textarea = button.closest(".entry-card").querySelector('[data-field="bodyMarkdown"]');
      insertAtCursor(textarea, "\n\n> 引用文字\n\n");
    });
  });

  document.querySelectorAll("[data-upload-inline]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;
      const card = input.closest(".entry-card");
      try {
        const path = await uploadImage(file);
        card.querySelector('[data-field="image"]').value ||= path;
        const textarea = card.querySelector('[data-field="bodyMarkdown"]');
        insertAtCursor(textarea, `\n\n![${file.name}](${path})\n\n`);
        setStatus(`图片已上传并插入正文：${path}`);
      } catch (error) {
        setStatus(`上传失败：${error.message}`);
      }
    });
  });

  document.querySelectorAll("[data-import-md]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;
      const card = input.closest(".entry-card");
      const text = await file.text();
      const parsed = parseMarkdownFile(text, file.name);
      card.querySelector('[data-field="title"]').value = parsed.title;
      card.querySelector('[data-field="slug"]').value = parsed.slug;
      card.querySelector('[data-field="excerpt"]').value = parsed.excerpt;
      card.querySelector('[data-field="bodyMarkdown"]').value = parsed.markdown;
      refreshPreview(card);
      setStatus(`已导入 Markdown 文件：${file.name}`);
    });
  });
}

function parseMarkdownFile(markdown, fileName) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1]?.trim() || fileName.replace(/\.[^.]+$/, "");
  const plain = markdown
    .replace(/^#+\s+/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "")
    .trim();
  const excerpt = plain.split(/\n+/).find(Boolean)?.slice(0, 160) ?? "";
  return {
    title,
    slug: slugify(title),
    excerpt,
    markdown
  };
}

async function uploadImage(file) {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const path = `${uploadDir}/${Date.now()}-${safeName}`;
  const content = await fileToBase64(file);

  await githubJson(`${apiBase}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      branch,
      message: `Upload ${safeName}`,
      content
    })
  });

  return path;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function saveContent() {
  readEditor();

  if (!siteContent.entries.every((entry) => entry.date && entry.title && entry.slug)) {
    setStatus("保存失败：每个条目都必须有日期、标题和 slug。");
    return;
  }

  setStatus("正在保存到 GitHub...");
  const content = `${JSON.stringify(siteContent, null, 2)}\n`;
  const payload = await githubJson(`${apiBase}/contents/${contentPath}`, {
    method: "PUT",
    body: JSON.stringify({
      branch,
      message: "Update website content from admin",
      content: encodeBase64(content),
      sha: contentSha
    })
  });

  contentSha = payload.content.sha;
  setStatus("保存成功。GitHub Pages 会自动重新部署，稍等片刻刷新网站即可看到更新。");
}

function addEntry() {
  readEditor();
  siteContent.entries.unshift({
    date: new Date().toISOString().slice(0, 10).replaceAll("-", "."),
    type: "Note",
    title: "New entry",
    medium: "Writing",
    tags: [],
    slug: "new-entry",
    excerpt: "",
    bodyMarkdown: "# New entry\n\nWrite here.",
    body: ["Write here."]
  });
  renderEditor();
}

tokenInput.value = sessionStorage.getItem("visual-notes-admin-token") ?? "";
loadButton.addEventListener("click", () => loadContent().catch((error) => setStatus(`加载失败：${error.message}`)));
saveButton.addEventListener("click", () => saveContent().catch((error) => setStatus(`保存失败：${error.message}`)));
addButton.addEventListener("click", addEntry);
forgetButton.addEventListener("click", () => {
  sessionStorage.removeItem("visual-notes-admin-token");
  tokenInput.value = "";
  setStatus("已清除本机保存的 token。");
});
