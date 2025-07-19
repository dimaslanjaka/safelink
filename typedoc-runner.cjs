const typedocModule = require('typedoc');
const semver = require('semver');
const { spawnAsync } = require('cross-spawn');
const axios = require('axios');
const { writeFile } = require('fs/promises');
const fs = require('fs');
const path = require('path');
const pkgjson = require('./package.json');
const localTypedocOptions = require('./typedoc.config.cjs');
const { EOL } = require('os');
const git = pkgjson.name === 'git-command-helper' ? require('./dist').default : require('git-command-helper').default;
const upath = require('upath');

// required : upath semver typedoc git-command-helper gulp cross-spawn
// update   : curl -L https://github.com/dimaslanjaka/nodejs-package-types/raw/main/typedoc-runner.js > typedoc-runner.js
// repo     : https://github.com/dimaslanjaka/nodejs-package-types/blob/main/typedoc-runner.js
// usages
// - git clone https://github.com/dimaslanjaka/docs.git
// - node typedoc-runner.js

const REPO_URL = 'https://github.com/dimaslanjaka/docs.git';

let compiled = 0;

/**
 * Compile typedocs
 * @param {Partial<import('typedoc').TypeDocOptions>} options
 * @param {(...args: any[]) => any} callback
 */
const compile = async function (options = {}, callback = null) {
  const outDir = upath.join(__dirname, 'docs');
  const projectDocsDir = upath.join(outDir, pkgjson.name);
  if (options) setTypedocOptions(options);

  if (!fs.existsSync(outDir)) {
    await spawnAsync('git', ['clone', REPO_URL, 'docs'], { cwd: __dirname });
  }

  // create directory when not exist
  if (!fs.existsSync(projectDocsDir)) fs.mkdirSync(projectDocsDir, { recursive: true });

  // disable delete dir while running twice
  if (compiled > 0) setTypedocOptions({ cleanOutputDir: false });
  compiled++;

  // Application.bootstrap also exists, which will not load plugins
  // Also accepts an array of option readers if you want to disable
  // TypeDoc's tsconfig.json/package.json/typedoc.json option readers
  const app = await typedocModule.Application.bootstrapWithPlugins(getTypedocOptions());
  if (semver.gte(typedocModule.Application.VERSION, '0.16.1')) {
    app.options.addReader(new typedocModule.TSConfigReader());
    app.options.addReader(new typedocModule.TypeDocReader());
  }

  //console.log(options);
  //delete options.run;

  const project = await app.convert();
  if (typeof project !== 'undefined') {
    await app.generateDocs(project, projectDocsDir);
    await app.generateJson(project, upath.join(projectDocsDir, 'info.json'));
  } else {
    console.error('[error]', 'project undefined');
  }

  // call API callback
  if (typeof callback === 'function') await callback.apply(app);
  // call standalone callback
  const callback_script = upath.join(__dirname, 'typedoc-callback.js');
  if (fs.existsSync(callback_script)) {
    await spawnAsync('node', [callback_script], { cwd: __dirname, stdio: 'inherit' });
  }
  await createIndex();
};

/**
 * Compile and publish to github pages
 * @param {import('typedoc').TypeDocOptions} options
 * @param {(...args: any[]) => any} callback
 */
const publish = async function (options = {}, callback = null) {
  console.log('publishing docs');
  const outDir = upath.join(__dirname, 'docs');

  if (!fs.existsSync(upath.join(outDir))) {
    console.log('cloning', REPO_URL);
    await new git(__dirname)
      .spawn('git', ['clone', REPO_URL, 'docs', '-b', 'master', '--single-branch'], { cwd: __dirname })
      .catch(() => console.log('fail clone to /docs'));
  }

  const github = new git(outDir);
  //await github.reset('master');
  await github
    .pull(['-X', 'theirs'])
    .then(() => console.log('success pull'))
    .catch(() => console.log('fail pull'));
  await github
    .spawn('git', 'config core.eol lf'.split(' '))
    .then(() => console.log('success set EOL LF'))
    .catch(() => console.log('fail set EOL LF'));

  for (let i = 0; i < 2; i++) {
    await compile(options, callback).catch(() => console.log('publish fail to compile'));
  }

  const response = await axios.default.get(
    'https://raw.githubusercontent.com/dimaslanjaka/nodejs-package-types/main/.gitattributes',
    {
      responseType: 'blob'
    }
  );
  writeFile(upath.join(outDir, '.gitattributes'), response.data, (err) => {
    if (err) throw err;
    console.log('.gitattributes has been saved!');
  });

  try {
    const currentGit = new git(__dirname);
    const commit = await currentGit.latestCommit().catch(noop);
    const remote = (await currentGit.getremote().catch(noop)).push.url.replace(/.git$/, '').trim();
    if (remote.length > 0) {
      console.log('current git project', remote);
      await github.add(pkgjson.name).catch(noop);
      await spawnAsync('git', [
        'commit',
        '-m',
        `update ${pkgjson.name} docs [${remote}/commit/${commit}]`,
        '-m',
        `at ${new Date()}`
      ]);
      const isCanPush = await github.canPush().catch(noop);
      if (isCanPush) {
        await github.push().catch(noop);
      }
    }
  } catch {
    //
  }
};

function noop(..._) {
  return;
}

let opt = localTypedocOptions;
/**
 * Get typedoc options
 * @returns {typeof import('./typedoc.config.cjs')}
 */
function getTypedocOptions() {
  if (opt['$schema']) delete opt['$schema']; // non-config
  if (opt['logger']) delete opt['logger']; // deprecated
  return opt;
}

/**
 * Set typedoc options
 * @param {typeof import('./typedoc.config.cjs')} newOpt
 */
function setTypedocOptions(newOpt) {
  opt = Object.assign(opt, newOpt || {});
  opt['$schema'] = 'https://typedoc.org/schema.json';
  writefile(upath.join(__dirname, 'tmp/typedoc/options.json'), JSON.stringify(opt, null, 2));
  return opt;
}

if (require.main === module) {
  (async () => {
    const argv = process.argv;
    // node typedoc-runner.js --publish
    if (argv.includes('--publish')) {
      console.log('[publish] start');
      await publish();
      console.log('[publish] finish');
    } else {
      console.log('[compile] start');
      await compile();
      console.log('[compile] finish');
    }
  })();
} else {
  //console.log('required as a module');
}

/**
 * create docs/readme.md
 */
async function createIndex() {
  let body =
    `
<h1 id="headline">Monorepo Documentation Site</h1>
  `.trim() + EOL;

  fs.readdirSync(upath.join(__dirname, 'docs')).forEach((filename) => {
    const filePath = upath.join(__dirname, 'docs', filename);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && filename !== '.git') {
      body += `\n<li><a href="./${filename}">${filename}</a></li>\n` + EOL;
    }
  });
  fs.writeFileSync(upath.join(__dirname, 'docs/index.html'), body.trim());
}

/**
 * write to file recursively
 * @param {string} dest
 * @param {any} data
 */
function writefile(dest, data) {
  if (!fs.existsSync(path.dirname(dest))) fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest)) {
    if (fs.statSync(dest).isDirectory()) throw dest + ' is directory';
  }
  fs.writeFileSync(dest, data);
}

module.exports = {
  compile,
  compileDocs: compile,
  publish,
  getTypedocOptions,
  setTypedocOptions
};
