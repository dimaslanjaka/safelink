const browserSync = require('browser-sync');
const { spawn } = require('git-command-helper/dist/spawn');
const bs = browserSync.create();

/**
 * Docs serve
 * required:
 * * add docs script for `npm run docs`
 * * npm i -D git-command-helper
 * repo: https://github.com/dimaslanjaka/nodejs-package-types/blob/main/typedoc-server.js
 * raw: https://github.com/dimaslanjaka/nodejs-package-types/raw/main/typedoc-server.js
 * update: curl -L https://github.com/dimaslanjaka/nodejs-package-types/raw/main/typedoc-server.js > typedoc-server.js
 */

/**
 * @type {browserSync.MiddlewareHandler | browserSync.PerRouteMiddleware}
 */
const buildDocs = async (_req, _res, next) => {
  await spawn('npm', ['run', 'docs'], { cwd: __dirname, stdio: 'inherit' });
  next();
};

// Serve files from 3 directories with serve-static options
bs.init({
  cors: true,
  open: false,
  port: 4000,
  serveStatic: ['.', './docs'],
  serveStaticOptions: {
    extensions: ['html', 'js', 'css'] // pretty urls
  },
  server: {
    routes: {
      '/': '/docs',
      '/docs': '/docs',
      // common
      '/node_modules': './node_modules',
      '/tmp': './tmp',
      // custom
      '/js': './tests/js',
      '/css': './tests/css'
    },
    middleware: [{ route: '/docs/safelinkify/demo/', handle: buildDocs }]
  }
});
