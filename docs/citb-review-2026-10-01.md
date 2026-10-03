# CITB prototype review and acceptance

1 October 2026. Reviewed release candidate. Publication is authorised by the owner’s request to update both prototypes.

Repository: `/Users/terence/Downloads/uk-council-frameworks/review/datago-bid-demos`. Branch: `codex/citb-quality-review-2026-10-01`. Base: `db1ae1b`. Modified UI: `src/app/demos/assessment-authoring/assessment-demo.tsx`. The public route remains `/demos/citb-assessment`; buyer-specific navigation is preserved.

## Material changes and proof

| Buyer outcome | Before | Local candidate | Screenshot pair |
| --- | --- | --- | --- |
| Trust the bank totals | Fixed counts did not match twelve initial records | Counts derive from the bank; 12 initially, 15 after loading samples; retired stage included | before-overview.jpg / after-overview.jpg; before-reporting.jpg / after-reporting.jpg |
| Understand source and generation boundary | Controls suggested configurable generation and automated passed checks | Three fixed samples, disabled configuration, no model call or validation claim; INDG401 revision corrected to January 2014 | before-create.jpg / after-create.jpg |
| Defend a human review decision | Reason field did not retain an attributable history | Reason required, status/reason/ISO time retained within the session and shown after navigation | before-review.jpg / after-review-final.jpg |
| Avoid approving an unrelated or incomplete record | Generic options could appear against another question title | Only authored item examples have options; metadata-only examples cannot be approved | Final UI observation: WAH-010 remained disabled even with a note |
| Interpret measures accurately | Lifecycle and item results could imply measured performance | Session bank separated from the mock trial fixture; formulas align to Q4; arbitrary pass-rate recommendation removed | before-reporting.jpg / after-reporting.jpg |
| Avoid dead-end expectations | Non-functional export and download controls | Future export/evidence delivery described as planned text | after-create.jpg / after-reporting.jpg |

Screenshots are in [prototype-evidence](</Users/terence/Downloads/uk-council-frameworks/review/research/citb-72X24EPT58/review-2026-10-01/prototype-evidence>). Original and candidate captures use different illustrative records when testing decision history; they are not controlled performance measurements. Some older full-page captures show the sticky header at its scroll position. Use after-review-final.jpg and after-keyboard-focus.jpg for review.

## Validation performed

- Targeted ESLint passed on the changed TSX.
- Next.js production build and TypeScript passed, 25 static routes generated.
- Manual checks: source version label, sample loading 12 to 15, second load leaves 15 and states no duplicates, blank reason disables decisions, reason allows a return, stored history survives navigation, metadata-only record cannot be approved even with a note, lifecycle total includes retired records, reload resets to 12.
- Keyboard Tab reached the review decision button and Enter recorded the return. Focus was visible as a blue 3px outline.
- Mobile override 390 by 844 was used. Actual browser content width and scroll width were both 375px; no horizontal page overflow. Mobile overview and reporting captured and inspected. Override reset afterwards.
- No new automated test suite was added for these bounded UI changes. Targeted lint, type/build and direct workflow checks cover the changed behaviour. No real assessment or candidate data used.

## Claim register

| Capability | Status | Evidence boundary |
| --- | --- | --- |
| Local bank/filter/navigation and sample load | Working prototype | Fixed synthetic records, browser state only |
| Reason, status and history | Working prototype | Session UI state, no durable or tamper-evident audit service |
| Citations and source versions | Working prototype | Public links and authored metadata; only checked extracts should be called verified |
| Content, similarity, reading and accessibility checks | Planned MVP | No such validators execute in this UI |
| Per-option rationale for authored examples | Working prototype | Six fixed examples: WAH-001, 002, 004, 013, 014 and 015; other records are metadata only |
| Live AI generation and real reviewer identities | Planned MVP | Not implemented or validated |
| Pearson integration and psychometric result | Future option | Mock results only; no API or candidate responses |
| Authentication, permissions, resilient hosting and production operations | Future option | Conceptual proposal, not proved by this client UI |
| Productivity and cost figures | Assumption | Separate reporting fixture, not measured trial benefits |

## Release handoff

The owner requested these prototype changes. For this bounded release, commit only owned changes, run the repository's release checks, publish through its established deployment, then inspect the live CITB route and its isolation. Record the new commit and URL readback. Saved screenshots remain available even when the temporary local preview stops.

## Final prototype adjustments

- Exercise Questions 2 and 4 now appear as WAH-002 and WAH-004 with proposed keys C and D, version 0.3 and per-option rationale. These are draft examples, pending construction and assessment specialist validation.
- The three fixed authoring samples each have their own options, key, rationale and source summary. No model call occurs.
- Source passages are labelled as paraphrased summaries. They are not presented as direct quotations.
- Full repository lint and production/type build passed. Local checks covered Q2 return with an attributable session reason and timestamp, Q4 key D, and the new sample creation/review flow. Mobile review was inspected at 375px content width without horizontal overflow.

Submission files and the tender portal are unchanged by this prototype release.

## Gap repairs, 3 October 2026

The demo now distinguishes the supplied HSE sources from supplier-added Regulation 9, which requires approval. A visible delivery-boundaries panel distinguishes fixed authored samples, browser review actions and sample KPIs from future model calls, source ingestion, identity, durable audit and Pearson integration. Reloading resets the illustrated assessment state. No historical model, prompt or run metadata has been invented. The response candidates are separately dated; no submitted document has been overwritten.

Validation: full ESLint and Next build/typecheck passed. No new AI service, live source integration or production assurance is claimed.
