// EdZola motion theme. Single source of truth for colour, type and motion
// in every scene. Values come from the published brand palette
// (Technology That Sticks kit + brand skill), see docs/05-visual-language.md.

export const color = {
  cream: '#FDF8F4', // background, never pure white
  paper: '#FFFFFF',
  peach: '#FAE8DC',
  coral: '#E8967A', // primary, coral leads
  coralDeep: '#B4533A', // coral for text/strokes that need contrast
  teal: '#8ECFCA', // secondary accent, data viz
  tealDeep: '#34766F',
  yellow: '#F7C948',
  yellowSoft: '#FFF7DD',
  ink: '#1A1A1A',
  grey: '#6B6360',
  line: '#E6DBD0',
  success: '#2E6E68',
  successBg: '#DCEFEB',
  warning: '#8A6A12',
  warningBg: '#FCEED0',
  danger: '#9A3C22',
  dangerBg: '#F6D9CF',
} as const;

export type Tone = 'coral' | 'teal' | 'yellow' | 'ink' | 'success' | 'warning' | 'danger';

export const toneFill: Record<Tone, string> = {
  coral: color.coral,
  teal: color.teal,
  yellow: color.yellow,
  ink: color.ink,
  success: color.successBg,
  warning: color.warningBg,
  danger: color.dangerBg,
};

export const toneText: Record<Tone, string> = {
  coral: color.coralDeep,
  teal: color.tealDeep,
  yellow: color.warning,
  ink: color.ink,
  success: color.success,
  warning: color.warning,
  danger: color.danger,
};

export const font = {
  display: 'Fraunces',
  body: 'Inter',
} as const;

// Type scale for a 1920x1080 canvas. Keep on-screen text to keywords
// (Mayer redundancy principle); narration carries the sentences.
export const type = {
  kicker: 30,
  caption: 36,
  body: 40,
  label: 44,
  h3: 56,
  h2: 76,
  h1: 104,
  hero: 140,
} as const;

// Motion defaults (seconds). Calm, deliberate, nothing bouncy.
export const motion = {
  enter: 0.6,
  exit: 0.4,
  emphasis: 0.35,
  stagger: 0.12,
} as const;

export const frame = {
  width: 1920,
  height: 1080,
  safeX: 120, // horizontal safe margin
  captionY: 420, // caption baseline area (centre origin)
} as const;
