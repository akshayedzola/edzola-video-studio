# Editorial review and policy

**Nothing is published without a named human reviewer.** AI output is never sent to an audience directly (EdZola Claude AI Usage Policy v2.0: "Your name on it = your responsibility").

## Non-negotiables

1. **No PII.** No beneficiary, donor or partner-staff names, phone numbers, Aadhaar, health or financial details, and no Zolabs call recordings or transcripts, anywhere in this studio: storyboards, prompts, assets or outputs. Use Sitara Foundation and synthetic data. The validator blocks obvious patterns; humans catch the rest.
2. **No credentials** in storyboards, scripts, prompts or code. Use environment variables.
3. **Partner logos, names or screenshots** need written permission, filed with the episode.
4. **Voice cloning** only with the speaker's written consent.
5. **Product walkthroughs** use a demo tenant with synthetic data, never a partner's live instance.
6. **AI-assisted disclosure** in every YouTube description: "Narration generated with an AI voice; script and visuals produced by the EdZola team with AI assistance and human review."

## Review checklist (copy into `episodes/<id>/review.md`)

**Truth**
- [ ] Every number is in the claims register with status `verified` or `illustrative`
- [ ] EdZola opinions are framed as ours ("we've learned", "in our experience")
- [ ] Fictional data is labelled "Illustrative data" on screen
- [ ] Nothing confidential or identifying

**Teaching**
- [ ] The learning outcome is actually achieved by the end
- [ ] The hook names a problem the audience feels within 10 s
- [ ] Visuals help the viewer reason (not decoration); each new idea changes the screen
- [ ] On-screen text is keywords, not the narration
- [ ] Ends with a practical takeaway

**Voice and brand**
- [ ] British English; "nonprofits", "programmes", "partners"
- [ ] No banned words (disrupt, unlock, unleash, supercharge, leverage, "digital transformation journey")
- [ ] Problem first; EdZola mentioned late and lightly in educational episodes
- [ ] Palette, type and accents per [05-visual-language.md](05-visual-language.md)

**Craft** (watch at full screen, with sound)
- [ ] Pronunciation of every name and acronym (`listen.json` flags = 0, plus a human listen)
- [ ] No cropped or overlapping labels; captions never cover content
- [ ] No awkward silences or rushed beats; key ideas get a pause
- [ ] Cues land on the right word
- [ ] `qa.json`: duration_ok, loudness_ok, black_segments 0

**Sign-off**
- Reviewer: ____  Date: ____  Effort (person-hours by stage): ____
- Status set to `approved` in `storyboard.json` by the reviewer, not by an agent.
