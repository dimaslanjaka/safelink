import Bluebird from 'bluebird';
import { safelink } from '../src';

const sf = new safelink({
  exclude: [
    'webmanajemen.com',
    'git.webmanajemen.com',
    '**/chimeraland/recipes.html',
    '**/embed.html',
    '**/tools.html',
    '**/safelink.html',
    '**/node_modules/**',
    '**/vendor/**'
  ],
  redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
  type: 'base64',
  password: 'unique-password'
});

Bluebird.all(['?search=term', 'http://subdomain.webmanajemen.com', 'http://webmanajemen.com', 'http://google.com'])
  .map((str) => sf.parseUrl(str))
  .then(console.log);
