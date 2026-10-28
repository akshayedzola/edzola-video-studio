import {Node, Rect, Txt} from '@revideo/2d';
import {all, createRef} from '@revideo/core';
import {color, font, Tone, toneFill, toneText, type} from '../brand/theme';
import type {Handlers} from '../lib/cues';
import {pulse, reveal} from '../lib/motion';
import type {TimedScene} from '../lib/types';

/**
 * FrameworkSteps: a named framework, one step at a time (e.g. MAP).
 * Props: kicker?, title?, steps: [{letter, title, text, tone?}]
 * Actions: show-title | show-step {i} | pulse-step {i} | dim-others {i}
 */
export function FrameworkSteps(stage: Node, scene: TimedScene): Handlers {
  const p = scene.props;
  const steps: any[] = p.steps;
  const gap = 540;
  const kicker = createRef<Txt>();
  const title = createRef<Txt>();
  const cards: Rect[] = [];

  stage.add(
    <>
      <Txt ref={kicker} text={(p.kicker ?? '').toUpperCase()} y={-370} fontFamily={font.body} fontWeight={600}
        letterSpacing={4} fontSize={type.kicker} fill={color.coralDeep} opacity={0} />
      <Txt ref={title} text={p.title ?? ''} y={-305} fontFamily={font.display} fontWeight={600} fontSize={type.h3}
        fill={color.ink} opacity={0} />
    </>,
  );

  steps.forEach((s, i) => {
    const tone: Tone = s.tone ?? (['coral', 'teal', 'yellow'][i % 3] as Tone);
    const card = (
      <Rect x={(i - (steps.length - 1) / 2) * gap} y={40} width={490} height={440} radius={28} fill={color.paper}
        stroke={toneFill[tone]} lineWidth={4} shadowColor={'rgba(26,26,26,0.07)'} shadowBlur={30} shadowOffsetY={10}
        opacity={0}>
        <Rect y={-210} width={490} height={14} fill={toneFill[tone]} />
        <Txt text={s.letter} y={-95} fontFamily={font.display} fontWeight={700} fontSize={150} fill={toneText[tone]} />
        <Txt text={s.title} y={20} fontFamily={font.body} fontWeight={700} fontSize={48} fill={color.ink} />
        <Txt text={s.text} y={115} width={410} textWrap textAlign={'center'} fontFamily={font.body} fontSize={31}
          lineHeight={42} fill={color.grey} />
      </Rect>
    ) as Rect;
    stage.add(card);
    cards.push(card);
  });

  return {
    'show-title': () => all(reveal(kicker()), reveal(title())),
    'show-step': a => reveal(cards[a.i as number], 40),
    'pulse-step': a => pulse(cards[a.i as number], 1.05, 0.5),
    'dim-others': a => all(...cards.map((c, i) => c.opacity(i === a.i ? 1 : 0.4, 0.4))),
  };
}
