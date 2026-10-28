# Child Rights & Protection

> Every decision on a child's file, made in their best interest

**Status:** edzola_opinion (EdZola MAP Field Guide). Fields and indicators are starting points for a human to adapt.

A child who calls 1098 at midnight may pass through a helpline counsellor, a police officer, a CWC bench, a shelter and a home visit before anyone asks if they're safe a year on. When each of those hands keeps its own register, the child retells their story five times and the follow-up nobody owns is the one that slips. Case management built around one child's file keeps the care plan, the orders and the risk in view of the people responsible for them, and only those people.

## The data thread: Child Case ID

One case ID is opened at the first call or contact and carries the child from intake to CWC order, care plan, restoration and closure. It links every assessment, order and home visit to one child, so nobody has to re-interview them to find out what's already known.

## Core entities

- **Child**: The child at the centre of the case: age or age estimate, gender, languages, disability, and a restricted identity block visible only to the case team.
- **Case**: The protection concern and its lifecycle: category (missing, trafficked, child labour, abuse, child marriage, CICL), risk level, status and assigned caseworker.
- **Incident / Call**: Each helpline call, walk-in or outreach report, with source, location and triage outcome, linked to a case once verified.
- **Statutory Order**: CWC or JJB orders, FIR and GD numbers, placement and restoration orders, with dates and the authority that issued them.
- **Care Plan**: The Individual Care Plan: needs across health, education, psychosocial and family, with goals, responsible agency and review dates.
- **Family / Guardian**: Parents, kin or fit persons, their assessed capacity to care, and scheme eligibility for restoration support.
- **Follow-up Visit**: Post-restoration home or school visits with safety check, school attendance and a risk re-rating.

## Stage: Identification & Reporting

**From a 1098 call to a verified case in hours**

Most children in need of care and protection reach us through a stranger's phone call, a teacher's worry or a street outreach worker who noticed the same child three nights running. The first record decides how fast someone gets there. Log too little and the field team goes in blind; log too much and you've documented a disclosure the child hasn't consented to share.

*Decision it serves:* The helpline or drop-in coordinator decides which reports need an emergency field response tonight and which can go to verification tomorrow.

*How the work flows:*
1. **Receive report** (Helpline counsellor or outreach worker): Take the call, walk-in or community referral. Capture location, concern category and caller relationship, not a full interview.
1. **Triage urgency** (Helpline counsellor): Rate immediate danger: child alone at night, active abuse, injury, trafficking in transit. Emergency cases go to the field team at once.
1. **Check for existing case** (Case coordinator): Search by location, approximate age and descriptors before opening a new file, so a runaway returning isn't logged as new.
1. **Dispatch or schedule verification** (Case coordinator): Assign a field worker, alert police or CCPC member where needed, and set a verification deadline by risk level.
1. **Close or convert** (Field worker): Verified concerns become a case with a case ID. Unfounded calls are closed with a reason, never deleted.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Transcribe regional-language helpline calls into draft triage fields for the counsellor to confirm. *Needs first:* A privately deployed speech model and a fixed triage schema agreed with the helpline team.
- Work Smarter (L2): Suggest possible existing cases by matching location, age band and descriptors. *Needs first:* Clean, deduplicated case history with consistent location fields.
- Know Faster (L3): Weekly hotspot summary of reports by location and category for the programme team. *Needs first:* Twelve months of geocoded, categorised incidents.

*Field note:* Teams open a new file every time the same child calls or is found again. By the fourth contact nobody sees the pattern of repeated running away that should have triggered a home assessment.


## Stage: Rescue & Case Assessment

**Produce before the CWC with the facts already assembled**

Once a child is rescued, the JJ Act clock starts: production before the Child Welfare Committee within 24 hours. The CWC decides on interim care based on what the caseworker brings, and a thin file means a placement made on guesswork. This is also the stage where the child is most exposed to repeated questioning, so every fact collected once must be usable by everyone who needs it.

*Decision it serves:* The CWC decides interim placement and the caseworker decides immediate care needs, both using the social investigation and risk assessment.

*How the work flows:*
1. **Verify and plan rescue** (Field worker with police, AHTU or labour department): Confirm facts on site, coordinate with SJPU or labour inspector, record GD or FIR number and rescue team.
1. **Immediate care and medical** (Caseworker): Ensure food, rest and medical examination. Record injuries and urgent needs; avoid a detailed interview at this point.
1. **Produce before CWC** (Caseworker or Child Welfare Police Officer): Present the child within 24 hours with the rescue report. Record interim order and placement.
1. **Social investigation** (Caseworker or DCPU social worker): Build the social investigation report: family situation, circumstances, prior contact with the system, child's own account and wishes.
1. **Needs and risk assessment** (Caseworker and counsellor): Rate risk of harm, re-trafficking and self-harm. Identify needs across health, education, psychosocial and legal.
1. **Assign case owner** (Case supervisor): Confirm the caseworker who owns the file through closure and the review date for the care plan.

*Where AI genuinely helps (MAP: Power):*
- Build Faster (L2): Draft the social investigation report narrative from the structured fields the caseworker has completed. *Needs first:* A private deployment and an agreed SIR template the CWC accepts.
- Collect Faster (L1): Extract order type, date and directions from photographed CWC orders into case fields. *Needs first:* Consistent order photos and a small labelled set of past orders.
- Work Smarter (L3): Surface which assessments and documents are missing for each upcoming CWC hearing. *Needs first:* Hearing dates and document checklists maintained in the system.

*Field note:* The child is interviewed by police, the medical officer, the caseworker and the CWC in the first week. Each builds a separate account and inconsistencies between them later get used against the child in court.


## Stage: Care & Rehabilitation

**Care plans that get reviewed, not filed and forgotten**

Whether the child is in a Child Care Institution, foster care or sponsorship, the Individual Care Plan is meant to drive every intervention. In practice it gets written at admission and next opened at the inspection. Counselling, school enrolment and family tracing run in parallel, and the child's progress sits in three different staff diaries.

*Decision it serves:* The caseworker and counsellor decide, at each care plan review, which needs are met and what the child needs next, including readiness for restoration.

*How the work flows:*
1. **Draft Individual Care Plan** (Caseworker with the child): Set goals for health, education, psychosocial support, skills and family contact, with the child's participation recorded.
1. **Deliver psychosocial support** (Counsellor): Hold sessions using the agreed approach, record themes and risk flags in restricted notes, not the general file.
1. **Link to school and health** (Caseworker): Enrol in a nearby school or bridge course, obtain Aadhaar or health cards, and track attendance.
1. **Trace family** (Caseworker or partner in home district): Locate family, conduct home study, and assess whether return is safe and in the child's best interest.
1. **Review the care plan** (Caseworker, counsellor and supervisor): Review progress against goals at set intervals, update risk, and report to the CWC as ordered.

*Where AI genuinely helps (MAP: Power):*
- Build Faster (L2): Draft the quarterly progress report to the CWC from care plan status and attendance data. *Needs first:* Care plan goals and statuses kept current in the system.
- Know Faster (L3): Monthly analysis of length of stay and restoration readiness across the CCI. *Needs first:* Consistent placement and home study data across cases.
- Work Smarter (L1): Translate care plan summaries into the language the child and family speak. *Needs first:* A private deployment and reviewed glossary of child protection terms.

*Field note:* Family tracing gets delayed because the home district partner can't see the case, so the caseworker re-sends the same details by WhatsApp every fortnight and the child waits months longer than needed.


## Stage: Restoration & Follow-up

**Knowing the child is still safe a year after going home**

Restoration is where most case files go quiet. The CWC orders the child home, the family signs, and follow-up visits depend on whether someone has travel budget that month. Children who are re-trafficked or back at work are usually the ones whose families didn't get the scheme linkages promised at restoration.

*Decision it serves:* The caseworker and supervisor decide whether a restored case can be closed safely or needs continued visits, scheme support or a return to the CWC.

*How the work flows:*
1. **Restore with a plan** (Caseworker): Hand over the child as per CWC order, agree a follow-up plan with the family and local child protection committee.
1. **Link to schemes** (Caseworker or local partner): Apply for sponsorship under Mission Vatsalya, ration cards, school enrolment and livelihood support for the family.
1. **Conduct follow-up visits** (Field worker or VCPC member): Visit at agreed intervals, check the child's safety, school attendance and wellbeing, and speak with the child alone.
1. **Re-rate risk** (Caseworker): Update the risk rating after each visit. Rising risk triggers a supervisor review and possible CWC report.
1. **Review and close** (Case supervisor): Close only after the follow-up period with stable risk, and record closure reason and the child's feedback.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L3): IVRS check-in calls to restored families in their language, with answers logged against the case. *Needs first:* Consent from the family and a short, tested question set.
- Know Faster (L3): Quarterly analysis of re-entry by restoration type, district and scheme linkage for advocacy with the DCPU. *Needs first:* At least two years of closed cases with consistent follow-up data.
- Build Faster (L2): Pre-fill scheme application forms from the family record for the caseworker to verify. *Needs first:* Current family data and up-to-date scheme forms.

*Field note:* Follow-up visits get marked done after talking to the parent at the door. The child isn't seen alone, and the first sign that something's wrong is a second 1098 call from a different city.

## Episode ideas

See `catalog/` for the generated episode list for this sector (overview + one episode per stage + cross-cutting topics).
