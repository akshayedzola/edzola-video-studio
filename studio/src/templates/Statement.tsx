import {Line, Node, Txt} from '@revideo/2d';
import {all, createRef, easeInOutCubic} from '@revideo/core';
import {color, font, type} from '../brand/theme';
import type {Handlers} from '../lib/cues';
import {reveal} from '../lib/motion';
import {highlighted} from '../lib/richText';
import type {TimedScene} from '../lib/types';

/**
 * Statement: myth vs reality, or a single strong line. Props:
 *   myth?, mythLabel? ("Common belief"), reality, realityLabel?, highlight?
 * Actions: show-myth | strike | show-reality
 */
export function Statement(stage: Node, scene: TimedScene): Handlers {
  const p = scene.props;
  const mythLabel = createRef<Txt>();
  const myth = createRef<Txt>();
  const strike = createRef<Line>();
  const realityLabel = createRef<Txt>();
  const reality = createRef<Txt>();
  const hasMyth = Boolean(p.myth);

  stage.add(
    <>
      <Txt ref={mythLabel} text={(p.mythLabel ?? 'Common belief').toUpperCase()} y={-250} fontFamily={font.body}
        fontWeight={600} letterSpacing={4} fontSize={type.kicker} fill={color.grey} opacity={0} />
      <Txt ref={myth} text={p.myth ?? ''} y={-170} fontFamily={font.body} fontWeight={500} fontSize={type.h3}
        fill={color.grey} opacity={0} />
      <Line ref={strike} points={[[-10, 0], [10, 0]]} y={-168} stroke={color.coralDeep} lineWidth={6} end={0} />
      <Txt ref={realityLabel} text={(p.realityLabel ?? 'In practice').toUpperCase()} y={hasMyth ? -10 : -150}
        fontFamily={font.body} fontWeight={600} letterSpacing={4} fontSize={type.kicker} fill={color.coralDeep} opacity={0} />
      <Txt ref={reality} y={hasMyth ? 110 : 0} width={1500} textWrap textAlign={'center'} fontFamily={font.display}
        fontWeight={600} fontSize={type.h2} lineHeight={type.h2 * 1.15} fill={color.ink} opacity={0}>
        {highlighted(p.reality, p.highlight, color.coralDeep)}
      </Txt>
    </>,
  );

  return {
    'show-myth': () => all(reveal(mythLabel()), reveal(myth())),
    'strike': function* () {
      const half = myth().width() / 2 + 20;
      strike().points([[-half, 0], [half, 0]]);
      yield* strike().end(1, 0.5, easeInOutCubic);
      yield* myth().opacity(0.5, 0.3);
    },
    'show-reality': () => all(reveal(realityLabel()), reveal(reality(), 36, 0.8)),
  };
}
