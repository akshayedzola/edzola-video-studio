/**
 * Live Revideo editor for template development: `npm run editor [-- --port 9000]`.
 *
 * `revideo editor` starts Vite with `configFile: false`, so it ignores
 * vite.config.ts and can't load our fonts/assets or the symlinked engine's
 * stylesheet. This launcher is the same thing, plus our config.
 * Shows whatever episode was last built (studio/src/.build/episode.json).
 */
import revideoModule from '@revideo/vite-plugin';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createServer, mergeConfig} from 'vite';
import studioConfig from '../editor.vite.config';

// The plugin is CommonJS; from ESM its default export is one level down.
const revideo = ((revideoModule as any).default ?? revideoModule) as (opts: object) => any;
const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const portArg = process.argv.indexOf('--port');
const port = Number(process.env.PORT ?? (portArg > -1 ? process.argv[portArg + 1] : 9000));

const server = await createServer(
  mergeConfig(studioConfig, {
    configFile: false,
    root: STUDIO,
    plugins: [revideo({project: './src/project.tsx', buildForEditor: false})],
    server: {port},
  }),
);
await server.listen();
server.printUrls();
