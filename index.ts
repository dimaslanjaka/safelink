import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join } from 'upath';
import browserSync from 'browser-sync';
import { minify } from 'html-minifier-terser';
import EJSHelper from './tests/EJSHelper';
import { dirname } from 'path';
import gulp from 'gulp';
import spawn from 'cross-spawn';

const tmp = (...path: string[]) => {
  const loc = join(__dirname, 'tmp', ...path);
  if (!existsSync(dirname(loc))) mkdirSync(dirname(loc), { recursive: true });
  return loc;
};

/** Deployer for https://www.webmanajemen.com/safelink */
const deploy_dir = join(__dirname, 'gh-pages');
if (!existsSync(deploy_dir)) mkdirSync(deploy_dir, { recursive: true });

const indicators: { [k: string]: any } = { privateScript: false };
const PORT = parseInt(process.env.PORT || '4000');
const baseUrl = 'http://localhost' + PORT;
const app = browserSync.create();
app.init({
  port: PORT,
  open: false,
  cors: true,
  server: {
    baseDir: './',
    routes: {
      '/node_modules': './node_modules',
      '/js': './tests/js',
      '/css': './tests/css',
      '/safelink': './gh-pages',
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
          const title = 'Browser Test';
          if (existsSync(view_ejs)) {
            const helpers = new EJSHelper({
              root: join(view, 'layout.ejs'),
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
                collapseWhitespace: true,
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
        },
      },
      {
        route: '/safelinkify/api',
        handle: (req, res, next) => {
          let data = '';
          req.on('data', function (chunk) {
            data = chunk.toString();
            const json = JSON.parse(data);
            writeFileSync(join(tmp('data.json')), data);
          });
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ message: 'html received' }));
          next();
        },
      },
      (req, res, next) => {
        const url = new URL(baseUrl + req.url);
        const article = join(deploy_dir, url.pathname);

        if (url.pathname.endsWith('.html')) runPrivateScript();
        if (existsSync(article)) {
          if (statSync(article).isFile()) return res.end(readFileSync(article).toString());
        }
        //console.log(article);
        next();
      },
    ],
  },
});

// since `nodemon` file watcher and `browsersync` are annoying let's make `gulp` shine
gulp.watch(['**/*.{js,ejs,ts}', '!**/*.json'], { cwd: join(__dirname, 'tests') }, app.reload);
gulp.watch(['**/*.js'], { cwd: join(__dirname, 'dist') }, app.reload);
gulp.watch(
  ['src/*.ts', 'webpack.*.js', '{tsconfig,package}.json', '*.md', '!tests', '!tmp', '!dist'],
  { cwd: __dirname },
  () => {
    const child = summon('yarn build', { cwd: __dirname });
    child.on('close', app.reload);
  }
);

/**
 * Dimas Lanjaka Private Script
 */
function runPrivateScript() {
  const privateScript = join(__dirname, 'tests/article-generator/index.ts');
  //console.log(existsSync(privateScript), indicators.privateScript);
  if (existsSync(privateScript)) {
    if (!indicators.privateScript) {
      indicators.privateScript = true;
      const child = summon('ts-node ' + privateScript, { cwd: __dirname, stdio: 'inherit' });
      child.on('close', () => {
        indicators.privateScript = false;
      });
    }
  }
}

/**
 * Smart Summoner
 * @param cmd
 * @param opt
 * @returns
 */
function summon(cmd: string, opt: Parameters<typeof spawn>[2]) {
  console.log(cmd);
  const split = cmd.split(' ');
  const bin = split[0];
  split.shift();
  const child = spawn(bin, split, Object.assign({ shell: true, stdio: 'inherit' }, opt));
  process.on('SIGINT', () => (!child.killed ? child.kill('SIGINT') : null));
  process.on('SIGKILL', () => (!child.killed ? child.kill('SIGKILL') : null));
  return child;
}
