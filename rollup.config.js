import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import dts from 'rollup-plugin-dts';

// Let the plugin load the project's tsconfig so extends/resolveJsonModule are honored.
const tsconfigPath = path.join(process.cwd(), 'tsconfig.build.json');

const plugins = [resolve({ browser: true }), commonjs(), typescript({ tsconfig: tsconfigPath })];

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
      file: 'dist/browser-bundle.js',
      format: 'iife',
      sourcemap: true
    },
    plugins
  }
];
