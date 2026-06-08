# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and prepare deployment for the `ESTWEN BRENCH / Visual Notes` personal creator website.

**Architecture:** A static React/Vite site with typed content metadata, route-level pages, archive filtering, MDX-ready content structure, and an editorial visual system. The first release uses repo-local content and image assets, with a config file for future personal links and deployment metadata.

**Tech Stack:** React, Vite, TypeScript, Vitest, Testing Library, plain CSS, static build for Vercel.

---

## File Structure

- Create `package.json`: project scripts and dependencies.
- Create `index.html`: Vite HTML shell.
- Create `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`: TypeScript and Vite configuration.
- Create `src/main.tsx`: React entry point.
- Create `src/App.tsx`: route composition and layout shell.
- Create `src/styles.css`: global editorial visual system, responsive layout, motion, and component styling.
- Create `src/content/entries.ts`: typed source of entries used by index, works, notes, latest, and detail pages.
- Create `src/content/profile.ts`: site name, navigation, contact, social, and metadata configuration.
- Create `src/lib/archive.ts`: pure helpers for sorting, filtering, grouping, and resolving entries.
- Create `src/lib/archive.test.ts`: unit tests for archive helpers.
- Create `src/components/Header.tsx`: primary navigation.
- Create `src/components/FolioHero.tsx`: first viewport editorial folio composition.
- Create `src/components/LatestList.tsx`: recent entries.
- Create `src/components/ArchiveTable.tsx`: filterable archive index.
- Create `src/components/EntryPreview.tsx`: shared row/card-light preview for works and notes.
- Create `src/pages/HomePage.tsx`: home page composition.
- Create `src/pages/IndexPage.tsx`: full archive page.
- Create `src/pages/WorksPage.tsx`: image-led work browsing.
- Create `src/pages/NotesPage.tsx`: writing browsing.
- Create `src/pages/AboutPage.tsx`: creator statement and contact.
- Create `src/pages/EntryPage.tsx`: entry detail view.
- Create `src/test/setup.ts`: Testing Library setup.
- Create `.gitignore`: Node and build exclusions.
- Create `README.md`: local development and deployment notes.

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `.gitignore`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Add project configuration**

Create `package.json`:

```json
{
  "name": "estwen-brench-visual-notes",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.0.0",
    "typescript": "^5.8.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.6.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "jsdom": "^26.0.0",
    "vitest": "^3.0.0"
  }
}
```

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="ESTWEN BRENCH / Visual Notes - images, writing, and project fragments." />
    <title>ESTWEN BRENCH / Visual Notes</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `.gitignore`:

```gitignore
node_modules
dist
.vite
coverage
*.local
```

- [ ] **Step 2: Add TypeScript and Vite config**

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

Create `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts"
  }
});
```

- [ ] **Step 3: Add minimal React shell**

Create `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="app-shell">
      <h1>ESTWEN BRENCH / Visual Notes</h1>
    </main>
  );
}
```

Create `src/styles.css`:

```css
:root {
  color: #090909;
  background: #ffffff;
  font-family: "Arial", "Helvetica Neue", sans-serif;
  font-synthesis: none;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: #ffffff;
}

.app-shell {
  min-height: 100vh;
  padding: 48px;
}
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`

Expected: `node_modules` is created and `package-lock.json` is generated.

- [ ] **Step 5: Verify scaffold**

Run: `npm run build`

Expected: TypeScript and Vite complete successfully and create `dist`.

- [ ] **Step 6: Commit scaffold**

Run:

```bash
git add .gitignore index.html package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts src
git commit -m "feat: scaffold visual notes site"
```

Expected: commit succeeds.

## Task 2: Content Model And Archive Helpers

**Files:**
- Create: `src/content/entries.ts`
- Create: `src/content/profile.ts`
- Create: `src/lib/archive.ts`
- Create: `src/lib/archive.test.ts`

- [ ] **Step 1: Write archive helper tests**

Create `src/lib/archive.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import type { Entry } from "../content/entries";
import {
  filterEntriesByKind,
  getEntryBySlug,
  getLatestEntries,
  groupEntriesByYearMonth,
  sortEntriesNewestFirst
} from "./archive";

const entries: Entry[] = [
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
    expect(sortEntriesNewestFirst(entries).map((entry) => entry.slug)).toEqual([
      "window-study-01",
      "quiet-interfaces",
      "field-index"
    ]);
  });

  it("returns only requested entry kind", () => {
    expect(filterEntriesByKind(entries, "Writing").map((entry) => entry.slug)).toEqual([
      "quiet-interfaces"
    ]);
  });

  it("returns all entries when filter is All", () => {
    expect(filterEntriesByKind(entries, "All")).toHaveLength(3);
  });

  it("limits latest entries after sorting", () => {
    expect(getLatestEntries(entries, 2).map((entry) => entry.slug)).toEqual([
      "window-study-01",
      "quiet-interfaces"
    ]);
  });

  it("finds an entry by slug", () => {
    expect(getEntryBySlug(entries, "field-index")?.title).toBe("Field Index");
  });

  it("groups entries by year and month", () => {
    expect(groupEntriesByYearMonth(entries).map((group) => group.label)).toEqual([
      "2026.06",
      "2026.05"
    ]);
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm run test`

Expected: tests fail because `src/content/entries.ts` and `src/lib/archive.ts` do not exist.

- [ ] **Step 3: Add typed content and profile config**

Create `src/content/entries.ts`:

```ts
export type EntryType = "Note" | "Image" | "Project";
export type EntryMedium = "Writing" | "Photography" | "Design" | "Mixed";

export type Entry = {
  date: string;
  type: EntryType;
  title: string;
  medium: EntryMedium;
  tags: string[];
  slug: string;
  excerpt?: string;
  image?: string;
  featured?: boolean;
  body: string[];
};

export const entries: Entry[] = [
  {
    date: "2026.06.10",
    type: "Note",
    title: "Fragments after rain",
    medium: "Writing",
    tags: ["journal", "city"],
    slug: "fragments-after-rain",
    excerpt: "A short note on wet pavement, quiet windows, and the patience of looking.",
    featured: true,
    body: [
      "The city gets quieter after rain, but not because it has less to say.",
      "Surfaces become more precise. A window stops being a window and becomes a second page."
    ]
  },
  {
    date: "2026.06.09",
    type: "Image",
    title: "Window Study 01",
    medium: "Photography",
    tags: ["light", "interior"],
    slug: "window-study-01",
    excerpt: "A muted image study on glass, reflection, and interior light.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    featured: true,
    body: [
      "A narrow study of daylight crossing a domestic frame.",
      "The image belongs to a larger sequence about interior thresholds."
    ]
  },
  {
    date: "2026.06.08",
    type: "Note",
    title: "On quiet interfaces",
    medium: "Writing",
    tags: ["design", "restraint"],
    slug: "on-quiet-interfaces",
    excerpt: "A short observation on restraint, rhythm, and the surfaces we return to.",
    featured: true,
    body: [
      "A quiet interface is not empty. It is edited.",
      "The work is in deciding which signals deserve to remain visible."
    ]
  },
  {
    date: "2026.05.21",
    type: "Project",
    title: "Field Index",
    medium: "Mixed",
    tags: ["archive", "system"],
    slug: "field-index",
    excerpt: "A small indexing system for visual fragments and written observations.",
    body: [
      "Field Index collects fragments by date, medium, and recurring visual concerns.",
      "It treats images and notes as equal records."
    ]
  },
  {
    date: "2026.04.14",
    type: "Image",
    title: "Pale Wall Sequence",
    medium: "Photography",
    tags: ["surface", "silence"],
    slug: "pale-wall-sequence",
    excerpt: "A quiet sequence of flat light, blank walls, and almost-events.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80",
    body: [
      "The sequence studies how much information a pale surface can hold before it becomes a sign.",
      "Nothing is centered; the frame keeps drifting toward the edge."
    ]
  }
];
```

Create `src/content/profile.ts`:

```ts
export const profile = {
  name: "ESTWEN BRENCH / Visual Notes",
  year: "2026",
  description: "Images, writing, and project fragments from an independent visual creator.",
  location: "Available worldwide",
  mediums: ["Images", "Writing", "Projects"],
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Index", href: "#index" },
    { label: "Works", href: "#works" },
    { label: "Notes", href: "#notes" },
    { label: "About", href: "#about" }
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Substack", href: "https://substack.com/" },
    { label: "Email", href: "mailto:hello@example.com" }
  ]
};
```

- [ ] **Step 4: Implement archive helpers**

Create `src/lib/archive.ts`:

```ts
import type { Entry, EntryMedium } from "../content/entries";

export type ArchiveFilter = "All" | "Images" | "Writing" | "Projects";

const toDateValue = (date: string) => Number(date.replaceAll(".", ""));

export function sortEntriesNewestFirst(entries: Entry[]) {
  return [...entries].sort((a, b) => toDateValue(b.date) - toDateValue(a.date));
}

export function filterEntriesByKind(entries: Entry[], filter: ArchiveFilter) {
  if (filter === "All") {
    return entries;
  }

  if (filter === "Images") {
    return entries.filter((entry) => entry.type === "Image");
  }

  if (filter === "Projects") {
    return entries.filter((entry) => entry.type === "Project");
  }

  return entries.filter((entry) => entry.medium === (filter as EntryMedium));
}

export function getLatestEntries(entries: Entry[], count = 6) {
  return sortEntriesNewestFirst(entries).slice(0, count);
}

export function getEntryBySlug(entries: Entry[], slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

export function groupEntriesByYearMonth(entries: Entry[]) {
  const groups = new Map<string, Entry[]>();

  for (const entry of sortEntriesNewestFirst(entries)) {
    const [year, month] = entry.date.split(".");
    const label = `${year}.${month}`;
    groups.set(label, [...(groups.get(label) ?? []), entry]);
  }

  return Array.from(groups.entries()).map(([label, groupedEntries]) => ({
    label,
    entries: groupedEntries
  }));
}
```

- [ ] **Step 5: Verify tests pass**

Run: `npm run test`

Expected: all archive helper tests pass.

- [ ] **Step 6: Commit content model**

Run:

```bash
git add src/content src/lib
git commit -m "feat: add archive content model"
```

Expected: commit succeeds.

## Task 3: Layout Components And Pages

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Create: `src/components/Header.tsx`
- Create: `src/components/FolioHero.tsx`
- Create: `src/components/LatestList.tsx`
- Create: `src/components/ArchiveTable.tsx`
- Create: `src/components/EntryPreview.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/IndexPage.tsx`
- Create: `src/pages/WorksPage.tsx`
- Create: `src/pages/NotesPage.tsx`
- Create: `src/pages/AboutPage.tsx`
- Create: `src/pages/EntryPage.tsx`

- [ ] **Step 1: Add app composition**

Replace `src/App.tsx` with:

```tsx
import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { entries } from "./content/entries";
import { getEntryBySlug } from "./lib/archive";
import { AboutPage } from "./pages/AboutPage";
import { EntryPage } from "./pages/EntryPage";
import { HomePage } from "./pages/HomePage";
import { IndexPage } from "./pages/IndexPage";
import { NotesPage } from "./pages/NotesPage";
import { WorksPage } from "./pages/WorksPage";

export default function App() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeEntry = useMemo(
    () => (activeSlug ? getEntryBySlug(entries, activeSlug) : undefined),
    [activeSlug]
  );

  return (
    <div className="site-shell">
      <Header onHome={() => setActiveSlug(null)} />
      {activeEntry ? (
        <EntryPage entry={activeEntry} onBack={() => setActiveSlug(null)} />
      ) : (
        <>
          <HomePage onSelectEntry={setActiveSlug} />
          <IndexPage onSelectEntry={setActiveSlug} />
          <WorksPage onSelectEntry={setActiveSlug} />
          <NotesPage onSelectEntry={setActiveSlug} />
          <AboutPage />
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add shared components**

Create `src/components/Header.tsx`:

```tsx
import { profile } from "../content/profile";

type HeaderProps = {
  onHome: () => void;
};

export function Header({ onHome }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="wordmark" type="button" onClick={onHome}>
        ESTWEN BRENCH
      </button>
      <nav aria-label="Primary navigation">
        {profile.navigation.map((item) => (
          <a href={item.href} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
```

Create `src/components/FolioHero.tsx`:

```tsx
import { profile } from "../content/profile";

export function FolioHero() {
  return (
    <section className="folio-hero" id="home">
      <div className="folio-title">
        <p className="folio-kicker">Visual Notes</p>
        <h1>ESTWEN BRENCH / Visual Notes</h1>
      </div>
      <aside className="folio-meta" aria-label="Site metadata">
        <dl>
          <div>
            <dt>Year</dt>
            <dd>{profile.year}</dd>
          </div>
          <div>
            <dt>Mediums</dt>
            <dd>{profile.mediums.join(" / ")}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{profile.location}</dd>
          </div>
        </dl>
        <ol>
          <li>Latest entries</li>
          <li>Archive index</li>
          <li>Works and notes</li>
        </ol>
      </aside>
    </section>
  );
}
```

Create `src/components/LatestList.tsx`:

```tsx
import type { Entry } from "../content/entries";

type LatestListProps = {
  entries: Entry[];
  onSelectEntry: (slug: string) => void;
};

export function LatestList({ entries, onSelectEntry }: LatestListProps) {
  return (
    <section className="section latest-section" aria-labelledby="latest-heading">
      <div className="section-heading">
        <p>Latest</p>
        <h2 id="latest-heading">Recent records</h2>
      </div>
      <div className="latest-list">
        {entries.map((entry) => (
          <button className="latest-row" key={entry.slug} type="button" onClick={() => onSelectEntry(entry.slug)}>
            <span>{entry.date}</span>
            <strong>{entry.title}</strong>
            <span>{entry.type}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/ArchiveTable.tsx`:

```tsx
import { useMemo, useState } from "react";
import type { Entry } from "../content/entries";
import { type ArchiveFilter, filterEntriesByKind, sortEntriesNewestFirst } from "../lib/archive";

type ArchiveTableProps = {
  entries: Entry[];
  onSelectEntry: (slug: string) => void;
};

const filters: ArchiveFilter[] = ["All", "Images", "Writing", "Projects"];

export function ArchiveTable({ entries, onSelectEntry }: ArchiveTableProps) {
  const [filter, setFilter] = useState<ArchiveFilter>("All");
  const visibleEntries = useMemo(
    () => sortEntriesNewestFirst(filterEntriesByKind(entries, filter)),
    [entries, filter]
  );

  return (
    <section className="section archive-section" id="index" aria-labelledby="archive-heading">
      <div className="section-heading split">
        <div>
          <p>Archive Index</p>
          <h2 id="archive-heading">Date-level index</h2>
        </div>
        <div className="filter-group" aria-label="Archive filters">
          {filters.map((item) => (
            <button
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
              key={item}
              type="button"
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="archive-table" role="table" aria-label="Archive entries">
        <div className="archive-row archive-head" role="row">
          <span>Date</span>
          <span>Type</span>
          <span>Title</span>
          <span>Medium</span>
          <span>Tags</span>
        </div>
        {visibleEntries.map((entry) => (
          <button className="archive-row" key={entry.slug} type="button" onClick={() => onSelectEntry(entry.slug)}>
            <span>{entry.date}</span>
            <span>{entry.type}</span>
            <strong>{entry.title}</strong>
            <span>{entry.medium}</span>
            <span>{entry.tags.join(", ")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/EntryPreview.tsx`:

```tsx
import type { Entry } from "../content/entries";

type EntryPreviewProps = {
  entry: Entry;
  onSelectEntry: (slug: string) => void;
};

export function EntryPreview({ entry, onSelectEntry }: EntryPreviewProps) {
  return (
    <article className="entry-preview">
      {entry.image ? <img alt="" src={entry.image} /> : null}
      <div>
        <p>{entry.date} / {entry.medium}</p>
        <h3>{entry.title}</h3>
        {entry.excerpt ? <p>{entry.excerpt}</p> : null}
        <button type="button" onClick={() => onSelectEntry(entry.slug)}>View entry</button>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Add pages**

Create `src/pages/HomePage.tsx`:

```tsx
import { ArchiveTable } from "../components/ArchiveTable";
import { FolioHero } from "../components/FolioHero";
import { LatestList } from "../components/LatestList";
import { entries } from "../content/entries";
import { getLatestEntries } from "../lib/archive";

type HomePageProps = {
  onSelectEntry: (slug: string) => void;
};

export function HomePage({ onSelectEntry }: HomePageProps) {
  return (
    <>
      <FolioHero />
      <LatestList entries={getLatestEntries(entries, 5)} onSelectEntry={onSelectEntry} />
      <ArchiveTable entries={entries} onSelectEntry={onSelectEntry} />
    </>
  );
}
```

Create `src/pages/IndexPage.tsx`:

```tsx
type IndexPageProps = {
  onSelectEntry: (slug: string) => void;
};

export function IndexPage({ onSelectEntry }: IndexPageProps) {
  void onSelectEntry;
  return null;
}
```

Create `src/pages/WorksPage.tsx`:

```tsx
import { EntryPreview } from "../components/EntryPreview";
import { entries } from "../content/entries";

type WorksPageProps = {
  onSelectEntry: (slug: string) => void;
};

export function WorksPage({ onSelectEntry }: WorksPageProps) {
  const works = entries.filter((entry) => entry.type === "Image" || entry.type === "Project");

  return (
    <section className="section" id="works" aria-labelledby="works-heading">
      <div className="section-heading">
        <p>Works</p>
        <h2 id="works-heading">Image-led records</h2>
      </div>
      <div className="preview-grid">
        {works.map((entry) => (
          <EntryPreview entry={entry} key={entry.slug} onSelectEntry={onSelectEntry} />
        ))}
      </div>
    </section>
  );
}
```

Create `src/pages/NotesPage.tsx`:

```tsx
import { EntryPreview } from "../components/EntryPreview";
import { entries } from "../content/entries";

type NotesPageProps = {
  onSelectEntry: (slug: string) => void;
};

export function NotesPage({ onSelectEntry }: NotesPageProps) {
  const notes = entries.filter((entry) => entry.type === "Note");

  return (
    <section className="section" id="notes" aria-labelledby="notes-heading">
      <div className="section-heading">
        <p>Notes</p>
        <h2 id="notes-heading">Written observations</h2>
      </div>
      <div className="notes-list">
        {notes.map((entry) => (
          <EntryPreview entry={entry} key={entry.slug} onSelectEntry={onSelectEntry} />
        ))}
      </div>
    </section>
  );
}
```

Create `src/pages/AboutPage.tsx`:

```tsx
import { profile } from "../content/profile";

export function AboutPage() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <div className="section-heading">
        <p>About</p>
        <h2 id="about-heading">A quiet index of images, writing, and project fragments.</h2>
      </div>
      <p>
        ESTWEN BRENCH / Visual Notes collects visual studies, written observations, and small systems
        for looking. The site is structured as a living archive rather than a fixed portfolio.
      </p>
      <div className="social-links">
        {profile.social.map((item) => (
          <a href={item.href} key={item.label}>
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}
```

Create `src/pages/EntryPage.tsx`:

```tsx
import type { Entry } from "../content/entries";

type EntryPageProps = {
  entry: Entry;
  onBack: () => void;
};

export function EntryPage({ entry, onBack }: EntryPageProps) {
  return (
    <article className="entry-page">
      <button className="back-link" type="button" onClick={onBack}>Back to index</button>
      <header>
        <p>{entry.date} / {entry.type} / {entry.medium}</p>
        <h1>{entry.title}</h1>
        {entry.excerpt ? <p>{entry.excerpt}</p> : null}
      </header>
      {entry.image ? <img alt="" src={entry.image} /> : null}
      <div className="entry-body">
        {entry.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Add editorial styles**

Replace `src/styles.css` with a complete editorial stylesheet:

```css
:root {
  --bg: #ffffff;
  --ink: #080808;
  --muted: #70747a;
  --line: #d9dde2;
  --faint: #f6f7f8;
  --accent: #1647b8;
  --max: 1180px;
  color: var(--ink);
  background: var(--bg);
  font-family: "Neue Haas Grotesk Text", "Helvetica Neue", Arial, sans-serif;
  font-synthesis: none;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: var(--bg);
}

button,
a {
  color: inherit;
  font: inherit;
}

button {
  border: 0;
  background: transparent;
  cursor: pointer;
}

img {
  display: block;
  max-width: 100%;
}

.site-shell {
  min-height: 100vh;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 22px clamp(20px, 4vw, 56px);
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(16px);
}

.wordmark {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-header nav {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.site-header a {
  font-size: 12px;
  text-decoration: none;
  color: var(--muted);
}

.site-header a:hover {
  color: var(--accent);
}

.folio-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
  gap: clamp(48px, 8vw, 120px);
  min-height: calc(100vh - 67px);
  max-width: var(--max);
  margin: 0 auto;
  padding: clamp(72px, 12vw, 150px) clamp(20px, 4vw, 56px) 72px;
}

.folio-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.folio-kicker,
.section-heading p,
.entry-preview p:first-child,
.entry-page header p {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.folio-title h1 {
  max-width: 780px;
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(54px, 9vw, 132px);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: 0;
}

.folio-meta {
  align-self: center;
  border-top: 1px solid var(--ink);
}

.folio-meta dl,
.folio-meta ol {
  margin: 0;
  padding: 0;
}

.folio-meta div,
.folio-meta li {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 22px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
  font-size: 13px;
  line-height: 1.45;
}

.folio-meta dt {
  color: var(--muted);
}

.folio-meta dd {
  margin: 0;
}

.folio-meta ol {
  counter-reset: contents;
  list-style: none;
  margin-top: 44px;
}

.folio-meta li::before {
  counter-increment: contents;
  content: "0" counter(contents);
  color: var(--muted);
}

.section {
  max-width: var(--max);
  margin: 0 auto;
  padding: 88px clamp(20px, 4vw, 56px);
  border-top: 1px solid var(--line);
}

.section-heading {
  margin-bottom: 34px;
}

.section-heading.split {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 28px;
}

.section-heading h2 {
  max-width: 760px;
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(32px, 5vw, 76px);
  font-weight: 400;
  line-height: 1;
}

.latest-list,
.archive-table {
  border-top: 1px solid var(--ink);
}

.latest-row,
.archive-row {
  width: 100%;
  display: grid;
  align-items: baseline;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
  text-align: left;
}

.latest-row {
  grid-template-columns: 130px 1fr 110px;
}

.latest-row span,
.archive-row span {
  color: var(--muted);
  font-size: 13px;
}

.latest-row strong,
.archive-row strong {
  font-weight: 400;
}

.latest-row:hover strong,
.archive-row:hover strong,
.entry-preview button:hover,
.back-link:hover {
  color: var(--accent);
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-group button {
  min-height: 34px;
  padding: 0 10px;
  border: 1px solid var(--line);
  font-size: 12px;
  color: var(--muted);
}

.filter-group button.active {
  border-color: var(--accent);
  color: var(--accent);
}

.archive-row {
  grid-template-columns: 120px 90px minmax(180px, 1fr) 130px minmax(120px, 0.8fr);
}

.archive-head {
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 42px;
}

.notes-list {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--ink);
}

.entry-preview {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
  gap: 28px;
  padding: 28px 0;
  border-bottom: 1px solid var(--line);
}

.entry-preview img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  filter: grayscale(1);
}

.entry-preview h3 {
  margin: 0 0 14px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.08;
}

.entry-preview p {
  max-width: 52ch;
  color: var(--muted);
  line-height: 1.7;
}

.entry-preview button,
.back-link {
  padding: 0;
  border-bottom: 1px solid currentColor;
  font-size: 13px;
}

.about-section > p {
  max-width: 68ch;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.8;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 30px;
}

.social-links a {
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
}

.entry-page {
  max-width: 880px;
  margin: 0 auto;
  padding: 80px clamp(20px, 4vw, 56px) 120px;
}

.entry-page header h1 {
  margin: 24px 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 400;
  line-height: 0.98;
}

.entry-page header p:last-child {
  max-width: 62ch;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.7;
}

.entry-page img {
  width: 100%;
  margin: 42px 0;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  filter: grayscale(1);
}

.entry-body {
  max-width: 68ch;
  font-size: 19px;
  line-height: 1.85;
}

.entry-body p {
  margin: 0 0 24px;
}

@media (max-width: 760px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .folio-hero,
  .entry-preview {
    grid-template-columns: 1fr;
  }

  .folio-hero {
    min-height: auto;
  }

  .section-heading.split {
    align-items: flex-start;
    flex-direction: column;
  }

  .latest-row,
  .archive-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .archive-head {
    display: none;
  }

  .preview-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`

Expected: TypeScript and Vite build pass.

- [ ] **Step 6: Commit layout**

Run:

```bash
git add src
git commit -m "feat: build editorial archive interface"
```

Expected: commit succeeds.

## Task 4: Interaction Tests And Accessibility Checks

**Files:**
- Create: `src/App.test.tsx`
- Modify: `src/components/FolioHero.tsx`

- [ ] **Step 1: Add app interaction tests**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the editorial identity and archive table", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "ESTWEN BRENCH / Visual Notes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Date-level index" })).toBeInTheDocument();
    expect(screen.getByText("2026.06.10")).toBeInTheDocument();
  });

  it("filters archive rows by writing", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Writing" }));
    expect(screen.getByText("Fragments after rain")).toBeInTheDocument();
    expect(screen.queryByText("Window Study 01")).not.toBeInTheDocument();
  });

  it("opens and closes an entry detail", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole("button", { name: /View entry|Fragments after rain/ })[0]);
    expect(screen.getByRole("button", { name: "Back to index" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Back to index" }));
    expect(screen.getByRole("heading", { name: "Recent records" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to inspect failures**

Run: `npm run test`

Expected: if the first heading query fails because `FolioHero` has both kicker and h1 text close together, make the h1 accessible name exact by keeping only the h1 text inside the heading.

- [ ] **Step 3: Ensure hero title is accessible**

If needed, update `src/components/FolioHero.tsx` so only the `h1` contains `ESTWEN BRENCH / Visual Notes`, and keep `Visual Notes` outside the heading as the existing `.folio-kicker`.

Expected component remains:

```tsx
import { profile } from "../content/profile";

export function FolioHero() {
  return (
    <section className="folio-hero" id="home">
      <div className="folio-title">
        <p className="folio-kicker">Visual Notes</p>
        <h1>ESTWEN BRENCH / Visual Notes</h1>
      </div>
      <aside className="folio-meta" aria-label="Site metadata">
        <dl>
          <div>
            <dt>Year</dt>
            <dd>{profile.year}</dd>
          </div>
          <div>
            <dt>Mediums</dt>
            <dd>{profile.mediums.join(" / ")}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{profile.location}</dd>
          </div>
        </dl>
        <ol>
          <li>Latest entries</li>
          <li>Archive index</li>
          <li>Works and notes</li>
        </ol>
      </aside>
    </section>
  );
}
```

- [ ] **Step 4: Verify test and build**

Run:

```bash
npm run test
npm run build
```

Expected: both commands pass.

- [ ] **Step 5: Commit tests**

Run:

```bash
git add src/App.test.tsx src/components/FolioHero.tsx
git commit -m "test: cover archive interactions"
```

Expected: commit succeeds.

## Task 5: Browser Visual QA And Refinement

**Files:**
- Modify as needed: `src/styles.css`
- Modify as needed: `src/content/entries.ts`

- [ ] **Step 1: Start local dev server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 2: Open in Browser plugin**

Open the local URL in the Codex Browser plugin.

Expected:

- First viewport is true white.
- Header is restrained and not card-like.
- Hero uses two-column folio layout on desktop.
- Archive preview appears below the fold.

- [ ] **Step 3: Desktop QA checklist**

At a desktop viewport around `1440 x 1024`, verify:

- `ESTWEN BRENCH / Visual Notes` is the dominant first-viewport signal.
- Right metadata column does not overcrowd the hero.
- The next section is hinted by scrolling.
- Archive rows are readable.
- Filters visibly change selected state.
- Images appear grayscale and editorial, not decorative.

- [ ] **Step 4: Mobile QA checklist**

At a mobile viewport around `390 x 844`, verify:

- Header wraps without overlap.
- Hero title fits without horizontal scroll.
- Metadata stacks cleanly.
- Archive rows collapse into readable stacked rows.
- Buttons remain tappable.

- [ ] **Step 5: Fix visual issues**

If title overflow occurs, reduce mobile heading scale in `src/styles.css`:

```css
@media (max-width: 520px) {
  .folio-title h1 {
    font-size: clamp(42px, 17vw, 72px);
  }
}
```

If archive rows are too dense on desktop, increase row padding:

```css
.archive-row {
  padding: 20px 0;
}
```

If the first viewport feels too plain, add a single thin vertical rule to `.folio-title`:

```css
.folio-title {
  border-left: 1px solid var(--line);
  padding-left: clamp(18px, 2vw, 28px);
}
```

- [ ] **Step 6: Re-run verification**

Run:

```bash
npm run test
npm run build
```

Expected: both commands pass after visual refinements.

- [ ] **Step 7: Commit QA fixes**

Run:

```bash
git add src
git commit -m "style: refine editorial responsive layout"
```

Expected: commit succeeds.

## Task 6: README, GitHub, And Vercel Deployment Prep

**Files:**
- Create: `README.md`
- Create: `vercel.json`

- [ ] **Step 1: Add Vercel configuration**

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install"
}
```

- [ ] **Step 2: Add README**

Create `README.md`:

```md
# ESTWEN BRENCH / Visual Notes

An editorial personal creator website for images, writing, and project fragments.

## Stack

- React
- Vite
- TypeScript
- Vitest
- Static deployment on Vercel

## Local Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run test
npm run build
```

## Content

Entry metadata lives in `src/content/entries.ts`.

Each entry includes:

- `date`
- `type`
- `title`
- `medium`
- `tags`
- `slug`
- optional `excerpt`
- optional `image`
- `body`

Profile and social links live in `src/content/profile.ts`.

## Deployment

The project is configured for Vercel:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
```

- [ ] **Step 3: Verify final checks**

Run:

```bash
npm run test
npm run build
git status --short
```

Expected:

- Tests pass.
- Build passes.
- Only `README.md` and `vercel.json` are uncommitted at this point.

- [ ] **Step 4: Commit deployment prep**

Run:

```bash
git add README.md vercel.json
git commit -m "docs: add deployment notes"
```

Expected: commit succeeds.

- [ ] **Step 5: GitHub remote decision**

If the user has a GitHub repository URL, run:

```bash
git remote add origin <repository-url>
git branch -M main
git push -u origin main
```

Expected: local commits are pushed to GitHub.

If the user wants a new GitHub repository created through the GitHub plugin, use the plugin to create the repo, then add the returned remote URL and push.

- [ ] **Step 6: Vercel deployment decision**

If Vercel CLI is available and the user is logged in, deploy with:

```bash
npx vercel --prod
```

Expected: Vercel returns a production URL.

If Vercel CLI is not available or login is required, connect the pushed GitHub repository through Vercel's dashboard and use the settings in `vercel.json`.

## Self-Review

Spec coverage:

- Creator positioning is implemented by `FolioHero`, typography, metadata, and the about section.
- Date-level publishing is implemented by `Entry.date`, `LatestList`, and `ArchiveTable`.
- Works and notes separation is implemented by `WorksPage` and `NotesPage`.
- Static deployment is implemented by Vite build output and `vercel.json`.
- Contact/social configuration is implemented by `profile.social`.

Incomplete-language scan:

- The plan contains no deferred feature language.
- Temporary sample content is explicit implementation content for version 1, not an unfinished feature.

Type consistency:

- `Entry`, `EntryType`, and `EntryMedium` are defined once in `src/content/entries.ts`.
- Archive helpers consume the same `Entry` type.
- Components pass only `slug` strings through `onSelectEntry`.
