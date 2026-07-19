# Information-architecture spec (Step 3 / PROMPT.md B1–B5)

Locked IA decisions for the page ports (Step 4). Pairs with `theme.md` (visual system) and the
three approved mockups (`hero.html`, `research.html`, `teaching.html`). Where this doc and the
mockups agree, the mockups win on pixels; this doc governs *structure, order, and what data feeds
what*. Everything here reuses existing API calls (`getProjects`, `getPublications`,
`useSiteSettings`) — no new data plumbing, no hardcoded content.

Status: decisions locked; **not yet ported to React** (that's Step 4, awaiting go-ahead).

---

## B1 — Navigation (`src/components/Layout.js`)

Current nav is a flat 7-item row with a lucide icon per item, a rotating-brain logo, filled-purple
active pills, and a gradient CV pill — the SaaS-nav look. Rebuild per the mockup nav:

- **Items & order:** wordmark (name) links Home → then `Research · Projects · About` → an **"Also"
  divider** (faint mono label + hairline) → `Teaching · Blog · Contact`. Then the persistent CV chip.
- **Home item:** dropped as a text link; the **wordmark is the Home link** (standard academic
  pattern). *Deviation from PROMPT.md B1's literal "keep Home first" — flagged; the wordmark covers
  it and the approved mockup has no Home text item.*
- **Subordinate group:** Teaching/Blog/Contact sit after the "Also" divider in `text-content-faint`,
  smaller, so Teaching visibly ranks below Research/Projects/About.
- **Kill:** per-item icons, the `whileHover rotate 360` brain animation, filled-pill active state,
  the gradient CV pill. **Wordmark** is the name in `font-display`. **Active state** = `text-iris-300`
  (or an underline), not a filled block. **CV** = bordered mono `CV ↓` chip (mockup), still persistent.
- **Mobile:** same order and "Also" grouping in the drawer; keep the existing open/close state logic.
- **Root background:** remove Layout's `bg-gradient-to-br from-purple-950 …` flat gradient. Root is
  `bg-ink` (or transparent) so the fixed `<NetworkMotif>` shows through. Keep `main` top padding for
  the fixed nav.
- **Footer:** restyle to the mockup (an orchid `rule-orchid` divider + a mono contact line). Keep
  `settings.footer_tagline` (DB) and use the **public** email `mohaddeseh.mozaffarii@gmail.com` only.

## B2 — Kill Home/About duplication (`src/pages/Home.js`)

Home currently repeats an **"About Me"** section (`home_about_paragraph`) plus a 2-card
"Complex Systems / ML" grid that overlaps the About page. Both are **deleted**.

- **Delete** the entire "About Section" (the `About Me` heading, the paragraph block with the
  "Learn more about my journey" link, and the 2-card grid).
- The hero tease paragraph (B5) reuses `home_about_paragraph`, so the standalone About block is
  redundant — About page stays the **only** full journey/skills narrative.
- New Home = **hero → featured publications → featured projects → teaching+contact CTA.** Nothing else.

## B3 — Publications out-rank projects visually

- **Research page (`src/pages/Research.js`)** is the site's lead. Order: `research_statement`
  (editorial lead, drop-cap on the first letter — works on the single DB string, no copy rewrite) →
  **Publications** as an editorial **numbered list** (status badges + a legend), the visual
  centerpiece → **Research software** (NeuroPHorm, its own block, not a project card) → **Education**.
  Per `research.html`.
- **Publication status badges** use the `Badge` primitive, keyed 1:1 to the DB `status` column:
  `published`→mint, `under-review`→coral, `preprint`→iris. **Never** upgrade status; render
  `authors`/`venue`/`description` verbatim (the graphene-oxide "co-author, not first/senior author"
  note and the Network Neuroscience "under review" stay exactly as seeded).
- **Project cards** everywhere (Home strip, Projects page, Research has none) sit in a **lighter
  register** than the publication list — smaller type, quieter cards, no status-badge prominence. A
  project card must never read as heavier than a publication entry.

## B4 — Teaching: subordinate but functional (`src/pages/Teaching.js`)

- **Lighter register than Research, structurally:** `max-w-5xl` (vs Research's `max-w-6xl`), smaller
  display heading, **no mesh hero**, an **"Also · additional experience"** eyebrow. Subordination is
  built into the layout, not just the nav.
- Keep the anonymized, topic-based course selector (`src/data/courses.js`) and the TA table with its
  **real** supervisor names (no placeholders). Teaching philosophy as plain prose (no icon-circle
  cards). Per `teaching.html`.
- **Booking CTA** is the one prominent (coral) element on the page — top CTA panel + a repeat at the
  bottom. Wired to `settings.booking_url` (see Part D dependency below). Anonymization rules from
  CLAUDE.md hold: no student names/initials, schedules, or private links.

## B5 — Home hero (`src/pages/Home.js`)

Per `hero.html`, sized to clear the fold (`md:min-h-[calc(100svh - nav)]`):

- **Eyebrow:** the name (orchid mono kicker).
- **Headline (h1):** `settings.home_hero_line1` in `font-display`. Apply `.gradient-word` to the
  heading. *Note:* the mockup gradients only the word "Neuroscience"; doing that from a single DB
  string would require hardcoding the split, so the port generalizes to gradient-on-heading and
  stays fully DB-driven. (If per-word is wanted later, add a dedicated setting — don't hardcode.)
- **Metadata row:** `settings.home_hero_line2` split on `|` into a mono, orchid-separated row.
- **Tease paragraph:** `settings.home_about_paragraph` (this is what lets B2 delete the About block).
- **Actions (three weights, not three pills):** primary `View research` → `/research`; secondary
  `Download CV` → `/CV.pdf`; ghost `Book a call` → booking (see dependency). Reuse the `Button`
  primitive variants.
- **Headshot:** capped ~260px wide (`max-w-[260px]`) so the whole hero + credential strip clears the
  fold. Credential strip lists CV-verified facts only (MSc Outstanding/2nd, institution, NeuroPHorm).

### Featured publications strip on Home (new — biggest content add)

Home currently shows **no publications**. Add a **"Selected publications"** section between the hero
and featured projects: an editorial numbered list of the **top 2** publications
(`getPublications`, ordered by `order_num`), using `Badge` for status, linking to `/research`.
Featured projects stay **below** it and in the lighter register (B3).

---

## Cross-cutting

- **Motion:** one `Reveal` per section (or a small ≤3-item stagger within one group), never per-card
  blanket stagger. Remove the page-level framer-motion `containerVariants/itemVariants` stagger from
  Home/Research/etc.; the `Reveal` primitive + CSS handle it and respect reduced-motion.
- **Primitives:** compose from `src/components/ui/*` (Step 2). Don't re-style cards/buttons ad hoc.
- **Data:** every fetch/API call stays as-is; only presentation changes. No content hardcoded that
  the admin manages (projects, publications, blog, site-settings copy).

## Dependency — `booking_url` (PROMPT.md Part D) — DONE

`booking_url` now exists end-to-end (added ahead of the page ports): `server/src/routes/settings.js`
DEFAULTS, `src/hooks/useSiteSettings.js` DEFAULTS, and an editable field in the admin Content tab
(`src/pages/admin/tabs/ContentTab.js`). Default is an **empty string** until Mohi pastes her
scheduling URL (recommended: a Google Calendar Appointment Schedule link — free, no card, reads her
existing calendar; Cal.com is the embeddable alternative).

Step 4 CTA behaviour: **when `settings.booking_url` is non-empty**, "Book a session"/"Book a call"
open it in a new tab. **When empty**, fall back gracefully — hero "Book a call" → `/teaching`;
Teaching page CTAs → `mailto:` the public email `mohaddeseh.mozaffarii@gmail.com`. Never render a
dead `#` booking link.

## Page-by-page task list for Step 4 (Sonnet, once this is approved)

1. `Layout.js` — nav + footer per B1; drop the purple root gradient.
2. `Home.js` — B2 teardown + B5 hero + featured-publications strip + featured-projects (light) + CTA.
3. `Research.js` — B3 structure on the new primitives (statement → publications → software → education).
4. `Projects.js` — new light card design; keep GitHub sync / filters / featured-first sort.
5. `About.js` — full journey + grouped skills + experience + education + approach on new primitives.
6. `Teaching.js` — B4 + booking CTA; keep course selector + TA table.
7. `Contact.js` — form + Email/LinkedIn/Telegram + booking link; keep `sendContactMessage`.
8. `Blog.js` / `BlogPost.js` / `ProjectDetail.js` — restyle to match; no structural change.
9. Admin — leave functional; only trivial token alignment.
