---
name: add-blog-post
description: >
  Draft and publish a new research-notes/blog post on mohimozaffari.github.io. Use
  this whenever the user wants to write about their research progress, a paper, a
  conference, PhD application milestones, or anything meant for the site's blog —
  including when they just paste rough notes and say "turn this into a post" or
  "write something about X for my site."
---

# Add a blog post

The blog exists to give PhD admissions committees and professors a live signal that Mohi is an
active, communicating researcher — not just a static CV. Every post should read that way: substantive,
first-person, and specific, not generic "here's what I did this week" filler.

## Before writing

1. Run the `content-safety-check` skill's checklist against the draft before it goes live — blog
   posts are exactly the kind of content that checklist is meant to catch (oversold publication
   claims, personal details slipping in, etc.).
2. Confirm the post's factual claims against current status rather than assuming — e.g. don't say
   a manuscript is "published" if it's still under review.

## Structure

Use the backend's post schema: title, date, body (markdown or rich text depending on what the CMS
stores), and tags. Good tag categories: `research`, `phd-applications`, `neuroscience`, `ml`,
`open-source`, `conference`.

A good post typically:
- Opens with the concrete thing that happened (a result, a submission, a new tool release) rather
  than a throat-clearing intro.
- Explains why it matters in plain language before diving into technical detail — admissions readers
  skim.
- Links out to the relevant repo, paper, or DOI when one exists.
- Ends with what's next, if there's a natural next step worth mentioning.

## Publishing

Save the post through the admin API/CMS (not by hand-editing a static file — this site's content is
database-backed, consistent with how projects are handled). Confirm with Mohi before publishing
anything that makes a claim about publication/review status she hasn't explicitly confirmed as
current.
