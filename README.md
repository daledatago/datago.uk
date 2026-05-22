# Datago Website

Corporate website for Datago Ltd, the company behind Bridgly and product-led governed AI transformation.

The first build keeps the site small and direct:

- Home
- Bridgly
- Approach
- Company
- Lab
- Privacy
- Terms
- Contact

Core copy lives in `src/lib/strings.ts`. Reusable layout pieces live in `src/components/`.

Brand handoff files from `Datago Devkit.zip` live in `docs/brand/`. The production site adapts the proposed cobalt palette, interlocking-square mark, D-tile favicon direction, and Operating Mesh hero graphic from that kit.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Validation

```bash
npm run lint
npm run build
```

## Production Notes

The first production draft keeps the site mailto-first and uses the public Companies House record for statutory company details.

Positioning split:

- Datago is the company trust layer, thesis, and product studio
- Bridgly is the flagship platform and proof of the governed graph / recursive learning loop
- Agents & Pencils is retained only as an optional lab/archive

- Datago Ltd company number: 14751587
- Registered office: 2 Old Bath Road, Newbury, Berkshire, England, RG14 1QL
- Contact: info@datago.uk
- Agents & Pencils is presented as a Datago lab/archive, not the enterprise-facing company brand

The production domain should be `datago.uk`, with `www.datago.uk` redirected to the apex domain.
