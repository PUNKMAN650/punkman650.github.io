# ESTWEN BRENCH / Visual Notes

我的个人网站。

An editorial personal creator website for images, writing, and project fragments.

## Stack

- Static HTML, CSS, and JavaScript
- Node.js built-in test runner
- GitHub Pages user site: `PUNKMAN650/punkman650.github.io`

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

Editable site content lives in `content/site.json`.

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

## Language Toggle

The public interface supports English and Chinese through `src/i18n.js`.

The language toggle changes page chrome such as navigation, headings, table labels, and buttons. Personal entry content such as titles, body text, image files, and tags stays exactly as written in `content/site.json`.

## Owner Editing

Open `/admin/` on the deployed site to edit content through the private admin interface.

The admin page can:

- Load the current `content/site.json` from GitHub
- Add, edit, and delete entries
- Upload images to `assets/uploads/`
- Save the updated content back to the `main` branch

Only a GitHub token with write access to `PUNKMAN650/punkman650.github.io` can save changes. Visitors can open the admin page, but they cannot change the site without repository write permission.

For a fine-grained GitHub token, grant this repository `Contents: Read and write`.

## Deployment

This repository follows GitHub Pages' user-site convention:

- Repository: `PUNKMAN650/punkman650.github.io`
- Published URL: `https://punkman650.github.io/`

The included GitHub Actions workflow verifies and deploys the static site.
