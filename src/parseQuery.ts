import { Nullable } from './';
import toURL from './toURL';

const _global_parseQuery = (typeof window !== 'undefined' ? window : global) as any;

type parseQueryResult =
  | {
      [key: string]: any;
    }
  | string;
/**
 * Parse Query URL and Hash
 * @param  query query key, null = return all objects
 * @param  url target query, ex: {@link location.href} or {@link location.search}
 */
export function parseQuery(query: Nullable<string>, url: Nullable<string>): Nullable<parseQueryResult> {
  // skip null, undefined
  if (typeof url !== 'string') return null;
  // skip empty string
  if (url.length < 1) return null;
  let result: { [key: string]: any } = {};

  /**
   * Query URL Parser
   * @param str
   * @returns
   */
  const parseQueries = (str: string) => {
    const urlParams = new URLSearchParams(str);
    return Object.fromEntries(urlParams);
  };

  if (url.match(/^(#|\?)/)) {
    url = 'http://not.actually.domain/' + url;
  }

  const parse = toURL(url);
  if (parse) {
    // First parse search, then hash (hash overrides search)
    if (parse.search) {
      result = Object.assign(result, parseQueries(parse.search));
    }
    if (parse.hash) {
      result = Object.assign(result, parseQueries(parse.hash.substring(1)));
    }
  }

  if (typeof query == 'string') {
    return Object.prototype.hasOwnProperty.call(result, query) ? result[query] : undefined;
  }

  return result;
}
_global_parseQuery.parseQuery = parseQuery;
export default parseQuery;
