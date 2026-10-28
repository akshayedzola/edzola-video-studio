import {Txt} from '@revideo/2d';

/**
 * Split `text` around `highlight` so the highlighted words can be styled
 * inline (nested Txt). Returns children for a parent <Txt>.
 */
export function highlighted(text: string, highlight: string | undefined, fill: string, weight?: number) {
  if (!highlight || !text.includes(highlight)) return [<Txt text={text} />];
  const i = text.indexOf(highlight);
  const parts = [];
  if (i > 0) parts.push(<Txt text={text.slice(0, i)} />);
  parts.push(<Txt text={highlight} fill={fill} fontWeight={weight} />);
  const rest = text.slice(i + highlight.length);
  if (rest) parts.push(<Txt text={rest} />);
  return parts;
}
