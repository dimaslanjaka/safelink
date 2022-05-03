declare const __global: any;
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
/**
 * is Object Writable?
 * @param obj
 * @param key
 * @returns
 */
declare function isObjectWritable<T extends Record<any, unknown>>(obj: T, key: keyof T): boolean;
/**
 * Join object to separated string
 * * [].join() equivalent
 * @param obj Object
 * @param separator default comma(,)
 * @returns Joined string
 */
declare function object_join(obj: Record<any, unknown>, separator?: string): string;
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
declare function isObject(item: any): boolean;
/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 * @see {@link https://bit.ly/3v1vlXu}
 */
declare function mergeDeep(target: Record<any, any>, ...sources: Record<any, any>[]): any;
