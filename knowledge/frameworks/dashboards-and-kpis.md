# Knowledge — Dashboards & KPI Library

Reference for the **Align** and **Make-an-output** modes.

## Five design principles
1. **One dashboard, one audience.** 2. **Answer questions, don't display data** (list the 5–7 questions the audience asks). 3. **Progressive disclosure** (summary cards top → trends middle → drill-down tables bottom). 4. **Actionable over decorative** (remove anything not driving a decision). 5. **Consistent visual language** (Green = good, Amber = at risk, Red = attention). **Pick 5–7 KPIs per dashboard.**

## The five standard dashboards
| Dashboard | Audience | Questions it answers | KPIs (pick 5–7) | Layout |
|---|---|---|---|---|
| **Organisation / Admin** | leadership, board | Where are we operating, overall reach, on track to annual targets? | Total Partners · Programmes · Beneficiaries · Active Projects · Project RAG mix · Monthly trend | KPI cards → geography + thematic charts → RAG pie + trend → summary table |
| **Programme** | programme managers | Completion rate, bottlenecks, delivery health | Active Projects · Sessions Delivered · Avg Attendance · Completion Rate · Milestones vs Planned | KPI cards → distribution → pipeline + gauge → projects table |
| **Partner** | partner staff | One partner's history & progress | profile · engagement timeline · project progress % · roster · baseline→endline | profile card → timeline + project cards → tabs |
| **Volunteer** | coordinators, HR | Pipeline health, fulfilment, skills gap | Applications · Active Volunteers · Fulfilment Rate · Avg TAT · by skill/geography | KPI cards → funnel + skills chart → roster |
| **Impact / Outcomes** | M&E, funders, board | Are we achieving outcomes; cohort vs target | headline impact number · % indicators on track (RAG) · baseline→endline · cohort comparison | impact number + gauge → indicator scorecard → grouped bars → qualitative evidence |

## KPI library (with formulas)
- **Delivery:** Beneficiaries Served = COUNT(Active) · Session Completion Rate = Completed/Planned ×100 · Avg Attendance = Total Attendance/Total Sessions · Programme Completion Rate = Completed/Enrolled ×100.
- **Partner:** Active Partners · New Partners Onboarded · Retention = Active now/Active last period ×100 · Avg Engagement Duration · Satisfaction (1–5).
- **Volunteer:** Applications · Fulfilment Rate = Deployed/Open ×100 · Avg TAT (days) · Retention (6m+) · Hours Contributed.
- **Impact:** Indicator Achievement Rate = On Track/Total ×100 · Baseline→Endline Improvement = (Endline−Baseline)/Baseline ×100 · RAG counts · Outcome Improvement = Improved/Assessed ×100.
- **Financial / efficiency:** Cost per Beneficiary · Budget Utilisation % · Operational Hours Saved vs Manual · Grant Reporting On-Time Rate.
- **Data quality:** Completeness = Filled/Required ×100 · Updated within SLA · Duplicate Rate · Entry within 48h.
- **RAG default:** Green ≥80% · Amber 60–79% · Red <60%.

## Chart-type selection
Comparison → horizontal bar · trend → line · part-of-whole (2–5) → donut · 6+ → stacked bar · progress to target → gauge/progress bar · pipeline → funnel · geography → map · single metric → KPI card. **Avoid:** >5-segment pies, 3D, truncated Y-axes, too many metrics, missing targets/benchmarks, inconsistent time periods.

## Dashboard spec format (for the output)
Name · Audience · 5–7 key questions · KPIs (calculation · frequency · target) · Layout (summary → trends → drill-down) · Filters (date, geography, programme, cohort). Review test: every visual answers a question; readable in 10 seconds; consistent colours; labelled axes/units.

*EdZola · ImpactOS · Systems built for the world's hardest work.*
