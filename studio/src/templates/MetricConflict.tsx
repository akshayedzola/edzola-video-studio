import {Node, Rect, Txt} from '@revideo/2d';
import {all, createRef, sequence} from '@revideo/core';
import {color, font, Tone, toneFill, toneText, type} from '../brand/theme';
import type {Handlers} from '../lib/cues';
import {reveal, shake} from '../lib/motion';
import type {TimedScene} from '../lib/types';

/**
 * MetricConflict: one indicator, several disagreeing numbers. Props:
 *   label, values: [{team, value, tone?}], question?
 * Actions: show-label | show-value {i} | question | shake
 */
export function MetricConflict(stage: Node, scene: TimedScene): Handlers {
  const p = scene.props;
  const values: any[] = p.values;
  const gap = 520;
  const label = createRef<Txt>();
  const question = createRef<Txt>();
  const cards: Rect[] = [];
  const nums: Txt[] = [];

  stage.add(
    <Txt ref={label} text={p.label} y={-310} fontFamily={font.display} fontWeight={600} fontSize={type.h3}
      fill={color.ink} opacity={0} />,
  );

  values.forEach((v, i) => {
    const tone: Tone = v.tone ?? 'coral';
    const num = (<Txt text={String(v.value)} y={30} fontFamily={font.display} fontWeight={600}
      fontSize={type.hero * 1.15} fill={color.ink} />) as Txt;
    const card = (
      <Rect x={(i - (values.length - 1) / 2) * gap} y={-20} width={440} height={320} radius={24}
        fill={color.paper} stroke={toneFill[tone]} lineWidth={4} opacity={0}>
        <Rect y={-118} layout padding={[8, 20]} radius={30} fill={toneFill[tone]}>
          <Txt text={v.team} fontFamily={font.body} fontWeight={700} fontSize={26}
            fill={tone === 'yellow' || tone === 'teal' ? color.ink : color.paper} />
        </Rect>
        {num}
      </Rect>
    ) as Rect;
    stage.add(card);
    cards.push(card);
    nums.push(num);
  });

  stage.add(
    <Txt ref={question} text={p.question ?? ''} y={260} fontFamily={font.display} fontWeight={600}
      fontSize={type.h3} fill={toneText.coral} opacity={0} />,
  );

  return {
    'show-label': () => reveal(label()),
    'show-value': a => reveal(cards[a.i as number], 40),
    'question': () => reveal(question(), 20),
    'shake': () => sequence(0.08, ...nums.map(n => shake(n, 12))),
    'dim-values': () => all(...cards.map(c => c.opacity(0.45, 0.4))),
  };
}
