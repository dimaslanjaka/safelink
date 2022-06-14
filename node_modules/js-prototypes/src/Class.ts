/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Get all method from class
 * @param toCheck
 * @returns
 */
const getAllMethods = function (toCheck: { [key: string]: any }) {
  if (!toCheck) return [];
  try {
    const props = [];
    let obj = toCheck;
    do {
      props.push(...Object.getOwnPropertyNames(obj));
    } while ((obj = Object.getPrototypeOf(obj)));
    return props
      .sort()
      .filter((e, i, arr_fname) => {
        const c: ClassDecorator = toCheck[e];
        const fname = arr_fname[i + 1];
        if (e != fname && typeof c == 'function') return true;
      })
      .filter((fname) => {
        return ![
          '__defineGetter__',
          '__defineSetter__',
          '__lookupGetter__',
          '__lookupSetter__',
          'constructor',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'toLocaleString',
          'toString',
          'valueOf',
        ].includes(fname);
      });
  } catch (e) {
    return Object.getOwnPropertyNames(toCheck).filter((prop) => typeof toCheck[prop] === 'function');
  }
};
