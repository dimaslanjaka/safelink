const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('upath');
var webpack = require('webpack');
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin');

/** @type {webpack.Configuration[]} */
const config = [];

function gen(fn) {
  /** @type {webpack.Configuration} */
  const config = {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.(ts|js)?$/,
          use: 'ts-loader',
          exclude: /node_modules|.test.(ts|js)$/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [new ResolveTypeScriptPlugin()],
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        fs: false,
      },
    },
    output: {
      filename: fn + '.js',
      path: resolve(__dirname, 'dist'),
      sourceMapFilename: fn + '.map',
      library: 'safelinkify',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    mode: fn.includes('.min') ? 'production' : 'development',
  };
  return config;
}

['bundle', 'bundle.min'].forEach(function (key) {
  config.push(gen(key));
});

module.exports = config;
