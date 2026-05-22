# Datago Website

Corporate website for Datago Ltd, the company behind Bridgly.

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

## HUMAN:confirm

The first draft deliberately marks the following items in copy:

- Datago Ltd company number
- Registered office wording
- Whether consulting/advisory remains visible
- Whether contact stays mailto-first or becomes a form
- Whether Agents & Pencils becomes a redirect, lab, or archive

The production domain should be `datago.uk`, with `www.datago.uk` redirected to the apex domain.
