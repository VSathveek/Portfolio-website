# Varanasi Sathveek — Personal Site

A professional, academic-style personal website with a private, password-protected
journal built around a drawing-first editor.

**Stack:** Next.js (App Router) + TypeScript · Tailwind CSS v4 · Supabase (auth +
Postgres + storage) · Excalidraw · MDX. Deployed on **Vercel**.

Live: https://portfolio-website-amber-pi-50.vercel.app

## Features

- **Portfolio** — home/bio, research & experience, projects, an HTML CV with PDF
  download, and contact. Content lives in typed data files under `src/data/`.
- **Writing** — an MDX blog at `/blog` (posts in `content/blog/*.mdx`) with per-post
  pages, an RSS feed at `/blog/rss.xml`, and reading-friendly typography.
- **Private journal** — Supabase email/password auth gates `/journal`; each entry is
  an Excalidraw canvas with debounced autosave, stored per-user with Row Level
  Security. The editor is isolated behind `src/components/journal/journal-editor.tsx`.
- Light/dark mode, responsive layout, SEO (sitemap, robots, OpenGraph image),
  generated favicon, and privacy-friendly Vercel Analytics.

## Local development

Requirements: **Node.js 20+** and npm.

```bash
npm install
cp .env.example .env.local   # then fill in Supabase values
npm run dev
```

Open http://localhost:3000.

| Command                | What it does               |
| ---------------------- | -------------------------- |
| `npm run dev`          | Start the dev server       |
| `npm run build`        | Production build           |
| `npm run start`        | Serve the production build |
| `npm run lint`         | ESLint                     |
| `npm run format`       | Format with Prettier       |
| `npm run format:check` | Check formatting           |

## Environment variables

Set these in `.env.local` (git-ignored) and in the Vercel dashboard
(Project Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

The publishable key is safe to expose in the browser (access is protected by Row
Level Security). Never put the service-role/secret key in client code.

## Supabase setup

1. Create a Supabase project and copy its URL + publishable key into the env vars above.
2. In **Authentication → Users**, create your single account (auto-confirmed) and
   **disable public sign-ups** in the auth settings.
3. Run the migration in `supabase/migrations/` (Supabase SQL Editor) to create the
   `journal_entries` table with its Row Level Security policies.

## Content

- **Portfolio** — edit the typed files in `src/data/` (profile, experience, research,
  projects, skills) and `src/lib/site.ts` (identity, nav, socials).
- **Blog** — add `content/blog/<slug>.mdx` with `title`, `date`, and `description`
  frontmatter.
- **CV PDF** — replace `public/Varanasi_Sathveek_CV.pdf`.

## Deployment (Vercel)

The `main` branch auto-deploys to production on Vercel. Framework preset is Next.js
(auto-detected); add the environment variables above and enable the Analytics tab.
