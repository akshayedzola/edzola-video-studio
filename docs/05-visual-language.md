# Visual language: the EdZola brand in motion

Code source of truth: [`studio/src/brand/theme.ts`](../studio/src/brand/theme.ts). Brand sources: `Design System/uploads/SKILL-edzola-brand-updated (1).md` and `Technology-That-Sticks_Content-Kit/README.md`.

## Palette

| Token | Hex | Use |
|---|---|---|
| cream | `#FDF8F4` | Background, always. Never pure white or dark mode for EdZola episodes |
| coral | `#E8967A` | Primary accent. **Coral leads.** Fills, progress bar, frames |
| coralDeep | `#B4533A` | Coral for text and highlighted words (contrast) |
| teal | `#8ECFCA` | Secondary accent and data series; Finance in Sitara |
| yellow | `#F7C948` | Third accent and highlights; M&E in Sitara |
| peach | `#FAE8DC` | Soft panels (e.g. "Next episode") |
| ink | `#1A1A1A` | Text |
| grey | `#6B6360` | Secondary text, labels |
| success / warning / danger | `#2E6E68` / `#8A6A12` / `#9A3C22` on their pale backgrounds | Data states (placed / in training / stopped) |

**Fixed semantic colours across all episodes:** MAP is M coral, A teal, P yellow. Sitara teams are Programme coral, Finance teal, M&E yellow. Never reuse these colours for other meanings.

**Sub-brands:** Zolabs (violet) and DozAI (its own system in `dozai/DESIGN.md`) get their own theme files when Series C starts. They must not wear EdZola coral.

## Type

- **Fraunces** (display serif, 600): titles, big numbers, statements.
- **Inter** (500–700): labels, captions, UI.
- Scale on 1920×1080: hero 140 · h1 104 · h2 76 · h3 56 · label 44 · body 40 · caption 36 · kicker 30 (uppercase, letter-spaced).
- Never below 22 px on a 1080p frame, and never below 26 px for anything the viewer must read.

## Layout

- Centre-origin coordinates; safe margin 120 px horizontally.
- Top band (y < −400): series label only. Bottom band (y > 360): captions and progress bar. Keep content between.
- One focal idea per frame. When something new appears, the eye should know where to go.

## Motion

- **Calm and deliberate.** Fade-and-settle reveals (0.6 s, ease-out cubic, 28 px rise). No bounces or spins on content.
- **Motion explains.** Use movement to show change: a cell value changing, a record moving, a line connecting. Never for decoration.
- **Signalling.** When the narration names a thing, that thing moves (pulse, highlight or shake for contradiction).
- **Decorative accents** (starburst, floral, blob): at most 3 per video, slow rotation only, and only on title and end cards.
- Each scene fades in over 0.6 s and out over 0.4 s on a constant cream background, so transitions feel seamless.

## Accessibility

- Burned-in captions on a dark pill (`rgba(26,26,26,0.86)`, cream text) for silent autoplay (LinkedIn, Shorts); plus an SRT upload for YouTube.
- Never encode meaning in colour alone: status changes also change the word ("Placed", "Stopped").
- Contrast: text colours are the "deep" variants on cream/paper.

## Do / don't

| Do | Don't |
|---|---|
| Show the same learner in three spreadsheets | Show a stock image of "data" |
| Label fictional data "Illustrative data" | Use real partner logos without written permission |
| Use the hand-drawn wordmark on the end card only | Put the logo on every frame or open with a logo sting |
| Show keywords on screen | Put the full narration on screen as text |
