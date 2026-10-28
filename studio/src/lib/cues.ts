import {ThreadGenerator, useTime, waitFor} from '@revideo/core';
import type {CueAction, TimedScene} from './types';

export type Handlers = Record<string, (a: CueAction) => ThreadGenerator>;

/** Wait until `t` seconds after `t0` (a value from useTime()). */
export function* waitUntilLocal(t0: number, t: number): ThreadGenerator {
  const remaining = t - (useTime() - t0);
  if (remaining > 1e-4) yield* waitFor(remaining);
}

/** Absolute scene-local time for one cue action. */
export function cueTime(beat: {start: number; end: number}, a: CueAction) {
  return beat.start + (a.at ?? 0) * (beat.end - beat.start) + (a.delay ?? 0);
}

/**
 * Fire every beat's `do` actions at their narration timestamps.
 * Each action runs concurrently so a slow tween never delays the next cue;
 * timing is always driven by the narration, not by animation lengths.
 * The runner stays alive until `until` because child threads are cancelled
 * when their parent finishes (otherwise the last cue would be cut off).
 */
export function* runCues(t0: number, scene: TimedScene, handlers: Handlers, until = scene.duration): ThreadGenerator {
  const items = scene.beats
    .flatMap(b => (b.do ?? []).map(a => ({t: cueTime(b, a), a})))
    .sort((x, y) => x.t - y.t);

  for (const {t, a} of items) {
    const handler = handlers[a.action];
    if (!handler) {
      throw new Error(`Scene ${scene.id}: template "${scene.template}" has no action "${a.action}"`);
    }
    yield* waitUntilLocal(t0, t);
    yield handler(a);
  }
  yield* waitUntilLocal(t0, until);
}
