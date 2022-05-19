import encryptionURL from './encryptionURL';
import { parseQuery } from './parseQuery';
import toURL from './toURL';
var _global_resolveQueryUrl = (typeof window !== 'undefined' ? window : global);
/**
 * Auto resolve url
 * * parse base64, aes
 * @param url url string or instance, null = {@link window.location.search}
 * @param passphrase aes password
 * @returns
 */
export default function resolveQueryUrl(url, passphrase, debug) {
    if (passphrase === void 0) { passphrase = 'root'; }
    if (debug === void 0) { debug = false; }
    var result = {};
    var href = null;
    if (url instanceof URL) {
        href = url.href;
    }
    else if (typeof url == 'string') {
        if (url.match(/^(#|\?)/)) {
            href = 'http://not.actually.domain/' + url;
        }
        else {
            var parse = toURL(url);
            if (parse !== null)
                href = parse.href;
        }
    }
    else if (typeof location == 'object' && typeof location.href == 'string') {
        href = location.href;
    }
    if (!href || !href.match(/#|\?/))
        return null;
    var parse_query_url = parseQuery(null, href);
    if (typeof parse_query_url == 'object') {
        Object.keys(parse_query_url).forEach(function (key) {
            var value = parse_query_url[key];
            result[key] = encryptionURL(value, passphrase, debug);
        });
    }
    return result;
}
_global_resolveQueryUrl.resolveQueryUrl = resolveQueryUrl;
