import { Nullable } from './globals';
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
/**
 * resolve url encryption
 * @param url
 * @param passphrase
 * @returns
 */
export default function encryptionURL(url: Nullable<string | URL>, passphrase?: string, debug?: boolean): encryptionURLResult;
