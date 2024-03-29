import { Nullable } from './';
type parseQueryResult = {
    [key: string]: any;
} | string;
/**
 * Parse Query URL and Hash
 * @param  query query key, null = return all objects
 * @param  url target query, ex: {@link location.href} or {@link location.search}
 */
export declare function parseQuery(query: Nullable<string>, url: Nullable<string>): Nullable<parseQueryResult>;
export default parseQuery;
