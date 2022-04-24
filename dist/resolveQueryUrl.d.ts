export declare type Nullable<T> = T | null;
export interface resolveQueryResult {
    [key: string]: any;
}
/**
 * Auto resolve url
 * * parse base64, aes
 * @param url url string or instance, null = {@link window.location.search}
 * @param passphrase aes password
 * @returns
 */
export default function resolveQueryUrl(url?: string | URL, passphrase?: string, debug?: boolean): Nullable<resolveQueryResult>;
