import { encryptionURLResult, Nullable } from './';
/**
 * resolve url encryption
 * @param url
 * @param passphrase
 * @returns
 */
export default function encryptionURL(url: Nullable<string | URL>, passphrase?: string, debug?: boolean): encryptionURLResult;
