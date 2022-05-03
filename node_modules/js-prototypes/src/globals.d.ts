/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="jquery" />
/// <reference lib="dom" />

/**
 * Custom global
 */
interface CustomNodeJsGlobal extends NodeJS.Global {
  [key: string]: any;
}
// Tell Typescript to use this type on the globally scoped `global` variable.
declare const global: CustomNodeJsGlobal;

/**
 * Creates a new function.
 */
interface Function {
  /**
   * Run function once
   * @example
   * (()=> console.log).once('hello'); // run console.log('hello') once
   */
  once: (param?: anyOf) => any;
  /**
   * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
   * @param thisArg The object to be used as the this object.
   * @param argArray A set of arguments to be passed to the function.
   */
  apply(this: Function, thisArg: any, argArray?: any): any;

  /**
   * Calls a method of an object, substituting another object for the current object.
   * @param thisArg The object to be used as the current object.
   * @param argArray A list of arguments to be passed to the method.
   */
  call(this: Function, thisArg: any, ...argArray: any[]): any;

  /**
   * For a given function, creates a bound function that has the same body as the original function.
   * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
   * @param thisArg An object to which the this keyword can refer inside the new function.
   * @param argArray A list of arguments to be passed to the new function.
   */
  bind(this: Function, thisArg: any, ...argArray: any[]): any;

  /** Returns a string representation of a function. */
  toString(): string;

  prototype: any;
  readonly length: number;

  // Non-standard extensions
  arguments: any;
  caller: Function;
}

//declare const $: JQuery;

type jQuery = JQuery;

interface XMLHttpRequest extends XMLHttpRequestEventTarget {
  responseJSON: Array<any> | Record<string, unknown> | null;
}

interface EventTarget {
  matches(pattern: string): boolean;
}

/**
 * HTML element
 */
interface HTMLScriptElement extends HTMLElement {
  async: boolean;

  onreadystatechange(): void;
}

interface HTMLElement
  extends Element,
    DocumentAndElementEventHandlers,
    ElementCSSInlineStyle,
    ElementContentEditable,
    GlobalEventHandlers,
    HTMLOrSVGElement {
  mozMatchesSelector: (selectors: string) => boolean;
  msMatchesSelector: (selectors: string) => boolean;

  [attachEvent: string]: any;
}

/**
 * Create element options
 */
interface createElementOpt {
  childs: any[];
  /**
   * Tag name to be created
   */
  tagName: string;
  /**
   * Add classname
   */
  className: string;
  /**
   * Some attributes ?
   */
  attributes: { attributes: { [str: string]: any } };
  /**
   * InnerText ?
   */
  text: string;
  /**
   * InnerHTML ?
   */
  html: string;
  /**
   * Some options
   */
  options: { attributes: any[]; childs: [] };
}

/**
 * Create element helper
 * * if you use without tagName you will get a document fragment
 * @example
 * document.body.appendChild(createElement({
  tagName: "div",
  className: "my-class",
  text: "Blah blah",
  attributes: {
    "id": "element id",
    "data-truc": "value"
  },
  childs: [{ `recursif call` }]
}))
 */
declare function createElement(params: createElementOpt);

/**
 * String start
 */

/**
 * Window Start
 */
// Add IE-specific interfaces to Window
interface Window {
  HTMLElement: HTMLElement;
  //user: user;
  /**
   * Opera navigator
   */
  readonly opera: string;
  dataLayer: [];
  mozRTCPeerConnection: any;

  attachEvent(event: string, listener: EventListener): boolean;

  detachEvent(event: string, listener: EventListener): void;

  [func: string]: any;

  gtag(message?: any, ...optionalParams: any[]): void;
}

interface Document
  extends Node,
    DocumentAndElementEventHandlers,
    DocumentOrShadowRoot,
    GlobalEventHandlers,
    NonElementParentNode,
    ParentNode,
    XPathEvaluatorBase {
  /**
   * window.addEventListener
   *
   * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback
   * that will be invoked when the event is dispatched.
   *
   * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the
   * method behaves exactly as if the value was specified as options's capture.
   */
  attachEvent: any;

  /**
   * @see {@link Document.addEventListener}
   */
  listen<K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  listen(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeListener<K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}
