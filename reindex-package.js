// reindex dependencies based on current node version
// require { "engines": { "node": "^node version" } } in package.json

const path = require('path');
const pkg = require('./package.json');
const fs = require('fs');
const cp = require('cross-spawn');

if (!pkg.engines) throw new Error('engines must specified');

pkg.dependencies = convertRanges(pkg.dependencies);
pkg.devDependencies = convertRanges(pkg.devDependencies);
fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
cp.spawnAsync('npx', ['npm-check-updates', '--enginesNode', '-u', '-x', 'chalk,hexo,jsdom,deepmerge-ts'], {
  cwd: __dirname,
  stdio: 'inherit'
}).then(() => {
  return cp.spawnAsync('yarn', ['install'], {
    cwd: __dirname,
    stdio: 'inherit'
  });
});

/**
 *
 * @param {typeof pkg.dependencies} obj
 */
function convertRanges(obj) {
  const result = obj;
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const version = obj[key];
      if (!/^\w/.test(version)) {
        //console.log(`${key}@${version} -> ${key}@^0.0.1`);
        result[key] = '*';
      }
    }
  }
  console.log(result);
  return result;
}
