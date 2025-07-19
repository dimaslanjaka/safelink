import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import path from 'path';
import dts from 'rollup-plugin-dts';

const tsconfigContent = fs.readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf-8');
const tsconfig = parse(tsconfigContent);
// Remove outDir from tsconfig for Rollup compatibility
if (tsconfig.compilerOptions && tsconfig.compilerOptions.outDir) {
  delete tsconfig.compilerOptions.outDir;
}

const plugins = [
  resolve({ browser: true }),
  commonjs(),
  typescript({ tsconfig: false, compilerOptions: tsconfig.compilerOptions })
];

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/safelink-browser-module.cjs',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true
    },
    plugins
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/safelink-browser-module.mjs',
      format: 'esm',
      sourcemap: true
    },
    plugins
  },
  // DTS bundles
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/safelink-browser-module.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/safelink-browser-module.d.cts',
      format: 'es'
    },
    plugins: [dts()]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/safelink-browser-module.d.mts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
