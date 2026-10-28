# Environment & Climate

> Restoration counted in surviving trees and working institutions, not saplings planted

**Status:** edzola_opinion (EdZola MAP Field Guide). Fields and indicators are starting points for a human to adapt.

Planting numbers are easy to report and tell you almost nothing. What matters is whether the commons recovers and whether the village institution still governs it after the project leaves. That only shows up if every plot, plan and planting log stays linked from the first gram sabha meeting to the year-three survival count.

## The data thread: Commons Parcel ID

Each restored patch of commons, pasture, forest or water body gets one parcel ID and a GIS polygon at baseline. The micro-plan, every planting log, every wage payment and every survival count attach to that parcel, and the parcel links to the institution that governs it.

## Core entities

- **Village Institution**: The gram sabha committee, van panchayat, water user group or CFR management committee that holds rights and makes decisions. Has members, office bearers and a resolution history.
- **Commons Parcel**: A mapped unit of land or water under restoration, with a GIS polygon, tenure status, land use class and baseline condition.
- **Micro-plan**: The agreed village or watershed plan: interventions per parcel, usage rules, budget and the government schemes it converges with.
- **Works Entry**: One unit of physical work on a parcel: nursery batch, planting, trench, check dam, grazing closure. Carries species, quantity, GPS and date.
- **Steward**: A community member paid or recognised for nursery, planting, watch and ward or monitoring work. Linked to wage payments and attendance.
- **Monitoring Visit**: A dated observation on a parcel: survival sample plots, canopy cover, groundwater level, species counts, fire or grazing incidents.

## Stage: Mobilisation & Baseline

**Map the commons with the village before anyone draws a polygon**

If the baseline is drawn by an outside surveyor, the village won't own the plan built on it. Participatory mapping and the GIS baseline have to describe the same land, or you'll spend three years reconciling two versions of reality. This is also where free, prior and informed consent is either real or a signature on a register.

*Decision it serves:* Helps the field team and the village institution decide which parcels to take up first, based on degradation, tenure clarity and community willingness.

*How the work flows:*
1. **Hold consent meetings** (Field facilitator, gram sabha): Explain the programme in the local language, record attendance by hamlet and gender, and minute the consent resolution.
1. **Form or revive the institution** (Facilitator, villagers): Register members and office bearers, check women and landless representation, capture the formation resolution.
1. **Participatory resource map** (Villagers, facilitator): Villagers draw commons, water bodies, grazing routes and disputes on the ground or a printout. Photograph the map.
1. **Digitise and walk boundaries** (GIS associate, local youth): Walk parcel boundaries with a GPS app, reconcile against the village map and revenue records, flag disputed edges.
1. **Record ecological baseline** (Ecologist, trained villagers): Quadrat sampling, canopy cover, soil and well depth readings per parcel. Pair with a Sentinel-2 NDVI snapshot.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L1): Transcribe and summarise gram sabha meeting recordings in the local language into draft minutes for the facilitator to correct. *Needs first:* Recorded consent from attendees and a private speech model that handles the dialect.
- Know Faster (L2): Run land cover classification on satellite imagery to pre-classify parcels before field walks. *Needs first:* A ground-truthed training set from your own parcels, not a global model alone.
- Build Faster (L1): Generate the baseline form and GIS attribute table schema from the field list in one pass. *Needs first:* An agreed field list with dropdown values the team has already tested.

*Field note:* Teams rush the GIS baseline to show hectares to a funder, then find a third of parcels are disputed or claimed under FRA. The map is only as good as the conversation behind it.


## Stage: Planning & Governance

**Micro-plans the gram sabha wrote, with rules it will enforce**

A watershed plan is a set of promises: who closes what grazing land, who gets the first grass cut, who pays for the check dam. If the plan lives in a PDF on a laptop in the district office, nobody can hold anyone to it. Convergence with MGNREGA, CAMPA or state schemes is where most of the money is, and where most of the paperwork breaks.

*Decision it serves:* Lets the village institution and the programme team agree which interventions go on which parcel, in what season, funded by which source.

*How the work flows:*
1. **Draft the micro-plan** (Institution, facilitator): List interventions per parcel with season, labour days, species mix and cost, using the baseline map.
1. **Agree usage rules** (Gram sabha): Grazing closures, fodder sharing, fines, harvest rights. Pass as bylaws and record the resolution.
1. **Sign conservation agreements** (Institution, NGO): Commitments on protection and benefit sharing, per parcel, with duration and review dates.
1. **Map to government schemes** (Coordinator, panchayat secretary): Tag each work to MGNREGA, watershed or forest department budgets and track the sanction.
1. **Publish the plan back** (Facilitator): Wall painting or printed plan at the panchayat, read out at the next gram sabha.

*Where AI genuinely helps (MAP: Power):*
- Build Faster (L2): Draft the MGNREGA work estimate and shelf-of-projects entries from the approved micro-plan. *Needs first:* A locked micro-plan and your state's current schedule of rates.
- Work Smarter (L1): Translate the plan and bylaws into the local language and a plain-read version for the wall. *Needs first:* Final approved text and a reviewer fluent in the dialect.
- Know Faster (L2): Suggest native species mixes per parcel from soil, rainfall and baseline species lists. *Needs first:* Regional native species data and past survival records from your own nurseries.

*Field note:* Plans get passed, then works start on a different parcel because that's where the sanction came through. If the works entry doesn't link to a planned intervention, you'll never see the drift.


## Stage: Restoration Implementation

**Every sapling and trench logged with species, GPS and wage**

Implementation is where numbers inflate. A planting log that says 10,000 saplings with no GPS, no species split and no nursery batch can't be checked and won't survive an audit or a carbon verifier. Stewards and wage labourers also need to be paid on time, or protection stops the week payments slip.

*Decision it serves:* Lets the site supervisor and finance team verify what was planted or built where, and release steward and wage payments against it.

*How the work flows:*
1. **Raise nursery stock** (Nursery steward): Log seed source, species, batch size and germination. Photograph beds monthly.
1. **Dispatch to site** (Nursery steward, supervisor): Record saplings dispatched per parcel and species, with the nursery batch ID.
1. **Plant and build works** (Labour gang, supervisor): Log pits dug and saplings planted per parcel, with GPS of plot corners and photos. Log trenches and bunds in running metres.
1. **Record attendance and wages** (Supervisor): Daily muster per worker per parcel, linked to the works entry. Separate MGNREGA and programme-paid days.
1. **Verify and pay** (Programme officer, finance): Sample 10% of plots on the ground, reconcile muster with works, release payment by bank transfer.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Count saplings and check spacing from drone orthomosaics of a planted plot. *Needs first:* Drone flights at consistent height and a model tested on your planting pattern.
- Work Smarter (L3): Flag muster entries that look duplicated or improbable across workers and parcels. *Needs first:* Clean worker IDs and at least one season of verified musters.
- Know Faster (L3): Weekly plain-language progress note to the district team from the planting and muster data. *Needs first:* Works entries linked to parcels and plans.

*Field note:* Planting logs often record totals per village, not per parcel. When survival counts come round in year two, nobody can say which patch those 4,000 saplings went into.


## Stage: Monitoring & Stewardship

**Year-three survival rates and institutions that run without us**

A restoration programme is judged in year three, not at planting. Survival counts, canopy change, groundwater and the institution's own record of enforcing rules are the evidence. Carbon and biodiversity buyers will ask for it plot by plot, and they'll check.

*Decision it serves:* Helps the programme team and the institution decide where to replant, where to hand over, and what to report to carbon registries or funders.

*How the work flows:*
1. **Survival counts** (Trained villagers, supervisor): Count live saplings in fixed sample plots at 6, 12, 24 and 36 months. Record by species.
1. **Ecological monitoring** (Ecologist, community monitors): Repeat baseline quadrats, canopy cover, well levels and bird or species counts on fixed transects.
1. **Remote change check** (GIS associate): Compare NDVI and land cover to baseline per parcel each season.
1. **Institution self-review** (Institution, facilitator): Score meetings held, rules enforced, funds managed and disputes settled. Plan handover if criteria met.
1. **Report outcomes** (MEL lead): Prepare funder, carbon or biodiversity reports from linked parcel data, with plot-level evidence.

*Where AI genuinely helps (MAP: Power):*
- Know Faster (L3): Detect canopy and land cover change per parcel from seasonal satellite imagery. *Needs first:* Clean parcel polygons and ground-truthed baseline plots.
- Collect Faster (L2): Identify bird and plant species from monitor photos and audio recordings. *Needs first:* A model validated on regional species and consistent recording protocol.
- Build Faster (L2): Assemble the carbon or funder report from parcel-level data in the required template. *Needs first:* Survival, canopy and works data linked by parcel and a fixed report template.

*Field note:* Survival counts stop after year one because the project budget did. Without year-three numbers, a carbon buyer will discount the whole claim.

## Episode ideas

See `catalog/` for the generated episode list for this sector (overview + one episode per stage + cross-cutting topics).
