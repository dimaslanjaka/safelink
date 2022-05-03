import { Nullable } from './resolveQueryUrl';
interface Options {
    exclude: string[] | RegExp[];
    redirect?: string[];
    password: string;
    verbose?: boolean;
    type: string | 'base64' | 'aes';
}
export default class safelink {
    options: Partial<Options>;
    constructor(opt: Partial<Options>);
    private isExcluded;
    /**
     * parse html string or element to anonymize urls
     * @param str
     * @returns
     */
    parse(str: Nullable<string> | HTMLElement): string;
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
