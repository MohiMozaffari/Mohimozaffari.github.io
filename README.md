# mohimozaffari.github.io

Mohaddeseh "Mohi" Mozaffari's personal academic/portfolio site: a static React frontend on GitHub
Pages, backed by a Cloudflare Workers API + D1 database for projects, publications, blog posts,
contact messages, and page-view analytics.

## Architecture

- **Frontend** (`src/`): Create React App + craco + Tailwind, deployed to GitHub Pages via
  `.github/workflows/pages.yml` on every push to `main`.
- **Backend** (`server/`): a Hono app running on Cloudflare Workers (chosen over Render/Vercel
  because both require a credit card or block certain regions — Cloudflare Workers' free plan
  needs neither). See `server/.dev.vars` for local environment variables.
- **Database**: Cloudflare D1 (SQLite, Cloudflare's native serverless database — not MongoDB;
  Workers can't make raw database-driver connections to MongoDB Atlas, so this project uses D1
  instead).

## How to update content (no code changes needed)

Projects, publications, and blog posts are stored in the database and edited through the admin
panel at `/admin/login`, not by editing files in this repo:

- **Projects**: auto-synced daily from GitHub (and on-demand via the "Refresh from GitHub" button
  in the admin Projects tab). Use the admin panel to set `Featured`/`Hidden` flags and add
  overrides (arXiv link, Zenodo DOI, custom description) — never hand-edit a projects list in code.
- **Publications**: add/edit directly in the admin Publications tab.
- **Blog / research notes**: add/edit directly in the admin Blog tab.
- **Contact messages**: view submissions in the admin Messages tab (also emailed on arrival).
- **Analytics**: simple page-view counts in the admin Analytics tab.

The Teaching page content (`src/data/courses.js`) and About page bio are the only content that
still lives in code, since they don't need runtime editing.

## Local development

```bash
# Backend
cd server
cp .dev.vars.example .dev.vars   # fill in ADMIN_*, RESEND_API_KEY, etc.
npm install
npx wrangler d1 execute mohi-portfolio --local --file=./schema.sql
npm run dev                       # http://localhost:8787 (wrangler dev)

# Frontend (in a separate terminal, from repo root)
cp .env.example .env.local   # REACT_APP_API_URL=http://localhost:8787
npm install
npm start                    # http://localhost:3000
```

## Deployment

1. **Cloudflare account**: sign up free at https://dash.cloudflare.com/sign-up — no card required
   for the Workers free plan.
2. **D1 database**: create a database named `mohi-portfolio` (Cloudflare dashboard → Workers &
   Pages → D1), copy its database ID into `server/wrangler.toml`, then run the schema against it:
   `npx wrangler d1 execute mohi-portfolio --remote --file=./schema.sql`.
3. **Worker**: create a Worker from this repo (root directory `server`) via the Cloudflare
   dashboard's "Import a repository" flow, or deploy directly with `npx wrangler deploy` from
   `server/`. Set the environment variables listed in `server/.dev.vars` as Worker secrets/vars in
   the dashboard (`ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_JWT_SECRET`, `SYNC_SECRET`,
   `GITHUB_TOKEN`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CORS_ORIGIN`).
4. **cron-job.org** (or similar free cron pinger): schedule a daily `POST` to
   `https://<your-worker>.workers.dev/api/sync/github` with header `x-cron-secret: <SYNC_SECRET>`
   to keep projects in sync (Workers' free plan has no built-in cron trigger without upgrading).
5. **GitHub Actions**: add a repo secret `REACT_APP_API_URL` set to your Worker's URL — the
   existing `pages.yml` workflow passes it into the CRA build.
6. **First-run seed**: `npx wrangler d1 execute mohi-portfolio --remote --file=./seed.sql` once to
   create the manual Coronary Artery Segmentation project entry (no public GitHub repo exists for
   it). Then log into `/admin/login` and add the Network Neuroscience manuscript as a Publication —
   nothing seeds that automatically.
