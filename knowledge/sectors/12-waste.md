# Waste Management

> Every kilo recovered traced to a ward, a worker and a wage

**Status:** edzola_opinion (EdZola MAP Field Guide). Fields and indicators are starting points for a human to adapt.

Cities count tonnes landfilled. Waste pickers count what they earn per kilo. Those two numbers only meet when every weighment is tied to a registered worker, a ward and a buyer, and that's what gets waste pickers recognised as service providers and gets EPR money to the people doing the recovery.

## The data thread: Worker ID

Each waste picker gets one worker ID at enumeration, printed on the occupational ID card. Every collection shift, weighment, sale share, insurance enrolment and income record hangs off that ID, so the worker's history travels with them across wards and DWCCs.

## Core entities

- **Waste Picker**: A registered worker with occupational ID, cooperative or SHG membership, work type (street, door-to-door, dump yard, sorter) and ward of work.
- **Ward**: The municipal ward or collection zone, with households, bulk generators, assigned workers and routes.
- **Collection Log**: One shift or trip: route, vehicle, households covered, segregation compliance and weight collected by stream.
- **Recovery Centre**: The DWCC or MRF where waste is sorted, baled and stored. Has capacity, operator and inbound and outbound weighments.
- **Sale Transaction**: A sale of sorted material to a recycler or aggregator: material grade, weight, rate, buyer and EPR certificate reference.
- **Benefit Enrolment**: A worker's linkage to insurance, e-Shram, PM-JAY, pension, bank account or a skills programme, with status and renewal date.

## Stage: Worker Enumeration & Onboarding

**Count the waste pickers before the city counts them out**

Waste pickers who aren't on a register lose access when a city contracts out collection or closes a dump. Enumeration is the first proof they exist as workers, and the ID card is what gets them through the DWCC gate and into the municipal agreement. Get the register wrong and you'll exclude the women and children at the dump yard who were hardest to find.

*Decision it serves:* Lets the union or cooperative and the municipality decide who gets an occupational ID, which ward they're assigned to and who is covered by the service agreement.

*How the work flows:*
1. **Map work sites** (Organiser, senior waste pickers): List dump yards, scrap shops, street routes and bulk generators by ward. Waste pickers know where their peers work.
1. **Enumerate workers** (Trained surveyors from the community): Door-to-door and site survey: work type, years in trade, materials picked, household, existing documents.
1. **Verify with peers** (Cooperative committee): Peer verification at a community meeting to confirm who is a waste picker, since most have no paper proof.
1. **Issue occupational ID** (Municipality, NGO): Print ID cards with photo and worker ID, co-signed by the municipal commissioner under SWM Rules.
1. **Form cooperative or SHG** (Organiser, workers): Register members, elect office bearers, open a group bank account, sign the municipal agreement for ward service.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Voice-based enumeration in the local language, where surveyors speak answers and a model fills the form for review. *Needs first:* A private speech model that handles the dialect and a tested form.
- Work Smarter (L2): Suggest duplicate matches across enumeration rounds using name, photo and site. *Needs first:* Consent for photo use and a registry held on a private server.
- Build Faster (L1): Draft the municipal MoU annexure listing verified workers by ward from the registry. *Needs first:* A verified, de-duplicated registry.

*Field note:* Enumeration done in the afternoon misses night pickers and dump yard workers who start at 4am. The register ends up male, street-based and not who the programme is for.


## Stage: Collection & Segregation

**Kilos per ward, by stream, weighed at the gate every shift**

The city pays on tonnage and households covered. Waste pickers earn on what's recoverable. If you don't weigh by stream at the point of collection, you can't prove segregation is improving, and you can't argue the ward is ready for more household coverage.

*Decision it serves:* Lets the collection supervisor and ward officer decide route allocation, vehicle scheduling and which households need segregation follow-up.

*How the work flows:*
1. **Plan routes** (Supervisor): Assign workers and vehicles to ward routes and bulk generators for the week.
1. **Collect door to door** (Waste pickers): Collect from households and bulk generators, note segregation at source per lane or building.
1. **Run awareness drives** (Waste pickers, community mobilisers): Follow up with non-segregating households, RWAs and shops. Log visits and responses.
1. **Weigh at DWCC gate** (DWCC operator): Weigh each load by stream: dry, wet, reject, sanitary. Record route and vehicle.
1. **Hand over residuals** (Supervisor, municipality): Record rejects handed to municipal trucks for processing or landfill.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Read scale displays and load photos to auto-fill weighment entries. *Needs first:* Standard scales and a photo taken at every weighment.
- Work Smarter (L3): Optimise weekly route and vehicle allocation from coverage, tonnage and road data. *Needs first:* Clean route IDs and at least three months of collection logs.
- Know Faster (L3): Weekly ward-level summary of segregation and tonnage trends for the corporation meeting. *Needs first:* Collection logs linked to wards and routes.

*Field note:* Weighing total waste instead of by stream is the most common gap. You can't show diversion, and the city assumes it all went to landfill.


## Stage: Processing & Sale

**From baled PET to EPR certificate, every tonne traceable**

Sorting is skilled work, and grade determines price. Brands buying EPR credits now need a traceable chain from DWCC to recycler, and the CPCB portal won't accept vague numbers. If your sales ledger can't tie material back to the ward it came from, the EPR value goes to the aggregator, not the workers.

*Decision it serves:* Lets the DWCC operator and cooperative decide when to sell, to whom and at what grade, and lets the EPR team claim credits against verified tonnage.

*How the work flows:*
1. **Sort by grade** (Sorters): Sort dry waste into 20 to 40 grades: PET, HDPE, MLP, cardboard, glass, metal. Log kg per grade per day.
1. **Bale and store** (DWCC operator): Bale by grade, tag each bale with an ID, weight and date, track stock in the shed.
1. **Negotiate and sell** (Cooperative, operator): Compare recycler rates, sell by grade, record buyer, rate and weighbridge slip.
1. **Document EPR chain** (EPR coordinator): Link bales sold to recycler invoices and CPCB portal entries for plastic EPR certificates.
1. **Distribute earnings** (Cooperative treasurer): Share sale proceeds to sorters and collectors per agreed rule, logged per worker ID.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Extract buyer, weight, rate and date from photos of weighbridge slips and invoices. *Needs first:* Clear photos and a fixed set of buyer names in the system.
- Know Faster (L3): Track recycler rate trends by grade and suggest when to hold or sell. *Needs first:* At least six months of sale records and a market rate source.
- Build Faster (L2): Compile monthly EPR traceability packs from bale, sale and invoice records. *Needs first:* Bale IDs linked to sales and verified recycler registrations.

*Field note:* DWCCs often record sales by total weight and total cash. When a brand asks for plastic-only EPR tonnage, nobody can separate it.


## Stage: Welfare & Impact Tracking

**Income, insurance and the tonnes waste pickers kept out of landfill**

Integration is steady income, insurance that pays out, children in school and a pension. The city also needs diversion numbers to meet SWM targets, and waste pickers should get credit for them in the report.

*Decision it serves:* Lets the organisation and cooperative decide which workers need benefit linkage follow-up and lets the city see diversion credited to the informal sector.

*How the work flows:*
1. **Link to schemes** (Facilitator): Enrol workers in e-Shram, PM-JAY, PMJJBY, PMSBY and state welfare boards. Log application and approval.
1. **Track income monthly** (Cooperative treasurer): Record each member's earnings from sales, service fees and municipal payments.
1. **Offer skills and enterprise** (Programme team): Driving licences, DWCC management, composting enterprise. Log enrolment and completion.
1. **Survey wellbeing** (Trained peers): Annual follow-up on children's schooling, housing, health spending and debt.
1. **Report diversion** (MEL lead): Send ward-level diversion and worker welfare numbers to the corporation and funders.

*Where AI genuinely helps (MAP: Power):*
- Work Smarter (L2): Check which schemes each worker qualifies for from their profile and documents. *Needs first:* Current scheme eligibility rules and complete worker profiles.
- Know Faster (L3): Quarterly impact note for funders and the city from income, benefit and diversion data. *Needs first:* Linked worker, collection and sale records.
- Build Faster (L2): Pre-fill scheme application forms from the registry for facilitators to complete with workers. *Needs first:* A private deployment that keeps worker data off public tools.

*Field note:* Insurance enrolment gets celebrated, then renewals lapse in year two and nobody notices until a worker is injured.

## Episode ideas

See `catalog/` for the generated episode list for this sector (overview + one episode per stage + cross-cutting topics).
