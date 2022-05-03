import 'js-prototypes';

console.log(`
/////
// String
/////
`);

console.log(typeof strMatch == 'function');

const parse_url =
  'https://www.typescriptlang.org/play?noImplicitAny=false&strictNullChecks=false&noImplicitThis=false&noImplicitReturns=false&importHelpers=true&target=99&jsx=0&module=1&allowUmdGlobalAccess=true&allowSyntheticDefaultImports=true&pretty=false&noLib=true#code/PQKhFgCgAIWhlAlgWwA4BsCm0D2AjAK0wGMAXaYgCxIGsA6KWaAAVQEMAnN5aRUzZIzjMOmUgFcOAOwDO0AN54cOLGykBfIcCgAzcVLKIcU3jIDyhEqQAUfAQEoFjaKInTot-jwBk36KQBPVEwcHV4vaABeaOgAcnwiMljoX2gAQgBBDi4AukQZLJzPB3sAbihNSChQCBg4ABFMTFRoZEwOAHNsUgB3HFxLMhkGOpZ2Lh5STi7SITHObmg6ZZkcSWJMGS1dfUNjVvauxubrKc6xAC4AJRIcDgATAB41AIAaaH0aKRweqQA+d7LOirdaba63B7PKRvD5SL4-f4AbQAuo55M5EGFrGkQRwNsMsFIOqRKI5XJITGcZuUYBRjDJyLiNlFoEzNsDKJibGUoBisfkLIkbFSxI5UgLBjY2fY0c5oNAdHcPMR6eQaJgArwTNKnLT5fLMR4JULrGzEeqAqjZXr9QasWkRaRzRrUdBBVY6GwZDJEB0pKdpmJ3vJoM7LRcFOpoOoeTbbW1zsdUNYoQE-o6w8j3qm-maLaiabb5VHMOgZNh0XH9e6yJ7vb7-Y7g6H8xG8y7o7Gi9G5T3aZVnOT3Amjk1k02lis1njNrGB5AVbIVJg6MRVBxrLHFwzoGwWZX5WwIwf9UfoABWV69+4R8-OSqVbfkPD75x4CMAJneZ5Ph4jAGYrxtUgLgABnvCooG3Zc6HQHAOmsEdMCTaw2HePAZRpIA'.parse_url();

console.log('is parse_url work?');
console.log({
  isArray: Array.isArray(parse_url.searchObject),
  isObject: typeof parse_url.searchObject == 'object',
  members: parse_url.searchObject,
});
