# Knowledge — Framework & Glossary

Reference for the **Explain** mode and shared background for all modes. Based on EdZola's MAP Framework.

## The MAP framework
- **M — Model:** decide what's worth knowing. *Every data point must earn its place.*
- **A — Align:** make the system usable in real work. *If data only flows up, people treat it as compliance.*
- **P — Power with AI:** use AI on trusted data and workflows. *AI is an amplifier, not a purifier.*

## The ImpactOS lifecycle (where MAP comes from)
Six stages, each with an output: **Discovery** (requirements + ToC) → **Architecture** (data model + module specs) → **Build** (working system, in sprints) → **Dashboards** (decision views) → **Deploy** (migration, training, go-live) → **Maintain** (adoption, governance). Model ≈ Discovery + Architecture; Align ≈ Architecture → Maintain; Power sits on top.

## Why data systems fail (the six failure modes)
1. **Data collected without purpose** — built before asking what decision it supports (a Model gap).
2. **Tool chosen before the problem is understood** — software picked before workflows/users are mapped.
3. **Process confusion gets digitised** — unclear work just travels faster (don't automate ambiguity).
4. **Built for donors, not teams** — designed for compliance, not frontline decisions.
5. **Go-live treated as the finish line** — no adoption, ownership or iteration (an Align gap).
6. **AI added before the foundation is ready** — amplifies noise (a Power gap).

## Common misconceptions (myth → reality)
- "We have a data problem" → usually a *decision / workflow / adoption* problem.
- "More data is better" → every field is a tax on the frontline.
- "Buy a CRM and we're sorted" → a tool over an unclear workflow digitises the confusion.
- "Go-live = done" → adoption starts at go-live.
- "Data is for the donor" → if it only flows up, it's compliance; it must flow back.
- "A dashboard means we're data-driven" → a dashboard without a decision is decoration.

## Glossary (definitions for the Explain mode)
- **Management Information System (MIS):** a structured digital platform to collect, store, process and report programme data — a single source of truth connecting registration → activities → outcomes → reporting.
- **Theory of Change (ToC):** the causal pathway from what you do to the change you create. Four layers: **Activities → Outputs → Outcomes → Impact.** (Activities/outputs are countable; outcomes need follow-up.)
- **Logic Framework (logframe):** the tabular tool derived from the ToC. Rows = objective hierarchy (Goal/Impact, Outcomes, Outputs, Activities/Inputs); columns = **Narrative · Indicators · Means of Verification · Assumptions/Risks.** The ToC is the story; the logframe is the matrix.
  - *Generic example (youth skilling archetype — not a real organisation):* **Goal:** youth in the district move into sustained livelihoods (*indicator:* % employed at 6 months; *verification:* follow-up survey; *assumption:* jobs exist locally). **Outcome:** trained youth secure employment (*indicator:* placement rate). **Output:** youth complete training (*indicator:* completion rate). **Activities:** mobilise, enrol, train, place.
- **Indicator:** a measurable value tracking progress. **Output indicator** counts what you did; **outcome indicator** measures change. **Leading** = early signal (attendance); **lagging** = confirms after the fact (income). **RAG:** Green ≥80% of target, Amber 60–79%, Red <60%. **Baseline / Midline / Endline** = the same measure before, during, after.
- **Data point / field:** one piece of information captured (e.g. Date of Birth).
- **Entity:** a "thing" the programme tracks (Beneficiary, Session, Donor) — a table.
- **Relationship:** how entities link — one-to-many (a Batch has many Students), many-to-one (many Placements to one Employer), many-to-many (Beneficiaries ↔ Sessions, via a junction like Enrolment).
- **Master / lookup table:** a reference list standardising dropdowns (States, Programme Types, Status). Build first.
- **Unique identifier:** one stable ID per record (e.g. BEN-0001) so the same person is never several rows.
- **Single source of truth (SSOT):** not one file — an agreement: one definition, one unique ID, one accountable owner per concept.
- **ERD:** entity-relationship diagram — boxes (entities) + lines (relationships).
- **Dashboard:** a decision view for one audience — turns data into action (see `knowledge/dashboards-and-kpis.md`).
- **KPI:** a measurable value showing how well objectives are being met.
- **UAT / hyper-care / data migration:** user-acceptance testing before go-live · intensive support for ~30–45 days after go-live · moving existing data (usually spreadsheets) into the new system.

## Domain MIS patterns (quick reference)
- **Education:** master profiling (Student · Trainer · Centre · School) → transactional (assessments · attendance) → events (sessions, camps) → longitudinal (baseline → midline → endline).
- **Livelihood / skilling:** Mobilisation & Admissions → Enrolment & Programme Operations → Completion → Placement → Retention.
- **Health:** Screening → Follow-up → Escalation of high-risk cases.

*EdZola · ImpactOS · Systems built for the world's hardest work.*
