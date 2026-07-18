# Varanasi Sathveek — Personal Site

A professional, academic-style personal website plus a private, password-protected
journal with a drawing-first editor.

Built with **Next.js (App Router) + TypeScript**, **Tailwind CSS**, **Supabase**
(auth + database + storage), and **Excalidraw** for the journal editor.
Deployed on **Vercel**.

> This is a rebuild of the original vanilla HTML/CSS/JS site (still live on GitHub
> Pages from `main`). The rebuild happens on the `redesign` branch and is cut over
> to production once it reaches parity. The legacy files (`index.html`, `styles.css`,
> `script.js`) are intentionally kept at the repo root until the Phase 7 cutover.

## Local development

Requirements: **Node.js 20+** and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command                | What it does                      |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the dev server              |
| `npm run build`        | Production build                  |
| `npm run start`        | Serve the production build        |
| `npm run lint`         | ESLint                            |
| `npm run format`       | Format the codebase with Prettier |
| `npm run format:check` | Check formatting without writing  |

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values (see comments in the file).
`.env.local` is git-ignored — **never commit secrets**. In production, set the same
variables in the Vercel dashboard (Project Settings → Environment Variables).

Supabase keys are added in Phase 3.

## Deployment (Vercel)

The site deploys to Vercel's free Hobby tier.

1. Import the GitHub repo at https://vercel.com/new.
2. Framework preset: **Next.js** (auto-detected). No build overrides needed.
3. Add the environment variables from `.env.example` (once Phase 3 adds Supabase).
4. Every push to `redesign` gets a preview deployment; production tracks `main`
   after the Phase 7 cutover.

## Project status

Rebuild is phased — see the git history for per-phase commits. Current focus:
scaffolding and design system.
