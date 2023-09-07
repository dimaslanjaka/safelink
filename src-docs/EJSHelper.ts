import ejs from 'ejs';
import { existsSync, readFileSync } from 'fs';
import { dirname, join, resolve } from 'upath';
import renderMarkdown from './EJSHelper/markdown';

interface PackageJson {
  dependencies: Record<string, string>;
  version: string;
}

interface Helpers extends Partial<ejs.Options> {
  [key: string]: any;
  /**
   * root file to determine dirname and filename
   */
  root: string;
}

export class EJSHelper {
  options: Helpers;
  constructor(options: Helpers = { root: process.cwd() }) {
    this.options = options;
  }
  setRoot(path: string) {
    this.options.root = path;
  }
  /**
   * load package.json
   * @param pathFile
   * @returns
   */
  loadPackageJson(pathFile: string): PackageJson {
    const root = dirname(this.options.root);
    const file = join(root, pathFile);
    return JSON.parse(readFileSync(file, 'utf-8'));
  }
  /**
   * create html tag
   * @param tagname
   * @param pathFile
   * @returns
   */
  htmltag(tagname: 'script' | 'style' | string, pathFile: string) {
    let result = '';
    const root = dirname(this.options.root);
    const file = join(root, pathFile);
    const read = (file: string) => readFileSync(file).toString();
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
  /**
   * import markdown
   * @param path
   * @returns
   */
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
   * add option/data
   * @param key object key
   * @param value object value
   * @returns
   */
  addOption(key: any, value: any) {
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

  /**
   * export current methods to object ejs
   * @returns
   */
  toObject() {
    this.getAllFuncs(this).forEach((member) => {
      this.options[member] = this[member].bind(this);
    });

    return this.options;
  }

  private getAllFuncs(toCheck: { [x: string]: any }) {
    const props = [];
    let obj = toCheck;
    do {
      props.push(...Object.getOwnPropertyNames(obj));
    } while ((obj = Object.getPrototypeOf(obj)));

    return props
      .sort()
      .filter((e, i, arr) => {
        if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
      })
      .filter((member) => {
        const defaultMembers = [
          '__defineGetter__',
          '__defineSetter__',
          '__lookupGetter__',
          '__lookupSetter__',
          'valueOf',
          'propertyIsEnumerable',
          'isPrototypeOf',
          'toLocaleString',
          'toString',
          'constructor',
          'hasOwnProperty',
          'getAllFuncs',
          'toObject'
        ];
        // filter excludes
        return !defaultMembers.includes(member);
      });
  }
}

export default EJSHelper;
