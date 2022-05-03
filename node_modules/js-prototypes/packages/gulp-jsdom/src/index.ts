// https://github.com/SARFEX/gulp-jsdom/blob/master/index.js
'use strict';
const PLUGIN_NAME = 'gulp-jsdom';
import through from 'through2';
import PluginError from 'plugin-error';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

/**
 * JSDOM via gulp
 * @param mutator
 * @param options
 * @param serialize dom.serialize()
 * @returns
 */
export default function gulpJSDOM(mutator: Document & any, options?: jsdom.ConstructorOptions, serialize?: boolean) {
  options = options || {};
  serialize = serialize || true;

  function transform(
    file: Parameters<through.TransformFunction>[0],
    encoding: Parameters<through.TransformFunction>[1],
    callback: Parameters<through.TransformFunction>[2]
  ) {
    if (file.isNull() || file.extname != '.html') {
      return callback(null, file);
    }
    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    try {
      if (file.isBuffer()) {
        const dom = new JSDOM(file.contents.toString('utf-8'), options);

        const context = {
          file: file,
          //filename: file.history[file.history.length - 1].substr(file.base.length),
          filename: file.history[file.history.length - 1].substring(file.base.length),
        };
        const output = mutator.call(context, dom.window.document, dom.window);

        file.contents = Buffer.from(
          typeof output === 'string'
            ? output
            : serialize === true
            ? dom.serialize()
            : dom.window.document.documentElement.outerHTML
        );
        if (this) this.push(file);
      }
    } catch (err) {
      this.emit('error', new PluginError(PLUGIN_NAME, err));
    }

    callback(null, file);
  }

  return through.obj(transform);
}
