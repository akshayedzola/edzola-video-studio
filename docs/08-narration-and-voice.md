# Narration and voice

## Writing for the ear

- **One beat = one spoken sentence**, ideally under 15 words. Read it aloud; if you run out of breath, split it.
- Conversational "you" voice, contractions, concrete examples ("the same learner in three spreadsheets"), not abstractions ("data fragmentation challenges").
- Lead with the viewer's problem, and name EdZola late. Validate before prescribing ("Sound familiar?").
- Avoid "it's not X, it's Y". Say "Many teams think X. But Y." and let the visual do the contrast.
- No em dashes. Use full stops; the voice pauses better on them.
- Numbers: write digits in `text` (captions) and spell them out in `say`.
- Avoid words that blur into homophones when spoken. ep000's "Programme marks her as placed" was transcribed as "program marks are replaced", so we rewrote it. The listen-back check exists to catch exactly this.

## Voice settings

| Setting | Default | Notes |
|---|---|---|
| Engine | `kokoro` (local, Apache-2.0) | `macos-say` is a no-dependency fallback (`Aman` en-IN voice), lower quality |
| Voice | `bf_emma` (British female) | Alternatives: `bf_isabella`, `bm_george`, `bm_lewis` (British), `af_heart` (American, best overall quality). Hindi: `hf_alpha`, `hf_beta`, `hm_omega`, `hm_psi` |
| Speed | 1.0 | 0.95 for dense technical episodes |
| Lang | `en-gb` | Matches British English spelling |

Pick one voice per series and keep it. Viewers bond with a consistent narrator.

## Pronunciation lexicon

[`studio/lexicon.json`](../studio/lexicon.json) rewrites words before TTS (captions keep the written form): EdZola → "Ed Zola", MIS → "M.I.S.", M&E → "M and E", DozAI → "Doz A.I.", and so on. To check a word: `npm run say -- "DozAI verifies placements"` (plays the audio). Add every new product, acronym or (fictional) name before rendering.

## Listen-back QA

`npm run listen -- <id>` (also part of `render`) transcribes each beat with Whisper and compares it with the intended words, ignoring spelling variants and number formats. Flagged beats appear in `output/listen.json`. Fix them with a lexicon entry, a `say` override or a rewrite. A human still listens to the full master before approval.

## Upgrade path

1. **Indian-English narrator:** clone a consenting EdZola team member's voice with Chatterbox (MIT, local), or use Sarvam Bulbul v3 (en-IN, API). Add the engine to `narrate.py`'s `Voice` class; the rest of the pipeline is unchanged.
2. **Hindi / Tamil versions:** translate `text` per beat (human-reviewed), set `voice.lang`, re-render. Visual text in `props` needs translating too, so keep it short.
3. **Word-level timing** (for word-by-word caption highlighting): add WhisperX forced alignment of the known text.
4. **Music:** licensed beds only, in `assets/music/` with licence notes. Set `"music": "file.mp3"` in the storyboard; it's mixed at −24 dB. Coherence principle: leave music off for dense explanations.
