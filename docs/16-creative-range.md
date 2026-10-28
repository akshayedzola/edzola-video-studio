# Creative range: so 3,500 videos don't look the same

The [explainer formula](13-explainer-formula.md) is **one proven recipe, not the house style.** If every episode used its nine moves, flat characters and cream cards, viewers would stop seeing them by episode 20. EdZola's identity should come from *how well we teach*, not from one template.

So we fix very little and open up everything else.

## What every video must do (the fixed core)

These are learning principles, not formats. A reviewer can say no if one is missing.

| # | Every video must… | Why |
|---|---|---|
| 1 | Answer **one** clear question | Focus; one idea per video |
| 2 | Make the viewer **feel the problem** before naming the solution | Motivation; relevance |
| 3 | **Show the mechanism**: how it works or fails, not just that it does | Understanding beats definitions |
| 4 | Include **one active moment**: predict, choose, spot the error, pause and think | Learning sticks when the viewer works |
| 5 | Deliver **one reframe**: a moment where the viewer's model changes | It's what people remember and share |
| 6 | End with **transfer**: something to notice, ask or try in their own work | Teaching, not entertainment |

Plus the non-negotiables: [GUARDRAILS](../GUARDRAILS.md) (privacy, truth, AI use), the [brand voice](../knowledge/edzola/brand-voice.md), legible captions, accessible contrast, and the EdZola palette and fonts as the *base* of any look.

## Everything else is open

### Structure: pick or invent

| Structure | Shape | Good for |
|---|---|---|
| **Mystery** (a001) | Contradiction → investigate → twist → explanation | Conflicting numbers, failures with a hidden cause |
| **Two timelines** | Same organisation, split at a decision; watch both futures | Build vs buy, go-live vs adoption, any choice |
| **Day in the life** | Follow one person (field officer, M&E lead) hour by hour | Frontline data burden, workflows |
| **Build-along** | Start from nothing; viewer watches it assembled and could follow along | Data models, Theory of Change, dashboards |
| **Dialogue** | Two characters disagree; the viewer judges (two voices) | Myths, trade-offs, product scepticism |
| **Myth countdown** | Five beliefs, five quick demolitions | Shorts; high-energy explainers |
| **Quiz / game show** | Rounds of questions with reveals and a scoreboard | Indicators, metrics literacy |
| **Reverse** | Start with the disaster, rewind to the cause | Failed projects, data loss, compliance |
| **Letter** | Narrated as a letter to a funder, a new hire or our past selves | Thought leadership, values |
| **One chart, evolving** | A single visual that keeps changing as the argument builds | Data storytelling, outcomes |
| **Explain it three ways** | The same idea for a 10-year-old, a programme manager, an engineer | Concepts with jargon (APIs, AI, MIS) |
| **History** | How we got here: from registers to spreadsheets to systems to AI | Context-setting, Series C |
| **Field journal** | A sector told through a (fictional) notebook, map and voice notes | Sector episodes (Series S) |

Invent new ones. Add good ones to this table in your PR.

### Visual worlds: same brand, different worlds

All use the EdZola palette and Fraunces/Inter as the base, but they *feel* different. Everything here is possible in HyperFrames (HTML, CSS, SVG, Canvas, WebGL) or embeddable from Manim/Lottie.

| World | Feel | How (HyperFrames) |
|---|---|---|
| **Warm flat** (a001) | Friendly geometric people, cards, tokens | CSS shapes + GSAP |
| **Paper cut-out / collage** | Tactile, handmade, layered | SVG with paper textures, drop shadows, slight jitter |
| **Whiteboard / sketch** | Thinking out loud, drawn as it's explained | [rough.js](https://roughjs.com) hand-drawn shapes, SVG stroke-dashoffset draw-on |
| **Blueprint / schematic** | Precise, technical (great for Series B) | Grid background, line-art, monospace labels |
| **Isometric world** | A village, a centre, an office seen from above | CSS 3D transforms or pre-drawn isometric SVG |
| **Data-ink minimal** | One chart, generous space, Tufte-like | D3 / SVG, a single accent colour |
| **Kinetic type** | Words *are* the visuals; rhythm from the voice | Per-word timing, variable-font weight animation |
| **Map / cartography** | Journeys across geography (field journal) | SVG maps, path animation |
| **Chalkboard** | Classroom warmth | Dark slate, chalk texture filter, hand fonts for labels only |
| **Comic panels** | Story beats as panels, speech bubbles | CSS grid panels, camera pans between them |
| **Retro UI** | Old software, spreadsheets as artefacts | Pixel borders, system fonts, window chrome |

**Series identities** (a starting point; evolve them): A *Technology for Impact, Explained*, warm flat and paper. B *How Systems Actually Work*, blueprint and isometric. C *Building EdZola*, sketch, documentary, letters. S *Sector Field Guides*, field journal and maps, each sector with its own accent motif.

### Voice, sound and pace
- One narrator, two in dialogue, a narrator plus a "character" voice, or no narrator (kinetic type with music).
- Indian-English and regional-language narrators (as they become available) are encouraged, not exceptions.
- Music mood per episode: procedural bed, silence, a pulse that speeds up with tension. Silence is a device too.
- Length follows the idea: 60 seconds, 4 minutes or 12 minutes are all fine if every second earns its place.

## How we protect variety

1. **Every brief declares a creative bet**: what this episode tries that we haven't done before (a structure, a world, a device). Record it in the storyboard's `creative` block (below).
2. **No-repeat rule:** don't use the same *structure + visual world* combination as any of the last three published episodes in your series. TRACKER shows recent combinations.
3. **The a001 recipe is capped:** at most one in four episodes in a series uses the full nine-move mystery arc. Its *moves* (predict, twist, replay) can appear anywhere, recombined.
4. **Three treatments first:** before writing the script, sketch three genuinely different treatments (different structure *and* world) in `brief.md` and pick one. AI agents must do this too, never defaulting to the formula.
5. **Reviewers check originality:** "Could this be mistaken for another episode?" is a review question. "Yes" means changes are requested.
6. **Steal from outside the sector:** link one reference you're borrowing from (a 3Blue1Brown device, a Kurzgesagt transition, a documentary technique, a game mechanic) in the brief.

## The creative lab

- Try wild ideas in `experiments/<your-handle>-<idea>/` with a NOTES.md, outside the episode queue.
- Label issues and PRs `creative-lab`. Monthly, the team watches the experiments together and promotes the good ones into scene patterns ([patterns/](../studio/hyperframes/patterns/)) or this doc.
- New worlds and structures that ship in a published episode get added to the tables above, with a link to the episode.

## The `creative` block in a storyboard

```jsonc
"creative": {
  "structure": "two-timelines",        // from the table above, or a new name
  "visual_world": "paper-cutout",      // from the table above, or a new name
  "bet": "Split screen that diverges in real time as each decision lands",
  "references": ["Kurzgesagt-style zoom transitions"]
}
```

The validator warns when it's missing. TRACKER lists the structure and world of recently published episodes, so you can see what's been done and choose something different. Over time, `metrics.md` retention data tells us which structures teach which topics best. That's the learning loop applied to creativity.
