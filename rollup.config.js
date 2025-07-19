import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import path from 'path';
import dts from 'rollup-plugin-dts';

const plugins = [
  resolve({ browser: true }),
  commonjs(),
  // Must resolve the actual tsconfig (not tsconfig: false) so that TypeScript's
  // getCommonSourceDirectoryOfConfig receives a valid configFilePath.
  // Using tsconfig: false causes Debug.checkDefined(options.configFilePath) to
  // throw "Debug Failure" in TypeScript 5.8.3.
  // outDir/rootDir overrides keep compilation scoped; Rollup controls final output.
  // declaration: false because rollup-plugin-dts handles the .d.ts bundle.
  typescript({
    tsconfig: './tsconfig.json',
    compilerOptions: {
      rootDir: './src',
      outDir: './dist',
      declaration: false,
      declarationMap: false
    }
  })
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
  },
  // Simple bundle for src/index.ts to dest/bundle.js (no minify)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/bundle.js',
      format: 'iife',
      sourcemap: true
    },
    plugins
  }
];
