/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/triple-slash-reference */
const __global = (typeof window != 'undefined' ? window : global) /* node */ as any;

interface Object {
  length: number;

  /**
   * Dynamic Key
   */
  [str: string]: any;

  /**
   * Merge this object with another object
   */
  merge: (...other: Record<any, unknown>[]) => Record<any, unknown>;

  /**
   * Iterate Object
   * @param callback function each element
   * @example
   * var a = {'a','n'};
   * a.each(function(el){
   *  console.log(el); //a, n each iteration
   * })
   */
  each(callback: (arg0: any) => any): any;

  /**
   * Check is empty
   */
  isEmpty(): boolean;

  replaceKeyFrom(anotherObj: any): any;
}

interface ObjectConstructor {
  /**
   * Dynamic Key
   */
  [str: string]: any;

  /**
   * Count size length of object
   */
  size: (obj: any) => number;

  //[pair: string|number]: any;

  /**
   * Is Object Has Property of key ?
   * @param key
   */
  hasOwnProperty(key: any): boolean;

  /**
   * check if has child and go for callback
   * @param str  match child property
   * @param callback function callback
   * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
   */
  child(str: string | number, callback: (arg: any) => any): any;

  /**
   * check object has child, if not exist return alternative value
   * @param str match child property
   * @param alternative default value callback
   * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
   */
  alt(str: any, alternative: string | number | boolean): any;

  /**
   * Check object has child
   * @param str
   */
  has(str: string | number): any;
}

Object.size = function (obj) {
  let size = 0,
    key: any;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

Object.child = function (str, callback) {
  const self: object = this;
  if (self.hasOwnProperty(str)) {
    if (typeof callback == 'function') {
      return callback(self[str]);
    } else {
      return true;
    }
  } else {
    return undefined;
  }
};

Object.alt = function (str, alternative) {
  const self: any = this;
  if (self.hasOwnProperty(str)) {
    return self[str];
  } else {
    return alternative;
  }
};

Object.has = function (str: string | number) {
  return this.hasOwnProperty(str);
};

Object.each = function (callback) {
  for (const key in this) {
    //callback.call(scope, key, this[key]);
    callback.call(this[key]);
  }
};

Object.isEmpty = function () {
  return this.length === 0;
};

Object.replaceKeyFrom = function (anotherObj) {
  return Object.entries(this).reduce((op, [key, value]) => {
    const newKey = anotherObj[key];
    op[newKey || key] = value;
    return op;
  }, {});
  /*if (typeof anotherObj == 'object') {
    for (const key in anotherObj) {
      if (Object.prototype.hasOwnProperty.call(anotherObj, key)) {
        const element = anotherObj[key];
        def[key] = element;
      }
    }
  }*/
};

Object.prototype.merge = function (this: Record<any, unknown>, ...others) {
  const hasReadOnlyProp = Object.keys(this).some((property) => {
    return isObjectWritable(this, property);
  });
  if (!hasReadOnlyProp) return mergeDeep(this, ...others);
  return Object.assign({ ...this }, ...others);
};

/**
 * is Object Writable?
 * @param obj
 * @param key
 * @returns
 */
function isObjectWritable<T extends Record<any, unknown>>(obj: T, key: keyof T) {
  const desc = Object.getOwnPropertyDescriptor(obj, key) || {};
  return Boolean(desc.writable);
}
__global.isObjectWritable = isObjectWritable;

/**
 * Join object to separated string
 * * [].join() equivalent
 * @param obj Object
 * @param separator default comma(,)
 * @returns Joined string
 */
function object_join(obj: Record<any, unknown>, separator = ',') {
  return Object.keys(obj)
    .map(function (k) {
      return obj[k];
    })
    .join(separator);
}
__global.object_join = object_join;

/**
 * Simple object check.
 * @param item
 * @returns
 * @example
 * ```js
 * console.log(isObject({a:'a'})); // true
 * console.log(isObject(['a','b'])); // false
 * ```
 */
function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}
__global.isObject = isObject;

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 * @see {@link https://bit.ly/3v1vlXu}
 */
function mergeDeep(target: Record<any, any>, ...sources: Record<any, any>[]) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], <any>source[key]);
      } else {
        // @fixme writable property
        Object.assign(target, { [key]: source[key] });
        // @fixme readonly property
        //target = { ...target, [key]: source[key] };
      }
    }
  }

  return mergeDeep(target, ...sources);
}
__global.mergeDeep = mergeDeep;
