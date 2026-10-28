# Production playbook: from knowledge to YouTube

Eight stages. Each has one deliverable, an owner and a gate. "Agent" means an AI agent working from the brief in [`agents/`](../agents/). "Human" means a named EdZola reviewer.

| # | Stage | Deliverable (path) | Agent | Human gate |
|---|---|---|---|---|
| 1 | Pick one idea, one learning outcome | `episodes/<id>/brief.md` | Researcher drafts | Editor approves the question and audience |
| 2 | Extract and verify knowledge | `episodes/<id>/knowledge-brief.md` | Researcher | Subject expert signs off facts; claims go into the register |
| 3 | Design the learning experience | 3 teaching approaches → chosen scene list in the brief | Instructional designer | Editor picks the approach |
| 4 | Write for the ear | `beats` text in `storyboard.json` | Scriptwriter | Read aloud once (`npm run say`) |
| 5 | Generate visuals from templates | `scenes[].template/props/do` in `storyboard.json`; new templates if needed | Visual planner + scene engineer | `npm run validate` passes |
| 6 | Synchronise, compose, render | `episodes/<id>/output/` | Pipeline (`npm run render`) | QA green (`qa.json`) |
| 7 | Editorial and technical review | `episodes/<id>/review.md` | Reviewer agent pre-checks | **Human approval. Mandatory.** Status → `approved` |
| 8 | Publish, measure, reuse | YouTube upload, Shorts, `episodes/<id>/metrics.md` | Publisher drafts description | Human uploads; nothing auto-publishes |

## Stage notes

**1. One idea.** Each video answers one specific question ("What is an MIS, really?"), never "digital transformation". The brief has: audience, the problem they feel, our central argument, what they'll understand afterwards, the format, and the series. Use [`episodes/_template/brief.md`](../episodes/_template/brief.md).

**2. Knowledge.** Pull from `knowledge/` first, then from the playbook sources it cites. Separate **facts** (need evidence), **EdZola opinions** (say as ours) and **illustrative** material. Exclude anything confidential or personal.

**3. Learning design.** Have the model propose three ways to teach the idea: a **story** (fictional case), a **simulation** (watch the system behave), a **visual explanation** (build the model). Choose by what the audience needs to *understand*. The default arc is: hook with a felt problem → misconception or tension → build the mental model → test it (a question, a contradiction) → practical takeaway → next episode. See [09-pedagogy-and-formats.md](09-pedagogy-and-formats.md).

**4. Narration.** Conversational and spoken: short sentences, one idea per beat, concrete examples, "you" voice, British English. Numbers in `text` are digits (for captions) with a spelled-out `say` override. Add new names to `studio/lexicon.json`. See [08-narration-and-voice.md](08-narration-and-voice.md).

**5. Visuals.** Choose templates from `studio/templates.manifest.json`. Every beat that introduces a new idea should change something on screen (signalling). Keep on-screen words to keywords. Only build a new template when ≥2 future episodes will reuse it.

**6. Render.** `npm run render -- <id>` does narration, animation, mux, captions, chapters, thumbnail, contact sheet, listen-back and QA. Iterate scene by scene; unchanged beats come from the cache.

**7. Review.** Use the checklist in [07-editorial-review.md](07-editorial-review.md): facts, pedagogy, pacing, brand, privacy, rendering (cropped labels, overlaps, awkward silences). Record the reviewer's name and date in `review.md`.

**8. Publish and learn.** Title is the viewer's question. Description: a 2-line summary, chapters (from `chapters.txt`), sources, "Illustrative data" note, and an AI-assistance disclosure (see policy). Upload the `.srt`. Cut 2–4 Shorts from the strongest scenes. After 14 and 28 days, record retention, comments and questions in `metrics.md`. Recurring questions seed the next brief.

## Effort log

Track human time per stage in `episodes/<id>/review.md`. The most important metric is meaningful human editorial time per excellent video. Target ≤1.5 person-days by month three.
