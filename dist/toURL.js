"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * transform url string to {@link Nullable}<{@link URL}>
 * @param url
 * @returns
 */
function toURL(url) {
    try {
        if (url.startsWith('/') || url.startsWith('?')) {
            // url is pathname or query
            return new URL('http://not-actually-domain.com/' + url.replace(/^\/+/, ''));
        }
        else if (url.match(/^https?:\/\//)) {
            // test full url with protocol://
            return new URL(url);
        }
    }
    catch (error) {
        if (error instanceof Error)
            console.log(url, error.message);
        return null;
    }
}
exports.default = toURL;
