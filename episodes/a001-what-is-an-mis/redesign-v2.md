# ep000 v2: from "slides that move" to a lesson

## Why v1 doesn't teach (honest diagnosis)

| Problem in v1 | Why it hurts learning | v2 fix |
|---|---|---|
| It **tells** ("this is the problem an MIS solves") | Learners remember what they figure out, not what they're told (generation effect) | The viewer **predicts**, then sees the answer |
| The problem is shown as a static table with three cells changing | No stakes, no time, no cause. You never see *how* the mess happens | A **time-lapse of one quarter**: events fly from the field into three sheets and drift apart, live |
| The MIS is a box diagram that appears | A definition, not a mechanism. You never see it *work* | **Replay the same quarter** through an MIS; watch the same events land once and the numbers converge |
| No analogy | New concepts stick when attached to something familiar | A **hospital patient chart**: nobody would accept three doctors with three files on one patient |
| No "aha" | Nothing surprises you | **The twist**: none of the three numbers was right. 500 rows were 463 people |
| One flat voice speed, no emotion, no sound | Monotone = low arousal = low attention | Per-beat pace and energy, expressive voice, **sound design** (pops, whooshes, ticks), light music bed with ducking |
| Ends with a framework card | Abstract; nothing to do | **Three questions to ask your organisation on Monday**, then MAP |
| 1:49, one idea per minute | Too thin to teach | ~4:30, eight chapters, a full arc |

## The v2 lesson arc (≈ 4.5 min)

**1. Cold open: the mystery (0:00–0:25)**
Funder call tomorrow at 10. One question: "How many learners did you place?" Three teams answer at once: 312, 287, 341. Numbers slam onto the screen. *"Same organisation. Same quarter. Three answers. Who's lying?"* … *"Nobody. And that's the problem."*
→ Teaching move: curiosity gap + stakes. Title card: **What is an MIS, really?**

**2. Meet the patient (0:25–0:55): analogy**
A hospital. One patient. The doctor, the nurse and the pharmacist each keep their own file. The doctor changes a dose; the pharmacist's file doesn't know. *"You'd walk out of that hospital."* Now swap: patient → learner, doctor → programme team, pharmacist → finance. *"Most nonprofits run exactly like this."*
→ Teaching move: anchor a new concept to a familiar, emotionally loaded one.

**3. Watch a quarter happen (0:55–1:50): simulation**
Sitara Foundation. Kavya enrols. An event dot flies from a field officer's phone… into the Programme sheet only. Attendance logged by a trainer… goes to M&E a week later, typed again. Stipend paid… only Finance knows. Time-lapse: weeks tick by on a clock, dozens of dots fly, copies drift, a "copy-paste hours" counter climbs. Kavya is "Kavya Sharma", "Kavya S." and "K. Sharma".
→ Teaching move: show the *mechanism* of the failure, not just the result.

**4. Predict (1:50–2:10): retrieval**
*"Pause. If you had to send one number to the funder, which would you pick?"* Three cards. A 3-second countdown ring.
→ Teaching move: prediction makes the reveal memorable.

**5. The twist (2:10–2:45): reveal**
Rows pull together. Duplicates merge (three Kavyas become one). 500 rows collapse to 463 real people. Recount: **298** placed. *"None of the three numbers was right. Each team counted correctly. They were counting different things."*
→ Teaching move: surprise; corrects the "someone made an error" misconception.

**6. Build the MIS, layer by layer (2:45–3:40): construction**
Five layers stack up like floors of a building, each solving a problem we just saw:
1. **One ID per person** → no more three Kavyas
2. **One place to record each event** → no retyping
3. **Shared definitions and rules** → "placed" means the same thing to everyone; can't be placed before trained
4. **Views for every team** → each team sees its own screen, from the same data
5. **A loop back to the field** → "Kavya missed 3 sessions. Call her today."
Big word lands: **MIS = one record, shared by everyone, that the work runs through.**

**7. Replay the quarter, with an MIS (3:40–4:05): before/after**
Split screen. Same events. Left: chaos, three sheets. Right: every dot lands in one record; the report counter reads **298** for everyone. *"The funder call takes two minutes."*

**8. What an MIS is not, plus Monday questions (4:05–4:30): transfer**
Three quick strikes: not software you buy · not a dashboard (*a dashboard without a decision is decoration*) · not a bigger spreadsheet.
Three questions for Monday: How many places does one learner live? Who decides what "placed" means? Does the data ever come back to the field?

**9. Close (4:30–4:45)**
MAP in one breath (Model · Align · Power), end card, next episode teaser.

## Production upgrades this needs

| Area | Upgrade |
|---|---|
| Voice | Per-beat `pace` and `energy`; expressive model (Chatterbox `exaggeration`) tested against tuned Kokoro; deliberate pauses before reveals |
| Sound | Procedural SFX (pop on reveal, whoosh on movement, tick on clock, low hit on twist), music bed ducked under voice |
| Motion | Moving event tokens, time-lapse clock, counters that roll, merge/collapse animations, camera push-ins, kinetic typography on key words |
| Templates | `CaseOpen` (numbers slam), `Analogy` (hospital ↔ nonprofit swap), `QuarterSim` (event tokens → sheets), `Predict` (countdown), `Collapse` (dedup reveal), `LayerStack`, `SplitReplay`, `NotList` |
| Tools tried | Revideo (current), **HyperFrames** (HTML/GSAP, agent-native), **Manim** (precise transforms) on the same scene, to pick the best engine per scene type |
