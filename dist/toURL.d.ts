/**
 * is url valid
 * @param string
 * @returns
 */
export declare function isValidHttpUrl(string: string | URL): boolean;
/**
 * fix url
 * * doubled slashes
 * @param url
 * @returns
 */
export declare function fixUrl(url: string | URL): string;
export declare type Nullable<T> = T | null | undefined;
/**
 * transform url string to {@link Nullable}<{@link URL}>
 * @param url
 * @returns
 */
export default function toURL(url: string): Nullable<URL>;
