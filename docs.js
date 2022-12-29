const { existsSync, writeFileSync, mkdirSync } = require('fs');
const { writeFile, mkdir } = require('fs/promises');
const { join } = require('path');
const pkg = require('./package.json');
const { default: safelink } = require('./dist/safelink');
const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

//
// DEMO BUILDER
//

//
require('ts-node').register();
const { default: EJSHelper } = require('./tests/EJSHelper');
const { compileDocs } = require('./typedoc-runner');
//

// VARS

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
const deploy_dir = join(__dirname, 'docs/safelinkify/demo');

// VARS END

compileDocs(
  {
    cleanOutputDir: false,
    commentStyle: 'All'
  },
  () => {
    webpack(webpackConfig, (err, stats) => {
      if (err || (stats && stats.hasErrors())) {
        console.log('webpack error');
        console.log(stats);
        return;
      }
      copyDistToDemo(createDemo);
    });
  }
);

/**
 * Create demo from tests
 */
async function createDemo() {
  if (!existsSync(deploy_dir)) await mkdir(deploy_dir, { recursive: true });

  const PORT = parseInt(process.env.PORT || '4000');
  let baseUrl = 'http://localhost:' + PORT;
  let url = new URL(baseUrl);
  const path = (() => {
    const path = url.pathname.replace(/.html$/, '');
    if (path.endsWith('/') || path.length < 1) return path + 'index';
    return path;
  })();

  const view = join(__dirname, 'tests');
  const view_ejs = join(view, path + '.ejs');
  const title = 'Safelinkify - External Link Anonymizer';
  if (existsSync(view_ejs)) {
    const helpers = new EJSHelper({
      root: join(view, 'layout.ejs')
    });
    const renderPage = await helpers.renderFile(view_ejs);
    helpers.add('body', renderPage);
    helpers.add('title', title);
    helpers.add('description', pkg.description);
    let renderLayout = await helpers.renderFile(join(view, 'layout.ejs'));

    // write to test folder
    await writeFile(join(__dirname, 'src/test/index.html'), renderLayout);

    /** Safelinkify */
    renderLayout = await safelinkInstance.parse(renderLayout);

    /** minify for github pages */

    let result = '';
    try {
      result = await minify(renderLayout, {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true
      });
    } catch {
      result = renderLayout;
    }

    // save demo index.html
    const saveTo = join(deploy_dir, 'index.html');
    await writeFile(saveTo, result);
    console.log('demo saved', saveTo);
  }
}

/**
 * Copy Dist to Demo
 */
function copyDistToDemo(done) {
  // check exist
  if (!existsSync(deploy_dir)) mkdirSync(deploy_dir, { recursive: true });
  // add .nojekyll
  writeFileSync(join(deploy_dir, '.nojekyll'), '');
  // copy package.json
  pkg['devDependencies'] = {};
  writeFileSync(join(deploy_dir, '/package.json'), JSON.stringify(pkg, null, 2));

  const copyDist = () =>
    gulp.src(['**/*', '!**/*.d.ts'], { cwd: join(__dirname, 'dist') }).pipe(gulp.dest(join(deploy_dir, 'dist')));

  const copyMd = () => gulp.src(join(__dirname, '*.md')).pipe(gulp.dest(deploy_dir));

  return gulp.series(
    copyDist,
    copyMd
  )(() => {
    console.log('copy finish');
    if (typeof done === 'function') done();
  });
}

module.exports = {
  copyDistToDemo,
  createDemo
};
