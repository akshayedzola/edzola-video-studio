import {Rect, Txt, View2D} from '@revideo/2d';
import {createRef, linear, ThreadGenerator, waitFor} from '@revideo/core';
import {color, font, frame, type} from '../brand/theme';
import {waitUntilLocal} from './cues';
import type {BuiltEpisode, TimedScene} from './types';

/** Thin coral progress line along the bottom edge, continuous across scenes. */
export function* progressBar(view: View2D, ep: BuiltEpisode, scene: TimedScene): ThreadGenerator {
  const bar = createRef<Rect>();
  const w = frame.width;
  view.add(
    <Rect
      ref={bar}
      x={-w / 2}
      y={frame.height / 2 - 4}
      offset={[-1, 0]}
      height={8}
      width={(scene.start / ep.total) * w}
      fill={color.coral}
    />,
  );
  yield* bar().width(((scene.start + scene.duration) / ep.total) * w, scene.duration, linear);
}

/** Small persistent series label, top left. */
export function seriesLabel(view: View2D, ep: BuiltEpisode) {
  if (!ep.series) return;
  view.add(
    <Txt
      text={ep.series.toUpperCase()}
      x={-frame.width / 2 + frame.safeX}
      y={-frame.height / 2 + 64}
      offset={[-1, 0]}
      fontFamily={font.body}
      fontWeight={600}
      letterSpacing={3}
      fontSize={22}
      fill={color.grey}
      opacity={0.8}
    />,
  );
}

/**
 * Burned-in captions driven by per-chunk narration timing.
 * Captions are an accessibility layer; on-screen visuals still show only
 * keywords so the two do not compete (redundancy principle).
 */
export function* captions(view: View2D, t0: number, scene: TimedScene): ThreadGenerator {
  const box = createRef<Rect>();
  const txt = createRef<Txt>();
  view.add(
    <Rect
      ref={box}
      y={frame.captionY}
      layout
      padding={[14, 28]}
      radius={14}
      fill={'rgba(26,26,26,0.86)'}
      opacity={0}
    >
      <Txt ref={txt} text={''} fontFamily={font.body} fontWeight={500} fontSize={type.caption} fill={color.cream} />
    </Rect>,
  );

  const chunks = scene.beats.flatMap(b => b.captions);
  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    yield* waitUntilLocal(t0, c.start);
    txt().text(c.text);
    box().opacity(1);
    yield* waitUntilLocal(t0, c.end);
    const next = chunks[i + 1];
    if (!next || next.start - c.end > 0.25) box().opacity(0);
  }
  yield* waitFor(0);
}
