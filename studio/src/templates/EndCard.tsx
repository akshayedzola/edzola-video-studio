import {Img, Node, Rect, Txt} from '@revideo/2d';
import {all, createRef, linear} from '@revideo/core';
import floral from '../../../assets/brand/floral-mark.svg';
import wordmark from '../../../assets/brand/edzola-wordmark-transparent.png';
import {color, font, type} from '../brand/theme';
import type {Handlers} from '../lib/cues';
import {reveal} from '../lib/motion';
import type {TimedScene} from '../lib/types';

/**
 * EndCard: brand sign-off plus what to watch next. Props:
 *   tagline?, next?: {label?, title}
 * Actions: show-logo | show-tagline | show-next
 */
export function EndCard(stage: Node, scene: TimedScene): Handlers {
  const p = scene.props;
  const logo = createRef<Img>();
  const mark = createRef<Img>();
  const tagline = createRef<Txt>();
  const next = createRef<Rect>();

  stage.add(
    <>
      <Img ref={mark} src={floral} x={-700} y={250} width={190} opacity={0} />
      <Img ref={logo} src={wordmark} y={-210} width={520} opacity={0} />
      <Txt ref={tagline} text={p.tagline ?? ''} y={-30} fontFamily={font.display} fontWeight={500}
        fontSize={type.h3} fill={color.ink} opacity={0} />
      <Rect ref={next} y={170} width={1160} height={170} radius={28} fill={color.peach} opacity={0}>
        <Txt text={(p.next?.label ?? 'Next episode').toUpperCase()} y={-36} fontFamily={font.body} fontWeight={700}
          letterSpacing={4} fontSize={type.kicker - 4} fill={color.coralDeep} />
        <Txt text={p.next?.title ?? ''} y={22} width={1080} textAlign={'center'} fontFamily={font.body}
          fontWeight={600} fontSize={type.body} fill={color.ink} />
      </Rect>
    </>,
  );

  return {
    'show-logo': () => all(mark().rotation(60, scene.duration, linear), mark().opacity(1, 0.8), reveal(logo(), 30, 0.8)),
    'show-tagline': () => reveal(tagline()),
    'show-next': function* () {
      if (p.next) yield* reveal(next(), 30);
    },
  };
}
