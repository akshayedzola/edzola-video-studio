import {makeScene2D, Node} from '@revideo/2d';
import {createRef, makeProject, useTime} from '@revideo/core';
import './brand/fonts.css';
import {color, font, motion} from './brand/theme';
import {captions, progressBar, seriesLabel} from './lib/chrome';
import {runCues, waitUntilLocal} from './lib/cues';
import type {BuiltEpisode, TimedScene} from './lib/types';
import {templates} from './templates';
// Written by pipeline/build.ts for the episode being rendered (absent on a fresh clone).
// @ts-ignore generated file
import built from './.build/episode.json';

const ep = built as unknown as BuiltEpisode;

function fontsReady() {
  return Promise.all([
    document.fonts.load(`600 80px ${font.display}`),
    document.fonts.load(`400 40px ${font.body}`),
    document.fonts.load(`700 40px ${font.body}`),
  ]);
}

function episodeScene(scene: TimedScene) {
  return makeScene2D(scene.id, function* (view) {
    view.fill(color.cream);
    yield fontsReady();
    const t0 = useTime();

    const stage = createRef<Node>();
    view.add(<Node ref={stage} opacity={0} />);
    const template = templates[scene.template];
    if (!template) throw new Error(`Unknown template "${scene.template}" in scene ${scene.id}`);
    const handlers = template(stage(), scene);

    seriesLabel(view, ep);
    yield progressBar(view, ep, scene);
    if (ep.captions === 'burned') yield captions(view, t0, scene);

    yield stage().opacity(1, motion.enter);
    yield runCues(t0, scene, handlers);

    yield* waitUntilLocal(t0, scene.duration - motion.exit);
    yield* stage().opacity(0, motion.exit);
    yield* waitUntilLocal(t0, scene.duration);
  });
}

export default makeProject({
  scenes: ep.scenes.map(episodeScene),
  settings: {
    shared: {size: {x: 1920, y: 1080}, background: color.cream},
    rendering: {fps: 30},
  },
});
