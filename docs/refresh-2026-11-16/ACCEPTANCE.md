# datago.uk refresh: acceptance values

Set on 16 November 2026, before the built site was measured. Results are in `MEASUREMENTS.md` and `measurements.json`; the script is `measure.cjs`.

Playwright, Chromium, on a local production build (`next build && next start`). Viewports 1440x900 and 390x844, light and dark. Every site page is measured: Home, the five service pages, Bridgly, About, Contact, Privacy, Terms and Accessibility. The unlisted `/demos` pages are out of scope.

| # | Check | Acceptance value |
| --- | --- | --- |
| A1 | Horizontal scroll | `scrollWidth - clientWidth` = 0 |
| A2 | Text contrast (AA) | 0 visible text elements under 4.5:1 (3:1 at 24px or more, or 18.66px bold). Every tab panel is opened and counted. |
| A3 | Non-text contrast | Field border against the field and against the form, 3:1 or more. Focus outline against the page, 3:1 or more. |
| A4 | Visible focus | Every Tab stop has an outline that is not `none`, is 2px or wider and is on screen. Stops reached = focusable elements expected. |
| A5 | Heading order | Exactly one `h1`; 0 skipped levels. |
| A6 | Target size (2.5.8) | 0 links, buttons or fields under 24 x 24 CSS px. Links inline in a sentence are exempt. |
| A7 | Reduced motion | The map loop is not running; 0 running animations; 0 `[data-reveal]` elements hidden; the Pause button is not shown. |
| A8 | Default motion (Home) | The map loop is running; Pause stops it. |
| A9 | Form, variables not set | No form fields are shown. The words "not yet connected" and a `mailto:` link are visible. 0 requests to `/api/contact` from the page. A direct POST returns 503 `not_configured`. |
| A10 | Form, variables set (dummy values; Turnstile stubbed; `/api/contact` mocked) | Empty submit: 3 errors, focus on the name field, 0 requests. Valid submit: exactly 1 POST carrying the fields, the success message shown and focused, the form cleared. Mocked failure: an error message with the email address, and the typed message still in the field. |
| A11 | Console and network | 0 console errors. The three webfonts load. 0 requests to any other host when the variables are not set. |
| A12 | Smallest text | 13px or more, including every diagram label. |
| A13 | Company number | Appears exactly once in the page text, inside the footer, on every page. Nothing statutory (number, "Registered office", postcode) in the first viewport at 1440, in the hero or in the structure map. |
| A14 | Hero message | The Home `h1` equals the owner's message word for word. |
| A15 | Claims hygiene | 0 occurrences of "Opportunity Desk"; 0 names of tender or demonstration buyers; 0 hype words (list in the script); 0 "Quick answers"; "proven at enterprise scale" carries a [CONFIRM] in the same paragraph; 0 figures in the accelerators section. |
| A16 | Audience switcher (Home) | 5 tabs; exactly 1 panel visible; ArrowDown moves selection and focus. With JavaScript off, 5 panels are visible and nothing is hidden. |
| A17 | Links | Every internal link returns 200 and every `#fragment` exists on its target page. |
| A18 | Focus areas (Home) | Five, each with "The problem", "The outcome", "How we deliver", and each linking to its service page. |
| A19 | Headers and redirects | `Content-Security-Policy` is sent. `/approach`, `/insights` and `/lab` redirect. |
