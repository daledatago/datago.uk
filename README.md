# DataGo Website

Corporate website for DataGo, the company-level site for DataGo Ltd and the trust/thesis layer behind Bridgly.

The public site stays deliberately company-level:

- Home
- Bridgly
- Approach
- Insights
- About
- Lab
- Privacy
- Terms
- Contact

Core copy lives in `src/lib/strings.ts`. Reusable layout pieces live in `src/components/`.
Search-route metadata, canonical URLs, JSON-LD, and sitemap routes live in `src/lib/metadata.ts`.

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

- DataGo is the company trust layer, thesis, and governed AI product studio
- Bridgly is the flagship platform and product destination for organisational intelligence, AI adoption visibility, governance, connectors, and measurable AI outcomes
- Agents & Pencils is retained only as an optional lab/archive

- DataGo Ltd company number: 14751587
- Registered office: 2 Old Bath Road, Newbury, Berkshire, England, RG14 1QL
- Contact: info@datago.uk
- Agents & Pencils is presented as a DataGo lab/archive, not the enterprise-facing company brand

The production domain should be `datago.uk`, with `www.datago.uk` redirected to the apex domain.

Search readiness:

- `robots.txt` allows normal search crawlers plus OpenAI's OAI-SearchBot, ChatGPT-User, and GPTBot, matching Bridgly's current crawler posture.
- `sitemap.xml` lists the canonical public routes.
- `llms.txt` summarises DataGo, Bridgly, the company/product relationship, and product routing.
- Root JSON-LD describes DataGo, datago.uk, and Bridgly with Bridgly product references pointing to `https://bridgly.ai`.
