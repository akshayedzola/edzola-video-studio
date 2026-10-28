# Knowledge — Canonical Entity Library, Sector Patterns & Naming

Reusable data-model building blocks. ~70–80% of any nonprofit MIS follows these patterns. Field lists are a starter set — add/remove per programme; every field must earn its place. (Generic patterns; no client data.)

## The 12 canonical entities (build in dependency order)

| Entity | Purpose | Core fields (starter set) |
|---|---|---|
| **Organisation** | the NGO / tenant | Organisation Name · Short Code · PAN · Registration No · Category (lookup) · Address · Admin Email · Verification Status · Active |
| **Programme** | a programme/project | Programme Name · Code · Description · Organisation (link) · Funder (link) · Type (lookup) · Start/End Date · Status · Target Beneficiaries · Geography (lookup) · Manager (link) |
| **Beneficiary / Participant** | the person served | Beneficiary ID (auto, unique) · Full Name (PII) · Gender · Date of Birth (PII) · Mobile (PII) · Email (PII) · Address (PII) · State/District (cascading lookups) · Status (Active/Dormant/Exited) · Status Reason · Source (lookup) · Programme (link) · Registration Date · Registered By |
| **Session / Event** | an activity occurrence | Session Name · Code · Programme (link) · Type · Date · Start/End Time · Venue · State/District · Facilitator (link) · Expected Participants · Status · Notes |
| **Attendance** | one row per person per session | Session (link) · Beneficiary (link) · Programme (auto) · Date (auto) · Present (checkbox) · Late · Mode (In-Person/Online) · Marked By · Marked At |
| **Assessment / Feedback** | tests & surveys | Assessment ID · Type (Pre/Post/Follow-up/Satisfaction/Observation) · Beneficiary (link) · Session (link) · Programme (link) · Date · Conducted By · score/Likert fields |
| **Volunteer** | volunteer master + intake pipeline | Volunteer ID · Name · Mobile (unique, PII) · Email (unique, PII) · DOB · State/City · Status (Active/Dormant) · Dormancy Reason · Role(s) · Type(s) · Registration Status (pipeline) |
| **Donor / Funder** + **Donation** | fundraising | Donor: ID · Name · Type (Individual/Corporate/Foundation/Govt) · Email · Phone · PAN (PII, for 80G) · Status · Organisation (link). Donation: Donor (link) · Date · Amount · Payment Mode · Reference/UTR · Receipt Number · Financial Year · Foreign Donation (FCRA flag) |
| **Staff / Consultant** | HR (sensitive — restrict) | Full Name · Designation · DOB (PII) · PAN (PII) · Bank Account (PII) · linked to User |
| **System User** | login + access | Email (login, PII) · Display Name · Profile/Role · Organisation (link) · Active · Portal Access |
| **Task** | internal work | Task Name · Description · Assignee · Reporter · Due Date · Priority · Status (Backlog→To Do→In Progress→In Review→Done) · Project (link) |
| **Time Log** | effort tracking | Task (link) · Person · Date · Hours · Month · Status · Billable Status |

**Build order:** seed masters → Organisation → System User → Programme → Beneficiary → Session/Attendance → Assessment → Volunteer → Donor/Donation → Staff → Task/Time Log.

## NGO compliance fields (add when relevant)
PAN · 80G Certificate + Valid-Until + Exemption % (50/100) · 12A/12AB Number · FCRA Registration + Validity + separate FC Bank Account · DARPAN ID · CSR-1 Number · Donor PAN (donations > ₹2,000) · Form 10BD/10BE references. *(Never store national IDs like Aadhaar as plain text; mask + restrict.)*

## Master / lookup tables to seed first
Geography (State = 28 + 8 UTs → District → Block/Village; Pincode) · Organisation Category · Thematic Area · Gender · Source · Donor Type · Designation · Qualification · Programme Type · Session Type · Financial Year · Months (e.g. "Apr 2025") · Reporting Period (Q1–Q4) · Payment Mode · Status values per entity.

## Sector entity patterns (spine entity in **bold**)
- **Livelihoods / Skilling:** Organisation → Programme → **Batch** → Participant → Session/Attendance → Assessment (Baseline/Endline) → **Placement** → Employer → Follow-up (3/6/12 mo). Participant status: Registered → Enrolled → Training → Placed → Dropped Out. Extra fields: education level, pre-training income, employment status, disability status. Indicators: enrolment, completion %, placement %, wage-employment %, retention at 3/6 months.
- **Education:** Programme → **School** → Classroom → **Student** → Attendance / Assessment (Baseline/Midline/Endline) → Teacher → Parent. Student status: Active/Inactive/Graduated/Dropped Out. Indicators: enrolment, attendance rate, learning gain, grade promotion, dropout rate.
- **Health:** Programme → Facility → Health Worker → **Patient** → Visit (ANC/PNC/Follow-up) → Screening → Referral → Follow-up. Indicators: coverage, screening completion, referral completion, follow-up rate.
- **Fundraising / Grants:** **Donor** → Grant → Proposal → Milestone → Report → Payment. Indicators: funds raised vs target, utilisation rate, reporting compliance, pipeline value, conversion rate.
- **Microfinance / SHG:** **Group (SHG)** → Member → Loan → Repayment / Savings → Meeting.

## Naming & validation conventions
This pack uses readable, platform-agnostic naming (Zoho/Creator builders may prefer snake_case fields — note it if so).
- **Entities:** PascalCase, singular — Organisation, Beneficiary, Session.
- **Fields:** Title Case with spaces — Organisation Name, Start Date, Is Active.
- **IDs:** `PREFIX-0001` — ORG, PRG, BEN, SES, VOL, ASS, PRJ.
- **Status:** Title Case; always include a terminal state (Completed / Cancelled / Exited); never just Active/Inactive if there are >2 real states; prefer descriptive ("Waiting for Manager Approval").
- **Dates** end in "Date"; **booleans** start with "Is"/"Has"; **dropdowns** pull from a master (kills "ten spellings of status").
- Every entity carries: its ID (auto), Status, Created Date, Modified Date, Created By.

*EdZola · ImpactOS · Systems built for the world's hardest work.*
