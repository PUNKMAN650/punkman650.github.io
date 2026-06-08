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

Open `/admin/` on the deployed site to edit content through the private admin interface.

The admin page can:

- Load the current `content/site.json` from GitHub
- Add, edit, and delete entries
- Upload images to `assets/uploads/`
- Save the updated content back to the `main` branch

Only a GitHub token with write access to `PUNKMAN650/personal_website` can save changes. Visitors can open the admin page, but they cannot change the site without repository write permission.

For a fine-grained GitHub token, grant this repository `Contents: Read and write`.

## Deployment

The project is configured for Vercel static hosting:

- Build command: `npm run build`
- Output directory: `.`
- Install command: `npm install --ignore-scripts`
