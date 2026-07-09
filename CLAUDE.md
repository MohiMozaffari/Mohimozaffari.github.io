# CLAUDE.md — mohimozaffari.github.io

This file gives Claude Code standing context for this repo. Read it before making changes.

## What this project is

Mohaddeseh "Mohi" Mozaffari's personal academic/portfolio site, live at
`https://mohimozaffari.github.io`. Its single most important job is making her look like a
PhD-ready AI/computational-neuroscience researcher to admissions committees and professors she
cold-emails (target: Canada, MILA). Every design and content decision should be judged against that
goal first — not general portfolio polish, not "what's technically impressive to build."

## Architecture

- **Frontend:** React (or Next.js static export), deployed as a static site to GitHub Pages. Visual
  identity is an established **purple theme** — preserve it. Changes here should be refinement
  (typography, spacing, hierarchy, consistency), not a redesign of the color scheme or aesthetic,
  unless explicitly asked for.
- **Backend:** a Hono app running on Cloudflare Workers (`server/`), free tier, no credit card
  required. GitHub Pages can't run a backend, so this is intentionally split — don't try to
  collapse it back into a purely static site. (Render and Vercel were tried first and ruled out —
  Render requires a card even on free tier, Vercel blocked signup for this user's region.)
- **Database:** Cloudflare D1 (SQLite), not MongoDB — Workers can't make a raw driver connection to
  MongoDB Atlas (no `net`/`tls` socket support even with `nodejs_compat`), so this project uses
  Cloudflare's native D1 instead. Stores projects (synced from GitHub, plus curation
  flags/overrides), publications, blog posts, contact messages, and page-view counts.
- **Content is database-backed, not hardcoded.** Projects, bio text, and blog posts should be
  editable through an admin view without touching React code or redeploying. If you find yourself
  about to hardcode a project into a component, stop — see the `sync-github-projects` skill.

## Content priority order (top of page to bottom)

1. Research & Publications
2. Projects (GitHub-synced, research/ML featured over teaching/games)
3. Teaching (secondary, anonymized — see rules below)
4. Contact

## Non-negotiable content rules

- **Public contact email:** `mohaddeseh.mozaffarii@gmail.com` — never the personal email
  `mohaddeseh.lotus@gmail.com`.
- **No "ADHD Brain Network Analysis" project, ever, anywhere.** This was never actually completed
  and must never be presented as her research, in any section, on any page, even if a stray
  repo/branch with that name exists.
- **Teaching section is anonymized, no exceptions:** no student names/initials, no schedules, no
  private platform or Drive links, no raw session notes — only distilled topic/category framing
  (e.g. "Python Fundamentals," "GUI Development," "Advanced / Deep Learning track").
- **Don't overstate publication status.** The Network Neuroscience manuscript is submitted/under
  review, not published — phrase accordingly everywhere it's mentioned.
- **No personal/health/relationship content** anywhere on the public site, including blog posts.

## Key facts (for accurate copy — verify before using if this file is old)

- Flagship projects: NeuroPHorm (`MohiMozaffari/NeuroPHorm`, Zenodo DOI
  `10.5281/zenodo.17542598`), Context-Aware Sarcasm Detection (DeBERTa + LoRA + FAISS), Coronary
  Artery Segmentation (arXiv: `https://arxiv.org/abs/2601.17429`).
- MSc thesis: "Analysis of Topological Features of Brain Networks in Autism Spectrum Disorder Using
  Persistent Homology," Shahid Beheshti University, graded Outstanding, defended 2025-03-11.
  Education: BSc Physics (2018–2022, ranked 1st), MSc Statistical Physics & Complex Systems
  (2022–2025, ranked 2nd), both Shahid Beheshti University.
- GitHub: `https://github.com/MohiMozaffari`. LinkedIn: `https://www.linkedin.com/in/mohimozaffari/`.

## Skills available in this repo

See `.claude/skills/` (or wherever these were placed):

- **sync-github-projects** — how the Projects section stays in sync with GitHub, and how
  featured/hidden/override curation works. Use instead of hand-editing project data.
- **content-safety-check** — the checklist above, operationalized. Run before publishing any
  content change.
- **add-blog-post** — how to draft and structure a new research-notes/blog entry.
- **deploy-free-tier** — the split-hosting deploy checklist and common free-tier gotchas
  (spin-down delays, CORS, env vars, DB allowlists).

## When in doubt

If a change would affect what's publicly visible (new copy, a new project, a blog post, an email
address, teaching content), run the `content-safety-check` skill first. If it's ambiguous whether
something should be featured, hidden, or needs Mohi's judgment call, ask rather than guessing.
