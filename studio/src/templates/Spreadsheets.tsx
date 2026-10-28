import {Node, Rect, Txt} from '@revideo/2d';
import {all, createRef, sequence} from '@revideo/core';
import {color, font, Tone, toneFill, toneText, type} from '../brand/theme';
import type {Handlers} from '../lib/cues';
import {pulse, reveal, shake} from '../lib/motion';
import type {TimedScene} from '../lib/types';

/**
 * Spreadsheets: fragmented records across teams (duplicate_records,
 * diverging_records). Props:
 *   org?: {name, sub}
 *   tag?: string                         e.g. "Illustrative data"
 *   sheets: [{team, tone, columns: string[], rows: string[][], widths?: number[]}]  (max 3)
 * Actions:
 *   show-org | show-sheet {sheet} | highlight {rows: number[] | row: number}
 *   set-cell {sheet,row,col,value,tone} | flag {text,tone} | pulse-sheets
 */
const W = 520;
const H = 420;
const HEADER = 64;
const ROW_H = 58;

export function Spreadsheets(stage: Node, scene: TimedScene): Handlers {
  const p = scene.props;
  const sheets: any[] = p.sheets;
  const xs = sheets.length === 3 ? [-580, 0, 580] : sheets.length === 2 ? [-300, 300] : [0];
  const orgTitle = createRef<Txt>();
  const orgSub = createRef<Txt>();
  const banner = createRef<Rect>();
  const bannerTxt = createRef<Txt>();
  const tag = createRef<Txt>();

  const cards: Rect[] = [];
  const rowBgs: Rect[][] = [];
  const cells: {bg: Rect; txt: Txt}[][][] = [];

  stage.add(
    <>
      <Txt ref={orgTitle} text={p.org?.name ?? ''} y={-330} fontFamily={font.display} fontWeight={600}
        fontSize={type.h3} fill={color.ink} opacity={0} />
      <Txt ref={orgSub} text={p.org?.sub ?? ''} y={-268} fontFamily={font.body} fontSize={type.kicker}
        fill={color.grey} opacity={0} />
      <Txt ref={tag} text={(p.tag ?? '').toUpperCase()} x={840} y={-330} offset={[1, 0]} fontFamily={font.body}
        fontWeight={600} letterSpacing={2} fontSize={18} fill={color.grey} opacity={0} />
    </>,
  );

  sheets.forEach((s, si) => {
    const tone: Tone = s.tone ?? 'coral';
    const cols: string[] = s.columns;
    // Column widths as fractions; the first (name) column gets more room by default.
    const widths: number[] =
      s.widths ?? cols.map((_, ci) => (ci === 0 ? 0.44 : 0.56 / Math.max(1, cols.length - 1)));
    const colW = widths.map(f => f * (W - 56));
    const colX = colW.map((_, ci) => -W / 2 + 28 + colW.slice(0, ci).reduce((a, b) => a + b, 0));
    const top = -H / 2;
    const card = (
      <Rect x={xs[si]} y={20} width={W} height={H} radius={20} fill={color.paper} stroke={color.line}
        lineWidth={2} shadowColor={'rgba(26,26,26,0.08)'} shadowBlur={30} shadowOffsetY={10} opacity={0} clip>
        <Rect y={top + HEADER / 2} width={W} height={HEADER} fill={toneFill[tone]} />
        <Txt text={s.team} y={top + HEADER / 2} fontFamily={font.body} fontWeight={700} fontSize={30}
          fill={tone === 'yellow' || tone === 'teal' ? color.ink : color.paper} />
      </Rect>
    ) as Rect;
    cols.forEach((c, ci) =>
      card.add(
        <Txt text={c.toUpperCase()} x={colX[ci]} y={top + HEADER + 34} offset={[-1, 0]} fontFamily={font.body}
          fontWeight={600} letterSpacing={1.5} fontSize={18} fill={color.grey} />,
      ),
    );
    rowBgs[si] = [];
    cells[si] = [];
    (s.rows as string[][]).forEach((row, ri) => {
      const y = top + HEADER + 34 + 50 + ri * ROW_H;
      const bg = (<Rect y={y} width={W - 20} height={ROW_H - 8} radius={10} fill={'rgba(0,0,0,0)'}
        stroke={color.coral} lineWidth={0} />) as Rect;
      card.add(bg);
      rowBgs[si][ri] = bg;
      cells[si][ri] = row.map((value, ci) => {
        const cbg = (<Rect x={colX[ci] - 8} y={y} offset={[-1, 0]} height={40} width={colW[ci] - 4}
          radius={8} fill={'rgba(0,0,0,0)'} />) as Rect;
        const txt = (<Txt text={value} x={colX[ci]} y={y} offset={[-1, 0]} fontFamily={font.body}
          fontSize={26} fill={color.ink} />) as Txt;
        card.add(cbg);
        card.add(txt);
        return {bg: cbg, txt};
      });
    });
    stage.add(card);
    cards.push(card);
  });

  stage.add(
    <Rect ref={banner} y={318} layout padding={[14, 32]} radius={40} fill={color.dangerBg} opacity={0}>
      <Txt ref={bannerTxt} text={''} fontFamily={font.body} fontWeight={700} fontSize={type.kicker} fill={color.danger} />
    </Rect>,
  );

  const rowsArg = (a: any): number[] => (a.rows as number[]) ?? sheets.map(() => (a.row as number) ?? 0);

  return {
    'show-org': () => all(reveal(orgTitle()), reveal(orgSub()), tag().opacity(0.9, 0.6)),
    'show-sheet': a => reveal(cards[a.sheet as number], 40),
    'highlight': a =>
      sequence(
        0.15,
        ...rowsArg(a).map((ri, si) =>
          all(rowBgs[si][ri].fill(color.yellowSoft, 0.4), rowBgs[si][ri].lineWidth(3, 0.4), pulse(cards[si], 1.03)),
        ),
      ),
    'set-cell': function* (a) {
      const {sheet, row, col} = a as any;
      const tone: Tone = (a.tone as Tone) ?? 'ink';
      const c = cells[sheet][row][col];
      yield* all(
        c.txt.text(String(a.value), 0.5),
        c.txt.fill(toneText[tone], 0.3),
        c.txt.fontWeight(700, 0.3),
        c.bg.fill(toneFill[tone], 0.3),
      );
      yield* shake(c.txt, 6);
    },
    'flag': function* (a) {
      const tone: Tone = (a.tone as Tone) ?? 'danger';
      bannerTxt().text(String(a.text));
      bannerTxt().fill(toneText[tone]);
      banner().fill(toneFill[tone]);
      yield* reveal(banner(), 20);
    },
    'pulse-sheets': () => sequence(0.1, ...cards.map(c => pulse(c, 1.04))),
  };
}
