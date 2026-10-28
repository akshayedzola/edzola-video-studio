# Storyboard spec

The storyboard is the contract between editorial and rendering. Schema: [`schemas/storyboard.schema.json`](../schemas/storyboard.schema.json). Catalogue of templates and actions: [`studio/templates.manifest.json`](../studio/templates.manifest.json). A complete working example: [`episodes/x000-revideo-pilot/storyboard.json`](../episodes/x000-revideo-pilot/storyboard.json).

## Shape

```jsonc
{
  "video_id": "ep001-placement-vs-employment",   // kebab-case, matches folder name
  "title": "Why 80% placement isn't 80% employment",
  "series": "Technology for Impact, Explained",
  "audience": "...", "learning_outcome": "...",  // one sentence each
  "format": "data_storytelling",                 // one of the 8 pedagogical formats
  "status": "draft",                             // draft → in_review → approved → published
  "captions": "burned",                          // or "sidecar" (SRT only)
  "voice": {"engine": "kokoro", "voice": "bf_emma", "speed": 1.0, "lang": "en-gb"},
  "sources": ["knowledge/..."],                  // knowledge files used
  "claims": [{"claim": "...", "source": "...", "status": "verified|edzola_opinion|needs_evidence|illustrative"}],
  "scenes": [
    {
      "id": "hook",                    // kebab-case, unique
      "type": "hook",                  // pedagogical role (free text, see 09)
      "chapter": "Why reports start arguments",   // YouTube chapter starts here (optional)
      "template": "TitleHook",         // from templates.manifest.json
      "props": { ... },                // template-specific content
      "notes": "teaching intent",      // not rendered; for reviewers and agents
      "lead_in": 0.6, "hold": 0.9,     // optional silence before/after (s)
      "beats": [
        {
          "text": "Programme says 312.",                    // captioned narration
          "say": "Programme says three hundred and twelve.", // optional TTS override
          "pause": 0.35,                                    // silence after (s)
          "do": [{"action": "show-value", "i": 0, "at": 0.2}]
        }
      ]
    }
  ]
}
```

## Timing rules

- A **beat** is one spoken sentence or clause, ideally under 15 words. Its duration is the measured TTS length.
- `at` is the position within the beat (0 = when the beat starts, 1 = when it ends). `delay` adds seconds. Put the cue where the key word is spoken: "Programme marks her as **placed**" → `at: 0.7`.
- Actions run concurrently and never delay the narration.
- Scene duration = `lead_in` + beats + pauses + `hold`, rounded up to whole frames.
- Use `pause` of 0.5–0.8 s after a key idea so it can land.

## Pacing targets

| Measure | Target |
|---|---|
| Hook | ≤ 10 s, no logo intro |
| Something changes on screen | at least every 4–6 s |
| Pattern interrupt (new template/scene) | every 20–40 s |
| Scene length | 8–30 s |
| Explainer length | 4–6 min (pilot ep000 is 1:49) |
| Words per minute | 140–160 |

## Validator checks (`npm run validate -- <id>`)

- **Errors:** schema; unknown template or action; PII patterns (emails, Indian mobile numbers, 12-digit IDs); `needs_evidence` claims when status is approved/published; missing source files.
- **Warnings:** beats over 200 characters; em/en dashes in narration; banned brand words; non-preferred terms ("NGO", "clients", "program", "organization").

## Editing an approved storyboard

Change `status` back to `in_review`. Re-render: only edited beats are re-voiced. Re-review the changed scenes.
