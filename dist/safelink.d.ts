/// <reference types="node" />
import { Nullable, SafelinkOptions } from './';
import { default as _parseQuery } from './parseQuery';
export type DOMElement = globalThis.Element;
export type HTMLElement = globalThis.HTMLElement;
export default class safelink {
    options: Required<SafelinkOptions>;
    constructor(opt: Partial<SafelinkOptions>);
    parseQuery: typeof _parseQuery;
    /**
     * is url excluded
     * @param url
     * @returns
     */
    isExcluded(url: string | URL): boolean;
    /**
     * parse html string or element to anonymize urls
     * @param target
     * @returns
     */
    parse(target: Nullable<string> | HTMLElement | Buffer | import('fs').ReadStream): Promise<string | null>;
    /**
     * parse single url
     * @param url
     * @returns return redirect url or original url
     * * when redirect not set, will return encoded URL only
     */
    parseUrl(url: string): string | null;
    /**
     * anonymize url directly
     * @param href
     */
    encodeURL(href: string): string;
    /**
     * Resolve query url to decrypt anonymized urls (page redirector)
     * @param search
     * @returns
     */
    resolveQueryUrl(search?: string): Partial<import("./").resolveQueryResult>;
}
