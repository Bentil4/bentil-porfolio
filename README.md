# Developer Portfolio

A fast, dark, single-page developer portfolio built with **Vite + React + TypeScript + Tailwind CSS v4**, with light motion animations. It is designed to deploy to **GitHub Pages** from any repository sub-folder.

## Make it yours: edit one file

All personal content lives in **[`src/config/portfolio.ts`](src/config/portfolio.ts)**. Every value you should change is marked with `// EDIT:`.

| Field | What it controls |
| --- | --- |
| `name`, `title`, `brand`, `summary` | Hero headline, navbar wordmark, two-sentence pitch |
| `about` | About section bio and "quick facts" (delete it to fall back to a one-liner) |
| `email`, `resumeUrl`, `socials` | Contact links, the Resume button (an external URL), GitHub/LinkedIn icons |
| `projects[]` | Project cards: `category`, the STAR fields, `tech` pills, `liveUrl` / `repoUrl` (omit either one to hide its button), `repoPrivate` |
| `skills` | The three skill groups: Frontend, Backend & Databases, DevOps & Tools |
| `github` | `username` and `enableLiveStats` for the GitHub stats dashboard |
| `contact.formEndpoint` | Optional form backend, e.g. [Formspree](https://formspree.io). Leave it empty to show only direct links. |
| `seo` | Page `<title>`, meta description and Open Graph tags (injected at build time) |

While `npm run dev` is running, the browser console warns about any values that still look like placeholders.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
npm run lint
```

## Deploy to GitHub Pages

1. Push this project to a GitHub repo. Commit `package-lock.json`, because CI runs `npm ci`.
2. In the repo, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the site and publishes it to `https://<user>.github.io/<repo>/`.

`vite.config.ts` sets `base: './'`, so every asset path is relative. The same build works at a user site root or in a project sub-folder, with no config change.

## GitHub stats

The stats section shows styled placeholders until `github.enableLiveStats` is `true` and `github.username` is set.

- **Contribution graph:** loaded from [ghchart](https://ghchart.rshah.org). No setup needed.
- **Stats and Top Languages:** loaded from a self-hosted [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) instance, set in `github.statsApiUrl`. The public instance has been shut down, so you need your own:
  1. Fork github-readme-stats and import it into Vercel.
  2. Add the environment variable `PAT_1`: a classic GitHub token with no scopes is enough for public stats.
  3. Add `WHITELIST=<your-username>` so nobody else can use up your token's API quota.
  4. Deploy, then put the production URL in `statsApiUrl`.

If an image fails to load, its panel falls back to the placeholder.

## Structure

```
src/
  config/        portfolio.ts (edit me), types, dev-only validator
  components/    Navbar, Hero, About, Projects/ProjectCard, Skills, GitHubStats, Contact/ContactForm, Footer
  components/ui/ Button, Pill, Section, SectionHeading, SocialIcon, Reveal
  hooks/         useActiveSection (highlights the nav link for the section in view)
```
