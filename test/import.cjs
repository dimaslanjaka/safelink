const safelinkify = require('../');

const init = new safelinkify.safelink();
console.log({ safelinkify: Object.keys(safelinkify), init: Object.keys(init) });

console.log(init.encodeURL('https://example.com'));
