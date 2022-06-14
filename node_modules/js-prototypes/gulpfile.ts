/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
import gulp from 'gulp';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import del from 'del';
import through from 'through2';
import { join, resolve } from 'path';
import sourcemaps from 'gulp-sourcemaps';
import { exec, execSync } from 'child_process';
import jsdom from './packages/gulp-jsdom/src/index';
import './src';
import { existsSync, readFileSync, rmSync } from 'fs';
import { TaskCallback } from 'undertaker';

gulp.task('clean', async function () {
  await del('./docs');
  return await del('./dist');
});

gulp.task('tsc:build', function () {
  //const tsProject = ts.createProject('tsconfig.json');
  //const tsResult = gulp.src('src/**/*.ts').pipe(tsProject());
  //.pipe(gulp.dest("dist/libs"));
  //return merge([tsResult.dts.pipe(gulp.dest('dist/libs')), tsResult.js.pipe(gulp.dest('dist/libs'))]);
  return new Promise((resolve) => {
    const run = execSync('tsc', { cwd: __dirname });
    resolve(run);
  });
});

gulp.task('test', (d) => d());

function generate(done: unknown) {
  ['node_modules', 'tmp', 'build']
    .map((dir) => join(__dirname, 'tests', dir))
    .filter(existsSync)
    .forEach((path) => {
      rmSync(path, { recursive: true });
    });
  return new Promise((resolve) => {
    exec('npm run docs', { cwd: __dirname }, (err, stdout, stderr) => {
      if (err) {
        console.log(stderr);
      } else {
        console.log(stdout);
      }
      resolve(done);
    });
  });
}
gulp.task('tsc:doc:gen', generate);

function safelink(done: TaskCallback) {
  gulp
    .src('**/*.html', { cwd: join(__dirname, 'docs') })
    .pipe(
      jsdom(
        (document: Document) => {
          // adsense
          document.querySelectorAll(
            'head'
          )[0].innerHTML += `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1165447249910969" crossorigin="anonymous"></script>`;
          // safelink
          const hyperlinks = document.querySelectorAll('a');
          if (hyperlinks.length) {
            hyperlinks.forEach((a) => {
              const href = a.getAttribute('href');
              if (!href || !href.length || href.match(/^(\/|#|javascript:|https?:\/\/.*(webmanajemen.com))/g)) return;
              if (href.trim().match(/^https?:\/\//)) {
                a.setAttribute('target', '_blank');
                a.setAttribute('rel', 'nofollow');
                /// github.com\/dimaslanjaka
                a.setAttribute(
                  'href',
                  'https://webmanajemen.com/page/safelink.html?url=' + Buffer.from(href).toString('base64')
                );
              }
            });
          }
        },
        {},
        true
      )
    )
    .pipe(gulp.dest('docs'));
  done();
}

gulp.task('tsc:doc:after', safelink);

gulp.task('tsc:docs', gulp.series(generate, safelink));

gulp.task('tsc', gulp.series('tsc:build', 'tsc:docs'));

const exclude = ['!**/*.map'];
const nodesrc = ['**/globals.{js,ts}', '**/node-*.{js,ts}', '**/index.{js,ts}'];
gulp.task('browser:js', function () {
  return gulp
    .src(['dist/libs/*.js', ...nodesrc.map((s) => '!' + s), ...exclude])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(
      through.obj((chunk, enc, cb) => {
        let contents = chunk.contents.toString();
        const regex = /\/\/\/.*<reference path=\"(.*)\".*\/>/gm;
        let m: RegExpExecArray;
        while ((m = regex.exec(contents)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          contents = contents.replace(m[0], '');
        }
        chunk.contents = Buffer.from(contents);
        cb(null, chunk);
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/release'));
});

gulp.task('browser:min-js', function () {
  return gulp.src(['dist/libs/*.js']).pipe(concat('bundle.min.js')).pipe(terser()).pipe(gulp.dest('./dist/release'));
});

gulp.task('browser:dts', function () {
  return gulp
    .src(['dist/libs/*.d.ts', ...nodesrc.map((s) => '!' + s)])
    .pipe(concat('bundle.d.ts'))
    .pipe(
      through.obj((chunk, enc, cb) => {
        let contents = chunk.contents.toString();
        const sources = {};
        const regex = /\/\/\/.*<reference path=\"(.*)\".*\/>/gm;
        let m: RegExpExecArray;
        while ((m = regex.exec(contents)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          const realpathref = resolve(join(__dirname, 'dist/libs', m[1]));
          sources[m[0]] = realpathref;
          // remove references
          contents = contents.replace(m[0], () => '');
        }
        // inject detached references
        for (const key in sources) {
          if (Object.prototype.hasOwnProperty.call(sources, key)) {
            const ref = sources[key];
            contents = readFileSync(ref, 'utf-8') + '\n' + contents;
          }
        }
        chunk.contents = Buffer.from(contents);
        cb(null, chunk);
      })
    )
    .pipe(gulp.dest('./dist/release'));
});

gulp.task('browser', gulp.series('browser:js', 'browser:min-js', 'browser:dts'));
exports.default = gulp.series('tsc', 'browser');
