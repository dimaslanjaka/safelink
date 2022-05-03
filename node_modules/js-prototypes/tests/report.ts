import 'js-prototypes';
import { join, resolve } from 'upath';
const root = resolve(join(__dirname, '..'));
const srcdoc = resolve(join(root, 'srcdocs'));
console.log(srcdoc);
