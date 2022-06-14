import 'js-prototypes';

console.log(`
/////
// Object
/////
`);

console.log('deepAssign', typeof deepAssign);
const a = { a: 1, b: { d: 4 } };
const b = { b: { c: 3 } };
const c = { a: { b: 2 } };
console.log('a', a);
console.log('b', b);
console.log('c', c);
console.log('merge a = b', deepAssign(a, b));
console.log('merge a ≠ c', deepAssign(a, c));
