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

Open `/demos` for the assessment-authoring workflow, circular commercial-value calculator and conceptual enterprise delivery view. See the [buyer review guide](buyer-pack/README.txt) for individual links, suggested review steps and fallback materials. The packaged review files are in `buyer-pack/zips/`.

All `/demos` routes use a separate buyer-review layout without the main website header or footer. Use the shared demo navigation to move between Overview, Assessment authoring, Circular economy and Enterprise delivery; the DataGo logo returns to Overview. On narrow screens, scroll the navigation horizontally to reach every view. Other routes retain the normal website header and footer.

The hub and its three views require no account. They are unlisted in the main website navigation and the sitemap, and their page metadata sets `noindex, nofollow`. They remain accessible to anyone with the URL; these settings do not provide access control. Legacy `/demos/assessment` and `/demos/circular-value` links permanently redirect to the assessment-authoring and circular-economy views respectively.

The assessment demonstration shows source evidence, an illustrative criterion and an authoring instruction. Edit item 01's stem and select **Save revision** to commit a change, or **Cancel** to discard it. **Run draft checks** evaluates the saved revision's option structure, word lengths and source-reference metadata; it does not verify source accuracy or assessment quality. Saving changed wording resets the current decision and check results. Record a sample approval or return with a selected reason, then open **Revision and decision history** to inspect earlier wording and decisions. Edits, decisions, history and check results reset when the page reloads; specialist review remains outstanding throughout.

Expand a question-bank entry to inspect its illustrative record, or select **Preview buyer export** to see the populated bank together. Item 01 reflects saved edits, decisions and check results; the other items remain fixed drafts. The preview does not download a spreadsheet or replace the buyer's official submission template. No item is approved CITB test content or released for live assessment use.

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
