# DataGo Website

The website for DataGo Ltd, a UK data and AI consultancy and the company behind Bridgly.

Pages:

- Home: the hero message, the structure map, the five focus areas, how we deliver, products and contact
- One services page with five deep-linkable panels: `/services#practical-ai`, `#analytics`, `#governance`, `#data-platforms`, `#secure-delivery` (the old `/services/<slug>` addresses redirect permanently)
- Bridgly: `/bridgly` redirects permanently to bridgly.ai; every Bridgly link opens bridgly.ai in a new tab
- About
- Contact, with the enquiry form
- Privacy, Terms and the Accessibility statement

`/approach`, `/insights` and `/lab` were retired on 16 November 2026 and redirect to Home.

All copy lives in `src/lib/strings.ts`; components carry no English of their own. Layout pieces live in `src/components/`. Search metadata, canonical URLs, JSON-LD and sitemap routes live in `src/lib/metadata.ts`. Demonstration copy and route metadata live in `src/app/demos/`.

### Claims rules

Nothing on the site is invented. A fact the owner has not confirmed is left out. Bridgly is described only with the approved claims in `site.bridgly`.

### Look and feel

The "Cobalt Grid" tokens are at the top of `src/app/globals.css`, with light and dark themes. Type is Archivo, Public Sans and Source Code Pro, self-hosted through `next/font/google`. Diagram labels are HTML text at 13px or more; no text sits inside a scaled SVG. All motion stops under reduced motion.

Brand handoff files from `Datago Devkit.zip` live in `docs/brand/`. The record of the November 2026 refresh, with acceptance values, measurements and screenshots, is in `docs/refresh-2026-11-16/`.

## Contact form

The form posts to the route handler `src/app/api/contact/route.ts`, which sends one email through Resend with the enquirer as reply-to. Nothing is stored. Spam checks: a honeypot field, a minimum time to submit, Cloudflare Turnstile verified on the server, and a basic rate limit per IP address.

Set these variables in Vercel (names are in `.env.example`; never commit values):

```
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
TURNSTILE_SECRET_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

`CONTACT_TO_EMAIL` is the recipient; if it is unset the code falls back to dale.harrison@datago.uk. Until the other four are set, the form says plainly on sending that it is not yet connected and shows the email address. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is read at build time, so redeploy after setting them.

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
npm run typecheck
npm test
npm run build
```

## Production Notes

Statutory company details come from the public Companies House record and appear in one place: the footer legal line on every page.

- DataGo Ltd, registered in England and Wales, company number 14751587
- Registered office: 2 Old Bath Road, Newbury, Berkshire, England, RG14 1QL
- VAT registration number: GB 444 6881 64
- Contact: dale.harrison@datago.uk

The production domain should be `datago.uk`, with `www.datago.uk` redirected to the apex domain.

Search readiness:

- `robots.txt` allows normal search crawlers plus OpenAI's OAI-SearchBot, ChatGPT-User, and GPTBot, matching Bridgly's current crawler posture.
- `sitemap.xml` lists the canonical public routes.
- `llms.txt` summarises DataGo, its five areas of work and Bridgly.
- Root JSON-LD describes DataGo, datago.uk, and Bridgly with Bridgly product references pointing to `https://bridgly.ai`.

A `Content-Security-Policy` header is set in `next.config.ts`. The only third-party host it allows is `challenges.cloudflare.com`, for the contact form's security check.
