import 'js-prototypes';

console.log(`
/////
// Array
/////
`);

console.log('is array function available on global scope?');
console.log('global.array_filter', typeof global.array_filter);
console.log('array_split_chunks', typeof array_split_chunks);
console.log('array_filter', typeof array_filter);
console.log('.each', typeof [].each);

console.log('is addAll work?');
const a = [0, 1];
const b = ['a', 'b'];
console.log(b.addAll(a)); // ['a','b',0,1]
