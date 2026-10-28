# Claims register

Every factual claim or number that could appear in a video. **A claim with status `needs_evidence` blocks an episode from `approved`** (the validator enforces this when the claim is listed in the storyboard's `claims`).

| Claim | Status | Note |
|---|---|---|
| EdZola was founded in 2020 | verified | |
| EdZola is a Zoho Advanced Partner | verified | Badge in `assets/brand/` |
| MAP framework (Model, Align, Power with AI) | edzola_opinion | [frameworks/map-framework.md](frameworks/map-framework.md) |
| "A dashboard without a decision is decoration" | edzola_opinion | MAP myths |
| Every point of view in [concepts/points-of-view.md](concepts/points-of-view.md) | edzola_opinion | Say "we've learned…", never present as universal fact |
| All Sitara Foundation data | illustrative | [case-studies/sitara-foundation.md](case-studies/sitara-foundation.md) |
| EdZola footprint numbers (organisations served, systems built, countries, learners managed, hours saved) | needs_evidence | **Do not use** until an EdZola owner confirms the current figure and adds it here as `verified` with its source |
| Zolabs language count | needs_evidence | Confirm with the product team |
| Any third-party sector statistic | needs_evidence | Needs a primary source (report, dataset) linked on screen and in the description |

## How to add a claim

1. Add a row here with its source (link or document name).
2. Add it to the storyboard's `claims` array with the same status.
3. On screen, third-party statistics need a source line, and the YouTube description needs the link.
