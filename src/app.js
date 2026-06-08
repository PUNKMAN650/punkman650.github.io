import { filterEntriesByKind, getEntryBySlug, getLatestEntries, sortEntriesNewestFirst } from "./archive.js";
import { entries, profile } from "./content.js";

const app = document.querySelector("#app");
let activeFilter = "All";
let activeSlug = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderHeader() {
  const links = profile.navigation
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  return `
    <header class="site-header">
      <button class="wordmark" type="button" data-home>${profile.shortName}</button>
      <nav aria-label="Primary navigation">${links}</nav>
    </header>
  `;
}

function renderHero() {
  return `
    <section class="folio-hero" id="home">
      <div class="folio-title">
        <p class="folio-kicker">Visual Notes</p>
        <h1>${profile.name}</h1>
      </div>
      <aside class="folio-meta" aria-label="Site metadata">
        <dl>
          <div><dt>Year</dt><dd>${profile.year}</dd></div>
          <div><dt>Mediums</dt><dd>${profile.mediums.join(" / ")}</dd></div>
          <div><dt>Status</dt><dd>${profile.location}</dd></div>
        </dl>
        <ol>
          <li>Latest entries</li>
          <li>Archive index</li>
          <li>Works and notes</li>
        </ol>
      </aside>
    </section>
  `;
}

function renderLatest() {
  const rows = getLatestEntries(entries, 5)
    .map(
      (entry) => `
        <button class="latest-row" type="button" data-entry="${entry.slug}">
          <span>${entry.date}</span>
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${entry.type}</span>
        </button>
      `
    )
    .join("");

  return `
    <section class="section latest-section" aria-labelledby="latest-heading">
      <div class="section-heading">
        <p>Latest</p>
        <h2 id="latest-heading">Recent records</h2>
      </div>
      <div class="latest-list">${rows}</div>
    </section>
  `;
}

function renderArchive() {
  const filters = ["All", "Images", "Writing", "Projects"]
    .map(
      (filter) => `
        <button
          type="button"
          data-filter="${filter}"
          aria-pressed="${activeFilter === filter}"
          class="${activeFilter === filter ? "active" : ""}"
        >${filter}</button>
      `
    )
    .join("");

  const rows = sortEntriesNewestFirst(filterEntriesByKind(entries, activeFilter))
    .map(
      (entry) => `
        <button class="archive-row" type="button" data-entry="${entry.slug}">
          <span>${entry.date}</span>
          <span>${entry.type}</span>
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${entry.medium}</span>
          <span>${entry.tags.map(escapeHtml).join(", ")}</span>
        </button>
      `
    )
    .join("");

  return `
    <section class="section archive-section" id="index" aria-labelledby="archive-heading">
      <div class="section-heading split">
        <div>
          <p>Archive Index</p>
          <h2 id="archive-heading">Date-level index</h2>
        </div>
        <div class="filter-group" aria-label="Archive filters">${filters}</div>
      </div>
      <div class="archive-table" role="table" aria-label="Archive entries">
        <div class="archive-row archive-head" role="row">
          <span>Date</span>
          <span>Type</span>
          <span>Title</span>
          <span>Medium</span>
          <span>Tags</span>
        </div>
        ${rows}
      </div>
    </section>
  `;
}

function renderEntryPreview(entry) {
  const image = entry.image ? `<img alt="" src="${entry.image}" />` : "";
  return `
    <article class="entry-preview">
      ${image}
      <div>
        <p>${entry.date} / ${entry.medium}</p>
        <h3>${escapeHtml(entry.title)}</h3>
        ${entry.excerpt ? `<p>${escapeHtml(entry.excerpt)}</p>` : ""}
        <button type="button" data-entry="${entry.slug}">View entry</button>
      </div>
    </article>
  `;
}

function renderWorks() {
  const works = entries
    .filter((entry) => entry.type === "Image" || entry.type === "Project")
    .map(renderEntryPreview)
    .join("");

  return `
    <section class="section" id="works" aria-labelledby="works-heading">
      <div class="section-heading">
        <p>Works</p>
        <h2 id="works-heading">Image-led records</h2>
      </div>
      <div class="preview-grid">${works}</div>
    </section>
  `;
}

function renderNotes() {
  const notes = entries
    .filter((entry) => entry.type === "Note")
    .map(renderEntryPreview)
    .join("");

  return `
    <section class="section" id="notes" aria-labelledby="notes-heading">
      <div class="section-heading">
        <p>Notes</p>
        <h2 id="notes-heading">Written observations</h2>
      </div>
      <div class="notes-list">${notes}</div>
    </section>
  `;
}

function renderAbout() {
  const social = profile.social
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  return `
    <section class="section about-section" id="about" aria-labelledby="about-heading">
      <div class="section-heading">
        <p>About</p>
        <h2 id="about-heading">A quiet index of images, writing, and project fragments.</h2>
      </div>
      <p>
        ESTWEN BRENCH / Visual Notes collects visual studies, written observations, and small systems
        for looking. The site is structured as a living archive rather than a fixed portfolio.
      </p>
      <div class="social-links">${social}</div>
    </section>
  `;
}

function renderEntryPage(entry) {
  const image = entry.image ? `<img alt="" src="${entry.image}" />` : "";
  const body = entry.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

  return `
    ${renderHeader()}
    <article class="entry-page">
      <button class="back-link" type="button" data-back>Back to index</button>
      <header>
        <p>${entry.date} / ${entry.type} / ${entry.medium}</p>
        <h1>${escapeHtml(entry.title)}</h1>
        ${entry.excerpt ? `<p>${escapeHtml(entry.excerpt)}</p>` : ""}
      </header>
      ${image}
      <div class="entry-body">${body}</div>
    </article>
  `;
}

function renderHome() {
  return `
    ${renderHeader()}
    ${renderHero()}
    ${renderLatest()}
    ${renderArchive()}
    ${renderWorks()}
    ${renderNotes()}
    ${renderAbout()}
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      render();
      document.querySelector("#index")?.scrollIntoView({ block: "start" });
    });
  });

  document.querySelectorAll("[data-entry]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSlug = button.dataset.entry;
      window.location.hash = `entry-${activeSlug}`;
      render();
      window.scrollTo({ top: 0 });
    });
  });

  document.querySelectorAll("[data-back], [data-home]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSlug = null;
      history.pushState("", document.title, window.location.pathname);
      render();
      window.scrollTo({ top: 0 });
    });
  });
}

function render() {
  const entry = activeSlug ? getEntryBySlug(entries, activeSlug) : null;
  app.innerHTML = entry ? renderEntryPage(entry) : renderHome();
  bindEvents();
}

const hashSlug = window.location.hash.startsWith("#entry-")
  ? window.location.hash.replace("#entry-", "")
  : null;

activeSlug = hashSlug && getEntryBySlug(entries, hashSlug) ? hashSlug : null;
render();
