# Guardrails

These are non-negotiable. They protect the people our partners serve, our partners, and EdZola. CI enforces some of them; **reviewers enforce all of them**.

## 1. Privacy: no real people's data, ever
- No beneficiary, donor, student, patient or partner-staff names, phone numbers, emails, addresses, Aadhaar/PAN or any ID, photos, health or financial details.
- No call recordings, transcripts, CRM exports, emails, chat logs or meeting notes, not even "just as reference".
- Use the fictional **Sitara Foundation** cast ([knowledge/case-studies](knowledge/case-studies/sitara-foundation.md)) or new fictional characters recorded there. Show `ILLUSTRATIVE DATA` on screen whenever data appears.
- Fictional names must not match a real person you know from partner work.

## 2. Partners and confidentiality
- Don't name, depict or describe a real partner organisation, their systems or their results without **written consent**, filed with the EdZola team (never in this repo).
- Product demos use a **demo tenant with synthetic data only**. Never screen-record a partner's live system.
- No partner logos.

## 3. Truth
- Every number on screen goes through the [claims register](knowledge/claims-register.md). `needs_evidence` claims cannot ship.
- EdZola opinions are said as ours ("we've learned…"). Third-party statistics need a primary source on screen and in the description.
- Don't invent case studies presented as real.

## 4. Credentials and safety
- No API keys, tokens or passwords in any file, prompt or PR. Use environment variables. CI scans for them.
- Only install tools listed in the runbook or approved in a reviewed PR. Pin versions.

## 5. AI use
- AI drafts; humans own the result. Watch and listen to every video before asking for review, and only ship what you understand.
- **Voice cloning requires the speaker's written consent.** No cloning of public figures.
- Every YouTube description carries the AI disclosure from [docs/07](docs/07-editorial-review.md).
- Only use licence-clean models (see [docs/02](docs/02-stack-and-licensing.md)): no non-commercial weights (XTTS-v2, F5-TTS, Spark-TTS) for published videos.

## 6. Brand
- Follow the [brand voice](knowledge/edzola/brand-voice.md) and [visual language](docs/05-visual-language.md). The EdZola logo and marks are for EdZola videos only.
- 70–80% of videos teach. Product episodes need the product owner's sign-off.

## 7. Publishing
- Only EdZola maintainers publish to the EdZola channel. Nobody uploads EdZola-branded videos to personal channels.

## If something slips through
Tell a maintainer immediately (private message, not a public issue). We'll remove it and rewrite git history if needed. No blame; we'll fix the guardrail that let it through.
