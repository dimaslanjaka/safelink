import ejs from 'ejs';
import EJSHelper from './EJSHelper';

const obj = new EJSHelper({
  root: __dirname,
}).toObject();
console.log(obj);
