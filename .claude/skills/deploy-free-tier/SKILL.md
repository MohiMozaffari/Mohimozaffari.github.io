---
name: deploy-free-tier
description: >
  Deploy or debug the mohimozaffari.github.io site's split hosting setup — static
  frontend on GitHub Pages plus a Cloudflare Workers backend + D1 database. Use this
  whenever the user wants to deploy the site, is debugging a broken deploy, asks about
  env vars, CORS errors between the frontend and backend, or Cloudflare Workers free-tier
  limits.
---

# Deploy checklist — free-tier split hosting

This project intentionally splits hosting because GitHub Pages only serves static files and can't
run a backend: the React/Next.js frontend deploys to GitHub Pages as before, while the backend
lives on Cloudflare Workers (`server/`) with a Cloudflare D1 (SQLite) database. Keep this
architecture in mind — don't "simplify" by trying to force the backend onto GitHub Pages.

## Why Cloudflare specifically (not Render/Vercel/Railway/Fly.io)

This was chosen after two failed attempts: Render started requiring a credit card even on its free
tier, and Vercel blocked signup/deploy for this user's region (sanctions-related restriction common
to many US-based PaaS platforms). Cloudflare Workers' free plan needs neither a card nor triggers
the same regional block. The tradeoff: Workers run in a V8 isolate runtime, not full Node.js, so it
can't make a raw TCP connection to MongoDB (the driver needs `net`/`tls`, which Workers doesn't
support even with `nodejs_compat`) — this is why the database is Cloudflare D1, not MongoDB Atlas,
even though MongoDB Atlas is still used for nothing in production now. Don't suggest switching back
to MongoDB/Mongoose without confirming Workers has actually gained real TCP driver support by then.

## Before deploying, confirm

- Frontend build still targets static export/GitHub Pages output (the existing GitHub Actions
  workflow at `.github/workflows/pages.yml` handles this, not the `gh-pages` npm package).
- `server/wrangler.toml` has the real D1 `database_id` filled in (not the
  `REPLACE_WITH_YOUR_D1_DATABASE_ID` placeholder).
- Worker environment variables/secrets are set in the Cloudflare dashboard (not just locally in
  `server/.dev.vars`): `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_JWT_SECRET`, `SYNC_SECRET`,
  `GITHUB_TOKEN` (optional), `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CORS_ORIGIN`.
- `CORS_ORIGIN` includes `https://mohimozaffari.github.io` (and `http://localhost:3000` if local
  dev against the deployed Worker is expected).
- The scheduled GitHub project sync job is registered via an external free cron pinger
  (cron-job.org or similar) hitting `POST https://<worker>.workers.dev/api/sync/github` with header
  `x-cron-secret: <SYNC_SECRET>` — Workers' free plan doesn't include Cron Triggers without the
  paid plan.
- `REACT_APP_API_URL` is set as a GitHub Actions repo secret pointing at the deployed Worker URL,
  since CRA embeds `REACT_APP_*` vars at build time.

## Known free-tier quirks to expect (not bugs)

- Cloudflare Workers free plan: 100,000 requests/day, no card required — fine for this site's
  scale.
- D1 free tier: 5GB storage, generous read/write limits — won't be an issue for this site's data
  volume (projects, publications, blog posts, contact messages, page views).
- If email delivery (contact form notifications) silently fails, check the Resend API key and that
  the sandbox sender (`onboarding@resend.dev`) is still being used correctly — that's the most
  common gotcha, not a code bug.
- Rate limiting on login/contact/pageview endpoints is a best-effort in-memory counter per Worker
  isolate, not a globally accurate limiter (Workers isolates are ephemeral and distributed) — this
  is an intentional simplicity tradeoff, not a bug to "fix" with a heavier solution unless abuse
  actually becomes a problem.

## Debugging a broken deploy

Check in this order: (1) frontend build succeeded and published to the Pages branch, (2) the
Worker is actually deployed and not erroring on every request (check the Cloudflare dashboard's
Worker logs), (3) env vars/secrets are present in the Cloudflare dashboard for the Worker, (4) CORS
headers (`CORS_ORIGIN` must exactly match the calling origin, including protocol), (5) the D1
`database_id` in `wrangler.toml` matches a real database and the schema has been applied to it
(`npx wrangler d1 execute mohi-portfolio --remote --file=./schema.sql`).
