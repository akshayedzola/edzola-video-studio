import {Img, Node, Txt} from '@revideo/2d';
import {all, createRef, easeOutCubic, linear} from '@revideo/core';
import starburst from '../../../assets/brand/starburst-yellow.svg';
import {color, font, type} from '../brand/theme';
import type {Handlers} from '../lib/cues';
import {reveal} from '../lib/motion';
import {highlighted} from '../lib/richText';
import type {TimedScene} from '../lib/types';

/**
 * TitleHook: opening question or claim. Props:
 *   kicker?, title, highlight? (substring of title), subtitle?
 * Actions: show-kicker, show-title, show-subtitle, show-accent
 */
export function TitleHook(stage: Node, scene: TimedScene): Handlers {
  const p = scene.props;
  const kicker = createRef<Txt>();
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const accent = createRef<Img>();

  stage.add(
    <>
      <Img ref={accent} src={starburst} x={640} y={-250} width={200} opacity={0} />
      <Txt
        ref={kicker}
        text={(p.kicker ?? '').toUpperCase()}
        y={-200}
        fontFamily={font.body}
        fontWeight={600}
        letterSpacing={4}
        fontSize={type.kicker}
        fill={color.coralDeep}
        opacity={0}
      />
      <Txt
        ref={title}
        y={-40}
        width={1480}
        textWrap
        textAlign={'center'}
        fontFamily={font.display}
        fontWeight={600}
        fontSize={type.h1}
        lineHeight={type.h1 * 1.12}
        fill={color.ink}
        opacity={0}
      >
        {highlighted(p.title, p.highlight, color.coralDeep)}
      </Txt>
      <Txt
        ref={subtitle}
        text={p.subtitle ?? ''}
        y={150}
        width={1300}
        textWrap
        textAlign={'center'}
        fontFamily={font.body}
        fontSize={type.body}
        fill={color.grey}
        opacity={0}
      />
    </>,
  );

  return {
    'show-kicker': () => reveal(kicker()),
    'show-title': () => reveal(title(), 40, 0.8),
    'show-subtitle': () => reveal(subtitle()),
    'show-accent': () => {
      accent().scale(0.6);
      return all(accent().rotation(90, scene.duration, linear), accent().opacity(1, 0.5), accent().scale(1, 0.6, easeOutCubic));
    },
  };
}
