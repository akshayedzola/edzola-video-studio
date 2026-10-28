# Food Systems

> From seed on credit to a hot meal, tracked per plate

**Status:** edzola_opinion (EdZola MAP Field Guide). Fields and indicators are starting points for a human to adapt.

Whether you're financing inputs for smallholders or running a kitchen that feeds 50,000 children before 11am, the work is logistics under tight margins and tighter seasons. A farmer who misses the planting window loses the year; a meal that leaves the kitchen late or cold is a meal that doesn't count. Linking each farmer or household from enrolment to harvest or plate is how you know whether yields, repayments and nutrition actually moved.

## The data thread: Enrolment ID

Each farmer, household or school gets one enrolment ID that links eligibility, inputs or rations received, deliveries and outcomes. In a farmer model it ties the input loan to the harvest and repayment; in a feeding model it ties the school or partner agency to meals served and attendance.

## Core entities

- **Enrollee**: The farmer, household, school or partner agency enrolled, with location, size (acres, household members or pupils) and eligibility basis.
- **Farmer Group / Partner Agency**: The farmer group, FPO, school or food bank partner through which inputs or food are delivered.
- **Input / Food Lot**: Seed, fertiliser, donated or rescued food, or kitchen raw material, with quantity, source, batch and expiry.
- **Distribution**: Each delivery of inputs, rations or meals: date, route, quantity, recipient and quality check.
- **Loan & Repayment**: Input credit issued and repayments collected, by farmer and season.
- **Outcome Measure**: Harvest and yield, food security score, nutrition or attendance measured at set points.

## Stage: Enrolment & Needs Mapping

**Registering farmers before planting, households before the lean season**

Enrolment runs on a hard calendar. Farmers have to be registered, grouped and costed before input orders go to suppliers; feeding programmes need school rolls and partner agency capacity before the kitchen plans quantities. Get the farm size or household count wrong here and every order, route and target downstream inherits the error.

*Decision it serves:* The field or programme manager decides who qualifies, how much input or food to plan for, and which groups or partner agencies to work through.

*How the work flows:*
1. **Register enrollees** (Field officer or partner coordinator): Register farmers in their village or households, schools and agencies at their site. Record location and ID.
1. **Assess need** (Field officer): Record farm size and crop plan, or run a food insecurity screen such as FIES or HFIAS for households.
1. **Form groups or onboard partners** (Field officer or partnerships lead): Form farmer groups of 8 to 12 with a leader, or verify partner agencies' storage, hygiene and beneficiary lists.
1. **Take input or ration orders** (Group leader or partner coordinator): Farmers choose input packages and loan size; schools confirm enrolment and meal days; agencies confirm monthly demand.
1. **Confirm eligibility and plan** (Programme manager): Approve enrolment lists and consolidate orders for procurement or kitchen planning.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L2): Voice-based enrolment in the local language for farmers with low literacy. *Needs first:* A short, tested form and private speech model.
- Work Smarter (L2): Flag likely duplicate farmers or households across groups and seasons. *Needs first:* Consistent IDs and phone numbers from past seasons.
- Know Faster (L3): Forecast input demand from past seasons' orders and current enrolment. *Needs first:* At least three seasons of clean order and enrolment data.

*Field note:* Enrolment closes late because of a delayed village meeting, orders reach suppliers after the cutoff, and seed arrives two weeks after the rains start.


## Stage: Sourcing & Production

**Inputs on time, surplus rescued, kitchens cooking to count**

In the farmer model this is inputs on credit and agronomy training timed to the season. In the feeding model it's rescued surplus, donated stock and a centralised kitchen producing meals at scale against FSSAI norms. Both come down to the same thing: the right quantity, of acceptable quality, at the right time, and a record of where it came from.

*Decision it serves:* The operations lead decides what to procure, accept or cook, and field officers decide which farmers need extra agronomy support.

*How the work flows:*
1. **Procure or receive stock** (Procurement or warehouse lead): Receive seed, fertiliser, donated or rescued food. Record batch, supplier or donor, quantity and expiry.
1. **Quality check on receipt** (Quality officer): Check seed germination certificates, or food condition, temperature and shelf life. Reject and record failures.
1. **Train farmers** (Field officer): Deliver agronomy sessions on planting, spacing and fertiliser timing at group meetings. Record attendance.
1. **Plan and cook meals** (Kitchen manager): Cook per school headcount and menu. Record raw material used, batches cooked and hygiene checks.
1. **Record stock movements** (Warehouse or kitchen staff): Log issues, returns and wastage using FEFO so stock nearest expiry moves first.

*Where AI genuinely helps (MAP: Power):*
- Collect Faster (L1): Read batch labels and expiry dates from photos into stock records. *Needs first:* Clear photos and a consistent label format from major suppliers.
- Know Faster (L3): Forecast daily meal quantities from school attendance patterns, holidays and weather. *Needs first:* A year of daily headcount and production data per school.
- Build Faster (L2): Turn agronomy guides into short voice messages in local languages for farmers. *Needs first:* Agronomy content validated by the field team.

*Field note:* Donated food arrives with no expiry recorded. The warehouse finds out when a partner agency sends it back, or worse, when it doesn't.


## Stage: Distribution & Delivery

**Last-mile delivery that arrives before planting or before lunch**

A hot meal has a window of a couple of hours; seed has a window of a couple of weeks. Distribution is where plans meet bad roads, broken vans and school timings that shift without notice. Records here prove what reached whom, in what condition, and whether the delivery made it inside the window that mattered.

*Decision it serves:* The logistics lead decides routes, loads and re-routing, and partner coordinators decide which agencies or schools need urgent follow-up.

*How the work flows:*
1. **Plan routes and loads** (Logistics lead): Assign vans and routes by delivery point, quantity and time window.
1. **Dispatch with quality check** (Kitchen or warehouse supervisor): Record dispatch time, food temperature for meals, and quantity loaded against the plan.
1. **Deliver and confirm receipt** (Driver or field officer): Hand over at school, agency or farmer group. Record quantity received and time, with recipient confirmation.
1. **Check quality at delivery** (School teacher or partner staff): Confirm food temperature and condition, or input bag integrity. Report issues on the spot.
1. **Link to markets** (Market linkage officer): For farmer programmes, arrange aggregation and buyer pickup after harvest. Record prices and volumes.

*Where AI genuinely helps (MAP: Power):*
- Work Smarter (L3): Optimise daily routes based on delivery points, traffic and time windows. *Needs first:* Accurate GPS for every delivery point and historic trip times.
- Collect Faster (L1): Read signed delivery notes from photos into delivery records. *Needs first:* Standard delivery note format.
- Know Faster (L3): Weekly analysis of late and short deliveries by route and partner. *Needs first:* Three months of consistent delivery confirmation data.

*Field note:* Delivery gets marked done when the van leaves the kitchen. The school says the dal arrived cold at 1pm, and there's no record to settle it.


## Stage: Outcome Monitoring

**Yield per acre, repayment and nutrition, measured every season**

The outcome question differs by model but the discipline is the same. For farmer programmes it's harvest, yield per acre, repayment and income over the season. For feeding programmes it's attendance, food security and nutrition over time. Both need measurement planned from enrolment, not assembled for the donor report.

*Decision it serves:* The programme director decides which packages, crops, routes or partners to scale, change or drop next season based on outcomes.

*How the work flows:*
1. **Measure harvest** (Field officer): Conduct crop cuts or harvest weigh-ins for a sample of farmers. Record yield per acre.
1. **Collect repayments** (Field officer or mobile money): Track repayments against loan schedule. Record amount, date and channel.
1. **Track nutrition or attendance** (School or M&E team): Record school attendance on meal days, or run FIES, dietary diversity or anthropometry at set points.
1. **Collect feedback** (Field officer or IVRS): Ask farmers, parents or agencies about quality, timeliness and satisfaction.
1. **Review the season** (Programme director): Compare outcomes against baseline and targets. Decide changes for the next season.

*Where AI genuinely helps (MAP: Power):*
- Know Faster (L2): Season-end analysis of yield and repayment by package, crop and district. *Needs first:* Clean harvest and repayment data linked to enrolment.
- Work Smarter (L3): Flag farmers likely to struggle with repayment from early signals like missed training or late planting. *Needs first:* Several seasons of linked enrolment, training and repayment data.
- Build Faster (L2): Draft season reports for donors from outcome dashboards. *Needs first:* Validated outcome data and an agreed report template.

*Field note:* Repayment rate becomes the headline number. Nobody tracks whether farmers sold their harvest early at low prices to repay, which quietly wipes out the income gain.

## Episode ideas

See `catalog/` for the generated episode list for this sector (overview + one episode per stage + cross-cutting topics).
