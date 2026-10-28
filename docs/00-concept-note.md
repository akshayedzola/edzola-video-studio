# EdZola Video Studio: concept note

**Status:** v0.1 · pilot · 20 Oct 2026
**Owner:** Akshay (founder). Every published video needs a named human reviewer.

## 1. Why

EdZola has six years of hard-won knowledge about why nonprofit technology fails and how to make it stick: MAP, Technology That Sticks, ImpactOS, ISOM, 13 sector field guides and a library of points of view. Today it reaches people as essays, carousels and conversations. Video is how most programme leaders, funders and field teams learn, and how most people would first discover EdZola.

We are **not** building "an AI video generator". We are building **EdZola's knowledge-to-video publishing system**: a programmable studio that turns verified knowledge into excellent teaching, repeatably, at a cost that lets us publish every week.

> Someone should discover EdZola because a video taught them something genuinely useful.

## 2. Three outcomes

1. **Thought leadership.** Explain ideas, challenge assumptions, share EdZola's perspective (e.g. *a dashboard without a decision is decoration*).
2. **Teaching.** Make complex concepts understandable through visual explanations, simulations, fictional case studies and deliberate pedagogy.
3. **Product education.** Show how ImpactOS, Zolabs and DozAI solve real problems, without every video feeling like a pitch. Target mix: **70–80% educational, 20–30% product.** This is our editorial choice, not a benchmark.

## 3. The central design decision

**Separate what we teach from how we visually teach it.**

```
knowledge/  (verified, sourced)      →  what is true
editorial/  briefs + scripts          →  what this episode argues
storyboard.json                       →  narration beats + scene templates + cue actions
studio/  templates + pipeline         →  how it looks, sounds and moves
episodes/<id>/output                  →  master MP4, captions, chapters, QA
```

The same concept, *why MIS implementations fail*, can become a 5-minute explainer, a 2-minute case study, a 45-second Short or a product demo. All of them reuse the same knowledge file and the same visual templates, with different storyboards.

## 4. Principles

1. **Structured, not prompt-driven.** Nobody types "make a video about MIS". The AI proposes a storyboard (JSON), the validator checks it, and the renderer interprets it. You can edit content without touching animation, and regenerate one scene without redoing the rest.
2. **Visuals must help the viewer reason.** Show the same beneficiary in three spreadsheets and animate the records disagreeing. Never put a stock image of "a database" behind the narration. (Mayer's coherence and signalling principles.)
3. **Reusable components compound.** Every new template (DataJourney, DecisionTree…) makes the next twenty videos cheaper. Target ≥60% template reuse per episode.
4. **Open-source-first, licence-clean.** Every dependency is MIT/Apache/OFL-licensed, or the trade-off is documented. No Remotion company licence needed.
5. **Humans own the truth.** AI drafts. Humans approve facts, pedagogy, voice and brand. Our names on it means our responsibility (EdZola AI Usage Policy v2.0).
6. **Privacy by construction.** Fictional organisations (Sitara Foundation) and synthetic data only. The validator blocks phone numbers, emails and Aadhaar-like numbers in storyboards.
7. **Measure editorial effort, not output volume.** Two genuinely insightful videos a month beat twelve generic ones.

## 5. What exists today (v0.1)

- A working, reproducible pipeline: `storyboard.json` → local AI narration (Kokoro, Apache-2.0) → beat-synchronised animation (Revideo, MIT) → FFmpeg master at -14 LUFS with captions, chapters, thumbnail, contact sheet and automatic QA, including a listen-back check that transcribes the narration and flags mispronunciations.
- 7 brand-aligned scene templates: TitleHook, Spreadsheets, MetricConflict, ConceptBuild, Statement, FrameworkSteps, EndCard.
- **Episode 0, "What is an MIS, really?"** (1:49): 7 scenes, 29 narration beats, renders in about 20 seconds on an M2 Pro.
- A knowledge base distilled from the playbook, a claims register, a fictional series bible, and role briefs for the agents that will run each stage.

## 6. What success looks like

| Horizon | Signal |
|---|---|
| 4 weeks | Two polished explainers, one technical animation and one product walkthrough published; Shorts extracted; effort per video measured |
| 3 months | One substantial video per week; ≥60% template reuse; ≤1.5 person-days human effort per video |
| 12 months | The library itself is the asset: the same templates and knowledge produce partner onboarding, training modules, workshop material and Hindi/Tamil versions |

Measure audience retention, comprehension feedback, comments and questions. Views alone don't count. Recurring questions feed the next episode.

## 7. What this is not

- Not avatar or "AI presenter" video. No synthetic faces.
- Not generative-video B-roll. Every frame is programmatic, editable and reproducible from source.
- Not autonomous publishing. Nothing goes public without human review (see [07-editorial-review.md](07-editorial-review.md)).
