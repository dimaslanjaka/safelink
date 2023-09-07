import { default as _parseQuery } from './parseQuery';
import { default as _resolveQueryUrl } from './resolveQueryUrl';
import { default as _safelink } from './safelink';
/**
 * safelink options
 */
export interface SafelinkOptions {
    exclude: string[] | RegExp[] | (string | RegExp)[];
    redirect?: string[] | string;
    password: string;
    verbose?: boolean;
    type: string | 'base64' | 'aes';
}
export type Nullable<T> = T | null | undefined;
export interface encryptionURLResult {
    aes: {
        encode: Nullable<string>;
        encode_redirector: Nullable<string>;
        decode: Nullable<string>;
        passphrase: string;
    };
    base64: {
        encode_redirector: Nullable<string>;
        encode: Nullable<string>;
        decode: Nullable<string>;
    };
    value: Nullable<string>;
}
export interface resolveQueryResult {
    [key: string]: encryptionURLResult;
}
declare const vars: {
    safelink: typeof _safelink;
    parseQuery: typeof _parseQuery;
    resolveQueryUrl: typeof _resolveQueryUrl;
};
export declare const resolveQueryUrl: typeof _resolveQueryUrl;
export declare const parseQuery: typeof _parseQuery;
export declare const safelink: typeof _safelink;
export default vars;
declare global {
    interface Window {
        safelink: typeof vars.safelink;
        parseQuery: (typeof vars)['parseQuery'];
        resolveQueryUrl: (typeof vars)['resolveQueryUrl'];
    }
}
