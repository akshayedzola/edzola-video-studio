import {Line, Node, Rect, Txt} from '@revideo/2d';
import {all, createRef, easeInOutCubic, sequence, Vector2} from '@revideo/core';
import {color, font, Tone, toneFill, toneText, type} from '../brand/theme';
import type {Handlers} from '../lib/cues';
import {pulse, reveal} from '../lib/motion';
import type {TimedScene} from '../lib/types';

/**
 * ConceptBuild: construct a mental model piece by piece (progressive
 * construction, FlowReveal). Coordinates are centre-origin on 1920x1080.
 * Props:
 *   title?
 *   nodes: [{id, label, sub?, x, y, w?, h?, tone?}]
 *   edges: [{from, to}]
 *   frame?: {label, pad?}   draws a dashed boundary around every node
 * Actions:
 *   show-title | show-node {id | ids} | show-edge {from,to} | pulse {id}
 *   show-frame
 */
interface NodeSpec {id: string; label: string; sub?: string; x: number; y: number; w?: number; h?: number; tone?: Tone}

function boundary(from: NodeSpec, to: NodeSpec, pad = 10): Vector2 {
  const w = (from.w ?? 280) / 2 + pad;
  const h = (from.h ?? 110) / 2 + pad;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const t = Math.min(dx === 0 ? Infinity : w / Math.abs(dx), dy === 0 ? Infinity : h / Math.abs(dy));
  return new Vector2(from.x + dx * t, from.y + dy * t);
}

export function ConceptBuild(stage: Node, scene: TimedScene): Handlers {
  const p = scene.props;
  const specs: NodeSpec[] = p.nodes;
  const byId = new Map(specs.map(n => [n.id, n]));
  const nodes = new Map<string, Rect>();
  const edges = new Map<string, Line>();
  const title = createRef<Txt>();
  const frameBox = createRef<Rect>();
  const frameLabel = createRef<Txt>();

  if (p.frame) {
    const pad = p.frame.pad ?? 50;
    const minX = Math.min(...specs.map(n => n.x - (n.w ?? 280) / 2)) - pad;
    const maxX = Math.max(...specs.map(n => n.x + (n.w ?? 280) / 2)) + pad;
    const minY = Math.min(...specs.map(n => n.y - (n.h ?? 110) / 2)) - pad;
    const maxY = Math.max(...specs.map(n => n.y + (n.h ?? 110) / 2)) + pad;
    stage.add(
      <>
        <Rect ref={frameBox} x={(minX + maxX) / 2} y={(minY + maxY) / 2} width={maxX - minX} height={maxY - minY}
          radius={28} stroke={color.coral} lineWidth={4} lineDash={[18, 12]} fill={'rgba(232,150,122,0.06)'} opacity={0} />
        <Rect x={minX + 24} y={minY} offset={[-1, 0]} layout padding={[6, 18]} radius={24} fill={color.coral} opacity={0}
          ref={frameLabel as any}>
          <Txt text={p.frame.label} fontFamily={font.display} fontWeight={700} fontSize={type.label} fill={color.paper} />
        </Rect>
      </>,
    );
  }

  stage.add(
    <Txt ref={title} text={p.title ?? ''} y={-380} fontFamily={font.display} fontWeight={600} fontSize={type.h3}
      fill={color.ink} opacity={0} />,
  );

  for (const e of (p.edges ?? []) as {from: string; to: string}[]) {
    const a = byId.get(e.from)!;
    const b = byId.get(e.to)!;
    const line = (<Line points={[boundary(a, b), boundary(b, a, 18)]} stroke={color.grey} lineWidth={4}
      endArrow arrowSize={14} end={0} opacity={0.9} />) as Line;
    stage.add(line);
    edges.set(`${e.from}>${e.to}`, line);
  }

  for (const n of specs) {
    const tone: Tone = n.tone ?? 'coral';
    const w = n.w ?? 280;
    const h = n.h ?? 110;
    const rect = (
      <Rect x={n.x} y={n.y} width={w} height={h} radius={18} fill={color.paper} stroke={toneFill[tone]}
        lineWidth={4} shadowColor={'rgba(26,26,26,0.07)'} shadowBlur={24} shadowOffsetY={8} opacity={0}>
        <Rect x={-w / 2 + 10} width={8} height={h - 36} radius={4} fill={toneFill[tone]} />
        <Txt text={n.label} y={n.sub ? -16 : 0} width={w - 48} textAlign={'center'} textWrap
          fontFamily={font.body} fontWeight={700} fontSize={32} fill={color.ink} />
        {n.sub ? <Txt text={n.sub} y={24} width={w - 48} textAlign={'center'} fontFamily={font.body}
          fontSize={22} fill={toneText[tone]} /> : null}
      </Rect>
    ) as Rect;
    stage.add(rect);
    nodes.set(n.id, rect);
  }

  const ids = (a: any): string[] => (a.ids as string[]) ?? [a.id as string];

  return {
    'show-title': () => reveal(title()),
    'show-node': a => sequence(0.18, ...ids(a).map(id => reveal(nodes.get(id)!, 24))),
    'show-edge': a => edges.get(`${a.from}>${a.to}`)!.end(1, 0.6, easeInOutCubic),
    'pulse': a => all(...ids(a).map(id => pulse(nodes.get(id)!, 1.08, 0.5))),
    'show-frame': () => all(frameBox().opacity(1, 0.7), reveal(frameLabel() as unknown as Node, 16)),
  };
}
