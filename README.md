# Ethan Meitz’s website

A static Astro + TypeScript website for research, publications, art, and personal projects. No application backend or visitor analytics. Content is built to HTML; fonts and images are hosted locally.

## Development

Requires Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

The default preview is `http://127.0.0.1:4321/website/`. `npm run verify` runs Astro checks, contact-transport tests, a production build, and link/redirect/privacy checks. `npm run preview` serves the built output.

## Editing content

- `src/content/projects/`: three featured research stories, in Markdown with validated metadata.
- `src/content/archive/`: earlier engineering and imaging projects.
- `src/data/publications.ts`: publications and conference presentations.
- `src/pages/`: homepage, About, Art, Playground, Writing, Contact, and Privacy.
- `src/assets/`: artwork, photographs, and research figures. `Asset.astro` generates responsive WebP variants.
- `src/styles/global.css`: shared colors, type, layout, and responsive rules.
- `src/data/redirects.mjs`: mappings for links from the old website.

The original MERN repository is untouched. No résumé, essay draft, recipient email, or private phone number is included. The public résumé download is intentionally omitted until a reviewed copy is available.

## Contact form

1. Create a Formspree account and form; set and verify the receiving address **in Formspree**, never in this repository.
2. For local development, copy `.env.example` to `.env` and set `PUBLIC_FORMSPREE_ID` to the opaque form ID.
3. For deployment, set the GitHub Actions repository variable `PUBLIC_FORMSPREE_ID` to that ID, then redeploy. The ID is public, not an API secret.
4. Enable Formspree spam protection and allowed domains as available in your account. The form also supplies the `_gotcha` honeypot field.
5. Test actual delivery, reply-to, validation, errors, rate limiting, and the no-JavaScript fallback after configuration. Automated tests mock transport and never send email.

Without a valid ID, the page explicitly says the form is unavailable, disables submission, and offers LinkedIn. The free tier was verified at 50 submissions/month during implementation; verify current limits in the provider dashboard. No email address should be stored in a hidden field, public environment variable, HTML, or JavaScript.

## GitHub Pages and Namecheap

See [the launch guide](docs/launch.md). The workflow deploys pushes to `main`, validates pull requests without deploying them, and supports manual dispatch.

Default build target: `https://ejmeitz.github.io/website/`. The GitHub repository must have **Settings → Pages → Source → GitHub Actions** enabled, and the Actions repository variable `PAGES_ENABLED` set to `true`. Until then, pushes validate without uploading artifacts or deploying. GitHub Free requires a public repository for Pages; a private repository requires a supporting paid plan. Deployment also requires available GitHub Actions artifact storage. Deployment does not automatically change DNS or shut down Heroku.

For the later custom domain, set repository variables `SITE_URL=https://ethanmeitz.com` and `BASE_PATH=/` together. Local builds use shell environment variables for these settings; `.env` is used for the Formspree ID. Do not add a custom domain while still reviewing the project URL.

## Pending content

- Public résumé, after polishing and removing private contact details.
- cuNumeric benchmark plots with hardware, scaling mode, problem sizes, versions, and measurement methodology.
- Published CSGF essay and podcast links. Current titles on the site are descriptive teaser headings, not asserted publication titles.
- New artwork and build photos.
- Results and public materials for the protein and ML force-constant projects.

Keep the thermodynamics timing claim attached to quantum LJ neon and its **estimated TI-PIMD comparator**. Classical benchmark costs are comparable. Do not expand model-system results into universal accuracy claims or imply completed protein-prediction results.

## Asset provenance

Artwork, photographs, historical plots, and videos were supplied in the owner’s original website repository. `thermodynamics-figure.png` reproduces Figure 1 and its caption from the supplied 2026 preprint *Quantum Anharmonic Phonon Thermodynamics from the Free Energy Cumulant Expansion*, DOI `10.21203/rs.3.rs-10541555/v1`, licensed CC BY 4.0. It is cropped from the PDF page with no change to the data. Research-card diagrams are schematic, not simulation output. Fonts are bundled via Fontsource with their package licenses. p5.js sketches remain externally hosted and load only on request.
