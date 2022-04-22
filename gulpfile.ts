/**
 *  THIS IS SCRIPT TO DEPLOY GITHUB PAGES, NOT REQUIRED ON BUILD SCRIPT.
 */

import spawn from 'cross-spawn';
import { existsSync, mkdirSync } from 'fs';
import * as gulp from 'gulp';
import moment from 'moment-timezone';
import { TaskCallback } from 'undertaker';
import { join, resolve } from 'upath';

gulp.task('copy', () => {
  return gulp.src(join(__dirname, 'dist', '**/*')).pipe(gulp.dest(join(__dirname, '.deploy_git', 'safelink', 'dist')));
});

const deployDir = resolve(join(__dirname, '.deploy_git'));

function git(...args: string[]) {
  return new Promise(
    (
      resolve: (args: { code: number; stdout: string; stderr: string }) => any,
      reject: (args: { args: string[]; err: Error }) => any
    ) => {
      const summon = spawn('git', args, {
        cwd: deployDir,
        stdio: 'inherit',
      });
      summon.on('close', function (code) {
        // Should probably be 'exit', not 'close'
        // *** Process completed
        return resolve({
          code: code ? code : 0,
          stdout: String(summon.stdout),
          stderr: String(summon.stderr),
        });
      });
      summon.on('error', function (err) {
        // *** Process creation failed
        return reject({ args: args, err: err });
      });
    }
  );
}
const configDeploy = {
  name: 'dimaslanjaka',
  email: 'dimaslanjaka@gmail.com',
  repo: 'https://github.com/dimaslanjaka/dimaslanjaka.github.io',
  branch: 'master',
  force: false,
  base: deployDir,
};
// [deploy][workflow] test
gulp.task('deploy-git', async (done?: TaskCallback) => {
  let init = false;
  if (!existsSync(deployDir)) mkdirSync(deployDir);
  if (!existsSync(join(deployDir, '.git'))) {
    init = true;
    console.log('init new git with current configuration', configDeploy);
    await git('init');
    if (configDeploy.name) await git('config', 'user.name', configDeploy.name);
    if (configDeploy.email) await git('config', 'user.email', configDeploy.email);
  }

  if (!init) await git('gc'); // compress git databases

  await git('remote', 'add', 'origin', configDeploy.repo);
  await git('remote', 'set-url', 'origin', configDeploy.repo);
  await git('remote', '-v');
  // show origins
  await git('fetch', '--all');
  await git('pull', 'origin', configDeploy.branch);

  await git('add', '-A');
  await git('commit', '-m', 'Update site: ' + moment().format());
  if (configDeploy.force) {
    await git('push', '-u', configDeploy.repo, 'origin', configDeploy.branch, '--force');
  } else {
    await git('push', '--set-upstream', 'origin', configDeploy.branch);
  }
  console.log('deploy merged with origin successful');
  if (typeof done == 'function') done();
});

gulp.task('deploy', gulp.series('copy', 'deploy-git'));

gulp.task('default', gulp.series('copy'));
