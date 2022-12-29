/**
 * [DEV] SCRIPT COMPILER
 */

import browserSync from 'browser-sync';
import spawn from 'cross-spawn';
import { existsSync, mkdirSync } from 'fs';
import { spawnAsync } from 'git-command-helper/dist/spawn';
import gulp from 'gulp';
import { join } from 'upath';
import safelink from './src/safelink';

/** Deployer for https://www.webmanajemen.com/safelink */
const deploy_dir = join(__dirname, 'docs/safelinkify/demo');
if (!existsSync(deploy_dir)) mkdirSync(deploy_dir, { recursive: true });

const safelinkInstance = new safelink({
  // exclude patterns (dont anonymize these patterns)
  exclude: [/([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/],
  // url redirector
  redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
  // debug
  verbose: false,
  // encryption type = 'base64' | 'aes'
  type: 'base64',
  // password aes, default = root
  password: 'unique-password'
});

const PORT = parseInt(process.env.PORT || '4000');
let baseUrl = 'http://localhost' + PORT;
const app = browserSync.create();
app.emitter.on('service:running', function (data) {
  //console.log(data.urls.tunnel); // all 3 urls here
  baseUrl = data.urls.tunnel;
});
app.init({
  port: PORT,
  open: false,
  //open: 'tunnel',
  cors: true,
  //tunnel: true,
  server: {
    baseDir: './',
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
    middleware: [
      {
        route: '/docs/safelinkify/demo',
        handle: async (_req, _res, next) => {
          await spawnAsync('node', [join(__dirname, 'typedoc-callback.js')], { cwd: __dirname, stdio: 'inherit' });
          next();
        }
      }
    ]
  },
  ignore: [
    '*.txt',
    '*.json',
    '**/docs/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/tmp/**',
    '**/release/**',
    '**/src/test*',
    '**/gulpfile*'
  ],
  watch: false
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

let child: ReturnType<typeof spawn> | null = null;
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
//process.on('SIGKILL', () => (child !== null && !child.killed ? child.kill('SIGKILL') : null));
