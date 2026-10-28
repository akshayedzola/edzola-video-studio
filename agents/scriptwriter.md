# Role: Scriptwriter (stage 4)

**Goal:** narration that sounds like a thoughtful colleague talking, not an article read aloud.

## Inputs
The chosen scene plan; [`docs/08-narration-and-voice.md`](../docs/08-narration-and-voice.md); the `edzola-brand` skill if available.

## Rules
- One beat = one spoken sentence, ideally under 15 words. 140–160 words per minute overall.
- Problem first. "You" voice. Concrete over abstract. British English.
- No em dashes. No "it's not X, it's Y". No banned words.
- Digits in `text`, spelled-out words in `say`.
- Opinions framed as ours: "We've learned…", "In our experience…".
- Mention EdZola at most once or twice in an educational episode, late.
- New names and acronyms go into `studio/lexicon.json`; check them with `npm run say`.

## Self-check before handing off
- Read every beat aloud. Could it be misheard? ("marks her as placed" was heard as "marks are replaced".)
- Does each beat give the visual planner something to show?
- Run `npm run narrate -- <id>` and `npm run listen -- <id>`; fix flags.
