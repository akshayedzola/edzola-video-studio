// Shape of studio/src/.build/episode.json, produced by pipeline/build.ts
// from an episode's storyboard.json plus narration timing.

export interface CueAction {
  action: string;
  /** Fraction of the beat (0..1) at which to fire. Default 0. */
  at?: number;
  /** Extra seconds after the beat start (added to `at`). */
  delay?: number;
  [arg: string]: unknown;
}

export interface TimedBeat {
  text: string;
  /** Seconds, relative to scene start. */
  start: number;
  end: number;
  do?: CueAction[];
  /** Caption chunks with their own timing (relative to scene start). */
  captions: {text: string; start: number; end: number}[];
}

export interface TimedScene {
  id: string;
  type: string;
  template: string;
  props: Record<string, any>;
  /** Absolute start in the episode, seconds. */
  start: number;
  duration: number;
  beats: TimedBeat[];
}

export interface BuiltEpisode {
  video_id: string;
  title: string;
  series?: string;
  captions: 'burned' | 'sidecar';
  total: number;
  scenes: TimedScene[];
}
