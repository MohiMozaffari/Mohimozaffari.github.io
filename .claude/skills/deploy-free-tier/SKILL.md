---
name: deploy-free-tier
description: >
  Deploy or debug the mohimozaffari.github.io site's split hosting setup — static
  frontend on GitHub Pages plus a separately hosted backend/database on a free
  tier (Render/Railway/Fly.io + MongoDB Atlas or Supabase). Use this whenever the
  user wants to deploy the site, is debugging a broken deploy, asks about env vars,
  CORS errors between the frontend and backend, or free-tier service limits/spin-down
  behavior (e.g. "why is my API slow to respond after being idle").
---

# Deploy checklist — free-tier split hosting

This project intentionally splits hosting because GitHub Pages only serves static files and can't
run a backend: the React/Next.js frontend deploys to GitHub Pages as before, while the Node/Express
(or Next.js API routes) backend and database live on separate free-tier services. Keep this
architecture in mind — don't "simplify" by trying to force the backend onto GitHub Pages, and don't
suggest paid tiers as the default fix for a free-tier limitation.

## Before deploying, confirm

- Frontend build still targets static export/GitHub Pages output (`gh-pages` branch or `docs/`
  folder, whichever this repo uses).
- Backend `.env` / hosting-provider env vars are set for: database connection string, GitHub API
  token (if used for higher rate limits on the project sync job), transactional email API key
  (contact form), and the admin login secret.
- CORS is configured on the backend to allow requests from `https://mohimozaffari.github.io`.
- The scheduled GitHub project sync job is registered on whichever free host runs it (cron endpoint,
  hosting provider's scheduled job feature, or an external free cron pinger if the platform doesn't
  support cron on its free tier).

## Known free-tier quirks to expect (not bugs)

- Render/Railway/Fly.io free-tier services often spin down when idle and take a few seconds to wake
  on the first request after inactivity — a slow first contact-form submission or first admin login
  after a while is expected behavior, not a broken deploy.
- Free database tiers (MongoDB Atlas M0, Supabase free project) have storage and connection-count
  caps — fine for this site's scale (personal portfolio traffic), but worth checking usage
  occasionally rather than assuming infinite headroom.
- If email delivery (contact form notifications) silently fails, check the free email service's
  sending-domain verification requirements first — that's the most common free-tier gotcha, not a
  code bug.

## Debugging a broken deploy

Check in this order: (1) frontend build succeeded and published to the Pages branch, (2) backend
service is actually running (not just deployed — free tiers sometimes fail silently on crash-loop),
(3) env vars are present on the backend host, (4) CORS headers, (5) database connection string and
IP allowlist (Atlas/Supabase both require allowlisting the backend host's outbound IP or "allow from
anywhere" for platforms with dynamic IPs).
