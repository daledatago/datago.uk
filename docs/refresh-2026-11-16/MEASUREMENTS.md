# datago.uk refresh: measurements

Measured on 16 November 2026 against `ACCEPTANCE.md`, which was written first. Playwright 1.63, Chromium, on a local production build (`next build && next start`). 12 pages x 2 widths (1440, 390) x 2 themes = 48 page runs. Full readings: `measurements.json`. Script: `measure.cjs`.

Two builds were measured: one with no contact variables set (the state of this branch), and one with five dummy values set so the working form could be exercised. In the second, Cloudflare Turnstile was replaced by a stub and `/api/contact` was mocked, so no email was sent and no outside service was called.

| # | Check | Acceptance | Result |
| --- | --- | --- | --- |
| A1 | Horizontal scroll | 0px | 0px on all 48 runs |
| A2 | Text contrast | 0 under AA | 0 of 6,108 text elements. Lowest ratio: light 6.83:1, dark 7.34:1 |
| A3 | Field border | 3:1 or more | Light: 4.28:1 against the field, 4.59:1 against the form. Dark: 5.68:1 and 5.24:1 |
| A3 | Focus outline against the page | 3:1 or more | Light 17.47:1, dark 19.31:1 |
| A4 | Visible focus | every stop | 1,624 of 1,624 Tab stops had a visible outline and were on screen |
| A5 | Headings | one `h1`, 0 skips | One `h1` and 0 skipped levels on all 12 pages |
| A6 | Targets under 24px | 0 | 0 |
| A7 | Reduced motion | nothing moves | Map loop not running; 0 running animations; 0 hidden elements; Pause not shown (Home and a service page, both widths) |
| A8 | Default motion | runs; Pause stops it | Running on load; stopped after Pause (Home, 4 runs) |
| A9 | Form, variables not set | says so, offers email | 0 form fields; "This form is not yet connected." and a `mailto:` link shown; 0 requests to `/api/contact`; a direct POST returned 503 `not_configured` (Home and Contact, 8 runs) |
| A10 | Form, variables set | as stated | Empty submit: 3 errors, focus on the name field, 0 requests. Mocked failure: error message with the email address, typed message kept, focus on the message. Valid submit: 1 POST with all eight fields, success message shown and focused, form cleared (4 runs). The error state added 0 contrast failures |
| A11 | Console errors | 0 | 0 on the 48 site runs. The form runs logged one line each, the browser's note of the deliberately mocked 502 |
| A11 | Fonts and other hosts | 3 fonts; 0 other hosts | Archivo, Public Sans and Source Code Pro loaded from the site itself; 0 requests to any other host |
| A12 | Smallest text | 13px or more | 13px, including the structure map's labels. 0 SVG text elements in page content |
| A13 | Company number | once, in the footer | Once in the page text, inside the footer, on all 48 runs. "Registered in England and Wales" present on all. 0 statutory details in the first viewport, the hero or the map |
| A14 | Hero message | exact | Exact match |
| A15 | Claims hygiene | 0 | 0 "Opportunity Desk"; 0 buyer names; 0 hype words; 0 "Quick answers"; "proven at enterprise scale" appears once and carries its [CONFIRM]; 0 figures in the accelerators section |
| A16 | Audience switcher | as stated | 5 tabs; 1 panel visible for each; ArrowDown moved selection and focus. With JavaScript off: 5 panels visible, 0 hidden elements |
| A17 | Links | 0 broken | 275 internal links checked, 0 broken. `bridgly.ai` and `bridgly.ai/privacy` returned 200 |
| A18 | Focus areas | five, complete | Five, each with the three labels and a link to its service page |
| A19 | Headers and redirects | present | `Content-Security-Policy` sent. `/approach` 307 to `/#delivery`; `/insights` and `/lab` 307 to `/` |

All nineteen met.

## Other checks

- `npm run lint`: clean. `npm run typecheck`: clean. `npm test`: 11 of 11 passed. `npm run build`: succeeded, 29 routes.
- The four `/demos` pages returned 200 with 0 console errors and still render in their own typeface and colours.
- `bridgly.ai/terms` returned 404 on 16 November, so the link to it that the old Terms page carried was removed.

## [CONFIRM] tags

43 distinct [CONFIRM] tags and the marker "NEEDS CLIENT CLEARANCE". They appear 86 times across the 12 pages: Home 35, each service page 7, About 4, Bridgly 3, Contact 3, Privacy 3, Accessibility 2, Terms 1 (the footer tag is counted on every page).

## Not tested

- axe-core, and screen readers (NVDA, JAWS, VoiceOver)
- Browsers other than Chromium; real phones and tablets
- Text at 200% zoom; forced-colours mode
- The real Turnstile widget, and a real send through Resend: both need the owner's accounts
- Contrast is computed against the nearest solid background. The faint lattice dots behind the map text are not counted
- The claims checks are text searches. They do not judge tone

## Screenshots

`before/` is the live site on 16 November 2026. `after/` is this branch. The files in `after/` named `form-*` come from the build with dummy variables.
