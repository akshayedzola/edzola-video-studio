# Pedagogy and formats

The visual should help the viewer **reason**, not decorate the narration. This is where EdZola can be different from generic AI explainers.

## Principles we design to (Mayer, multimedia learning)

| Principle | What it means for us | How the studio supports it |
|---|---|---|
| **Coherence** | Cut decorative images, words and music | No stock imagery; music off by default; accents ≤ 3 per video |
| **Signalling** | Highlight what's being talked about, when it's talked about | Cue actions positioned within beats (`at`); pulse/highlight/shake |
| **Redundancy** | Don't put the narration on screen as text | Keywords in `props`; captions as an accessibility layer only |
| **Modality** | Narration + visuals beat on-screen text + visuals | Every scene is voiced |
| **Segmenting** | Chunk into 1–3 min sections | Scenes → YouTube chapters (`chapter` field) |
| **Contiguity** | Labels next to the thing; visuals in sync with words | Labels inside nodes/cards; beat-level timing |
| **Personalisation** | Conversational "you" | Script rules in 08 |
| **Pre-training** | Introduce key terms before using them | Define once ("a management information system"), then abbreviate |

Plus lessons from the best explainer channels (3Blue1Brown, Kurzgesagt): **one idea per scene**, start from a concrete example then abstract, use motion to show change, keep a consistent visual language.

## The default lesson arc

1. **Hook (≤10 s):** a problem the viewer feels. No logo intro.
2. **Tension:** the misconception, or the thing that doesn't add up.
3. **Build the model:** construct it on screen, piece by piece.
4. **Test it:** a question, a contradiction, a "which would you choose?"
5. **Takeaway:** what to do differently on Monday.
6. **Next:** the open question the next episode answers.

## The eight formats

| Format | Shape | Example | Templates |
|---|---|---|---|
| **before_after** | Messy reality → one intervention → transformed system | What changes when a nonprofit moves from spreadsheets to an MIS? (ep000) | Spreadsheets, ConceptBuild |
| **decision_simulation** | Dilemma → pause to choose → animate consequences | Buy software, customise Zoho, or build your own? | DecisionTree* |
| **reveal_invisible_system** | Show how data, people, decisions and technology connect behind the scenes | What happens during an AI-powered placement verification call? | DataJourney* |
| **data_storytelling** | Surprising number → why it misleads → reveal the underlying data | Why 80% placement isn't 80% retention | MetricConflict, ChartBuild* |
| **fictional_case_study** | Follow Sitara Foundation through problem → decision → outcome | Sitara digitises its field operations | CharacterScene*, Timeline* |
| **product_walkthrough** | Real software doing a task, annotated so the viewer sees what matters | Creating a DozAI mission and reviewing results | UIHighlight* |
| **myth_vs_reality** | Dismantle a common misconception | Dashboards don't automatically improve decisions | Statement |
| **progressive_construction** | Build a framework or architecture one component at a time | What is an MIS, really? | ConceptBuild, FrameworkSteps |

\* = in the template backlog ([06](06-scene-template-library.md)).

## Example of "visual helps reasoning"

Explaining data fragmentation: don't show a database icon. Show **the same learner in three spreadsheets, spelled three ways**, then animate each team updating its own copy until the records disagree. Then scale that to the quarterly report: three numbers for one indicator. The viewer *experiences* why the funder report is wrong before we name the solution.
