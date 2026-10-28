# Education

> Know which child can read, and which one quietly stopped coming.

**Status:** edzola_opinion (EdZola MAP Field Guide). Fields and indicators are starting points for a human to adapt.

Enrolment numbers look good until you check who can read a Class 2 paragraph. The children who fall behind in Class 3 are the ones who drop out in Class 8, and most programmes lose sight of them in between. Data that follows one child from the household survey to the next school tells you where your teaching is working and where it isn't.

## The data thread: Student ID

One Student ID is created at the door-to-door survey and carries through baseline, every attendance register, midline, endline and the move to the next school. Map it to the UDISE+ school code and the government student ID where one exists, so you can match against school records later.

## Core entities

- **Child**: One record per child with Student ID, age, gender, grade, school and household link. Never duplicated across years.
- **Household**: Family unit from the survey: location, parent contact, siblings, distance to school, first-generation learner flag.
- **School**: Government or partner school keyed to its UDISE+ code, with block, cluster, SMC and head teacher.
- **Learning Group**: A TaRL-style group of children at the same level, with a facilitator, a timetable and a level that changes.
- **Assessment**: One sitting of a baseline, midline or endline tool, linked to the child, with level and item scores.
- **Facilitator**: Teacher, volunteer or Balsakhi who runs sessions, with training status and mentor visits logged.
- **Session**: One class held on one date for one group, with attendance and activity type.

## Stage: Outreach & Enrolment

**Find every out-of-school child before the academic year starts**

The children you most need to reach are the ones missing from the school register: seasonal migrants, girls kept home after Class 5, children working in the fields. If your household survey stops at the main road, your enrolment drive will too. Getting them on a list, with a parent who's agreed, is where everything starts.

*Decision it serves:* Helps the field coordinator decide which habitations and households to prioritise for enrolment visits before the June admission window closes.

*How the work flows:*
1. **Map habitations** (Field coordinator): Mark every hamlet, basti and brick kiln cluster in the block, including those outside the school catchment on paper.
1. **Door-to-door survey** (Community volunteer): List every child aged 5 to 14 in each household, with current school status and reason if not enrolled.
1. **Flag at-risk children** (Field coordinator): Mark out-of-school, never-enrolled, long-absent and migrant children for a follow-up visit within two weeks.
1. **Parent and SMC meeting** (Community volunteer, SMC members): Share the hamlet list with the School Management Committee and agree which families each member will visit.
1. **Enrol and confirm** (Head teacher, field coordinator): Child is admitted to the school register, Student ID is issued, and admission is confirmed against the school list.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Voice-note capture in the local language for 'reason not in school', transcribed and tagged to a dropdown value. *Needs first:* A fixed reason list agreed with the field team and tested on 100 real entries.
- Know Faster (L3): Weekly summary of out-of-school counts by hamlet, written in plain language for the block manager. *Needs first:* Survey data synced and deduplicated, with habitation names standardised.
- Build Faster (L1): Generate the household survey form in Hindi, Marathi or Kannada from the agreed English field list. *Needs first:* Final field list and dropdown values signed off.

*Field note:* Surveys done in May miss families who've left for brick kilns or sugarcane cutting. Plan a second round in the first week of school, when migrant families return.


## Stage: Baseline & Grouping

**Group children by what they can read, not their grade**

A Class 5 register can hold children still learning letters next to children reading stories. Teaching to the textbook loses both. A short, one-on-one baseline tells you where each child actually is, so you can group by level and plan around fees, distance or a bursary.

*Decision it serves:* Helps the facilitator and cluster mentor decide which learning group each child joins, and which children need material or scholarship support.

*How the work flows:*
1. **Train assessors** (Cluster mentor): Walk facilitators through the ASER-style tool, practise scoring on 10 children, and agree on edge cases.
1. **One-on-one baseline** (Facilitator): Each child reads from letter, word, paragraph and story cards, and attempts number recognition and operations.
1. **Record needs** (Facilitator): Note barriers the child or parent mentions: fees, uniforms, distance, sibling care, hearing or vision concerns.
1. **Form groups** (Facilitator, cluster mentor): Group children by reading and maths level, with a target size of 15 to 20 per group.
1. **Plan support** (Programme manager): Approve bursaries, transport or materials for children whose barriers would otherwise pull them out.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Speech-based oral reading fluency scoring, where the child reads a passage aloud and the tool estimates words correct per minute. *Needs first:* A model tested on children's voices in the local language and dialect, with a human-scored sample for comparison.
- Work Smarter (L2): Draft a first grouping proposal that balances level, school and group size. *Needs first:* Clean levels for at least 90% of enrolled children.
- Know Faster (L1): Plain-language baseline summary for the district education office, by cluster and level. *Needs first:* Back-checks completed and inconsistent assessors' data reviewed.

*Field note:* Assessors under pressure to show progress later sometimes score the baseline low. Back-check a sample with a different person, or your learning gains will be inflated from day one.


## Stage: Instruction & Support

**Track attendance and classroom practice while there's still time**

Most learning loss happens in the months nobody's looking: a facilitator who stops using level-based activities, a group that quietly shrinks from 18 to 9. Attendance and a good classroom observation log catch this in week three, not at endline.

*Decision it serves:* Helps the cluster mentor decide which facilitators need a visit this week and which children need a home call about absence.

*How the work flows:*
1. **Daily attendance** (Facilitator): Mark present or absent for each child in each group session, with the activity type used that day.
1. **Absence follow-up** (Facilitator, community volunteer): Call or visit any child absent three days in a row. Record the reason.
1. **Classroom observation** (Cluster mentor): Observe one session using a fixed rubric: grouping, activity, child talk time, material use.
1. **Mentoring conversation** (Cluster mentor): Share two strengths and one change with the facilitator right after the session. Agree on a follow-up date.
1. **Distribute support** (Programme associate): Log bursaries, learning kits, bicycles or uniforms handed over, with date and acknowledgement.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Photo of a paper attendance register read into digital attendance records. *Needs first:* A standard register format across all groups, with Student IDs printed on it.
- Work Smarter (L2): Suggest two coaching points for a facilitator based on their last three observation rubrics. *Needs first:* At least three observations logged with the same rubric.
- Know Faster (L3): Weekly digest to the programme manager of groups with falling attendance and the reasons logged. *Needs first:* Attendance entered within 48 hours for most groups.

*Field note:* Attendance often stays high on paper while actual teaching drifts back to rote textbook reading. Watch the activity type field and observation scores, not just the headcount.


## Stage: Progress & Transition

**Measure learning gains and follow children into the next school**

Endline tells you who moved from letters to paragraphs. It doesn't tell you who made it from Class 5 into Class 6 in a school three kilometres away. The transition year is where girls, first-generation learners and migrant children quietly leave, and you only see it if you keep tracking.

*Decision it serves:* Helps the programme manager decide which children need transition support and which methods or clusters to change next academic year.

*How the work flows:*
1. **Midline and endline** (Facilitator, external assessor): Repeat the baseline tool at mid-year and year-end. Have an external team assess a sample for credibility.
1. **Compare gains** (M&E officer): Match each child's endline to baseline by Student ID and calculate level movement.
1. **Track progression** (Field coordinator): Check grade promotion and new school enrolment against school registers in June and July.
1. **Transition support** (Community volunteer): Visit children moving to upper primary or secondary. Help with admission, documents and transport.
1. **Alumni contact** (Programme associate): Keep a light touch with older alumni through WhatsApp groups and annual calls.

*Where AI genuinely helps (MAP: Power):*
- Know Faster (L1): Draft the year-end learning outcomes report from matched baseline and endline data. *Needs first:* Endline matched to baseline for at least 85% of children, with attrition explained.
- Work Smarter (L3): Flag children with low attendance, no gain and a transition year coming up for priority home visits. *Needs first:* Clean attendance and assessment linked by Student ID for the full year.
- Collect Faster (L3): IVRS or WhatsApp check-ins with alumni families asking about school status. *Needs first:* Consent recorded and phone numbers verified.

*Field note:* Endline gains are calculated only on children who sat both tests. If 30% left mid-year, your average looks better than your programme is. Report both numbers.

## Episode ideas

See `catalog/` for the generated episode list for this sector (overview + one episode per stage + cross-cutting topics).
