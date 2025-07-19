import { spawnSync } from 'child_process';

// Compile docs.ts to tmp/transpile/docs.js

const tscArgs = [
  'tsc',
  'docs.ts',
  '--target',
  'ES2020',
  '--module',
  'ESNext',
  '--moduleResolution',
  'node',
  '--outDir',
  './tmp/transpile',
  '--allowJs',
  '--checkJs',
  'false',
  '--lib',
  'es2020,DOM',
  '--resolveJsonModule',
  '--skipDefaultLibCheck',
  '--skipLibCheck',
  '--allowSyntheticDefaultImports',
  '--esModuleInterop',
  '--strict',
  'false',
  '--strictNullChecks',
  'false',
  '--noImplicitAny',
  'false',
  '--noImplicitReturns',
  'false'
];

const tscResult = spawnSync('npx', tscArgs, { stdio: 'inherit', shell: true });
if (tscResult.status !== 0) {
  process.exit(tscResult.status ?? 1);
}

console.log('Transpiled docs.ts to tmp/transpile/docs.js');

// Run the transpiled docs.js as an ES module
const nodeResult = spawnSync(
  'node',
  ['--experimental-modules', '--es-module-specifier-resolution=node', 'tmp/transpile/docs.js'],
  { stdio: 'inherit', shell: true }
);
if (nodeResult.status !== 0) {
  process.exit(nodeResult.status ?? 1);
}
