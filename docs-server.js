const browserSync = require('browser-sync');
const { spawn } = require('git-command-helper/dist/spawn');
const bs = browserSync.create();

/**
 * @type {browserSync.MiddlewareHandler | browserSync.PerRouteMiddleware}
 */
const buildDocs = async (_req, _res, next) => {
  await spawn('node', [join(__dirname, 'docs.js')], { cwd: __dirname, stdio: 'inherit' });
  await spawn('gulp', [], { cwd: __dirname, stdio: 'inherit' });
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
