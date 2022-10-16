/// <reference types="node" />
/// <reference types="node" />
import { Nullable } from './resolveQueryUrl';
interface Options {
    exclude: string[] | RegExp[] | (string | RegExp)[];
    redirect?: string[] | string;
    password: string;
    verbose?: boolean;
    type: string | 'base64' | 'aes';
}
export declare type SafelinkOptions = Options;
export default class safelink {
    options: Partial<Options>;
    constructor(opt: Partial<Options>);
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
    parse(target: Nullable<string> | HTMLElement | Buffer | NodeJS.ReadWriteStream): Promise<Nullable<string>>;
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
    resolveQueryUrl(search?: string): Partial<import("./resolveQueryUrl").resolveQueryResult>;
}
export {};
