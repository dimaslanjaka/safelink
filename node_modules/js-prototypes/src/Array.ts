/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-prototype-builtins */
/// <reference path="./globals.d.ts" />
const _global = (typeof window != 'undefined' ? window : global) /* node */ as any;

/**
 * Arrays
 */
interface Array<T> {
  /**
   * Unique Array
   * @example
   * var duplicate = [1,2,1,2,3,4,5,6];
   * var unique = duplicate.unique(); // [1,2,3,4,5,6]
   */
  unique: () => Array<T>;

  /**
   * Unique string array case insensitive but keep one case sensitive result
   * @see {@link https://stackoverflow.com/a/48731445/6404439}
   * @example
   * console.log(['James', 'james', 'bob', 'JaMeS', 'Bob'].uniqueStringArray()); // ["JaMeS", "Bob"]
   */
  uniqueStringArray: () => Array<string>;

  /**
   * Move item to another index
   * @see {@link https://stackoverflow.com/a/70618791/6404439}
   */
  move: (from: number, to: number) => Array<T>;

  /**
   * Unique array of objects by key
   * @see {@link https://stackoverflow.com/a/51537887}
   * @param key object key to check
   * @param removeNull remove null and undefined (default=true)
   */
  uniqueObjectKey: (key: string, removeNull?: boolean) => Array<T>;

  /**
   * Remove array item from other arrays
   */
  hapusItemDariArrayLain: (...arrayLain: any[]) => any[];

  /**
   * Pick 1 random array element
   */
  random: <T>() => T;

  /**
   * split array to chunks
   * @param size divided array by number index
   */
  split_chunks: (size: number) => ReturnType<typeof array_split_chunks>;

  /**
   * Add Element
   * @param element
   * @example
   * var a = [1,2];
   * a.add(3);
   * console.log(a); // [1,2,3]
   *
   * var b = [0,9];
   * console.log(b.add(2)); // [0,9,2]
   */
  add(element: any): Array<T>;

  /**
   * @summary Add another array
   * @description Add another array to current array
   * @param anotherArray
   * @example
   * var a = [0,1];
   * var b = ['a','b'];
   * console.log(b.addAll(a)); // ['a','b',0,1]
   * var c = ['z',10];
   * c.addAll(b);
   * console.log(c); // ['z',10,'a','b',0,1]
   * var d = ['last']:
   * d.addAll(a,b,c);
   * console.log(d); // ['last','a','b',0,1]
   */
  addAll(...anotherArray: Array<any>): Array<any>;

  /**
   * Get element in range from array
   * @param start start number index
   * @param end end number index
   * @example
   * const arr = [1, 2, 3, 4, 5];
   * console.log(arr.range(1, 3));
   */
  range(start: number, end: number): Array<any>;

  /**
   * Returns true if self contains no elements.
   * @see {@link Array<T>.length}
   */
  isEmpty(): boolean;

  /**
   * Returns the first element, or the first n elements, of the array.
   * If the array is empty, requesting one element returns undefined ,
   * and requesting multiple elements returns an empty array.
   * @example
   *   var a = [ "q", "r", "s", "t" ]
   *   a.first()   // => "q"
   *   a.first(2)  // => ["q", "r"]
   */
  first(n: number): Array<T>;

  /**
   * Returns the last element(s) of self.
   * If the array is empty, returns undefined  if only one element requested.
   * @example
   *   var a = [ "w", "x", "y", "z" ]
   *   a.last()     // => "z"
   *   a.last(2)    // => ["y", "z"]
   */
  last(n: number): Array<T>;

  /**
   * Unset element value from array
   * @param n value element
   * @example
   * var arr = ['a','b','c'];
   * arr.unset('c');
   * console.log(arr); // ['a','b']
   */
  unset(n: any): Array<T>;

  /**
   * Deletes the element at the specified index, returning that element, or undefined  if the index is out of range.
   * A negative index is counted from the end of the array, where -1 corresponds to the last element. Returns self
   * for chaining purposes.
   * @example
   *   var a = ["ant", "bat", "cat", "dog"]
   *   a.deleteAt(2)    // => "cat"
   *   a                // => ["ant", "bat", "dog"]
   *   a.deleteAt(99)   // => undefined (because index 99 not found)
   *   if(a.deleteAt(1)) console.log('item with index 1 removed') // conditional
   */
  deleteAt(n: number): Array<T>;

  /**
   * Removes null  and undefined  elements from the array, turning it into a dense array.
   * Returns self for chaining purposes
   */
  compact(): Array<T>;

  /**
   * Check element index exists
   * @example
   * ['a','b'].exists(1); //true
   * ['a','b'].exists(4); //false
   */
  exists(n: number): boolean;

  /**
   * Check array contains string/any
   * @param obj
   * @example
   * alert([1, 2, 3].contains(2)); // => true
   * alert([1, 2, 3].contains('2')); // => false
   */
  contains(obj: any): boolean;

  /**
   * Check if array offset (index) exists
   * @param n
   * @example
   * alert([{},'a','x'].hasIndex(2)); // => true - array has offset 2 is 'x'
   * alert([{},'a','x'].hasIndex(3)); // => false
   */
  hasIndex(n: number): boolean;

  /**
   * Shuffle arrays.
   * @description Randomize array elements
   * @example
   * alert([1,2,3,4,5].shuffle())
   */
  shuffle(): Array<T>;

  /**
   * Remove null, empty string, or undefined values
   */
  removeEmpties(): Array<T>;

  /**
   * trim array of strings
   */
  trim(): Array<string>;

  /**
   * same as Array<any>['forEach']
   */
  each: Array<any>['forEach']; //T[]['forEach'];
}

Array.prototype.each = function (this: Array<any>) {
  return this.forEach;
};

Array.prototype.shuffle = function () {
  let i = this.length,
    j: number,
    temp: any;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

Array.prototype.last = function (n) {
  if (!n) {
    if (this.length === 0) return undefined;

    return this[this.length - 1];
  } else {
    let start = this.length - n;
    if (start < 0) start = 0;

    return this.slice(start, this.length);
  }
};

Array.prototype.trim = function () {
  return this.map((str) => {
    if (typeof str == 'string') return str.trim();
  });
};

Array.prototype.isEmpty = function () {
  return this.length === 0;
};

Array.prototype.range = function (start, end) {
  if (end < start) {
    return [];
  }
  return this.slice(start, end + 1);
};

Array.prototype.add = function (element) {
  this.push(element);
  return this;
};

Array.prototype.addAll = function (...otherArrays) {
  const self = this;
  otherArrays.forEach(function (array) {
    array.forEach((item) => {
      self.push(item);
    });
  });
  return self;
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.unique = function (this: Array<any>) {
  const a = this.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

Array.prototype.uniqueStringArray = function (this: Array<string>) {
  const filter = new Map(this.map((s) => [s.toLowerCase(), s]));
  return [...filter.values()];
};

Array.prototype.uniqueObjectKey = function (this: Array<Record<string, unknown>>, key, removeNull = true) {
  if (!key) return this;
  const resArr = [];
  this.filter(function (item) {
    const i = resArr.findIndex((x) => x[key] == item[key]);
    if (i <= -1) {
      if (removeNull) {
        if (item[key]) resArr.push(item);
      } else {
        resArr.push(item);
      }
    }
    return null;
  });
  return resArr;
};

Array.prototype.contains = function (obj) {
  let i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

Array.prototype.hasIndex = function (n: number) {
  return typeof this[n] != 'undefined';
};

Array.prototype.first = function (n) {
  if (!n) {
    if (this.length === 0) return undefined;

    return this[0];
  } else {
    if (this.length === 0) return [];

    return this.slice(0, n);
  }
};

Array.prototype.compact = function () {
  //var changes = false;
  for (let i = 0; i < this.length; i++) {
    // If element is non-existent, undefined or null, remove it.
    if (!this[i]) {
      this.splice(i, 1);
      i = i - 1;
      //changes = true;
    }
  }
  //if (!changes) return undefined;

  return this;
};

Array.prototype.deleteAt = function <T>(this: T[], index): T {
  if (index < 0) index = this.length + index;

  // If element is non-existent, return undefined:
  if (!this.hasOwnProperty(index)) return undefined;

  const elem = this[index];
  this.splice(index, 1);
  return elem;
};

Array.prototype.unset = function (value) {
  if (this.indexOf(value) != -1) {
    // Make sure the value exists
    this.splice(this.indexOf(value), 1);
  }
  return this;
};

Array.prototype.exists = function (n: number) {
  return typeof this[n] !== 'undefined';
};

if (!Array.prototype.hasOwnProperty('every')) {
  Array.prototype.every = function (fun: any /*, thisp */) {
    'use strict';
    const t: { [x: string]: any; length: number } = Object(this);
    const len = t.length >>> 0;
    let i: string | number;
    const thisp: any = arguments[1];

    if (this == null) {
      throw new TypeError();
    }

    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    for (i = 0; i < len; i++) {
      if (i in t && !fun.call(thisp, t[i], i, t)) {
        return false;
      }
    }

    return true;
  };
}

Array.prototype.move = function (from, to) {
  const itemRemoved = this.splice(from, 1); // splice() returns the remove element as an array
  this.splice(to, 0, itemRemoved[0]); // Insert itemRemoved into the target index
  return this;
};

Array.prototype.hapusItemDariArrayLain = function (this: any[], ...arrayLain) {
  let thisArr = this;
  arrayLain.forEach((otherArr) => {
    thisArr = thisArr.filter(function (el) {
      return !otherArr.includes(el);
    });
  });

  return thisArr;
};

Array.prototype.removeEmpties = function (this: any[]) {
  const filter = this.filter(function (el: string | any) {
    const notnull =
      // make sure element is not null
      el != null &&
      // make sure element is not undefined
      typeof el != 'undefined';
    // if element is string, make sure string length not zero
    if (typeof el == 'string') {
      return notnull && el.trim().length > 0;
    }
    return notnull;
  });
  return filter;
};

/**
 * split array to chunks
 * @param sourceArray
 * @param chunkSize
 * @see {@link https://stackoverflow.com/a/71483760/6404439}
 * @returns
 * @example
let ar1 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];
// split array by 4
console.log("Split in chunks with 4 size", splitChunks(ar1, 4)); // [[1,2,3,4], [5,6,7,8]...]
 */
function array_split_chunks<T extends any[]>(sourceArray: T, chunkSize: number): T[] {
  if (chunkSize <= 0) throw 'chunkSize must be greater than 0';
  const result = [];
  for (let i = 0; i < sourceArray.length; i += chunkSize) {
    result[i / chunkSize] = sourceArray.slice(i, i + chunkSize);
  }
  return result;
}
_global.array_split_chunks = array_split_chunks;
Array.prototype.split_chunks = function (size) {
  return array_split_chunks(this, size);
};

function array_filter(array: []) {
  return array.filter(function (el) {
    return el != null;
  });
}
_global.array_filter = array_filter;

/**
 * pick random from array
 * @param {Array<any>} arrays
 * @param {boolean} unique Unique the arrays
 */
function array_rand(arrays: any[], unique: any) {
  if (unique) {
    arrays = array_unique(arrays);
  }
  const index = Math.floor(Math.random() * arrays.length);
  return {
    index: index,
    value: arrays[index],
  };
}
_global.array_rand = array_rand;

/**
 * Array unique
 * @param {Array<any>} arrays
 */
function array_unique(arrays: any[]) {
  return arrays.filter(function (item: any, pos: any, self: string | any[]) {
    return self.indexOf(item) == pos;
  });
}
_global.array_unique = array_unique;

/**
 * Unset array
 * @param {Array<any>} arrayName
 * @param {String|number} key
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function array_unset(arrayName: { [x: string]: any }, key: any) {
  let x: string | number;
  const tmpArray = [];
  for (x in arrayName) {
    if (x != key) {
      tmpArray[x] = arrayName[x];
    }
  }
  return tmpArray;
}
_global.array_unset = array_unset;

/**
 * PHP shuffle array equivalent
 * @param array
 * @example
 * var arr = [2, 11, 37, 42];
 * shuffle(arr);
 * console.log(arr); //return random
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function shuffle(array: Array<any>) {
  let currentIndex = array.length,
    temporaryValue: any,
    randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
_global.shuffle = shuffle;

function arrayCompare(a1: Array<any>, a2: Array<any>) {
  if (a1.length != a2.length) return false;
  const length = a2.length;
  for (let i = 0; i < length; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}
_global.arrayCompare = arrayCompare;

/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
function inArray(needle: any, haystack: Array<any>) {
  const length = haystack.length;
  for (let i = 0; i < length; i++) {
    if (typeof haystack[i] == 'object') {
      if (arrayCompare(haystack[i], needle)) return true;
    } else {
      if (haystack[i] == needle) return true;
    }
  }
  return false;
}

/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
function in_array(needle: any, haystack: Array<any>) {
  return inArray(needle, haystack);
}
_global.in_array = in_array;

/**
 * get all keys
 * @param haystack string etc
 */
function array_keys(haystack: any) {
  return Object.keys(haystack);
}

/**
 * Shuffles array in place.
 * @param a items An array containing the items.
 */
function array_shuffle(a: Array<any>) {
  let j: number, x: any, i: number;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
_global.array_shuffle = array_shuffle;

/**
 * Deep merge two or more objects into the first.
 * (c) 2021 Chris Ferdinandi, MIT License, {@link https://gomakethings.com}
 * @param objects  The objects to merge together
 * @returns Merged values of defaults and options
 */
function deepAssign(...objects: Record<any, unknown>[]): Record<any, unknown> {
  // Make sure there are objects to merge
  const len = objects.length;
  if (len < 1) return;
  if (len < 2) return objects[0];

  // Merge all objects into first
  for (let i = 1; i < len; i++) {
    for (const key in objects[i]) {
      if (objects[i].hasOwnProperty(key)) {
        // If it's an object, recursively merge
        // Otherwise, push to key
        if (Object.prototype.toString.call(objects[i][key]) === '[object Object]') {
          objects[0][key] = deepAssign(<any>objects[0][key] || {}, <any>objects[i][key]);
        } else {
          objects[0][key] = objects[i][key];
        }
      }
    }
  }

  return arguments[0];
}
_global.deepAssign = deepAssign;

/**
 * Remove item from array
 * @param arr
 * @param value
 * @returns
 */
function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
_global.removeItem = removeItem;
