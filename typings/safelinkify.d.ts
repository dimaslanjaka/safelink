import * as safelinkify from '../dist';
import safelink from '../src/safelink';
export * from '../dist/globals';
export const { safelink, resolveQueryUrl, parseQuery } = safelinkify.default;
declare global {
  const safelink: safelink;
  declare let Window: {
    prototype: Window;
    new (): Window;
  };
  interface Window {
    safelink: safelink;
    resolveQueryUrl: typeof safelinkify.default.resolveQueryUrl;
    parseQuery: typeof safelinkify.default.parseQuery;
  }
}
