---
name: content-safety-check
description: >
  Run a privacy/safety pass before publishing or committing any content change to
  mohimozaffari.github.io — new bio text, teaching section copy, blog posts, project
  descriptions, admin-entered content, or anything pulled in from GitHub READMEs.
  Always use this before a deploy or commit that changes visible site content, and
  whenever the user asks "is this ready to publish," "can I post this," or asks you
  to write teaching/student-related content, bio text, or contact info for the site.
---

# Content safety check for the public website

This site is public and read by PhD admissions committees and professors, so mistakes here are
higher-stakes than a typical portfolio site. Before any content ships (a git commit that changes
rendered copy, or an admin-panel save that would go live), check it against this list. If something
fails, stop and flag it rather than publishing and fixing it after the fact.

## Checklist

**Contact info**
- Public contact email must be `mohaddeseh.mozaffarii@gmail.com` (the academic email), never
  `mohaddeseh.lotus@gmail.com` (personal email). If a change introduces the personal email anywhere
  visible, flag it.

**Teaching section**
- No student names, initials, or identifying details of any kind.
- No class schedules, platform links (Skyroom, Ostadbank internal links), or private Drive links.
- No screenshots that contain names.
- No raw session notes — teaching content should only ever be the distilled topic/category framing
  (e.g. "Python Fundamentals," "GUI Development," "Advanced / Deep Learning track"), never verbatim
  notes from actual sessions.

**Research/project claims**
- Don't overstate publication status. The Network Neuroscience manuscript is *submitted, under
  review* — it is not published or accepted. Phrase accordingly ("under review," not "published in").
- Don't restore or reference an "ADHD Brain Network Analysis" project anywhere — it was never
  actually done and must never be presented as her research (see also `sync-github-projects` skill).

**General**
- No health, medication, relationship, weight, or diary-style personal content anywhere on the
  public site, including in blog posts.
- No private Google Drive links, internal scheduling tools, or non-public contact channels.

## What to do on a failure

Don't silently "fix" high-judgment issues like rewriting a bio or softening a publication claim —
point out the specific line and why it fails the checklist, and let Mohi confirm the correction.
Purely mechanical fixes (e.g. swapping the wrong email for the right one) can be applied directly.
