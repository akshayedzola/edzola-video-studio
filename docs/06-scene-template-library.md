# Scene template library

Templates are where engineering effort compounds. Each one accepts content via `props`, exposes cue actions, and is reused across many episodes. The machine-readable list is in [`studio/templates.manifest.json`](../studio/templates.manifest.json).

## Built (v0.1)

| Template | Teaches by | Actions | Used in |
|---|---|---|---|
| **TitleHook** | Opening with a felt question; highlight the key word | show-kicker, show-title, show-subtitle, show-accent | ep000 hook |
| **Spreadsheets** | Making fragmentation visible: the same record across team sheets, values drifting apart | show-org, show-sheet, highlight, set-cell, flag, pulse-sheets | ep000 fragmented-records |
| **MetricConflict** | One indicator, several disagreeing numbers | show-label, show-value, question, shake, dim-values | ep000 report-conflict |
| **ConceptBuild** | Progressive construction: nodes, arrows and a boundary frame built piece by piece | show-title, show-node, show-edge, pulse, show-frame | ep000 system-of-record |
| **Statement** | Myth vs reality: strike the belief, land the reality | show-myth, strike, show-reality | ep000 myth |
| **FrameworkSteps** | Named framework, one step at a time | show-title, show-step, pulse-step, dim-others | ep000 map |
| **EndCard** | Sign-off, tagline, next episode | show-logo, show-tagline, show-next | ep000 outro |

## Backlog (priority order)

| Template | Teaches by | Needed for | Notes |
|---|---|---|---|
| **DataJourney** | Following one record (a learner, a donation, a voice call) across systems and stages | "How AI voice agents actually work", three operating maps | Token moving along a path; stations light up; values attach to the token |
| **DecisionTree** | Present a dilemma, pause, animate consequences of each branch | "Build, buy or customise?" | Include a "pause and choose" beat (3 s countdown) |
| **MetricReveal / ChartBuild** | Animated bars and lines, a surprising number then the underlying data | "80% placement ≠ 80% employment" | Funnel: placed → 30 days → 90 days → 6 months |
| **Timeline** | A process evolving over time | Field Essay 05, go-live vs adoption | Horizontal track, milestones, "you are here" |
| **UIHighlight** | Zoom and annotate a product screen recording | DozAI and Zolabs walkthroughs | Takes a Playwright-recorded MP4 of a synthetic demo tenant; callouts and zooms on cue |
| **CharacterScene** | A person facing a challenge (simple flat SVG characters) | Fictional case studies | Characters designed once in Inkscape; poses as separate SVGs |
| **Comparison** | Two concepts side by side (AI employee vs chatbot) | "What is an AI employee?" | Two columns, row-by-row reveal |
| **QuoteCard** | A single line attributed to EdZola | Shorts | Reuse the quote-card art from the content kit |

## How to build a new template

1. Sketch it as a storyboard first: which props, which actions, what each beat would trigger.
2. Copy the closest existing template. Build every visual **hidden** (`opacity={0}`) in the template function and return handlers.
3. Handlers return a generator. Use `all(...)` for parallel effects and `sequence(stagger, ...)` for staggers. Don't fire long effects with a bare `yield` inside a handler: Revideo cancels them when the handler ends.
4. Use only `theme.ts` tokens and `lib/motion.ts` primitives (`reveal`, `pulse`, `shake`). No raw hex values.
5. Register it in `src/templates/index.ts` and `templates.manifest.json`, with `use_for`, `props` and `actions`.
6. Add a short demo scene to an episode, render, and inspect the contact sheet and some full-resolution frames (`ffmpeg -ss <t> -i master.mp4 -frames:v 1 f.png`).
7. Add it to this table.

## Layout gotchas learned on ep000

- Text never auto-shrinks. Give name columns more width (`widths` on Spreadsheets) and keep labels short.
- Txt inside a non-layout Rect is positioned manually; `offset={[-1, 0]}` left-aligns at `x`.
- Measure text after it's added (`node.width()`), e.g. for strike-through lines.
