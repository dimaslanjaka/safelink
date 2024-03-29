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

const _global_safelinkify = (typeof window !== 'undefined' ? window : global) as any;
declare let module: any;
const vars = { safelink: _safelink, parseQuery: _parseQuery, resolveQueryUrl: _resolveQueryUrl };
export const resolveQueryUrl = _resolveQueryUrl;
export const parseQuery = _parseQuery;
export const safelink = _safelink;
export default vars;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = vars;
}
_global_safelinkify.safelink = _safelink;
declare global {
  interface Window {
    safelink: typeof vars.safelink;
    parseQuery: (typeof vars)['parseQuery'];
    resolveQueryUrl: (typeof vars)['resolveQueryUrl'];
  }
}
//
