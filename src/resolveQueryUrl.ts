import encryptionURL from './encryptionURL';
import { parseQuery } from './parseQuery';
import toURL from './toURL';

export type Nullable<T> = T | null;
interface resolveQueryResult {
  [key: string]: any;
}

const _global_resolveQueryUrl = (typeof window !== 'undefined' ? window : global) as any;

/**
 * Auto resolve url
 * * parse base64, aes
 * @param url url string or instance, null = {@link window.location.search}
 * @param passphrase aes password
 * @returns
 */
export default function resolveQueryUrl(
  url?: string | URL,
  passphrase = 'root',
  debug = false
): Nullable<resolveQueryResult> {
  const result: resolveQueryResult = {};
  let search: Nullable<string> = null;
  if (url instanceof URL) {
    search = url.search;
  } else if (typeof url == 'string') {
    const parse = toURL(url);
    if (parse != null) search = parse.search;
  } else if (typeof location == 'object' && typeof location.search == 'string') {
    search = location.search;
  }

  if (!search) return null;

  const parse_query_url = parseQuery(null, search);
  if (typeof parse_query_url == 'object') {
    Object.keys(parse_query_url).forEach((key) => {
      const value = parse_query_url[key];
      result[key] = encryptionURL(value, passphrase, debug);
    });
  }
  return result;
}
_global_resolveQueryUrl.resolveQueryUrl = resolveQueryUrl;
