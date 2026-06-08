# ESTWEN BRENCH / Visual Notes Personal Website Design

Date: 2026-06-08

## Summary

Build a personal creator website for `ESTWEN BRENCH / Visual Notes`.

The site should feel like an ultra-white editorial publication rather than a conventional portfolio. It needs to establish a quiet, refined creator identity, then provide a durable archive system for image works, writing, and projects.

The selected visual direction is `Editorial Folio Grid`: a restrained two-column magazine-like first viewport, followed by a structured archive index.

## Goals

- Present `ESTWEN BRENCH / Visual Notes` as an independent multi-medium creator identity.
- Support both image-based works and written notes.
- Make frequent publishing practical, including daily or near-daily entries.
- Keep the experience minimal, legible, fast, and maintainable.
- Avoid generic portfolio patterns, decorative gradients, and crowded card grids.

## Audience

The site is for visitors who want to understand the creator's visual and written world:

- Readers looking for essays, notes, observations, and fragments.
- Viewers browsing selected images, visual studies, or design work.
- Collaborators or contacts evaluating taste, consistency, and direction.

## Information Architecture

Primary navigation:

- `Home`
- `Index`
- `Works`
- `Notes`
- `About`

### Home

The first viewport establishes identity.

Layout:

- Left side: large typographic lockup, `ESTWEN BRENCH / Visual Notes`.
- Right side: restrained metadata, such as year, media, location/status, and contents.
- Bottom or next viewport preview: beginning of the latest/archive system.

The home page should not become a dense feed. It should feel like a publication cover and table of contents.

### Latest

The latest section appears near the top of the content flow.

Purpose:

- Show the most recent 5-8 updates.
- Support high-frequency publishing, including entries from today, tomorrow, and consecutive days.
- Let visitors immediately see that the site is alive.

Each latest item includes:

- Full date
- Type
- Title
- Medium
- Optional short excerpt
- Optional thumbnail

### Archive Index

The archive is the system backbone.

Columns:

- `Date`
- `Type`
- `Title`
- `Medium`
- `Tags`

Behavior:

- Sort by newest first by default.
- Filter by `All`, `Images`, `Writing`, and `Projects`.
- Support year and month grouping as content grows.
- Keep row design light: hairlines, hover state, no heavy cards.

The archive should use full dates, not only years. Year remains useful as a high-level publication marker, but daily content requires date-level precision.

### Works

Works focuses on image-led entries.

Content types:

- Photography
- Design studies
- Visual fragments
- Project images

Layout:

- Editorial grid or restrained gallery.
- Large enough images for visual inspection.
- Metadata remains visible but secondary.

### Notes

Notes focuses on writing.

Content types:

- Short notes
- Essays
- Observations
- Journal-like fragments

Layout:

- Clean reading list.
- Comfortable line length for excerpts.
- Detail pages optimized for long-form reading.

### About

About provides context without becoming a resume page.

Includes:

- Short creator statement
- Mediums and interests
- Social links
- Email/contact link

## Content Model

Use a single entry model across works, notes, and projects.

```ts
type Entry = {
  date: string;
  type: "Note" | "Image" | "Project";
  title: string;
  medium: "Writing" | "Photography" | "Design" | "Mixed";
  tags: string[];
  excerpt?: string;
  image?: string;
  slug: string;
  featured?: boolean;
};
```

Example:

```ts
{
  date: "2026.06.08",
  type: "Note",
  title: "On quiet interfaces",
  medium: "Writing",
  tags: ["design", "life"],
  excerpt: "A short observation on restraint, rhythm, and the surfaces we return to.",
  slug: "on-quiet-interfaces",
  featured: true
}
```

## Frontend Approach

Stack for the first version:

- React
- Vite
- TypeScript
- MDX content files for notes and long-form entries
- A typed entry index for cross-site filtering and metadata
- CSS Modules or plain CSS, unless implementation setup makes Tailwind clearly lighter

Rationale:

- Fast local development.
- Easy static deployment.
- Strong fit for a visual personal site.
- Content can live in the repo without a database.
- Future migration to CMS or database remains possible.

## Backend Approach

The first version should not include a custom backend.

Initial content and metadata can be handled through local Markdown/MDX and typed data files. This keeps the site simple, fast, and easy to deploy.

Add backend services later only if needed for:

- Admin login
- Online editing
- Comments
- Newsletter signup
- Contact form handling
- Analytics dashboard

For the first version, contact can be handled through email and social links.

## Deployment

Preferred deployment options:

1. Vercel
2. Cloudflare Pages
3. GitHub Pages

Recommendation:

Use Vercel for version 1 because it is the simplest React/Vite deployment path. Use Cloudflare Pages later only if the domain or hosting preference makes Cloudflare more convenient.

The site should be deployable as a static build.

## Visual System

### Palette

- Background: true white or near-white, not cream or beige.
- Primary text: black.
- Secondary text: cool gray.
- Rules/dividers: pale gray.
- Accent: small amount of cobalt blue.

### Typography

Use no more than two font families.

- Display/title: refined serif or high-contrast editorial face.
- UI/body/metadata: compact grotesk or restrained sans.

Typography must carry most of the identity. Avoid decorative imagery compensating for weak type.

### Layout

- Large whitespace.
- Precise alignment.
- Light row separators.
- Minimal surfaces.
- No nested cards.
- No default bento grid.
- No centered app-card layout.

### Motion

Motion should be subtle:

- First viewport fade-in.
- Thin line reveal.
- Archive row hover.
- Gentle scroll reveal.

Do not use distracting motion or decorative effects.

## Key Interactions

- Navigation between Home, Index, Works, Notes, About.
- Archive filters: All, Images, Writing, Projects.
- Clicking archive rows opens entry detail pages.
- Works entries support image-first browsing.
- Notes entries support readable article detail pages.
- Contact/social links are accessible from About and footer.

## Testing And Quality Gates

Before handoff:

- Verify desktop layout.
- Verify mobile layout.
- Verify archive filtering.
- Verify navigation and detail pages.
- Verify no horizontal overflow.
- Verify typography remains readable.
- Verify images load and crop correctly.
- Run available build/type checks.
- Compare rendered UI against the accepted visual concept.

Visual QA should specifically check:

- First viewport composition.
- White background fidelity.
- Title hierarchy.
- Archive table density.
- Date-level index clarity.
- Avoidance of card-heavy portfolio tropes.

## Scope Boundaries

In scope for version 1:

- Static personal website.
- Home, Index, Works, Notes, About.
- Content model and sample content.
- Responsive design.
- Static deployment.

Out of scope for version 1:

- Login/admin dashboard.
- Database-backed CMS.
- Comments.
- Newsletter system.
- Payment or commerce.
- Complex analytics.

## Implementation Defaults

- Deployment target: Vercel.
- Content format: MDX for written/detail content plus a typed entry index for metadata.
- Images for version 1: use curated sample editorial images or generated editorial images until the user supplies final personal images.
- Social/contact links: centralize in a small config file so real links can be added without changing layout code.
