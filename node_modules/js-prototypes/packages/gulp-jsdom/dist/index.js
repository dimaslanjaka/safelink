// https://github.com/SARFEX/gulp-jsdom/blob/master/index.js
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var PLUGIN_NAME = 'gulp-jsdom';
var through2_1 = __importDefault(require("through2"));
var plugin_error_1 = __importDefault(require("plugin-error"));
var jsdom_1 = __importDefault(require("jsdom"));
var JSDOM = jsdom_1["default"].JSDOM;
/**
 * JSDOM via gulp
 * @param mutator
 * @param options
 * @param serialize dom.serialize()
 * @returns
 */
function gulpJSDOM(mutator, options, serialize) {
    options = options || {};
    serialize = serialize || true;
    function transform(file, encoding, callback) {
        if (file.isNull() || file.extname != '.html') {
            return callback(null, file);
        }
        if (file.isStream()) {
            return callback(new plugin_error_1["default"](PLUGIN_NAME, 'Streaming not supported'));
        }
        try {
            if (file.isBuffer()) {
                var dom = new JSDOM(file.contents.toString('utf-8'), options);
                var context = {
                    file: file,
                    //filename: file.history[file.history.length - 1].substr(file.base.length),
                    filename: file.history[file.history.length - 1].substring(file.base.length)
                };
                var output = mutator.call(context, dom.window.document, dom.window);
                file.contents = Buffer.from(typeof output === 'string'
                    ? output
                    : serialize === true
                        ? dom.serialize()
                        : dom.window.document.documentElement.outerHTML);
                if (this)
                    this.push(file);
            }
        }
        catch (err) {
            this.emit('error', new plugin_error_1["default"](PLUGIN_NAME, err));
        }
        callback(null, file);
    }
    return through2_1["default"].obj(transform);
}
exports["default"] = gulpJSDOM;
