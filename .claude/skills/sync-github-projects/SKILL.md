---
name: sync-github-projects
description: >
  Keep the Projects section of mohimozaffari.github.io in sync with GitHub without
  hand-editing project data. Use this whenever the user asks to add a repo to the
  site, refresh project data, feature or hide a project, fix stale project info,
  or asks why a new GitHub repo isn't showing up on the site. Always use this
  instead of manually writing project entries into React components or data files —
  the site's project list is meant to be auto-synced from GitHub and only curated
  through featured/hidden flags and overrides, never retyped by hand.
---

# Sync GitHub projects

This site pulls project data from the GitHub API (`https://api.github.com/users/MohiMozaffari/repos`)
on a schedule (or via an admin "Refresh from GitHub" action), caches it in the database, and lets
Mohi curate the result — it does not store a hand-written project list. If you find yourself about
to type a new project object into a React component or a `projects.js`-style file, stop: that's the
old architecture this project moved away from. Find the sync job / project model instead.

## What "sync" means here

For each repo, GitHub is the source of truth for: name, description, topics/tags, primary language,
stars, and last-updated date. The database stores that plus curation fields Mohi controls:

- `featured` (boolean) — pins a project to the top-priority section.
- `hidden` (boolean) — keeps a real repo (e.g. an arcade game or a scratch project) out of the
  public site without deleting it from GitHub.
- `overrides` (object) — fields GitHub can't know: an arXiv link, a Zenodo DOI, publication status,
  a longer curated description, etc. These merge on top of the GitHub data; they never get
  overwritten by the next sync.

## Priority order (this matters more than recency or stars)

This site exists to make Mohi look like a PhD-ready AI/neuroscience researcher, not a general
portfolio. When deciding what should be featured vs. hidden, research/ML work always outranks
teaching or game projects, regardless of star count or how recently something was pushed:

1. NeuroPHorm (flagship TDA package, Zenodo DOI `10.5281/zenodo.17542598`) — always featured.
2. Context-Aware Sarcasm Detection (DeBERTa + LoRA + FAISS) — always featured.
3. Coronary Artery Segmentation / XCA (arXiv preprint) — always featured.
4. Polished complex-systems simulations (Sandpile, Voter model, Ising, etc.) — visible, not featured.
5. Python teaching materials — visible, secondary section.
6. Arcade/game repos (e.g. War-Spaceship-Game, Catch-fruits) — hidden by default, not deleted.

If a brand-new repo appears via sync and its category is unclear, ask Mohi rather than guessing
whether it should be featured — but apply the ordering above automatically for repos that clearly
match one of these categories.

## Hard rule: no ADHD project, ever

Never create, restore, or surface any project describing "ADHD Brain Network Analysis" or similar —
this was never actually completed and must never appear on the public site or in synced data, even
if a stray repo or branch with that name exists. If sync ever pulls in something like this, hide it
and flag it to Mohi rather than displaying it.

## When asked to "add" a project manually

If Mohi (or a task) asks to add a specific project to the site, check whether it already exists as a
GitHub repo first:
- If yes: trigger a sync (or wait for the next scheduled one) and then set `featured`/`overrides` —
  don't write a parallel manual entry.
- If no (e.g. it's not on GitHub yet, or it's an arXiv-only preprint): store it as an override
  attached to the closest related repo, or as a manual-only entry in the same projects table with
  a flag marking it as non-GitHub-sourced — but keep it in the same data model, not a separate file.
