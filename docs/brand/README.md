# Datago · Brand Kit + Home Page · proposal package

Two HTML files. Open in any modern browser, no build step.

## Files

| File | Purpose |
|---|---|
| `brand/Datago Brand Kit.html` | 11-section corporate brand kit · proposal v1 |
| `website/Datago Home.html` | Home page mockup with hero graphic + thinking notes |

## What's a proposal vs locked

**Proposal · open for alignment** — designed without seeing the live datago.uk visuals.
- Mark: two interlocking squares (alternative options A/B/C documented in Brand Kit §11)
- Accent colour: deep cobalt `oklch(42% .13 245)` ≈ `#1F4E8E`
- Wordmark casing: lowercase `datago` (chosen to match Bridgly's family pattern)
- Hero graphic: Operating Mesh (alternatives B + C documented in Home page thinking notes)

**Already aligned to live content**
- Strapline: *"Governed organisational intelligence products."*
- Corporate path: `Buyer → Datago → Bridgly`
- Family naming: Datago Ltd · Bridgly · Agents & Pencils Lab
- Company details: no. 14751587, Newbury · RG14 1QL

## Mark anatomy (for production export)

**Two interlocking squares** — 64×64 viewBox
- Square 1: `<rect x="6" y="6" width="34" height="34" rx="6" fill="ink"/>`
- Square 2: `<rect x="24" y="24" width="34" height="34" rx="6" fill="brand"/>`
- Square 2 is drawn over Square 1, so the overlap appears brand-coloured (the "intersection" reads as the operating layer)

**D-tile favicon** (≤32px)
- Linear gradient 135° · `oklch(28% .10 245)` → `oklch(42% .13 245)`
- White "D" letter · Geist 600 · `−0.04em`
- Three 5px white node dots top-right, mid-right, bottom-left (drop below 24px)

## Colour tokens

| Token | OKLCH | Hex (approx) |
|---|---|---|
| `--ink` | `oklch(20% .012 245)` | `#0F1115` |
| `--brand` | `oklch(42% .13 245)` | `#1F4E8E` |
| `--brand-soft` | `oklch(62% .13 245)` | `#5A8AC4` |
| `--brand-deep` | `oklch(28% .10 245)` | `#1A375E` |
| `--brand-tint` | `oklch(94% .025 245)` | `#E8EEF4` |

## What to confirm

1. **Is the live datago.uk currently using a different accent?** If so, I'll re-tune to that hue while keeping the structure.
2. **Mark direction** — go with A (interlocking squares · recommended), B (3×3 lattice), or C (typographic only)?
3. **Hero graphic concept** — Mesh (used), Concentric (governance-led), or Sankey (volume-led)?
4. **Wordmark casing** — keep lowercase `datago` (family-consistent), or use the live site's casing?

## Production export

The Datago mark can be lifted out as a standalone SVG by combining the two `<rect>` elements into a single 64×64 SVG with inline `fill=` values. No symbol/use indirection needed since it's only two shapes.

Both files self-contained · no external deps except Geist + Geist Mono from Google Fonts.
