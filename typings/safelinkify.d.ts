import { default as safelinkify } from '../dist';
declare global {
  interface Window {
    safelink: (typeof safelinkify)['safelink'];
    parseQuery: (typeof safelinkify)['parseQuery'];
    resolveQueryUrl: (typeof safelinkify)['resolveQueryUrl'];
  }
}
export * from '../dist';
