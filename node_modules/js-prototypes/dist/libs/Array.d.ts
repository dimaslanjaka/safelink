/// <reference types="globals" />
declare const _global: any;
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
    each: Array<any>['forEach'];
}
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
declare function array_split_chunks<T extends any[]>(sourceArray: T, chunkSize: number): T[];
declare function array_filter(array: []): never[];
/**
 * pick random from array
 * @param {Array<any>} arrays
 * @param {boolean} unique Unique the arrays
 */
declare function array_rand(arrays: any[], unique: any): {
    index: number;
    value: any;
};
/**
 * Array unique
 * @param {Array<any>} arrays
 */
declare function array_unique(arrays: any[]): any[];
/**
 * Unset array
 * @param {Array<any>} arrayName
 * @param {String|number} key
 */
declare function array_unset(arrayName: {
    [x: string]: any;
}, key: any): any[];
/**
 * PHP shuffle array equivalent
 * @param array
 * @example
 * var arr = [2, 11, 37, 42];
 * shuffle(arr);
 * console.log(arr); //return random
 */
declare function shuffle(array: Array<any>): any[];
declare function arrayCompare(a1: Array<any>, a2: Array<any>): boolean;
/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
declare function inArray(needle: any, haystack: Array<any>): boolean;
/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
declare function in_array(needle: any, haystack: Array<any>): boolean;
/**
 * get all keys
 * @param haystack string etc
 */
declare function array_keys(haystack: any): string[];
/**
 * Shuffles array in place.
 * @param a items An array containing the items.
 */
declare function array_shuffle(a: Array<any>): any[];
/**
 * Deep merge two or more objects into the first.
 * (c) 2021 Chris Ferdinandi, MIT License, {@link https://gomakethings.com}
 * @param objects  The objects to merge together
 * @returns Merged values of defaults and options
 */
declare function deepAssign(...objects: Record<any, unknown>[]): Record<any, unknown>;
/**
 * Remove item from array
 * @param arr
 * @param value
 * @returns
 */
declare function removeItem<T>(arr: Array<T>, value: T): Array<T>;
