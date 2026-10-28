import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The studio reads brand assets and fonts from ../assets, and its node_modules
// is a symlink into $EDZOLA_VIDEO_HOME (kept out of the repo). Vite's
// fs guard blocks both by default, so allow them explicitly. Used by the
// editor (`npm run editor`). Deliberately NOT named vite.config.ts: the headless
// renderer would auto-load it on top of its own config. pipeline/build.ts
// passes the same allow-list to renders.
const ROOT = path.resolve(__dirname, '..');
const HOME = process.env.EDZOLA_VIDEO_HOME ?? path.join(os.homedir(), '.edzola-video-studio');

export default defineConfig({
  server: {fs: {allow: [ROOT, HOME]}},
  plugins: [
    {
      // @revideo/vite-plugin 0.11 requests the editor stylesheet as
      // `/@fs//Users/...`; the doubled slash fails the allow-list check when
      // node_modules lives outside the project. Normalise it.
      name: 'edzola:fs-double-slash',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.startsWith('/@fs//')) req.url = req.url.replace('/@fs//', '/@fs/');
          next();
        });
      },
    },
  ],
});
