# Maternal & Child Health

> One mother, one baby, tracked from first trimester to first birthday.

**Status:** edzola_opinion (EdZola MAP Field Guide). Fields and indicators are starting points for a human to adapt.

Most maternal and newborn deaths happen in a narrow window: late pregnancy, labour, and the first week after birth. The warning signs usually show up earlier, in a missed ANC visit, a low haemoglobin, a rising BP. When the pregnancy record, the birth record and the child's immunisation card are one continuous story, you see the risk while there's still time to act.

## The data thread: Mother ID + Child ID

A Mother ID is created at pregnancy registration and carries through every ANC contact and the delivery. At birth each baby gets a Child ID linked to the mother, so postnatal, immunisation and growth data stay tied to the pregnancy that came before.

## Core entities

- **Mother**: The pregnant woman, with LMP, EDD, parity, language and phone preferences, and risk profile.
- **Pregnancy**: One pregnancy episode, so a woman's second pregnancy doesn't overwrite her first.
- **ANC Contact**: Each antenatal visit or check: gestational age, BP, Hb, weight, danger signs, IFA and TT given.
- **Birth Outcome**: Place, date, mode of delivery, complications, live birth or stillbirth, attendant.
- **Child**: Each newborn, linked to Mother and Pregnancy, with birth weight and sex.
- **PNC / Child Visit**: Postnatal and child contacts: newborn danger signs, feeding, immunisation, weight and length.
- **Referral**: Each referral from home or facility to a higher level, with transport, arrival and outcome.

## Stage: Pregnancy Registration

**Register in the first trimester, or miss the window**

A pregnancy registered at 28 weeks has already missed the early ANC visits that catch anaemia, hypertension and twins. Early registration depends on ASHAs, midwives and traditional birth attendants hearing first. The risk profile made here decides how closely she's followed for the next nine months.

*Decision it serves:* Helps the ANM or midwife decide who needs a high-risk pregnancy pathway from day one, and helps the programme manager see which villages register pregnancies late.

*How the work flows:*
1. **Identify the pregnancy early** (ASHA / CHW / comadrona): Hear of missed periods through household visits and community networks; confirm with a pregnancy test where possible.
1. **Register with the facility** (ANM / midwife): Enrol at the sub-centre, ANC clinic or hospital, capturing LMP, EDD and obstetric history.
1. **Capture communication preferences** (ANM / call centre): Record language, whose phone it is, preferred call time, and whether she can take calls privately.
1. **Profile initial risk** (ANM / nurse): Age, parity, previous caesarean or stillbirth, short stature, known conditions: flag high-risk pregnancies.
1. **Enrol in messaging** (Programme team): Enrol in stage-specific voice or SMS messages timed to her gestational age.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Voice registration in the local language for ASHAs with low literacy or tiny phone screens. *Needs first:* A fixed registration form and a private speech service for that language.
- Work Smarter (L2): Flag likely duplicate registrations across facilities when women register at both parental and marital homes. *Needs first:* Consistent name, age, husband's name and village fields.
- Know Faster (L3): Monthly note on villages where registration comes late, with ASHA workload and access factors. *Needs first:* Reliable expected-pregnancy estimates and registration dates.

*Field note:* Many women go to their mother's home for delivery, so they're registered twice or lost from both lists. Build for the move from the start.


## Stage: Antenatal Care

**Four ANC visits that actually check BP, haemoglobin and danger signs**

ANC4+ is counted everywhere, but a visit where nobody measured BP doesn't protect against eclampsia. Anaemia found at 16 weeks can be treated; at 36 weeks it's a PPH risk. Birth preparedness means she knows which facility, how she'll get there, and who'll pay, before labour starts.

*Decision it serves:* Helps the ANM decide who needs a follow-up visit, IV iron or referral this week, and helps the medical officer see which high-risk mothers need a birth plan at a facility with a blood bank and C-section.

*How the work flows:*
1. **Remind about ANC visits** (Programme team / ASHA): Voice or SMS reminder before each due visit; ASHA follows up if missed.
1. **Conduct the ANC visit** (ANM / midwife / doctor): Weight, BP, Hb, urine protein, fundal height, fetal heart; give IFA, calcium and TT/Td.
1. **Screen danger signs** (ASHA / ANM): Bleeding, severe headache, blurred vision, swelling, reduced fetal movement: refer same day.
1. **Send stage-specific messages** (Programme team): Weekly voice messages on nutrition, rest, danger signs and birth preparedness matched to gestational age.
1. **Make the birth plan** (ANM / ASHA): Agree facility, transport, companion and money with the family by 32 weeks.

*Where AI genuinely helps (MAP: Power):*
- Work Smarter (L3): Predict which mothers are likely to drop out of voice messaging so call centre staff reach them first. *Needs first:* Months of listen-rate data linked to mother profiles.
- Build Faster (L1): Adapt approved message scripts into new languages and dialects. *Needs first:* Clinically approved source scripts.
- Know Faster (L3): Weekly list of ANC quality gaps: visits missing BP, Hb or weight, by facility. *Needs first:* Structured vitals fields, not free text.

*Field note:* ANC cards often show BP '120/80' for every visit in a facility. That's a sign nobody's measuring, and it's exactly where pre-eclampsia hides.


## Stage: Delivery & Referral

**Getting her to the right facility before labour turns into emergency**

The three delays still kill: deciding to seek care, reaching the facility, getting care once there. A referral isn't done until she's arrived and been seen. The birth record is the hinge of the whole continuum: it closes the pregnancy and opens the child's record.

*Decision it serves:* Helps the referral coordinator decide where to send a woman in labour with complications and track that she arrives, and helps the facility in-charge see where referrals come from and where they fail.

*How the work flows:*
1. **Promote facility delivery** (ASHA): Reconfirm the birth plan in the last weeks; accompany the mother when labour starts where possible.
1. **Triage at arrival** (Labour room nurse): Assess stage of labour and complications; decide to manage or refer up.
1. **Make and track the referral** (Referral coordinator / nurse): Call ahead, arrange 108/102 or partner transport, log departure and arrival times.
1. **Navigate care** (Care navigator): Help the family through admission, blood arrangement and paperwork at the higher facility.
1. **Record the birth outcome** (Labour room nurse / midwife): Mother's and baby's outcome, birth weight, complications; create the Child ID.

*Where AI genuinely helps (MAP: Power):*
- Work Smarter (L3): Suggest the nearest facility that can manage the specific complication, based on current capacity. *Needs first:* Up-to-date facility capability data: blood bank, C-section, SNCU, and live bed status where available.
- Know Faster (L3): Quarterly referral route analysis: where delays happen, by time of day and transport type. *Needs first:* Departure and arrival times captured reliably for most referrals.
- Build Faster (L2): Draft maternal and perinatal death review summaries from structured records for the review committee. *Needs first:* Complete ANC, delivery and referral records linked by Mother ID.

*Field note:* Referral slips often go with the mother and never come back, so the referring facility never knows the outcome. Two-way confirmation is what makes it a referral system.


## Stage: Postnatal & Child Follow-up

**The first 42 days, then every vaccine and weight to one year**

Half of newborn deaths happen in the first week, often at home after an early discharge. HBNC visits catch hypothermia, poor feeding and sepsis while there's time. After that, the immunisation card and growth chart become the child's record, and the mother still needs PNC and family planning.

*Decision it serves:* Helps the ASHA and ANM decide which newborns need a visit today, which children are due or overdue for vaccines, and which are faltering on the growth chart and need referral.

*How the work flows:*
1. **Newborn home visits** (ASHA): HBNC visits: temperature, feeding, cord, breathing, weight; refer danger signs to SNCU or PHC.
1. **Postnatal check for mother** (ASHA / ANM): Bleeding, fever, BP, breastfeeding and mood check; iron and calcium continued.
1. **Stage-specific messages** (Programme team): Voice messages on exclusive breastfeeding, danger signs, immunisation dates and KMC.
1. **Immunise and weigh** (ANM): At VHSND or session sites: vaccines as per schedule, weight and length plotted.
1. **Counsel on family planning** (ANM / ASHA): Postpartum contraception options and spacing, choice recorded with consent.

*Where AI genuinely helps (MAP: Power):*
- Know Faster (L3): Link pregnancy risk factors to newborn and infant outcomes to show which ANC gaps matter most. *Needs first:* Mother and Child IDs linked across the full continuum for at least one cohort.
- Collect Faster (L2): Read vaccine dates from a photo of the MCP card to backfill records. *Needs first:* A private OCR service and a fixed card layout.
- Work Smarter (L3): Prioritise immunisation dropouts for ASHA follow-up by distance and days overdue. *Needs first:* Complete vaccination records and household locations.

*Field note:* When the birth isn't recorded quickly, the newborn misses the day-1 and day-3 visits entirely. The first week is where the continuum most often breaks.

## Episode ideas

See `catalog/` for the generated episode list for this sector (overview + one episode per stage + cross-cutting topics).
