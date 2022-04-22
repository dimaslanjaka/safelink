import ejs from 'ejs';
import { existsSync, PathOrFileDescriptor, readFileSync } from 'fs';
import { dirname, join, resolve } from 'upath';
import renderMarkdown from './EJSHelper/markdown';

interface Helpers extends Partial<ejs.Options> {
  [key: string]: any;
  /**
   * root file to determine dirname and filename
   */
  root: string;
}

export default class EJSHelper {
  options: Helpers;
  constructor(options: Helpers) {
    this.options = options;
  }
  htmltag(tagname: 'script' | 'style' | string, path: string) {
    let result = '';
    const root = dirname(this.options.root);
    const file = join(root, path);
    const read = (file: PathOrFileDescriptor) => readFileSync(file).toString();
    if (existsSync(file)) {
      result = read(file);
    }
    const exts = ['.ejs', '.css', '.js'];
    for (let i = 0; i < exts.length; i++) {
      const filepath = file + exts[i];
      if (existsSync(filepath)) {
        result = read(filepath);
      }
    }
    switch (tagname) {
      case 'script':
        return '<script>' + result + '</script>';

      case 'style':
        return '<style>' + result + '</style>';

      default:
        return result;
    }
  }
  markdown(path: string) {
    const root = dirname(this.options.root);
    const file = resolve(join(root, path));
    if (existsSync(file)) {
      const read = readFileSync(file).toString();
      return renderMarkdown(read);
    }
    return '';
  }
  /**
   * add option
   * @param key object key
   * @param value object value
   * @returns
   */
  add(key: any, value: any) {
    this.options[key] = value;
    return this;
  }
  /**
   * render ejs
   * @param path
   * @returns
   */
  renderFile(path: string) {
    return ejs.renderFile(path, this.toObject());
  }
  toObject() {
    this.options.htmltag = this.htmltag.bind(this);
    this.options.markdown = this.markdown.bind(this);
    return this.options;
  }
}
