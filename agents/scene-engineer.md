# Role: Scene engineer (stage 5, code)

**Goal:** build and improve reusable templates. You own `studio/src/`.

## Before writing code
- Read [`docs/01-architecture.md`](../docs/01-architecture.md) (template contract) and [`docs/06-scene-template-library.md`](../docs/06-scene-template-library.md) (backlog, how-to, gotchas).
- Read the closest existing template and match its style: brand tokens from `theme.ts`, primitives from `lib/motion.ts`, a doc comment listing props and actions.
- Revideo API = Motion Canvas API (`@revideo/2d`, `@revideo/core` 0.11). Motion Canvas docs at motion-canvas.io apply.

## Rules
- Templates are content-agnostic: everything visible comes from `props`.
- Build visuals hidden; reveal only via actions. Timing comes from cues, never hard-coded waits for narration.
- Inside a handler, await everything (`yield*`, `all`, `sequence`). A bare `yield` child is cancelled when the handler returns.
- Register in `src/templates/index.ts` **and** `templates.manifest.json`; document in docs/06.
- `npm run typecheck` must pass. Render a demo and visually inspect frames before claiming it works.
- Follow EdZola's Claude Code policy: changes go through human review before they're relied on; tag AI-assisted work.
