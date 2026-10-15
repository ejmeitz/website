# Ethan Meitz’s website

A static Astro + TypeScript website for research, publications, art, and personal projects. No
application backend or visitor analytics. Content is built to HTML; fonts and images are hosted
locally.

## Development

Requires Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

The default preview is `http://127.0.0.1:4321/website/`. `npm run verify` runs Astro checks,
contact-transport tests, a production build, and link/redirect/privacy checks. `npm run preview`
serves the built output.
