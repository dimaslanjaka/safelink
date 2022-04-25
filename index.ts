/**
 * [DEV] SCRIPT COMPILER
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'upath';
import browserSync from 'browser-sync';
import { minify } from 'html-minifier-terser';
import EJSHelper from './tests/EJSHelper';
import gulp from 'gulp';
import spawn from 'cross-spawn';

/** Deployer for https://www.webmanajemen.com/safelink */
const deploy_dir = join(__dirname, 'gh-pages');
if (!existsSync(deploy_dir)) mkdirSync(deploy_dir, { recursive: true });

const PORT = parseInt(process.env.PORT || '4000');
let baseUrl = 'http://localhost' + PORT;
const app = browserSync.create();
app.emitter.on('service:running', function (data) {
  //console.log(data.urls.tunnel); // all 3 urls here
  baseUrl = data.urls.tunnel;
});
app.init({
  port: PORT,
  open: 'tunnel',
  cors: true,
  tunnel: true,
  server: {
    baseDir: './',
    routes: {
      '/node_modules': './node_modules',
      '/js': './tests/js',
      '/css': './tests/css',
      '/safelink': './gh-pages',
      '/tmp': './tmp'
    },
    middleware: [
      {
        route: '/',
        handle: async (req, res, next) => {
          const url = new URL(baseUrl + req.url);
          const path = (() => {
            const path = url.pathname.replace(/.html$/, '');
            if (path.endsWith('/') || path.length < 1) return path + 'index';
            return path;
          })();

          const view = join(__dirname, 'tests');
          const view_ejs = join(view, path + '.ejs');
          const title = 'Safelinkify - Website Manajemen Indonesia';
          if (existsSync(view_ejs)) {
            const helpers = new EJSHelper({
              root: join(view, 'layout.ejs')
            });
            const renderPage = await helpers.renderFile(view_ejs);
            helpers.add('body', renderPage);
            helpers.add('title', title);
            const renderLayout = await helpers.renderFile(join(view, 'layout.ejs'));
            let result = '';
            try {
              result = await minify(renderLayout, {
                minifyCSS: true,
                minifyJS: true,
                collapseWhitespace: true
              });
            } catch (error) {
              result = renderLayout;
            }

            /** Location deploy page */
            const saveTo = join(deploy_dir, 'index.html');
            writeFileSync(saveTo, result);

            res.end(result);
          }
          next();
        }
      }
    ]
  }
});

// since `nodemon` file watcher and `browsersync` are annoying let's make `gulp` shine
gulp.watch(['**/*.{js,ejs,ts}'], { cwd: join(__dirname, 'tests') }, app.reload);
gulp.watch(['**/*.js'], { cwd: join(__dirname, 'dist') }, app.reload);
let summoner: ReturnType<typeof summon>;
gulp.watch(
  ['src/*.ts', 'webpack.*.js', '{tsconfig,package}.json', '*.md', '!tests', '!tmp', '!dist'],
  { cwd: __dirname },
  (done) => {
    if (summoner) {
      if (!summoner.killed) summoner.kill();
    }
    summoner = summon('webpack && gulp', { cwd: __dirname }, (child) => {
      child.on('close', () => {
        app.reload();
        done();
      });
    });
  }
);

let child: ReturnType<typeof spawn> = null;
/**
 * Smart Summoner
 * @param cmd
 * @param opt
 * @returns
 */
function summon(cmd: string, opt: Parameters<typeof spawn>[2], callback?: (child: ReturnType<typeof spawn>) => any) {
  console.log(cmd);
  const split = cmd.split(' ');
  const bin = split[0];
  split.shift();
  child = spawn(bin, split, Object.assign({ shell: true, stdio: 'inherit' }, opt));
  if (typeof callback == 'function') {
    callback(child);
  }

  return child;
}
process.on('SIGINT', () => (child !== null && !child.killed ? child.kill('SIGINT') : null));
process.on('SIGKILL', () => (child !== null && !child.killed ? child.kill('SIGKILL') : null));
