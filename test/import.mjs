import safelinkify, { safelink } from '../dist/index.js';

const init = new safelink();
console.log({ safelinkify: Object.keys(safelinkify), init: Object.keys(init) });

console.log(init.encodeURL('https://example.com'));
