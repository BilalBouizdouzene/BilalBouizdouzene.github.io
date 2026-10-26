# Bilal Bouizdouzene — AI Engineer Portfolio

Personal portfolio for Bilal Bouizdouzene, focused on Speech AI, NLP, LLMs, RAG, agentic systems and applied machine learning.

**Live site:** [bilalbouizdouzene.github.io](https://bilalbouizdouzene.github.io/)

## Built with

- React, TypeScript and Vite
- Tailwind CSS and custom responsive CSS
- Framer Motion for animations
- Lucide React for icons
- GitHub Actions and GitHub Pages for deployment

## Run locally

```bash
npm ci
npm run dev
```

The development server is available at the local URL shown in the terminal.

## Validate and build

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Project structure

- `src/data/personal.ts` — profile, contact links and resume path
- `src/data/projects.ts` — project descriptions, technologies and GitHub links
- `src/data/skills.ts` — skills and technical focus areas
- `src/data/experience.ts` — research, education and experience
- `src/App.tsx` — page sections and interactions
- `src/styles.css` — visual system and responsive layout
- `public/images/` — profile and project artwork
- `public/resume/` — downloadable CV

## Deployment

Every push to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`. It installs the dependencies, runs the checks, builds the `dist` directory and publishes it to GitHub Pages.

The repository must use **GitHub Actions** as its Pages deployment source.

## License

Portfolio source code is personal project code. Project repositories and third-party dependencies retain their respective licenses.
