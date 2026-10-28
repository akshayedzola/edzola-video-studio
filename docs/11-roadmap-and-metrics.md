# Roadmap and production economics

## Four-week pilot

| Week | Goal | Status | Success test |
|---|---|---|---|
| **1. Technical proof of concept** | Install engine, FFmpeg and TTS; render one narrated, captioned, animated video from source files | ✅ **Done 20 Oct 2026.** ep000 (1:49) renders reproducibly in ~20 s; QA and listen-back automated | One fully reproducible video from source files |
| **2. Visual system** | Build DataJourney, ChartBuild, DecisionTree, Timeline; 9:16 Shorts output; subtle scene transitions; prototype one scene in HyperFrames to compare | ☐ | A second video produced mostly by changing content and props |
| **3. Editorial pipeline** | Agent-assisted brief → knowledge brief → storyboard from `knowledge/` files; review checkpoints; source tracking | ☐ | Repeatable source-document-to-preview workflow, with human gates |
| **4. Publish** | Two polished explainers (ep1, ep2), one technical animation (ep3), one product walkthrough (ep7, after product framing is confirmed); extract Shorts; log effort | ☐ | A working publishing process, not just a technical demo |

This is aggressive but plausible for someone comfortable with TypeScript and AI coding tools. Character animation and advanced storytelling will take longer.

## Pilot quality targets

| Metric | Target |
|---|---|
| Video length | 4–6 min |
| Narration | AI-generated, human-reviewed |
| Scenes | 8–15 |
| Templates reused | ≥ 60% of scenes |
| Human review | Mandatory before publishing |
| Human effort | 1–3 person-days per video initially, aiming for ≤ 1.5 |
| Frequency | 1 substantial video per week once stable |
| Technical QA | duration_ok, loudness −14 ±1.5 LUFS, 0 black segments, 0 listen-back flags |

These are planning targets, not benchmarks.

## Measured so far (ep000)

| Item | Value |
|---|---|
| Cold end-to-end (validate, voice 29 beats, render, mux, listen-back, QA) | 75 s on M2 Pro |
| Re-render after a 2-beat edit | ~45 s (27 beats from cache) |
| Animation render, 109 s @ 1080p30 | 17–20 s (2 workers) |
| Master size | ~11 MB |
| Running cost | ₹0 (all local, open-source) |

## ep000 v2 (27 Oct 2026)

| Item | Value |
|---|---|
| Length | 4:09, 9 scenes, 61 beats, 75 sound effects |
| Voice | Chatterbox (local, MIT), per-beat energy/pace; 5 lines retaken after listen-back flagged them |
| Scene render (HyperFrames, 9 scenes) | ~4.5 min |
| Narration (cold, Chatterbox) | ~25 min; retakes ~1.5 min each batch |
| QA | duration_ok, −14.9 LUFS, 0 black segments, 0 listen-back flags |

## Next technical upgrades (ranked)

1. 9:16 and 1:1 aspect support, so one storyboard yields a Short.
2. Word-level timing (WhisperX), for word-highlight captions and tighter cues.
3. `UIHighlight` + Playwright recorder for product demos.
4. Indian-English voice (consented clone or Sarvam) and a Hindi pilot.
5. Move code and storyboards to Git (Zolabs GitHub) with CI running `validate` on every PR.
