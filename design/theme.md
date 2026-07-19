# Midnight Iris — deep-purple academic

Custom `theme-factory` theme for mohimozaffari.github.io (PROMPT.md A1). Not a preset: generated
per the brief's "Midnight / deep-purple academic" instruction. Dark + purple stays as the brand
anchor; what changes is the *execution* — layered near-black surfaces instead of one flat purple
gradient, an editorial serif for headings, technical mono for metadata, and a single warm accent
so nothing is purple-on-purple.

**Status: awaiting Mohi's sign-off.** Nothing here is encoded in the app yet.

## Design rationale (why these, against the "PhD-ready researcher" test)

- **Near-black neutrals, not purple everywhere.** The current site's `bg-purple-900/30` card on a
  purple gradient is the single biggest source of the template feel. Purple becomes an *accent on
  dark neutral*, not the substrate.
- **Editorial serif display.** A serif heading face is the fastest visual signal of "academic /
  journal" rather than "SaaS landing page". Fraunces is a variable serif with real presence at
  hero sizes and no bakery-warmth when `SOFT`/`WONK` are set to 0.
- **Mono for metadata.** Venue, DOI, status, year, manuscript numbers set in IBM Plex Mono reads
  as a scientific record. This is what makes publications out-rank project cards (B3) without
  needing bigger boxes.
- **Warm coral accent.** Purple + a warm coral is letterpress/university, not AI-portfolio, and
  keeps the warm-against-cool tension without the mustard cast of a gold. It gives links and status
  badges somewhere to live that isn't more purple. (Was citrine gold; changed per Mohi's feedback.)
- **No Inter.** Deliberately avoided — it is *the* default AI-portfolio body face.

## Color palette

### Surfaces (non-purple neutrals — token group `surface`)
| Token | Hex | Use |
|---|---|---|
| `ink` | `#0A0910` | Page background. Near-black, faint violet cast. |
| `surface` | `#100E1A` | Default section background. |
| `surface-raised` | `#171426` | Cards, panels. Replaces `bg-purple-900/30`. |
| `surface-overlay` | `#1E1A31` | Hover state, active tab, inset wells. |
| `line` | `#241F38` | Default hairline (`border-line`). |
| `line-strong` | `#382F55` | Emphasised divider, focused card. |

### Text (warm, violet-tinted off-white — never pure `#FFF`)
| Token | Hex | Use |
|---|---|---|
| `text` | `#F2EEF9` | Headings, primary copy. |
| `text-muted` | `#B7AECD` | Body prose, secondary. |
| `text-faint` | `#7C7391` | Metadata, captions, disabled. |

### Iris — brand purple
| Token | Hex |
|---|---|
| `iris-200` | `#DCCBFF` |
| `iris-300` | `#C4A9FF` |
| `iris-400` | `#A683FF` |
| `iris-500` | `#8B5CF6` ← primary brand |
| `iris-600` | `#7442E0` |
| `iris-700` | `#5B2FB8` |
| `iris-900` | `#2A1259` |
| `iris-950` | `#180A34` |

### Orchid — the pink half of the existing purple/pink identity, a working secondary accent
| Token | Hex | Use |
|---|---|---|
| `orchid-400` | `#EC72B6` | Section eyebrows, hero kicker, warm nodes in the motif. |
| `orchid-500` | `#E0559C` | Hairline rules, display gradient tail, metadata separators. |

> Orchid is a real secondary accent, not a one-per-screen garnish (updated per Mohi's sign-off
> feedback): it carries section eyebrows and the "identity" kicker, pairs with iris in the
> background motif (the graph resolves iris→orchid left-to-right), and anchors the display gradient.
> Coral stays the accent for links + publication status so the two roles don't collide.

### Coral — the single non-purple warm accent (links, key metadata, emphasis)
| Token | Hex |
|---|---|
| `coral-300` | `#F7A991` |
| `coral-400` | `#F2856B` ← accent |
| `coral-500` | `#E56A4E` |

### Status semantics (publication badges — B3)
| Status | Token | Hex |
|---|---|---|
| `published` | `mint-400` | `#6FD9A6` |
| `under-review` | `coral-400` | `#F2856B` |
| `preprint` | `iris-400` | `#A683FF` |

These three map 1:1 to the `status` column already in the D1 `publications` table
(`published` / `under-review` / `preprint`). No new statuses invented.

## Typography

| Role | Family | Source | Weights |
|---|---|---|---|
| `font-display` | **Fraunces** (`opsz` 9–144, `SOFT` 0, `WONK` 0) | Google Fonts / `@fontsource-variable/fraunces` | 400, 600, 700 |
| `font-sans` | **IBM Plex Sans** | Google Fonts / `@fontsource/ibm-plex-sans` | 400, 500, 600 |
| `font-mono` | **IBM Plex Mono** | Google Fonts / `@fontsource/ibm-plex-mono` | 400, 500 |

*Alternative display face if Fraunces reads too warm on review: **Newsreader** — more literary/journal,
less trendy, excellent italics for the research-statement pull quote. One-line swap.*

### Scale
| Token | Size / line-height / tracking |
|---|---|
| `display-xl` | `clamp(3rem, 7vw, 5.25rem)` / 0.95 / -0.03em |
| `display-lg` | `clamp(2.25rem, 4.5vw, 3.25rem)` / 1.05 / -0.02em |
| `h2` | `2rem` / 1.15 / -0.015em |
| `h3` | `1.25rem` / 1.3 |
| `body` | `1.0625rem` / 1.7 |
| `meta` (mono) | `0.75rem` / 1.4 / 0.08em, uppercase |

## Radius & shadow (restrained — A2)

| Token | Value |
|---|---|
| `rounded-md` | `10px` |
| `rounded-lg` | `14px` ← default card |
| `rounded-xl` | `18px` |
| `rounded-2xl` | `24px` ← page-level panels only |
| `rounded-full` | status pips and the avatar **only** — no more pill buttons |

- `shadow-raise`: `inset 0 1px 0 rgba(255,255,255,.04), 0 12px 32px -12px rgba(0,0,0,.8)`
- `shadow-focus`: `0 0 0 1px rgba(139,92,246,.35), 0 16px 48px -16px rgba(139,92,246,.35)`

## Motion policy (A4)

One `<Reveal>` pattern, nothing else:
- `opacity 0→1`, `translateY(12px)→0`, `420ms`, `cubic-bezier(.16,1,.3,1)`
- Stagger allowed **only within a single group, max 3 items, 60ms apart**. No per-card stagger.
- `@media (prefers-reduced-motion: reduce)` → opacity only, no transform, 0ms delay.

## Background motif (A5)

Replaces `react-particles` / `tsparticles-slim` entirely. Static inline **SVG**: a sparse graph
(nodes + edges) overlaid with a few translucent circles — the "filtration balls" of a persistent
homology Vietoris–Rips complex — over a two-stop radial mesh gradient. On-brand because it is
literally her field (network science + persistent homology), and it costs zero JS.
