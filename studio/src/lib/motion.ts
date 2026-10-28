import {Node} from '@revideo/2d';
import {all, easeInOutCubic, easeOutCubic, ThreadGenerator} from '@revideo/core';
import {motion} from '../brand/theme';

/** Fade a hidden node in while it settles upward into place. */
export function* reveal(node: Node, dy = 28, d: number = motion.enter): ThreadGenerator {
  const y = node.y();
  node.y(y + dy);
  yield* all(node.opacity(1, d), node.y(y, d, easeOutCubic));
}

/** Gentle scale pulse to signal "look here" (signalling principle). */
export function* pulse(node: Node, amount = 1.06, d: number = motion.emphasis): ThreadGenerator {
  const s = node.scale.x();
  yield* node.scale(s * amount, d / 2, easeInOutCubic).to(s, d / 2, easeInOutCubic);
}

/** Small horizontal shake, for contradictions. */
export function* shake(node: Node, px = 10): ThreadGenerator {
  const x = node.x();
  yield* node.x(x - px, 0.06).to(x + px, 0.08).to(x - px / 2, 0.08).to(x, 0.06);
}
