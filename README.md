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

## Deployment

The project is configured for Vercel static hosting:

- Build command: `npm run build`
- Output directory: `.`
- Install command: `npm install --ignore-scripts`
