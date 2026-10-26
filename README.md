# Bilal Bouizdouzene — AI Engineer Portfolio

A dark-first, static React + TypeScript portfolio for Bilal Bouizdouzene, focused on Speech AI, NLP, LLMs, RAG, agentic systems and applied machine learning.

## Stack

- React + TypeScript + Vite
- Tailwind CSS + a small custom token layer for the portfolio-specific visual system
- Framer Motion for restrained interaction and scroll reveals
- Lucide React icons
- Hash-based project detail routing for GitHub Pages compatibility
- GitHub Actions + GitHub Pages deployment

## Local development

```bash
npm ci
npm run dev
```

Build and preview the production output:

```bash
npm run typecheck
npm run build
npm run preview
```

## Content configuration

- Personal details and contact links: `src/data/personal.ts`
- Project archive and detail data: `src/data/projects.ts`
- Skills: `src/data/skills.ts`
- Research and education: `src/data/experience.ts`
- Styling and responsive layout: `src/styles.css`

To add a project, append a typed object to `src/data/projects.ts`. Add a real GitHub URL only after verifying the repository. Project visuals are intentionally abstract when an authentic screenshot is not available.

## Resume

The resume download stays disabled until the real PDF is supplied. Add it at:

`public/resume/Bilal_Bouizdouzene_CV.pdf`

Then replace the disabled CTA in `src/App.tsx` with a normal link if desired.

## GitHub Pages

The included workflow deploys on pushes to `main` and runs `npm ci`, the TypeScript check and the production build before publishing `dist` through the official Pages actions. The Vite base is `/`, matching the user-level repository URL:

`https://bilalbouizdouzene.github.io/`

Before the first deployment, enable GitHub Pages for the repository using **GitHub Actions** as the source. Publication is intentionally not triggered by this local project setup.

## Accuracy notes

Repository links are limited to the URLs supplied or verified during implementation. Silbo ASR metrics are kept tied to the phrase-independent evaluation setup documented in its repository README. Missing LinkedIn and resume assets are represented as configurable/hidden rather than fabricated.

## License

The portfolio source is personal project code. Project names, repository content and third-party libraries remain subject to their respective owners and licenses.
