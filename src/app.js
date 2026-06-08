import { filterEntriesByKind, getEntryBySlug, getLatestEntries, sortEntriesNewestFirst } from "./archive.js";
import { loadSiteContent } from "./content.js";
import {
  dictionary,
  getInitialLanguage,
  languageLabels,
  translateEntryType,
  translateMedium
} from "./i18n.js";

const app = document.querySelector("#app");
let activeFilter = "All";
let activeSlug = null;
let language = getInitialLanguage();
let profile = null;
let entries = [];

function t() {
  return dictionary[language];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderHeader() {
  const copy = t();
  const links = profile.navigation
    .map((item) => `<a href="${item.href}">${copy[item.labelKey]}</a>`)
    .join("");

  return `
    <header class="site-header">
      <button class="wordmark" type="button" data-home>${profile.shortName}</button>
      <nav aria-label="Primary navigation">${links}</nav>
      <div class="language-switcher" aria-label="${copy.languageLabel}">
        ${Object.keys(languageLabels)
          .map(
            (key) => `
              <button
                type="button"
                data-language="${key}"
                aria-pressed="${language === key}"
                class="${language === key ? "active" : ""}"
              >${languageLabels[key]}</button>
            `
          )
          .join("")}
      </div>
      <a class="admin-link" href="admin/">Admin</a>
    </header>
  `;
}

function renderHero() {
  const copy = t();
  return `
    <section class="folio-hero" id="home">
      <div class="folio-title">
        <p class="folio-kicker">${copy.visualNotes}</p>
        <h1>${profile.name}</h1>
      </div>
      <aside class="folio-meta" aria-label="Site metadata">
        <dl>
          <div><dt>${copy.year}</dt><dd>${profile.year}</dd></div>
          <div><dt>${copy.mediums}</dt><dd>${copy.images} / ${copy.writing} / ${copy.projects}</dd></div>
          <div><dt>${copy.status}</dt><dd>${profile.location}</dd></div>
        </dl>
        <ol>
          <li>${copy.latestEntries}</li>
          <li>${copy.archiveIndex}</li>
          <li>${copy.worksAndNotes}</li>
        </ol>
      </aside>
    </section>
  `;
}

function renderLatest() {
  const copy = t();
  const rows = getLatestEntries(entries, 5)
    .map(
      (entry) => `
        <button class="latest-row" type="button" data-entry="${entry.slug}">
          <span>${entry.date}</span>
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${translateEntryType(entry.type, copy)}</span>
        </button>
      `
    )
    .join("");

  return `
    <section class="section latest-section" aria-labelledby="latest-heading">
      <div class="section-heading">
        <p>${copy.latest}</p>
        <h2 id="latest-heading">${copy.recentRecords}</h2>
      </div>
      <div class="latest-list">${rows}</div>
    </section>
  `;
}

function renderArchive() {
  const copy = t();
  const filterLabels = {
    All: copy.all,
    Images: copy.images,
    Writing: copy.writing,
    Projects: copy.projects
  };
  const filters = ["All", "Images", "Writing", "Projects"]
    .map(
      (filter) => `
        <button
          type="button"
          data-filter="${filter}"
          aria-pressed="${activeFilter === filter}"
          class="${activeFilter === filter ? "active" : ""}"
        >${filterLabels[filter]}</button>
      `
    )
    .join("");

  const rows = sortEntriesNewestFirst(filterEntriesByKind(entries, activeFilter))
    .map(
      (entry) => `
        <button class="archive-row" type="button" data-entry="${entry.slug}">
          <span>${entry.date}</span>
          <span>${translateEntryType(entry.type, copy)}</span>
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${translateMedium(entry.medium, copy)}</span>
          <span>${entry.tags.map(escapeHtml).join(", ")}</span>
        </button>
      `
    )
    .join("");

  return `
    <section class="section archive-section" id="index" aria-labelledby="archive-heading">
      <div class="section-heading split">
        <div>
          <p>${copy.archiveIndex}</p>
          <h2 id="archive-heading">${copy.dateLevelIndex}</h2>
        </div>
        <div class="filter-group" aria-label="${copy.archiveFilters}">${filters}</div>
      </div>
      <div class="archive-table" role="table" aria-label="${copy.archiveEntries}">
        <div class="archive-row archive-head" role="row">
          <span>${copy.date}</span>
          <span>${copy.type}</span>
          <span>${copy.title}</span>
          <span>${copy.medium}</span>
          <span>${copy.tags}</span>
        </div>
        ${rows}
      </div>
    </section>
  `;
}

function renderEntryPreview(entry) {
  const copy = t();
  const image = entry.image ? `<img alt="" src="${entry.image}" />` : "";
  return `
    <article class="entry-preview">
      ${image}
      <div>
        <p>${entry.date} / ${translateMedium(entry.medium, copy)}</p>
        <h3>${escapeHtml(entry.title)}</h3>
        ${entry.excerpt ? `<p>${escapeHtml(entry.excerpt)}</p>` : ""}
        <button type="button" data-entry="${entry.slug}">${copy.viewEntry}</button>
      </div>
    </article>
  `;
}

function renderWorks() {
  const copy = t();
  const works = entries
    .filter((entry) => entry.type === "Image" || entry.type === "Project")
    .map(renderEntryPreview)
    .join("");

  return `
    <section class="section" id="works" aria-labelledby="works-heading">
      <div class="section-heading">
        <p>${copy.works}</p>
        <h2 id="works-heading">${copy.imageLedRecords}</h2>
      </div>
      <div class="preview-grid">${works}</div>
    </section>
  `;
}

function renderNotes() {
  const copy = t();
  const notes = entries
    .filter((entry) => entry.type === "Note")
    .map(renderEntryPreview)
    .join("");

  return `
    <section class="section" id="notes" aria-labelledby="notes-heading">
      <div class="section-heading">
        <p>${copy.notes}</p>
        <h2 id="notes-heading">${copy.writtenObservations}</h2>
      </div>
      <div class="notes-list">${notes}</div>
    </section>
  `;
}

function renderAbout() {
  const copy = t();
  const social = profile.social
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");

  return `
    <section class="section about-section" id="about" aria-labelledby="about-heading">
      <div class="section-heading">
        <p>${copy.about}</p>
        <h2 id="about-heading">${copy.aboutTitle}</h2>
      </div>
      <p>${copy.aboutBody}</p>
      <div class="social-links">${social}</div>
    </section>
  `;
}

function renderEntryPage(entry) {
  const copy = t();
  const image = entry.image ? `<img alt="" src="${entry.image}" />` : "";
  const body = entry.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

  return `
    ${renderHeader()}
    <article class="entry-page">
      <button class="back-link" type="button" data-back>${copy.backToIndex}</button>
      <header>
        <p>${entry.date} / ${translateEntryType(entry.type, copy)} / ${translateMedium(entry.medium, copy)}</p>
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
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      language = button.dataset.language;
      localStorage.setItem("visual-notes-language", language);
      render();
    });
  });

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

loadSiteContent().then((content) => {
  profile = content.profile;
  entries = content.entries;
  activeSlug = hashSlug && getEntryBySlug(entries, hashSlug) ? hashSlug : null;
  render();
});
