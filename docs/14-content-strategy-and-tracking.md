# Content strategy and tracking

## How we reach 3,500+ videos without duplicates

Every video has exactly one **id**, generated from the catalogue (`node scripts/catalog.mjs`):

| Layer | Rule | Count |
|---|---|---|
| **Core episodes** | Curated in [`catalog/core.json`](../catalog/core.json): Series A (30), B (18), C (12) | 60 |
| **Sector episodes** | 16 sectors ([knowledge/sectors](../knowledge/sectors/)) × (6 topic templates + 4 lifecycle stages) from [`catalog/sector-topics.json`](../catalog/sector-topics.json) | 160 |
| **Shorts** | 3 per long-form episode (`<id>--short-1..3`), unlocked when the parent is published | 660 |
| **Language versions** | Hindi, Tamil, Marathi for every long-form and Short (`<id>--hi`), unlocked when the source is published | 2,640 |
| **Total** | | **3,520** |

Adding one sector topic template adds 16 episodes. Activating another language (Bengali, Telugu, Kannada in [`catalog/variants.json`](../catalog/variants.json)) adds 880.

**Order of work:** p1 core episodes first (they define the formula for everything else), then each sector's `thread` episode, then Shorts of published videos (cheap, high reach), then languages once a native-sounding voice is validated for that language.

**Quality over count.** A Short or translation is only as good as its parent, so derived work unlocks only after the parent is published.

## Stages

| Stage label | Meaning | How it moves |
|---|---|---|
| `stage:open` | Available | Seeded from the catalogue |
| `stage:claimed` | Someone owns it | `/claim` on the issue |
| `stage:creation` | Brief, storyboard, voice, scenes in progress | Draft PR with `Episode: #N` |
| `stage:review` | **Manual review**: facts, pedagogy, voice, brand, privacy | PR marked ready for review |
| `stage:approved` | Merged; waiting for upload | PR merged |
| `stage:published` | Live on YouTube; issue closed | Maintainer comments `/published <url>` |

[TRACKER.md](../TRACKER.md) is regenerated every 6 hours and on every stage change.

## GitHub or Zoho Sprints for tracking?

**Recommendation: GitHub is the system of record.** The work (storyboards, scenes, reviews) already lives in GitHub, so claiming, stage changes and review happen where people work, automatically, with no double entry. That matters at 3,500 items: a tracker that needs manual updates goes stale within weeks.

Use **Zoho Sprints only for EdZola-internal planning** if you need it (capacity, OKRs, who's allocated to video work this sprint). If you do, sync *from* GitHub (a GitHub → Zoho Sprints webhook or a weekly export), never the other way.

Optional upgrade: a **GitHub Projects board** (Kanban by stage label) for a visual view. It needs a token with the `project` scope. A maintainer can run `gh auth refresh -s project` and create the board from the repo's Projects tab, grouped by stage label.

## Guardrails on collaboration

- Two unfinished claims per person, so nobody can hoard the queue.
- Claims idle for 14 days get a reminder; they're released after 21.
- One episode per PR, branch `ep/<id>`; CI checks the catalogue, privacy and storyboards.
- Knowledge, brand and guardrail files need CODEOWNER review.
- Only maintainers publish.
