const repo = "PUNKMAN650/personal_website";
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

  setStatus("正在从 GitHub 加载内容...");
  const payload = await githubJson(`${apiBase}/contents/${contentPath}?ref=${branch}`);
  contentSha = payload.sha;
  siteContent = JSON.parse(decodeBase64(payload.content));
  sessionStorage.setItem("visual-notes-admin-token", getToken());
  renderEditor();
  authPanel.hidden = true;
  editorPanel.hidden = false;
  setStatus("内容已加载，可以编辑。");
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
}

function renderEntryForm(entry, index) {
  const body = Array.isArray(entry.body) ? entry.body.join("\n\n") : "";
  const tags = Array.isArray(entry.tags) ? entry.tags.join(", ") : "";
  const imageSrc = entry.image?.startsWith("http") ? entry.image : `../${entry.image}`;
  const imagePreview = entry.image ? `<img class="image-preview" alt="" src="${imageSrc}" />` : "";

  return `
    <details class="entry-card" open data-index="${index}">
      <summary>${entry.date || "New date"} / ${entry.title || "Untitled"}</summary>
      <div class="entry-fields">
        <label>日期
          <input data-field="date" value="${escapeAttr(entry.date ?? "")}" placeholder="2026.06.11" />
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
        <label class="full">正文段落，用空行分段
          <textarea data-field="body">${escapeHtml(body)}</textarea>
        </label>
        <label class="full">图片路径
          <input data-field="image" value="${escapeAttr(entry.image ?? "")}" placeholder="assets/uploads/photo.jpg" />
          ${imagePreview}
        </label>
        <label class="full">上传图片
          <input type="file" accept="image/*" data-upload />
        </label>
      </div>
      <div class="entry-actions">
        <button type="button" data-generate-slug>用标题生成 slug</button>
        <button type="button" class="danger" data-delete>删除这个条目</button>
      </div>
    </details>
  `;
}

function option(value, selected) {
  return `<option value="${value}" ${value === selected ? "selected" : ""}>${value}</option>`;
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

function readEditor() {
  siteContent.profile.name = profileInput("profile-name").value.trim();
  siteContent.profile.shortName = profileInput("profile-short-name").value.trim();
  siteContent.profile.year = profileInput("profile-year").value.trim();
  siteContent.profile.location = profileInput("profile-location").value.trim();

  siteContent.entries = Array.from(document.querySelectorAll(".entry-card")).map((card) => {
    const read = (field) => card.querySelector(`[data-field="${field}"]`)?.value.trim() ?? "";
    return {
      date: read("date"),
      type: read("type"),
      title: read("title"),
      medium: read("medium"),
      tags: read("tags").split(",").map((tag) => tag.trim()).filter(Boolean),
      slug: read("slug") || slugify(read("title")),
      excerpt: read("excerpt"),
      image: read("image") || undefined,
      body: read("body").split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)
    };
  });
}

function bindEntryEvents() {
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

  document.querySelectorAll("[data-upload]").forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }
      const card = input.closest(".entry-card");
      try {
        const path = await uploadImage(file);
        card.querySelector('[data-field="image"]').value = path;
        setStatus(`图片已上传：${path}`);
      } catch (error) {
        setStatus(`上传失败：${error.message}`);
      }
    });
  });
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
    body: ["New paragraph."]
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
