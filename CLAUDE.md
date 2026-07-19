# CLAUDE.md — mohimozaffari.github.io

This file gives Claude Code standing context for this repo. Read it before making changes. For
the active redesign initiative, also read `PROMPT.md` — it's the one-time brief for the current
overhaul; this file is the permanent constitution that survives past it.

## What this project is

Mohaddeseh "Mohi" Mozaffari's personal academic/portfolio site, live at
`https://mohimozaffari.github.io`. Its single most important job is making her look like a
PhD-ready AI/computational-neuroscience researcher to admissions committees and professors she
cold-emails (target: Canada, MILA). Every design and content decision should be judged against
that goal first — not general portfolio polish, not "what's technically impressive to build."

A related repo (CV/cover-letter generation kit, sibling directory) is the source of truth for
verified facts, education details, and publication status. When writing or checking website copy,
prefer pulling from that repo's `config.md` and `cv_builder/` over re-deriving facts from memory.

## Architecture

- **Frontend:** React (CRA + Craco), deployed as a static site to GitHub Pages. Visual identity is
  an established **purple/pink gradient theme** — keep it as the brand anchor. Ongoing redesign
  work (see `PROMPT.md`) is about *execution restraint and hierarchy*, not a new color scheme:
  fewer simultaneous animations, more typographic hierarchy and whitespace, less generic
  "AI-portfolio-template" look. Don't swap the color identity without explicit sign-off.
- **Backend:** a Hono app running on Cloudflare Workers (`server/`), free tier, no credit card
  required. GitHub Pages can't run a backend, so this is intentionally split — don't try to
  collapse it back into a purely static site. (Render and Vercel were tried first and ruled out —
  Render requires a card even on free tier, Vercel blocked signup for this user's region.)
- **Database:** Cloudflare D1 (SQLite), not MongoDB — Workers can't make a raw driver connection to
  MongoDB Atlas (no `net`/`tls` socket support even with `nodejs_compat`), so this project uses
  Cloudflare's native D1 instead. Stores projects (synced from GitHub, plus curation
  flags/overrides), publications, blog posts, site-settings copy, contact messages, and page-view
  counts.
- **Content is database-backed, not hardcoded.** Projects, bio text, and blog posts should be
  editable through the admin dashboard (`src/pages/admin`) without touching React code or
  redeploying. If you find yourself about to hardcode a project or a piece of copy into a
  component, stop — see the `sync-github-projects` skill, or add a new site-settings key instead.

## Content priority order (top of page to bottom, and in visual weight)

1. **Research & Publications** — the lead section. Should read as a narrative (a short research
   statement first, then publications), not a bare card list. Highest visual prominence on the
   site.
2. **Projects** — GitHub-synced; research/ML work featured over teaching/games. A project card
   should never out-rank a publication in visual weight.
3. **Teaching** — secondary/supplementary, anonymized (see rules below). Should read as
   "additional experience," not as a peer section to Research in either nav weight or page real
   estate.
4. **Contact**

CV download should be reachable from essentially anywhere (nav and/or hero) — treat it as
persistent chrome, not a page-specific element.

## Non-negotiable content rules

- **Public contact email:** `mohaddeseh.mozaffarii@gmail.com` — never the personal email
  `mohaddeseh.lotus@gmail.com`.
- **No "ADHD Brain Network Analysis" project, ever, anywhere.** This was never actually completed
  and must never be presented as her research, in any section, on any page, even if a stray
  repo/branch with that name exists.
- **Teaching section is anonymized, no exceptions:** no student names/initials, no schedules, no
  private platform or Drive links, no raw session notes — only distilled topic/category framing
  (e.g. "Python Fundamentals," "GUI Development," "Advanced / Deep Learning track"). Any
  per-course "supervisor" or attribution field must contain a real, sign-off'd name or not exist
  at all — never ship bracketed placeholder text (e.g. `[Add supervising professor name]`) to
  production.
- **Don't overstate publication status.** The Network Neuroscience manuscript is submitted/under
  review, not published — phrase accordingly everywhere it's mentioned. Never upgrade "co-authored"
  to "authored," or "contributed to" to "led," beyond what the CV repo's provenance tags say.
- **No skill claims as fabricated numbers.** Don't represent expertise as percentage bars or
  invented scores — describe methods/tools/experience in prose or plain lists instead.
- **No personal/health/relationship content** anywhere on the public site, including blog posts,
  unless Mohi has explicitly opted in for that specific piece of content.
- **Don't resurface anything the CV repo's exclusion list has ruled out**: quantum computing
  certs, the head-CT text-mining project, and Anthropic product certifications are deliberately
  excluded from her CV and should stay off the site too.

## Key facts (for accurate copy — verify against the CV repo's `config.md` if this file is old)

- Flagship projects: NeuroPHorm (`MohiMozaffari/NeuroPHorm`, Zenodo DOI
  `10.5281/zenodo.17542598`), Context-Aware Sarcasm Detection (DeBERTa + LoRA + FAISS), Coronary
  Artery Segmentation (arXiv: `https://arxiv.org/abs/2601.17429`).
- MSc thesis: "Analysis of Topological Features of Brain Networks in Autism Spectrum Disorder
  Using Persistent Homology," Shahid Beheshti University, graded Outstanding, defended
  2025-03-11, advised by Prof. G. Reza Jafari. Ranked 2nd in cohort.
- BSc Physics, Shahid Beheshti University, 2018–2022, ranked 1st in cohort.
- TA experience spans five courses (Analytical Mechanics, Complex Systems Physics ×2, Foundations
  of Numerical Simulations, Stochastic Processes, Complex Networks and Graph Theory) — frame by
  semester/course, not a fabricated exact start month.
- GitHub: `https://github.com/MohiMozaffari`. LinkedIn: `https://www.linkedin.com/in/mohimozaffari/`.
- CV PDF lives in the sibling CV repo at `CV/CV.pdf` — this is what the site's "Download CV"
  action should link to (copy or fetch it in as part of the redesign; keep it in sync manually
  when the CV repo's CV is regenerated).

## Skills available in this repo

See `.claude/skills/`:

- **sync-github-projects** — how the Projects section stays in sync with GitHub, and how
  featured/hidden/override curation works. Use instead of hand-editing project data.
- **content-safety-check** — the non-negotiable rules above, operationalized. Run before
  publishing any content change.
- **add-blog-post** — how to draft and structure a new research-notes/blog entry.
- **deploy-free-tier** — the split-hosting deploy checklist and common free-tier gotchas
  (spin-down delays, CORS, env vars, DB allowlists).

## Active initiative: full redesign

A full visual and content redesign is in progress — see `PROMPT.md` for the current brief,
priority task list, and rationale. Key theme: fix missing PhD-critical content (CV download,
photo, research statement, real TA attribution) before or alongside any visual changes; then make
the visual execution quieter and more hierarchical rather than louder or more animated. Once the
redesign in `PROMPT.md` is fully implemented and stable, fold any durable lessons back into this
file and archive or delete `PROMPT.md`.

## When in doubt

If a change would affect what's publicly visible (new copy, a new project, a blog post, an email
address, teaching content, a claimed skill or achievement), run the `content-safety-check` skill
first. If it's ambiguous whether something should be featured, hidden, or needs Mohi's judgment
call, ask rather than guessing.
