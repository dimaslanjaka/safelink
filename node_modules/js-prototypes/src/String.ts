/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="globals.d.ts" />

/**
 * Strings
 */
interface String {
  /**
   * Truncate string
   * @param n sequence number to cut the next sentence
   * @param useWordBoundary true ? subString.substr(0, subString.lastIndexOf(" "))
   * @see https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
   */
  truncate: (n: number, useWordBoundary: boolean | null) => string;

  /**
   * Easy String Match Boolean
   * @description String match result as boolean
   * @param pattern regex or string
   * @returns true or false
   */
  isMatch: (pattern: RegExp | string) => boolean;

  /**
   * Replace all occurrences of a string
   * * Shim ES2021 prototype
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll}
   */
  replaceAll: (search: string | RegExp, replacement: string) => string;

  /**
   * Printf
   * @see {@link https://stackoverflow.com/a/46078375}
   * @example
   * console.log("Hello I am " + "%s %s".printf(["foo", "bar"]));
   */
  printf: (obj: any[] | string) => string;

  /**
   * Matches a string an object that supports being matched against, and returns an array containing the results of
   * that search.
   * @param matcher An object that supports being matched against.
   */
  match(matcher: { [Symbol.match](string: string): RegExpMatchArray | null }): RegExpMatchArray | null;

  /**
   * Replaces text in a string, using an object that supports replacement within a string.
   * @param searchValue A object can search for and replace matches within a string.
   * @param replaceValue A string containing the text to replace for every successful match of searchValue in this
   *     string.
   */
  replace(
    searchValue: {
      [Symbol.replace](string: string, replaceValue: string): string;
    },
    replaceValue: string
  ): string;

  /**
   * Replaces text in a string, using an object that supports replacement within a string.
   * @param searchValue A object can search for and replace matches within a string.
   * @param replacer A function that returns the replacement text.
   */
  replace(
    searchValue: {
      [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
    },
    replacer: (substring: string, ...args: any[]) => string
  ): string;

  /**
   * Finds the first substring match in a regular expression search.
   * @param searcher An object which supports searching within a string.
   */
  search(searcher: { [Symbol.search](string: string): number }): number;

  /**
   * Split a string into substrings using the specified separator and return them as an array.
   * @param splitter An object that can split a string.
   * @param limit A value used to limit the number of elements returned in the array.
   */
  split(splitter: { [Symbol.split](string: string, limit?: number): string[] }, limit?: number): string[];

  /**
   * Parse url into part object
   */
  parse_url(): {
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    searchObject: Record<any, any>;
    hash: string;
    protohost: string;
  };

  /**
   * Call css from url/path
   */
  CSS(): void;

  /**
   * Hex encrypt
   */
  hexE(): string;

  /**
   * Hex Decrypt
   */
  hexD(): string;

  /**
   * Capitalize all first character string
   * @example [PHP] ucwords($string)
   */
  capitalize(): string;

  /**
   * PHP str_rot13 equivalent
   */
  rot13(): string;

  /**
   * Check if string empty or blank
   */
  isEmpty(): boolean;

  /**
   * Replace string by array pattern
   * @param array
   * @param replacement
   */
  replaceArr(array: string[], replacement: string): string;

  /**
   * Convert a string to HTML entities
   * @see {@link https://stackoverflow.com/a/27020300}
   * @example
   * "Test´†®¥¨©˙∫ø…ˆƒ∆÷∑™ƒ∆æøπ£¨ ƒ™en tést".toHtmlEntities();
   * console.log("Entities:", str);
   */
  toHtmlEntities(): string;

  /**
   * Check if string contains some text from array of substrings
   * @see {@link https://stackoverflow.com/a/5582621}
   * @param arrayStr
   */
  includesArray(arrayStr: string[]): boolean;
}

interface StringConstructor {
  /**
   * Create string from HTML entities
   * @see {@link https://stackoverflow.com/a/27020300}
   * @example
   * var str = "Test´†®¥¨©˙∫ø…ˆƒ∆÷∑™ƒ∆æøπ£¨ ƒ™en tést".toHtmlEntities();
   * console.log("String:", String.fromHtmlEntities(str));
   */
  fromHtmlEntities(str: string): string;
}

String.prototype.printf = function (obj) {
  /*const isNode = new Function(
    "try {return this===global;}catch(e){return false;}"
  );

  if (isNode()) {
    const util = require("util");
    return util.format(this, obj);
  }*/

  let useArguments = false;
  const _arguments = arguments;
  let i = -1;
  if (typeof _arguments[0] == 'string') {
    useArguments = true;
  }
  if (obj instanceof Array || useArguments) {
    return this.replace(/%s/g, function (a, b) {
      i++;
      if (useArguments) {
        if (typeof _arguments[i] == 'string') {
          return _arguments[i];
        } else {
          throw new Error('Arguments element is an invalid type');
        }
      }
      return obj[i];
    });
  } else {
    return this.replace(/{([^{}]*)}/g, function (a, b) {
      const r = obj[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
  }
};

String.prototype.parse_url = function () {
  let parser: URL | HTMLAnchorElement;
  if (typeof module != 'undefined' && module.exports) {
    parser = new URL(this);
  } else if (typeof document != 'undefined') {
    parser = document.createElement('a');
  }
  const searchObject: Array<Record<any, any> | any> = [];
  let split: Array<Record<any, any> | any> = [];
  let queries: string[] = [];
  // Let the browser do the work
  parser.href = this.toString();
  // Convert query string to object
  queries = parser.search.replace(/^\?/, '').split('&');
  for (let i = 0; i < queries.length; i++) {
    split = queries[i].split('=');
    if (split.length) searchObject[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash,
    protohost: parser.protocol + '//' + parser.host,
  };
};

/**
 * Load css
 */
String.prototype.CSS = function () {
  const e = document.createElement('link');
  e.rel = 'stylesheet';

  e.href = this.toString();
  const n = document.getElementsByTagName('head')[0];
  window.addEventListener
    ? window.addEventListener(
        'load',
        function () {
          n.parentNode.insertBefore(e, n);
        },
        !1
      )
    : window.attachEvent
    ? window.attachEvent('onload', function () {
        n.parentNode.insertBefore(e, n);
      })
    : (window.onload = function () {
        n.parentNode.insertBefore(e, n);
      });
};

String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/gm, '');
};

String.prototype.hexE = function () {
  let hex: string, i: number;

  let result = '';
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }

  return result;
};

String.prototype.hexD = function () {
  let j: number;
  const hexes = this.match(/.{1,4}/g) || [];
  let back = '';
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.rot13 = function () {
  return this.replace(/[a-zA-Z]/g, function (c: any) {
    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
};

String.prototype.truncate = function (n: number, useWordBoundary: boolean | null) {
  if (this.length <= n) {
    return this;
  }
  const subString = this.substr(0, n - 1); // the original check
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + '&hellip;';
};

String.prototype.isEmpty = function () {
  if (this != null || typeof this != 'undefined') {
    return this.length === 0 || !this.trim();
  }
  return false;
};

String.prototype.replaceArr = function (this: string, array: string[], replacement: string) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  let ori = this;
  array.map((str) => {
    ori = ori.replace(str, replacement);
  });
  return ori;
};

String.prototype.toHtmlEntities = function () {
  return this.replace(/./gm, function (s) {
    // return "&#" + s.charCodeAt(0) + ";";
    return s.match(/[a-z0-9\s]+/i) ? s : '&#' + s.charCodeAt(0) + ';';
  });
};

String.fromHtmlEntities = function (str) {
  return (str + '').replace(/&#\d+;/gm, function (s) {
    const m = s.match(/\d+/gm)[0];
    return String.fromCharCode(<any>m);
  });
};

String.prototype.includesArray = function (substrings) {
  return substrings.some((v) => this.includes(v));
};

const ___global = (typeof window != 'undefined' ? window : global) /* node */ as any;

/**
 * easy regex match
 * @param str
 * @param pattern
 * @returns
 */
function strMatch(str: string, pattern: RegExp | string) {
  let regex: RegExp;
  if (typeof pattern == 'string') {
    regex = new RegExp(pattern, 'gm');
  } else {
    regex = pattern;
  }
  const match = str.match(regex) || false;
  if (Array.isArray(match)) {
    if (match.length > 0) return true;
  }
  return false;
}
___global.strMatch = strMatch;

String.prototype.isMatch = function (this: string, pattern) {
  return strMatch(this, pattern);
};

if (typeof ''.replaceAll != 'function') {
  String.prototype.replaceAll = function (search, replacement) {
    const find = typeof search == 'string' ? new RegExp(search, 'gm') : search;
    return this.replace(find, replacement);
  };
}
