# ESTWEN BRENCH / Visual Notes

我的个人网站。

An editorial personal creator website for images, writing, and project fragments.

## Stack

- Static HTML, CSS, and JavaScript
- Node.js built-in test runner
- Static deployment on Vercel

The original design spec targets React/Vite for a later dependency-backed version. This implementation avoids third-party packages so the site can be built and verified in the current restricted network environment.

## Local Development

```bash
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Checks

```bash
npm run test
npm run build
```

## Content

Entry metadata lives in `src/content.js`.

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

Profile and social links live in `src/content.js`.

## Language Toggle

The public interface supports English and Chinese through `src/i18n.js`.

The language toggle changes page chrome such as navigation, headings, table labels, buttons, and owner instructions. Personal entry content such as titles, body text, image files, and tags stays exactly as written in `src/content.js`.

## Owner Editing

This is a public static site, so it intentionally does not include a public upload editor. Only the GitHub account with write access to this private repository can edit the site safely.

To replace sample content:

1. Open `src/content.js`.
2. Add, edit, or delete objects in the `entries` array.
3. Upload personal images into `assets/`.
4. Reference the image with a path such as `assets/window-study-01.jpg`.
5. Commit the change to `main`; GitHub Pages will redeploy.

If direct editing inside the website is required, add an authenticated admin system later, such as Decap CMS with GitHub login or a Supabase-backed admin page.

## Deployment

The project is configured for Vercel static hosting:

- Build command: `npm run build`
- Output directory: `.`
- Install command: `npm install --ignore-scripts`
