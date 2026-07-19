# PROMPT.md — Frontend Redesign Brief (v2) for mohimozaffari.github.io

Give this file to a coding agent (Claude Code) as the source of truth for the current redesign.
It assumes the agent has **also read `CLAUDE.md`** in this repo for standing rules. `CLAUDE.md` is
the permanent constitution; this file is the one-time brief for *this* redesign pass. When this
redesign is shipped and stable, fold durable lessons back into `CLAUDE.md` and archive this file.

---

## The goal, in one sentence

The site is functionally solid but looks like a generic "AI-portfolio template": one flat purple
gradient, the same glassy `purple-900/30` card repeated on every section, framer-motion stagger on
every page, and a particle background. **Rebuild the frontend so it reads in ten seconds as a
modern, confident PhD-track computational-neuroscience researcher's site** — while keeping a clean,
clearly subordinate teaching section that lets prospective students reach out and book a call.

## What has already been fixed (do NOT re-do these)

The v1 brief's "missing content" tasks are done. The following already exist and are correct —
carry them forward, don't treat them as gaps:

- **CV download** works (`public/CV.pdf`, linked in nav + hero).
- **Headshots** exist (`public/headshot-hero.jpg`, `public/headshot-avatar.jpg`).
- **Research statement** exists (`research_statement` in `useSiteSettings.js` defaults / DB).
- **TA supervisors** are real names now (`Teaching.js` `taExperience`) — not placeholders.
- **Skill percentage bars** are already gone (About uses plain grouped lists).
- **OG / Twitter meta tags** already present in `public/index.html`.

So this pass is **design + information-architecture**, not content-gathering.

## Decisions already made with Mohi (locked — do not re-litigate)

1. **Visual direction:** keep the **dark theme with purple**, but make it *modern* — not the flat
   single-gradient template it is now. This is the explicit sign-off `CLAUDE.md` requires to evolve
   the purple identity. Purple stays the brand; the *execution* changes.
2. **Teaching contact:** keep the existing contact form + Email / LinkedIn / Telegram cards, **and
   add a "Book a session" scheduling link** (Cal.com or Calendly — see Part D). Store the booking
   URL as a site-setting (`booking_url`), not hardcoded.
3. **Scope:** **rebuild the React frontend structure** (new design system, layout, and components)
   but **keep the backend untouched** — Hono / Cloudflare Workers / D1, the content API, and the
   admin dashboard all stay. Content must remain DB-backed through the existing settings/API
   pattern; do not hardcode anything the admin dashboard manages.

## Source of truth for content

Pull real facts/copy from the sibling CV knowledge-base repo (`Application_Documents` / CV repo),
never invent them: `config.md` (verified identity, education, references), `cv_builder/**` (
provenance-tagged bullets — carry published vs. under-review vs. preprint status exactly, never
upgrade it), `CV/CV.pdf`, and `cv_builder/CV_STYLE_GUIDE.md` (academic tone). Existing site copy in
`src/hooks/useSiteSettings.js` defaults and the D1 `site_settings` table is already vetted — reuse
it; don't rewrite prose unless a section genuinely needs new copy.

Respect every non-negotiable rule in `CLAUDE.md`: public email `mohaddeseh.mozaffarii@gmail.com`
only; no ADHD project ever; teaching stays anonymized; don't overstate publication status; no
fabricated skill numbers; no personal/health content; don't resurface excluded items (quantum
certs, head-CT text-mining, Anthropic certs).

---

## Part A — Design system (build this FIRST, before touching pages)

Everything generic about the site traces back to having **no design system** — `tailwind.config.js`
is empty (`extend: {}`), there are no custom fonts, and one purple is used flatly everywhere. Fix
the foundation before the pages.

**A1. Lock a theme with the `theme-factory` skill.** Use `theme-factory` to define/confirm the dark
purple palette and, critically, a **font pairing** (a display/serif or distinctive geometric face
for headings + a clean sans for body — the current default-sans-everywhere is a big part of the
"template" feel). Generate a custom theme (a "Midnight / deep-purple academic" variant) rather than
forcing a preset. Output: a concrete token set (hex values + font names) that becomes the Tailwind
theme. Load fonts via `@fontsource` or a `<link>` in `index.html`.

**A2. Encode tokens in `tailwind.config.js`.** Replace the empty `extend` with a real system:
- A layered purple scale plus **at least two non-purple neutrals** (a near-black surface and a warm
  off-white/violet-tinted text color) so not every element is purple-on-purple.
- Named surface tokens (e.g. `surface`, `surface-raised`, `border-subtle`) and one accent for
  status/links — so "card" isn't always literally `bg-purple-900/30`.
- Typography scale + the two font families from A1 (`font-display`, `font-sans`).
- A restrained shadow/radius scale (fewer `rounded-full`, more intentional `rounded-xl`/`2xl`).

**A3. Build a small primitive component set** the pages compose from, so the redesign is consistent
and not re-styled ad hoc: `Section` (alternating backgrounds + vertical rhythm), `Card`, `Button`
(primary/secondary/ghost — kill the everywhere-gradient-pill), `Badge` (publication status),
`PageHeader`, `Prose`. Put them in `src/components/ui/`.

**A4. Motion policy.** Replace blanket framer-motion stagger with **one restrained pattern**: a
single subtle entrance per page (or a shared `<Reveal>` wrapper with a small, consistent fade/rise),
and respect `prefers-reduced-motion`. No per-card stagger on every section.

**A5. Background.** Remove `react-particles` + `tsparticles-slim` from first paint (heavy for a
static site). Replace with a **lightweight, on-brand static/CSS motif** — a subtle network/graph or
topology motif (ties to her actual field: network science / persistent homology), rendered as SVG
or a CSS gradient mesh, not a JS particle engine. Verify it's gone from the bundle afterward.

### Prototype before you build (uses `web-artifacts-builder`)

Before committing the new look to React, use the **`web-artifacts-builder`** skill to produce
**high-fidelity static HTML/Tailwind mockups** of the three highest-stakes screens — **(1) the hero,
(2) the Research/Publications page, (3) the Teaching page** — using the A1–A2 tokens. Show these to
Mohi for a yes/no on direction *before* porting them into React. This avoids rebuilding the whole
app around a look she hasn't approved. Keep the mockups in a `/design/` scratch folder; they are not
shipped.

---

## Part B — Information architecture / hierarchy

**B1. Navigation.** The current 7-item flat nav (Home, Research, Projects, About, Teaching, Blog,
Contact) gives Teaching equal billing with Research. Re-weight so **Research reads as the lead**:
order Research → Projects → About → Teaching → Blog → Contact after Home, and visually subordinate
Teaching (e.g. group it under an "Also" divider, or a lighter treatment). Keep the persistent CV
button. Make the nav feel like an academic site, not a SaaS landing page.

**B2. Kill Home/About duplication.** Home currently repeats an "About Me" block and a 4-card grid
that overlaps About. **Home should tease; About is the only place with the full journey/skills
narrative.** Home = hero + one-line positioning + featured publications + featured projects + a
short teaching/contact CTA. Remove the redundant grid.

**B3. Publications must out-rank projects visually.** Publications are the single highest-signal
content — they must *look* more important than project cards, never equal. On the Research page make
publications the visual centerpiece (a real timeline or editorial list with prominent status
badges), distinct from the generic project card grid. A project card must never out-weigh a
publication.

**B4. Teaching, subordinate but functional.** Keep it anonymized and topic-based (current
`courses.js` structure is fine). It should read as "additional experience + I tutor" — not a peer
section to Research. This is where the **booking CTA** lives most prominently.

**B5. Home hero.** One clear identity line + subtitle (reuse `home_hero_line1/2`), the headshot, and
primary actions (View research / Download CV / Book a call). Make it feel composed and typographic,
not a gradient wall with three pill buttons.

---

## Part C — Page-by-page rebuild

Rebuild each public page on the new primitives (Part A) and hierarchy (Part B). Keep every data
fetch and API call exactly as-is (`src/api/*`, `useSiteSettings`) — only presentation changes.

- **Home** — B2/B5. Hero, featured publications strip, featured projects, teaching+contact CTA.
- **Research** — B3. Research statement → publications timeline → education. Lead section of the site.
- **Projects** — new card design from A3; keep GitHub sync, filters, featured-first sort.
- **About** — full journey + grouped skills + experience + education + approach, on new primitives.
- **Teaching** — B4 + booking CTA; keep anonymized course selector and TA experience.
- **Contact** — form + Email/LinkedIn/Telegram cards + booking link; keep `sendContactMessage`.
- **Blog / BlogPost / ProjectDetail** — restyle to match; no structural change needed.
- **Admin** (`src/pages/admin/**`) — leave functional; only light token alignment if trivial.

---

## Part D — Backend touch (minimal, allowed)

The only sanctioned backend change: add a **`booking_url`** key to the `site_settings` defaults
(server `settings` route + `useSiteSettings.js` DEFAULTS) and surface it in the admin ContentTab so
Mohi can edit it. No other API/schema/architecture changes — do not touch Hono/Workers/D1 wiring.

---

## Which model to use for which task

Use **Opus** where a wrong call is costly (taste, hierarchy, content-accuracy, anything touching
`CLAUDE.md`'s non-negotiables) and **Sonnet** for well-specified mechanical execution.

**Use Opus for:**
- **A1 theme + A2 token system + A3 primitive design** — the core taste calls. Getting the palette,
  font pairing, and "what a card looks like" right is the whole redesign; a mediocre system makes
  every page mediocre.
- **A5 background motif** decision (what replaces particles) and **A4 motion policy** — taste calls;
  wrong choices reproduce the template look.
- **The `web-artifacts-builder` mockups** of hero / Research / Teaching — this is where the look is
  actually decided.
- **B1–B5 information architecture** — re-weighting Research vs. Teaching, publication-vs-project
  hierarchy, killing duplication. Judgment, not mechanics.
- **Any new/edited copy** (hero line, any research/teaching microcopy) — highest-stakes prose; must
  stay within CV-verified facts and `CLAUDE.md` rules.
- **Final full-site review** against `content-safety-check` and this brief before shipping.

**Use Sonnet for:**
- **A2 → Tailwind config wiring** once Opus has picked the tokens (turning chosen hexes/fonts into
  `tailwind.config.js` is mechanical).
- **Part C page ports** once the primitives and mockups are approved — applying a decided design to
  each page is execution, not decision.
- **Removing `react-particles`/`tsparticles-slim`** from deps and imports; verifying the bundle.
- **Part D — adding the `booking_url` setting** end to end once the field name/behavior is specified.
- **Blog/ProjectDetail/admin restyle** — routine token application.
- **Build/lint/Lighthouse runs** and fixing mechanical breakage.

**Rule of thumb:** if the task decides *how the site looks or what it claims*, use Opus. If it
*applies an already-decided spec*, Sonnet is enough and cheaper.

---

## Suggested execution order

1. (Opus) A1 theme + A2 tokens + A3 primitives + A4/A5 policy → then `web-artifacts-builder` mockups
   of hero/Research/Teaching → **get Mohi's sign-off on the mockups.**
2. (Sonnet) Wire tokens into `tailwind.config.js`; scaffold `src/components/ui/`; remove particles.
3. (Opus) Lock B1–B5 IA decisions (nav, home teardown, publication hierarchy).
4. (Sonnet) Port pages in Part C onto the new system, page by page.
5. (Sonnet) Part D booking_url setting.
6. (Opus) Copy pass on any new microcopy + final `content-safety-check` review.
7. (Sonnet) `npm run build`, Lighthouse, fix regressions, deploy.

## What NOT to do

- Don't touch backend architecture (Hono/Workers/D1) beyond the single `booking_url` setting.
- Don't hardcode content the admin dashboard manages (projects, publications, blog, site-settings).
- Don't invent CV facts or upgrade authorship/publication status; don't resurface excluded items.
- Don't abandon purple — evolve it. Dark + purple stays; the flat single-gradient template look goes.
- Don't re-add the particle engine or blanket per-section stagger animations.
- Don't ship the `web-artifacts-builder` mockups as the site — they're for approval only; the
  deliverable is the rebuilt React app.
