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

Core company-site copy lives in `src/lib/strings.ts`. Reusable layout pieces live in `src/components/`.
Company-site search metadata, canonical URLs, JSON-LD, and sitemap routes live in `src/lib/metadata.ts`. Demonstration copy and route metadata live in `src/app/demos/`.

Brand handoff files from `Datago Devkit.zip` live in `docs/brand/`. The production site adapts the proposed cobalt palette, interlocking-square mark, D-tile favicon direction, and Operating Mesh hero graphic from that kit.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Working demonstrations

Open `/demos` for the CITB assessment-authoring workspace, circular commercial-value calculator and conceptual enterprise delivery view. See the [buyer review guide](buyer-pack/README.txt) for individual links, suggested review steps and fallback materials. The packaged review files are in `buyer-pack/zips/`.

All `/demos` routes use a separate buyer-review layout without the main website header or footer. The `/demos/citb-assessment` and `/demos/circular-economy` routes each use an opportunity-specific header without links to other demonstrations. The CITB workspace retains only its internal navigation for Overview, Create questions, Question bank, Review queue and Reporting. The general demonstration overview and enterprise-delivery routes retain the shared buyer-review navigation. Other site routes retain the normal website header and footer.

The hub and its three views require no account. They are unlisted in the main website navigation and the sitemap, and their page metadata sets `noindex, nofollow`. They remain accessible to anyone with the URL; these settings do not provide access control. Legacy `/demos/assessment` and `/demos/assessment-authoring` links permanently redirect to `/demos/citb-assessment`; `/demos/circular-value` redirects to `/demos/circular-economy`.

The assessment demonstration is an interactive mock application. It starts with twelve illustrative question records and includes a guided source-and-intent form, an action that loads three fixed draft records once per session, a searchable and filterable question bank, a human-review screen with a required reason and session history for authored examples, guarded return and approval actions, and lifecycle and item-performance reporting. The interface is responsive on mobile. State changes last for the current browser session and reset on reload.

The source and intent controls are fixed for this walkthrough. Metadata-only examples cannot receive a review approval. Reporting separates session bank counts from a separate mock trial fixture. See [1 October review and acceptance](docs/citb-review-2026-10-01.md) for the local candidate changes and release boundary.

The demonstration does not call a model, connect to Pearson, publish an item or use candidate data. The item-analysis values, people and operational measures are mock data. No item is approved CITB test content or released for live assessment use.

The calculator updates locally from the selected assumptions. Neither demonstration calls a model or connects to a customer system. For the proposed customer-controlled architecture and its implementation requirements, see [enterprise deployment and security](docs/enterprise-deployment-and-security.md). For buyer positioning and next decisions, see [prototype positioning](docs/public-sector-prototype-positioning.md).

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
