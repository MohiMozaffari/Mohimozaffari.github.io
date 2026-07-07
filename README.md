# mohimozaffari.github.io

Mohaddeseh "Mohi" Mozaffari's personal academic/portfolio site: a static React frontend on GitHub
Pages, backed by a separately hosted Node/Express API + MongoDB database for projects,
publications, blog posts, contact messages, and page-view analytics.

## Architecture

- **Frontend** (`src/`): Create React App + craco + Tailwind, deployed to GitHub Pages via
  `.github/workflows/pages.yml` on every push to `main`.
- **Backend** (`server/`): Node/Express + Mongoose, deployed separately (e.g. Render free tier).
  See `server/.env.example` for required environment variables.
- **Database**: MongoDB Atlas (free M0 cluster).

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
cp .env.example .env   # fill in MONGODB_URI, ADMIN_*, etc.
npm install
npm run dev             # http://localhost:5000

# Frontend (in a separate terminal, from repo root)
cp .env.example .env.local   # REACT_APP_API_URL=http://localhost:5000
npm install
npm start                    # http://localhost:3000
```

## Deployment

1. **MongoDB Atlas**: create a free M0 cluster, a database user, and allow network access from
   anywhere (Render's free tier has a dynamic outbound IP). Copy the connection string.
2. **Render**: create a Web Service pointed at this repo with root directory `server`, build
   command `npm install`, start command `node src/index.js`. Set the env vars listed in
   `server/.env.example` (`MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`,
   `ADMIN_JWT_SECRET`, `SYNC_SECRET`, `GITHUB_TOKEN`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   `CORS_ORIGIN=https://mohimozaffari.github.io`).
3. **cron-job.org** (or similar free cron pinger): schedule a daily `POST` to
   `https://<your-render-service>.onrender.com/api/sync/github` with header
   `x-cron-secret: <SYNC_SECRET>` to keep projects in sync (Render's free tier has no built-in cron).
4. **GitHub Actions**: add a repo secret `REACT_APP_API_URL` set to your Render service's URL —
   the existing `pages.yml` workflow passes it into the CRA build.
5. **First-run seed**: from `server/`, run `npm run seed` once to create the manual Coronary
   Artery Segmentation project entry (no public GitHub repo exists for it). Then log into
   `/admin/login` and add the Network Neuroscience manuscript as a Publication — nothing seeds
   that automatically.

See the `deploy-free-tier` Claude Code skill (`.claude/skills/deploy-free-tier/`) for common
free-tier gotchas (spin-down delays, CORS, IP allowlisting).
