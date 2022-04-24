import spawn from 'cross-spawn';
import { join, resolve } from 'upath';

const summon = spawn('ts-node', [join(__dirname, 'article-generator', 'index.ts')], {
  cwd: resolve(__dirname, '..'),
  shell: true,
  stdio: 'inherit',
});
