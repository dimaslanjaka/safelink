import { ChildProcess } from 'child_process';
import spawn from 'cross-spawn';
import { writeFile, writeFileSync } from 'fs';
import * as gulp from 'gulp';
import { join } from 'upath';
import pkg from './package.json';

/**
 *  BELOW SCRIPT TO DEPLOY OUR GITHUB PAGES
 */

const deploy_dir = join(__dirname, 'docs/safelinkify/demo');
gulp.task('copy', () => {
  writeFile(join(deploy_dir, '.nojekyll'), '', () => {});
  gulp
    .src(['**/*', '!**/*.d.ts'], { cwd: join(__dirname, 'dist') })
    .pipe(gulp.dest(join(deploy_dir, 'dist')))
    .once('end', () => {
      // delete pkg['devDependencies'];
      pkg['devDependencies'] = {} as any;
      writeFileSync(join(deploy_dir, '/package.json'), JSON.stringify(pkg, null, 2));
    });
  return gulp.src(join(__dirname, '*.md')).pipe(gulp.dest(deploy_dir));
});

gulp.task('default', gulp.series('copy'));

/**
 * NOT WORKING
 */

let child: ChildProcess;
let counter = 0;
const serve = function (restart?: boolean) {
  if (child) {
    try {
      child.once('close', () => {
        console.log(`child[${counter}] killed`);
        if (restart) serve();
      });

      if (process.platform === 'win32') {
        //spawn('taskkill', ['/pid', child.pid, '/f', '/t'], { cwd: __dirname, shell: true, stdio: 'inherit' });
        if (child.pid) process.kill(child.pid);
      } else {
        child.stdout?.destroy();
        child.stderr?.destroy();
        child.kill('SIGINT');
      }
    } catch {
      // no operation once error occurs
    }
  } else {
    child = spawn(join(__dirname, 'node_modules/.bin/ts-node'), [join(__dirname, 'index.ts')], {
      cwd: __dirname,
      shell: true,
      stdio: 'inherit'
    });

    child.once('spawn', () => counter++);
  }
  return child;
};

gulp.task('serve', (done) => {
  const run = serve();
  run.once('close', done);
});

gulp.task('serve-dev', function (done) {
  const watcher = gulp.watch([join(__dirname, 'index.ts'), join(__dirname, 'tests/*.ejs')]);
  // running first for initializer
  serve();
  // assign watcher event
  watcher.on('change', () => serve(true));
  // once watcher exit, finish the task
  watcher.once('close', done);
  // once watcher error, finish the task
  // watcher.once('error', done);
});
