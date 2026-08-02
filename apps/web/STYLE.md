# Operator's Report — Style Guide

Design system for Neighborhood Bookings' group revenue consulting brand. The site should read like a preview of the research deliverable it sells.

## Palette

| Token | Hex | Use |
|-------|-----|-----|
| `--paper` | `#FBF8F3` | Page background |
| `--paper-alt` | `#F5F0E8` | Alternating sections |
| `--surface` | `#FFFFFF` | Cards, forms |
| `--ink` | `#17150F` | Headings, body |
| `--ink-muted` | `#5C5850` | Secondary text |
| `--ink-soft` | `#6E685D` | Captions, placeholders |
| `--rule` | `#E3DCD0` | Hairline borders |
| `--rule-strong` | `#CFC5B4` | Table dividers |
| `--accent` | `#A03E2F` | CTAs, prices, emphasis |
| `--accent-deep` | `#7C2E22` | Hover, active |
| `--accent-soft` | `#F7ECE8` | Tinted backgrounds |
| `--data` | `#2F5D62` | Charts, stat accents |
| `--data-soft` | `#E8F1F1` | Pill backgrounds |
| `--focus` | `#1F5FBF` | Focus rings only |

One accent for action, one for data. No decorative gradients.

## Typography

- **Display:** Fraunces — headlines, prices, brand wordmark
- **Body:** Inter — paragraphs, form labels, UI text
- **Labels:** IBM Plex Mono — eyebrows, stat labels, section tags only

Scale:

- Display: `clamp(2.5rem, 5.5vw, 4rem)` / 1.05 / -0.02em
- Section heading: `clamp(1.75rem, 3vw, 2.5rem)` / 1.15 / -0.015em
- Sub-heading: 1.375rem / 1.3
- Body: 1.0625rem / 1.65, max 68ch for prose
- Eyebrow: 0.75rem uppercase, 0.14em tracking, mono

Prices and stats use `font-variant-numeric: tabular-nums`.

## Shape and space

- Border radius: 3px default, 2px small. No pill buttons.
- Prefer hairline rules over shadows. One card shadow token for emphasis only.
- Container max-width: 1120px
- Section padding: 112px desktop / 64px mobile

## Motion

- Color transitions: 150ms
- Section entrance: one 500ms fade-up per section
- No infinite animations
- Honor `prefers-reduced-motion`

## Components

- **Buttons:** 3px radius. Primary = accent fill. Secondary = ink outline. Ghost = accent text + underline on hover. No scale, no glow.
- **Forms:** Surface background, rule border, focus ring in `--focus`
- **Cards:** Hairline border, surface background, minimal shadow
- **Icons:** Lucide at 1.5 stroke weight, ink color — not accent-colored for decoration

## Imagery

- Real cropped deliverable screenshots in hairline frames
- No stock photos of diners
- No glowing icon circles
- No abstract gradient backgrounds as the main visual idea

## Voice (customer-facing copy)

- Sentence-case headings
- Second person ("your venue," "your team")
- Concrete nouns: weekday lanes, slow days, recurring groups
- Every number on the page should be explainable
- No exclamation points
- Lead with plain language; keep document names (Area Audit, Partner Map, Playbook) as quiet labels

### Plain-language swaps

Use these on the public site instead of marketing or analytics jargon:

| Instead of | Use |
|------------|-----|
| audit | report (or keep "Area Audit" as the document name only) |
| outreach | reaching out |
| cadence | when to follow up |
| KPIs | numbers to watch |
| offer matrix | what to offer each group |
| collateral | flyers and handouts |
| call-to-action | booking button |
| dayparts | slow times |
| demographics | who lives nearby |
| institutions | schools, churches, and senior centers |
| deliverable | what you get |
| fit call | call |

### Banned marketing words

unlock, supercharge, elevate, seamless, revolutionize, transform, leverage, synergy

### Never ship internal language

These belong in `OFFER.md` (internal sales script), never on the public site:

- core, upsell, downsell, close, anchor, avatar
- sanitized (use "client details removed" instead)
- last-resort, feature soup
- "not a free custom build"
- funnel labels (Core offer, Upsell, Downsell)
- arguments with the old web-vendor positioning

Every line on the homepage should answer a venue owner's question, not document how the offer is structured or sold.

## Files

- Tokens: `app/globals.css`, `tailwind.config.ts`
- Fonts: `app/layout.tsx`
- UI primitives: `components/ui/`
- Living reference: `/style` (noindex)
- Sample site palette: `public/sample/assets/css/styles.css` (mapped to same tokens)
