# The EdZola explainer formula

What made *What is an MIS, really?* (v2) work. Reference implementation: [`episodes/a001-what-is-an-mis/`](../episodes/a001-what-is-an-mis/).

> **This is one proven recipe, not a template.** Use it to understand *why* a lesson works. Then read **[16: creative range](16-creative-range.md)**, which sets out the six things every video must do and the many structures and visual worlds for doing them. At most one in four episodes in a series uses this full nine-move arc; its individual moves (predict, twist, replay…) can be remixed into any structure.

> **One-line version:** make the viewer *feel* the problem, *watch* the mechanism, *guess*, get *surprised*, then *build* the answer with us and *take it home*.

## Why v1 didn't land and v2 did

| v1 (1:49): "slides that move" | v2 (4:09): a lesson |
|---|---|
| Told the viewer what an MIS is | Let them figure it out (prediction, then reveal) |
| Static table with three cells changing | Time-lapse of a quarter: events flying into sheets, copies drifting |
| A box diagram appears | The MIS is *built* floor by floor, each floor fixing a failure we just watched |
| No analogy | A hospital where three professionals keep three files on one patient |
| No surprise | The twist: none of the three numbers was right |
| One flat voice speed | Per-line pace, energy and acting direction; sound effects; music ducked under voice |
| Ends on a framework card | Ends on three questions to ask your team on Monday |

## The nine moves (the a001 recipe)

In a001 they ran in this order. Rough timings are for a 4–5 minute explainer. Each move serves one of the six fixed principles in [docs/16](16-creative-range.md), and other structures serve the same principles differently.

| # | Move | Job | ep000 v2 example | Scene pattern |
|---|---|---|---|---|
| 1 | **Cold open: the mystery** (0:00–0:25) | Curiosity gap plus stakes. No logo, no definition. End on the title | "Tomorrow, 10 a.m. The funder asks one question. Three teams, three answers. Who got it wrong? Nobody." | `CaseOpen` |
| 2 | **Analogy** (~30 s) | Anchor the new idea to something familiar and emotional, then map it back word by word | Hospital: doctor, nurse, pharmacist, one patient → programme, M&E, finance, one learner | `Analogy` |
| 3 | **Watch it happen** (~45 s) | Show the *mechanism* of the problem, live. Time-lapse, moving tokens, rising counters | Week by week, events land in one sheet only; spellings multiply; hours counter climbs to 120 | `QuarterSim` |
| 4 | **Predict** (~15 s) | Ask the viewer to commit to an answer. Give real silence (3 s countdown) | "Which number would you send the funder?" | `Predict` |
| 5 | **The twist** (~30 s) | Overturn the expectation; reframe the misconception | 500 rows are 463 people; 298 placed; "Each team counted correctly. They were counting different things." | `Collapse` |
| 6 | **Build the answer** (~50 s) | Construct the concept piece by piece; each piece fixes a failure from move 3 | Five floors: one ID, one place per event, shared rules, a view per team, a loop back to the field | `LayerStack` |
| 7 | **Replay** (~25 s) | Same situation, with the answer in place, side by side | Same quarter: three versions on the left, one record and one number on the right | `SplitReplay` |
| 8 | **What it's not + Monday questions** (~30 s) | Dismantle 2–3 misconceptions fast, then transfer to the viewer's world | Not software you buy, not a dashboard, not a bigger spreadsheet; three questions for your team | `NotList` |
| 9 | **Close** (~15 s) | EdZola point of view in one breath, sign-off, next-episode tease | MAP in three moves; "Next time: why 80% placement…" | `Close` |

### Choosing the analogy (move 2)

A good analogy is **familiar** (everyone has been to a hospital), **high-stakes** (a wrong dose matters), **structurally identical** (several actors, one subject, separate records) and **mappable word for word**. Test: can you swap every noun in the analogy for one in the real situation? If not, find another.

Some that work for our topics: a **hospital chart** (fragmented records), a **railway timetable** (shared definitions), a **kitchen** (workflow before automation: "don't automate a messy kitchen"), a **GPS** (dashboards that drive decisions), a **ration card** (one ID), **school report cards** (output vs outcome indicators).

### Designing the twist (move 5)

The twist overturns the most common wrong explanation. In ep000 the wrong explanation is "someone made an error"; the twist is "everyone was right about something different". Write down the viewer's likely guess at move 4, then make move 5 show why it's incomplete, with data you can animate.

## Script rules (they made the voice work)

- **One beat = one spoken sentence**, ideally under 15 words. Every beat changes something on screen.
- Each beat carries **voice direction**: `pace` (0.85–1.15), `energy` (0–1) and an acting note (`"Slow and deliberate, each phrase landing."`). Vary them deliberately: slow before a reveal, fast during a time-lapse, warm for the definition.
- Put **pauses** after key ideas (0.5–0.9 s) and **real silence** for predictions (2.5–3 s).
- Numbers: digits in `text` (captions), spelled out in `say` (voice). Acronyms go in `studio/lexicon.json`.
- Opinions are said as ours ("We've learned…"). British English. No em dashes. No banned words ([brand voice](../knowledge/edzola/brand-voice.md)).
- **Listen-back is mandatory.** Expressive voices sometimes slur short punchy lines ("So who got it wrong?" came out "So, get it well"). Fix with a new `seed` (a different take), a calmer `energy`, or a `say` rewrite ("Kavya" → "Kaavya"). Captions keep the original text.

## Visual rules

- **Motion explains.** Things move where data moves: tokens fly into sheets, duplicates merge, numbers roll, floors stack. Never decoration.
- **One focal point at a time.** The narrated thing appears, pulses or shakes exactly when it's named.
- **Keywords on screen, sentences in the voice.** Captions are an accessibility layer.
- **Fixed semantic colours:** Programme coral, M&E yellow, Finance teal; MAP is M coral, A teal, P yellow; danger, warning and success states. Fictional data always shows `ILLUSTRATIVE DATA`.
- Calm ease-out reveals, a soft pop for small things, weight (thud) for structural things. Keep content above y = 900 px (captions live below).
- Pass `hyperframes check` (overlap, contrast ≥ 4.5:1 for text, GSAP pitfalls) and **look at a snapshot of every beat**.

## Sound design rules

- Effects mark meaning: `pop` (something appears), `whoosh`/`swish` (data moves), `tick` (time, countdown), `thud` (structure lands, a hard truth), `chime` (insight, the answer), `rise` (building tension), `ping` (notification), `error` (something blocked), `strike` (crossed out), `scribble` (writing).
- Roughly one effect per beat, never more than three.
- The music bed is quiet and automatically ducked under the voice. Turn it off for dense technical explanations.

## Production loop (what actually happened on v2)

1. Write the storyboard (beats + voice direction + `visual` brief per scene).
2. `npm run narrate`, then `npm run listen`. Retake flagged lines until there are 0 flags (only changed lines re-voice).
3. Build scenes in HyperFrames, one HTML file per scene, timed by `EZ.b(n)` / `EZ.at(n, f)`; check and snapshot every beat.
4. `npm run render`: scenes → join → mix (voice + 75 effects + ducked bed) → −14 LUFS → captions, chapters, QA.
5. Human review with sound, full screen. Write `review.md` and add what you learned to [LEARNINGS.md](../LEARNINGS.md).

## Adapting the recipe: three worked examples

These show the recipe stretched to new topics. Equally valid: tell *build, buy or customise* as **two timelines**, *AI voice agents* as **explain it three ways**, or *80% placement* as **one chart, evolving**. Pick by what teaches the idea best, and by what the series hasn't done lately.

| Move | *Why 80% placement isn't 80% employment* | *Should you build, buy or customise?* | *How AI voice agents actually work* |
|---|---|---|---|
| 1 Cold open | Annual report: "80% placed!" Six months later, a funder call | Three vendors pitch on one day; the board wants a decision Friday | A phone rings in a village; the "caller" is an AI |
| 2 Analogy | A restaurant counting "seated customers" as "satisfied customers" | Renting, buying or building a house | A skilled interviewer with a clipboard and a script |
| 3 Watch | Funnel animates: offered → joined → 30 days → 90 days → 6 months | Same organisation, three futures over three years | The call: speech → text → understanding → next question → summary |
| 4 Predict | "What share are still employed at 6 months?" | "Which option is cheapest over 3 years?" | "What's the hardest part for the AI?" |
| 5 Twist | Retention is under half; "placed" was a leading indicator | The cheapest option today is the most expensive in year 3 | Listening, not talking: knowing when a person has finished |
| 6 Build | Leading vs lagging indicators; a follow-up system | A decision tree: process clarity, capacity, budget, uniqueness | The pipeline, block by block, with a human in the loop |
| 7 Replay | Same cohort tracked properly | Fast-forward each choice | A real (synthetic) call, annotated |
| 8 Not + Monday | Not a vanity metric, not a one-time survey… | Not a tech decision, not forever… | Not a chatbot, not a replacement for staff… |
| 9 Close | MAP: model what's worth knowing | "Problem first, tool last" | Zolabs, lightly |
