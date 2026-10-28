import type {Node} from '@revideo/2d';
import type {Handlers} from '../lib/cues';
import type {TimedScene} from '../lib/types';
import {ConceptBuild} from './ConceptBuild';
import {EndCard} from './EndCard';
import {FrameworkSteps} from './FrameworkSteps';
import {MetricConflict} from './MetricConflict';
import {Spreadsheets} from './Spreadsheets';
import {Statement} from './Statement';
import {TitleHook} from './TitleHook';

/**
 * A template builds its (hidden) visuals on `stage` and returns the cue
 * actions a storyboard may call. Register new templates here AND in
 * studio/templates.manifest.json so the validator knows their actions.
 */
export type Template = (stage: Node, scene: TimedScene) => Handlers;

export const templates: Record<string, Template> = {
  TitleHook,
  Spreadsheets,
  MetricConflict,
  ConceptBuild,
  Statement,
  FrameworkSteps,
  EndCard,
};
