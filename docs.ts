import fs from 'fs';
import fsp from 'fs/promises';
import gulp from 'gulp';
import path from 'path';
import webpack from 'webpack';
import pkg from './package.json' with { type: 'json' };
import { default as safelink } from './src/index.js';
import webpackConfig from './webpack.config.js';

//
// DEMO BUILDER
//

//
import { spawnAsync } from 'cross-spawn';
import { minify } from 'html-minifier-terser';
import { default as EJSHelper } from './src-docs/EJSHelper.js';
import { compileDocs } from './typedoc-runner.cjs';
//

// VARS

const safelinkInstance = new safelink.safelink({
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
const deploy_dir = path.join(process.cwd(), 'docs/safelinkify/demo');
console.log('deploy dir', deploy_dir);

// VARS END

// Usage:
// npx tsc docs.ts --target ES2020 --module ESNext --moduleResolution node --outDir ./tmp/transpile --allowJs --checkJs false --lib es2020,DOM --resolveJsonModule --skipDefaultLibCheck --skipLibCheck --allowSyntheticDefaultImports --esModuleInterop --strict false --strictNullChecks false --noImplicitAny false --noImplicitReturns false
// node tmp/transpile/docs.js

// @fixme: generate changelog.md
spawnAsync('node', ['changelog.cjs'], { cwd: process.cwd() }).then(() => {
  // compie JSDoc API using TSDoc
  compileDocs(
    {
      cleanOutputDir: false as any,
      commentStyle: 'All'
    },
    () => {
      // generate dist
      webpack(webpackConfig, (err, stats) => {
        if (err || (stats && stats.hasErrors())) {
          console.log('webpack error');
          console.log(stats);
          return;
        }
        // copy dist
        copyDistToDemo(createDemo);
      });
    }
  );
});

/**
 * Create demo from src-docs
 */
async function createDemo() {
  if (!fs.existsSync(deploy_dir)) await fsp.mkdir(deploy_dir, { recursive: true });

  const PORT = parseInt(process.env.PORT || '4000');
  const baseUrl = 'http://localhost:' + PORT;
  const url = new URL(baseUrl);
  const pathName = (() => {
    const path = url.pathname.replace(/.html$/, '');
    if (path.endsWith('/') || path.length < 1) return path + 'index';
    return path;
  })();

  const view = path.join(process.cwd(), 'src-docs');
  const view_ejs = path.join(view, pathName + '.ejs');
  const title = 'Safelinkify - External Link Anonymizer';
  if (fs.existsSync(view_ejs)) {
    const helpers = new EJSHelper({
      root: path.join(view, 'layout.ejs')
    });
    const renderPage = await helpers.renderFile(view_ejs);
    helpers.addOption('body', renderPage);
    helpers.addOption('title', title);
    helpers.addOption('description', pkg.description);
    let renderLayout = await helpers.renderFile(path.join(view, 'layout.ejs'));

    // write to test folder
    await fsp.writeFile(path.join(process.cwd(), 'src/test/index.html'), renderLayout);

    /** Safelinkify */
    const parse = await safelinkInstance.parse(renderLayout);
    if (parse) {
      renderLayout = parse;
    }

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
    const saveTo = path.join(deploy_dir, 'index.html');
    await fsp.writeFile(saveTo, result);
    console.log('demo saved', saveTo);
  }
}

/**
 * Copy Dist to Demo
 */
function copyDistToDemo(done: (...args: any[]) => any) {
  // check exist
  if (!fs.existsSync(deploy_dir)) fs.mkdirSync(deploy_dir, { recursive: true });
  // add .nojekyll
  fs.writeFileSync(path.join(deploy_dir, '.nojekyll'), '');
  // copy package.json
  (pkg as any)['devDependencies'] = {};
  fs.writeFileSync(path.join(deploy_dir, '/package.json'), JSON.stringify(pkg, null, 2));

  /**
   * copy dist/*.js to {@link deploy_dir}/dist
   * @returns
   */
  const copyDist = () =>
    gulp
      .src(['**/*', '!**/*.d.ts'], { cwd: path.join(process.cwd(), 'dist') })
      .pipe(gulp.dest(path.join(deploy_dir, 'dist')));

  /**
   * copy markdowns to {@link deploy_dir}/dist
   * @returns
   */
  const copyMd = () => gulp.src(path.join(process.cwd(), '*.md')).pipe(gulp.dest(deploy_dir));

  return gulp.series(
    copyDist,
    copyMd
  )(() => {
    console.log('copy finish');
    if (typeof done === 'function') done();
  });
}

export { copyDistToDemo, createDemo };
