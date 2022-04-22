import { Nullable } from './resolveQueryUrl';

const _global_parseQuery = (window /* browser */ || global) /* node */ as any;

/**
 * Parse Query URL and Hash
 * @param  query query key, null = return all objects
 * @param  url target query, ex: {@link location.search}
 */
export function parseQuery(query: Nullable<string>, url: Nullable<string>) {
  if (typeof url !== 'string') return;
  var urlParams = new URLSearchParams(url);
  var urlp = Object.fromEntries(urlParams);
  var hash = window.location.hash.substring(1);
  var urlParams = new URLSearchParams(hash);
  var urlh = Object.fromEntries(urlParams);
  var urlO = Object.assign(urlh, urlp);
  if (typeof query == 'string' && urlO.hasOwnProperty(query)) {
    return urlO[query];
  }
  return urlO;
}
_global_parseQuery.parseQuery = parseQuery;
export default parseQuery;
