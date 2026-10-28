# Mental Health

> Care that's measured gently, kept private, and never loses someone.

**Status:** edzola_opinion (EdZola MAP Field Guide). Fields and indicators are starting points for a human to adapt.

Task-shared mental health care works because trained lay counsellors can deliver structured therapy close to home. It also means the system has to hold what a clinic would: risk protocols, supervision, fidelity and strict confidentiality. Good data here is quiet and minimal, and it exists so that nobody in distress falls through a gap between screening and care.

## The data thread: Client ID

A pseudonymous Client ID links a person's screening score, intake, every session and their follow-up re-measures. Names and phone numbers sit in a separate, locked contact table that only the assigned counsellor and supervisor can open.

## Core entities

- **Client**: One person seeking support, identified by a pseudonymous ID, with contact details held separately.
- **Screening**: Each PHQ-9 or GAD-7 administration, with score, item 9 response and setting.
- **Risk Assessment**: Suicide and harm risk level, safety plan status and escalation taken, time-stamped.
- **Care Plan**: Severity tier, intervention (IPT-G, HAP, referral), counsellor or group assigned, consent recorded.
- **Session**: Each group or individual session: attendance, session number, symptom check, brief structured note.
- **Counsellor**: Lay counsellor or CHW, with training status, caseload and supervision history.
- **Supervision Record**: Case review and fidelity or competence ratings (e.g. ENACT) from the supervisor.

## Stage: Awareness & Screening

**Screening for depression in villages where nobody says 'depression'**

People describe it as tension, a heavy heart, thinking too much. Sensitisation has to meet those words before a PHQ-9 means anything. Screening only helps if every positive score, and especially every positive item 9, reaches a person who can respond that week.

*Decision it serves:* Helps the programme coordinator decide which screened people need a full intake, who needs same-day risk follow-up, and which communities or referral sources are reaching people in distress.

*How the work flows:*
1. **Run community sensitisation** (CHW / community mobiliser): Stigma-reduction sessions using local idioms of distress; log attendance and where the session happened.
1. **Screen with consent** (CHW / primary care nurse): Administer PHQ-9 or GAD-7 verbally in the local language after explaining why and who sees results.
1. **Act on item 9 immediately** (Screener): Any non-zero answer on self-harm thoughts triggers the risk protocol before the screener leaves.
1. **Log referrals from partners** (Coordinator): Record referrals from schools, PHCs, ASHAs and self-referral with source, so pathways can be tracked.
1. **Offer next step** (Screener): Share results kindly, explain the programme, book an intake if the person agrees.

*Where AI genuinely helps (MAP: Power):*
- Build Faster (L1): Adapt sensitisation scripts into local idioms and dialects, drawing on transcripts of community conversations. *Needs first:* De-identified community input and a local reviewer who knows the idioms.
- Know Faster (L3): Monthly summary of which settings and referral sources produce intakes, not just screens. *Needs first:* Clean links between screening and intake records.
- Collect Faster (L2): Audio-assisted PHQ-9 that reads items in the local language on the phone. *Needs first:* Validated translated versions of the tool, recorded by a native speaker.

*Field note:* Programmes celebrate screening numbers while half the positive screens never get a call back. A screen without a next step can leave someone worse off for having spoken up.


## Stage: Assessment & Enrolment

**An intake that feels safe and gets risk right**

The first one-on-one conversation decides whether someone comes back. It's also where risk has to be assessed properly and a safety plan made with the person, not for them. Triage sets whether they join a group, see a counsellor alone, or need a psychiatrist.

*Decision it serves:* Helps the supervisor decide the right level of care for each person: group therapy, individual sessions, specialist referral, or immediate crisis response.

*How the work flows:*
1. **Explain consent and confidentiality** (Lay counsellor): Cover what's recorded, who sees it, and the limits of confidentiality if there's risk to life.
1. **Conduct the intake** (Lay counsellor): Structured intake: presenting concerns, functioning, supports, stressors, previous care, in the person's words.
1. **Assess suicide and harm risk** (Lay counsellor): Structured risk questions; build a safety plan with the person where risk is present.
1. **Triage severity** (Supervisor): Use scores, risk and functioning to assign a stepped-care tier within 48 hours.
1. **Assign and schedule** (Coordinator): Place in an IPT-G group or with an individual counsellor, matched by language, gender and location.

*Where AI genuinely helps (MAP: Power):*
- Work Smarter (L2): Suggest group placements based on language, location, gender preference and open slots. *Needs first:* Accurate group rosters and client preferences in structured fields.
- Build Faster (L2): Turn the supervisor's triage protocol into a checklist on the counsellor's tablet. *Needs first:* A written, clinically approved triage protocol.
- Know Faster (L3): Monthly view of waiting time from screen to first session, by district and tier. *Needs first:* Reliable dates on screening, intake and first session.

*Field note:* Consent forms read out in a rush aren't consent. Where people later find out their family could see their notes, word spreads and intakes stop.


## Stage: Therapy Delivery

**Keeping IPT-G and HAP sessions faithful, attended and supervised**

Brief structured therapies work in trials because they're delivered as designed. In the field, sessions get shortened, content drifts, and groups thin out by week four. Attendance, weekly symptom checks and fidelity ratings tell you whether people are getting the therapy that works.

*Decision it serves:* Helps the supervisor decide which clients need extra support or a step up in care, which groups need reinforcement, and which counsellors need more supervision on specific skills.

*How the work flows:*
1. **Run the session** (Lay counsellor): Deliver the session as per manual (IPT-G, HAP, Thinking Healthy), in group or individually, in person or by phone.
1. **Brief symptom check** (Lay counsellor): Quick PHQ-9 at set sessions to see if the person is improving, stuck or worse.
1. **Record attendance and a short note** (Lay counsellor): Who attended, session number, key problem area addressed, any risk change.
1. **Supervise and rate fidelity** (Supervisor): Weekly group supervision with case review; rate recorded or observed sessions on a competence tool like ENACT.
1. **Coordinate medication where needed** (Medical officer / psychiatrist): Clinician reviews clients needing medication and records prescription separately from therapy notes.

*Where AI genuinely helps (MAP: Power):*
- Work Smarter (L2): Draft fidelity feedback for supervisors from session audio, highlighting skills used and missed. *Needs first:* Explicit consent for recording, private deployment, and a validated competence rubric.
- Know Faster (L3): Flag non-responders and dropout risk from attendance and score patterns. *Needs first:* Consistent session-level scores and attendance over at least one cohort.
- Build Faster (L1): Produce session handouts and homework sheets in local languages from the manual. *Needs first:* The licensed, approved manual content.

*Field note:* When fidelity isn't measured, sessions slowly become friendly chats. People feel listened to, scores don't move, and the programme can't tell why.


## Stage: Monitoring & Follow-up

**Knowing who stays well at six months, and who's slipping**

End-of-therapy scores look good. What matters is whether people are still well three to six months later, back at work, managing their household. Relapse checks and alumni groups keep the door open, and the data tells you if the gains hold.

*Decision it serves:* Helps the supervisor decide who needs a booster session or re-entry into care, and gives the programme lead honest evidence of sustained recovery for funders and policy partners.

*How the work flows:*
1. **Re-measure at end of therapy** (Lay counsellor): Final PHQ-9 or GAD-7 and a short functioning check at the last session.
1. **Follow up at 3 and 6 months** (CHW / counsellor): Home visit or phone call to re-screen, check functioning and ask gently about risk.
1. **Offer re-entry or booster** (Supervisor): Clients whose scores rise are offered booster sessions or a new care episode.
1. **Support peer and alumni groups** (Peer facilitator): Alumni groups meet monthly; attendance logged, not content.
1. **Close the episode** (Supervisor): Record the discharge reason and final status with the client's agreement.

*Where AI genuinely helps (MAP: Power):*
- Know Faster (L3): Cohort analysis of what's linked to sustained remission: session dose, group, fidelity, alumni attendance. *Needs first:* Complete follow-up data and linked session records.
- Build Faster (L2): Draft the funder outcomes report with aggregate results and anonymised themes. *Needs first:* Aggregated outcomes and approved anonymised stories.
- Collect Faster (L3): IVRS follow-up re-screens for clients who prefer not to be visited at home. *Needs first:* Validated IVRS version of the tool and client consent for calls.

*Field note:* Six-month follow-up rates of 40% are common, and the people you can't reach are rarely the ones doing well. Report outcomes with the reach rate beside them, every time.

## Episode ideas

See `catalog/` for the generated episode list for this sector (overview + one episode per stage + cross-cutting topics).
