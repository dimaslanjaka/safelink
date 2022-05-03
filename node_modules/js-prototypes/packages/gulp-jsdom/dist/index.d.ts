/// <reference types="node" />
import jsdom from 'jsdom';
/**
 * JSDOM via gulp
 * @param mutator
 * @param options
 * @param serialize dom.serialize()
 * @returns
 */
export default function gulpJSDOM(mutator: Document & any, options?: jsdom.ConstructorOptions, serialize?: boolean): import("stream").Transform;
