# Health & Wellbeing

> From the household visit to cured: every patient counted, none lost.

**Status:** edzola_opinion (EdZola MAP Field Guide). Fields and indicators are starting points for a human to adapt.

In community health, the patient you don't find can't be treated, and the one you lose after month two becomes next year's drug-resistant case. The cascade from presumptive to screened to diagnosed to initiated to completed only works if each step can see the one before it. Most programmes still run it on paper registers and three disconnected apps.

## The data thread: Patient ID

One Patient ID is issued at household screening and carries through the lab result, the treatment card, every dose and the final outcome. Where a national ID exists, such as a Nikshay ID for TB in India, it's stored alongside ours, never instead of it.

## Core entities

- **Household**: The unit the CHW registers and revisits, with GPS, members and contact risk factors.
- **Patient**: One person, one ID, from first symptom screen to treatment outcome.
- **Screening Event**: Each symptom screen or X-ray result, dated and linked to the screener.
- **Test Result**: Sample, lab, method (smear, CBNAAT, TrueNat, RDT) and result, with turnaround dates.
- **Treatment Episode**: Regimen, start date, treatment supporter and phase for one course of treatment.
- **Dose / Visit Log**: Every observed dose, home visit or missed dose, with who recorded it.
- **Health Worker**: ASHA, CHW or treatment supporter, with assigned catchment and caseload.

## Stage: Outreach & Screening

**Active case finding that reaches the houses the facility never sees**

Passive case finding catches people well enough to walk to a clinic. The rest are coughing at home for months, infecting their families. Door-to-door screening is where the gap closes, if the register tells you which houses you've actually covered.

*Decision it serves:* Helps the field supervisor decide which hamlets to revisit, where to send the X-ray van next, and which presumptive cases need a sample collected this week.

*How the work flows:*
1. **Map and register households** (CHW / ASHA): Enumerate every household in the catchment with GPS, head of household, members and known contacts of existing patients.
1. **Run the symptom screen** (CHW / ASHA): Ask the four-symptom screen (cough over two weeks, fever, weight loss, night sweats) for every adult, plus risk groups.
1. **Flag presumptive cases** (CHW / ASHA): Anyone screening positive becomes a presumptive case with a Patient ID and a sample collection due date.
1. **Deliver health education** (CHW / ASHA): Short household session on symptoms, cough hygiene and free diagnosis, logged against the visit.
1. **Target camps and X-ray vans** (Programme manager): Use yield by village to schedule mobile camps where screening positivity is highest and facility access is lowest.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Voice-to-form in the local language so CHWs speak the screen rather than type on a small screen. *Needs first:* A validated screening form with fixed options that voice input maps into.
- Know Faster (L3): Weekly AI summary of coverage gaps and low-yield villages sent to supervisors. *Needs first:* Clean household enumeration with GPS and reliable sync dates.
- Work Smarter (L3): Computer-aided X-ray reading (CAD) at camps to triage who needs a confirmatory test. *Needs first:* A WHO-recommended CAD tool, calibrated thresholds, and a clinician in the loop.
- Build Faster (L2): Generate the district's monthly screening report from the register in the required HMIS format. *Needs first:* Indicator definitions agreed with the district and mapped to fields.

*Field note:* Screening numbers look great until you notice the same easy-to-reach households screened three times and the migrant labour colony never. Track coverage against enumeration, not screens done.


## Stage: Diagnosis & Enrolment

**Close the gap between a positive sputum and a started regimen**

Pre-treatment loss to follow-up is the quietest failure in the cascade. A sample leaves the village, a result comes back positive, and nobody tells the patient. Every day between diagnosis and treatment initiation is another day of transmission.

*Decision it serves:* Helps the treatment coordinator decide which diagnosed patients haven't started treatment yet, whose samples are stuck in transit, and which complex cases need referral to a DR-TB centre or specialist.

*How the work flows:*
1. **Collect and transport sample** (CHW / sample transporter): Collect sputum or blood, label with Patient ID, log pickup time and lab destination.
1. **Run the test** (Lab technician): Run smear, CBNAAT, TrueNat or RDT as per algorithm; record result and resistance status.
1. **Communicate the result** (Treatment coordinator): Inform the patient in person or by phone within 24 hours of the result.
1. **Confirm and initiate** (Medical officer): Clinical confirmation, regimen chosen, baseline weight and tests recorded, treatment card opened.
1. **Refer complex cases** (Medical officer): Drug-resistant, paediatric, HIV co-infected or severe cases referred with a tracked referral slip.

*Where AI genuinely helps (MAP: Power):*
- Work Smarter (L3): Daily prioritised call list of diagnosed-not-initiated patients, ranked by delay and risk. *Needs first:* Result dates and initiation dates reliably captured for every patient.
- Build Faster (L2): Draft the referral letter and summary from structured fields for the receiving facility. *Needs first:* Complete diagnosis and baseline fields on the record.
- Know Faster (L3): Monthly narrative on where the cascade leaks most, by block and test type. *Needs first:* Consistent cascade definitions and deduplicated Patient IDs.

*Field note:* The lab register and the treatment register rarely talk to each other, so pre-treatment loss hides in the gap. Reconcile positives against initiations weekly by name and ID, not monthly by totals.


## Stage: Treatment & Care

**Doses observed, side effects caught, patients kept on regimen**

A six-month regimen feels endless by week eight, when symptoms fade and side effects don't. Missed doses usually trace back to travel cost, lost wages, nausea and stigma. The dose log is where you see trouble coming before it becomes a dropout.

*Decision it serves:* Helps the treatment supporter and supervisor decide who needs a home visit today, who's reporting adverse drug reactions, and who needs nutrition or social support to stay on treatment.

*How the work flows:*
1. **Observe or verify the dose** (Treatment supporter / CHW): Directly observed or video-observed dose, or 99DOTS-style call verification, logged daily.
1. **Dispense and track stock** (Pharmacist / CHW): Dispense patient-wise boxes by weight band; log pills given and pills returned.
1. **Screen side effects** (Treatment supporter): Ask about nausea, jaundice, joint pain, vision changes at each contact; flag severe ones.
1. **Counsel and support** (Counsellor): Adherence counselling, family session, link to nutrition support (e.g. Nikshay Poshan Yojana) and transport support.
1. **Monthly clinical review** (Medical officer): Weight, symptoms, follow-up sputum at end of intensive phase, regimen adjusted if needed.

*Where AI genuinely helps (MAP: Power):*
- Work Smarter (L3): Flag patients whose dose pattern looks like early disengagement, before three missed doses. *Needs first:* At least a few months of clean dose logs and known outcomes to check patterns against.
- Collect Faster (L2): Voice notes in local language from counsellors, transcribed into structured barrier fields. *Needs first:* A fixed barrier list and a private transcription service.
- Build Faster (L1): Generate patient-facing reminder scripts and side-effect FAQs in regional languages. *Needs first:* Clinically approved source content from the programme.

*Field note:* Adherence logs that show 100% every day for months usually mean the card was filled in at the end of the week. Spot-check pill counts against the log; the gap tells you more than the log does.


## Stage: Follow-up & Outcomes

**Trace every missed dose and record an outcome for everyone**

Treatment success rates only mean something if every enrolled patient gets an outcome. 'Not evaluated' and 'lost to follow-up' are where programmes hide their failures. Post-treatment, recurrence and long-term lung damage are rarely tracked at all.

*Decision it serves:* Helps the programme manager decide where tracing effort goes this week, and gives the district an honest treatment success rate by cohort for review and funder reporting.

*How the work flows:*
1. **Trace interrupters** (CHW / treatment supporter): Home visit within 48 hours of an interruption; record reason and whether the patient resumed.
1. **Escalate the hard cases** (Supervisor): Patients not found after two visits: call, check migration, contact the family, coordinate across districts.
1. **Record the treatment outcome** (Medical officer): Cured, completed, failed, died, lost to follow-up or not evaluated, with the evidence.
1. **Post-treatment follow-up** (CHW): Symptom checks at 6 and 12 months after completion to catch recurrence early.
1. **Cohort review** (Programme manager): Quarterly outcome review by cohort, block and patient group to find where outcomes are worst.

*Where AI genuinely helps (MAP: Power):*
- Know Faster (L3): Quarterly cohort analysis in plain language: which blocks, patient groups and barriers link to worse outcomes. *Needs first:* Outcomes recorded for the whole cohort, with interruption reasons coded.
- Work Smarter (L3): Rank tracing cases by likelihood of recovery so CHWs start with the ones still reachable. *Needs first:* Historical tracing outcomes linked to patient and interruption data.
- Build Faster (L2): Draft the funder outcome report from the cohort data and last quarter's narrative. *Needs first:* Agreed outcome definitions and a report template.

*Field note:* 'Transferred out' is where patients disappear from everyone's denominator. Track whether the receiving district actually registered them, or the transfer is just a polite loss.

## Episode ideas

See `catalog/` for the generated episode list for this sector (overview + one episode per stage + cross-cutting topics).
