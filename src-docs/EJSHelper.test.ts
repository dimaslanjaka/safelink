import { inspect } from 'util';
import EJSHelper from './EJSHelper';

const obj = new EJSHelper({
  root: __dirname
}).toObject();
console.log(inspect(obj, true, 2, true));
