# Safelinkify

![npm version](https://img.shields.io/npm/v/safelinkify?label=safelinkify&style=flat)
![www.webmanajemen.com](https://img.shields.io/website?down_color=red&down_message=down&label=www.webmanajemen.com&logo=www.webmanajemen.com&style=flat&up_color=green&up_message=up&url=https%3A%2F%2Fwww.webmanajemen.com)
![LICENSE](https://img.shields.io/npm/l/safelinkify)
![GitHub language count](https://img.shields.io/github/languages/count/dimaslanjaka/safelink)
[![Github Workflow](https://github.com/dimaslanjaka/safelink/actions/workflows/safelink.yml/badge.svg)](https://github.com/dimaslanjaka/safelink/actions/workflows/safelink.yml)
[![GitHub forks](https://img.shields.io/github/forks/dimaslanjaka/safelink)](https://github.com/dimaslanjaka/safelink/network)
[![GitHub stars](https://img.shields.io/github/stars/dimaslanjaka/safelink)](https://github.com/dimaslanjaka/safelink/stargazers)

Customized safelink url redirector. Transform and Anonymize all hyperlinks to outbound pages. Useful for SEO external links and ADS. [FULL DOCUMENTATION](https://www.webmanajemen.com/safelink/index.html)

## Installation
npm [https://www.npmjs.com/package/safelinkify](https://www.npmjs.com/package/safelinkify)
```bash
npm install safelinkify --production
# or
yarn install safelinkify --production=true
```

## Development
```bash
git clone --single-branch --branch main https://github.com/dimaslanjaka/safelink foldername
cd foldername
# install dependents
yarn install
# or
npm install
```

| command      | description                       |
| ------------ | --------------------------------- |
| `yarn start` | watch tests and start server      |
|  | watch src and compile tsc webpack |
| `tsc`        | build definition and js files            |
| `webpack`    | build safelink script             |

## Usages
Setup options:
```js
const options = {
  // exclude patterns (dont anonymize these patterns)
  exclude: ['domain.com', /another.domain.com/, /https?:\/\/?(?:([^*]+)\.)?webmanajemen\.com/, /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/],
  // url redirector
  redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
  // debug
  verbose: false,
  // encryption type = 'base64' | 'aes'
  type: 'base64',
  // password aes, default = root
  password: 'unique-password'
}
```
### Browser
script location: `node_modules/safelinkify/dist/bundle.min.js`.

Call Core Script:
```html
<script src="dist/bundle.min.js"></script>
<!--or using rawgit-->
<script src="https://raw.githack.com/dimaslanjaka/safelink/main/dist/bundle.min.js"></script>
<!--or using statically-->
<script src="https://cdn.statically.io/gh/dimaslanjaka/safelink/main/dist/bundle.min.js"></script>
```

Execute functions:
```html
<script>
  const sf = new safelink(options);
  // automated safelinkify all hyperlinks in body
  sf.parse(document.querySelector('body'));
  // in page redirector
  sf.resolveQueryUrl(window.location.href);
</script>
```
### NodeJS
[full sample here](https://github.com/dimaslanjaka/safelink/blob/main/src/index.test.ts)
```ts
import safelinkify from 'safelinkify'; // const safelinkify = require('safelinkify')
const sf = new safelinkify.safelink(options);
const processedExternalLinks = sf.parse(`
<a href="www.example.com/page.php?id=xxxx&name=yyyy" ....></a>
<a href="http://www.example.com/page.php?id=xxxx&name=yyyy" ....></a>
<a href="https://www.example.com/page.php?id=xxxx&name=yyyy" ....></a>
<a href="www.example.com/page.php/404" ....></a>
<a href="http://external.domain.com>external</a>
`);
console.log(processedExternalLinks);
/*
<a href="https://www.webmanajemen.com/page/safelink.html?url=d3d3LmV4YW1wbGUuY29tL3BhZ2UucGhwP2lkPXh4eHgmbmFtZT15eXl5" ....></a>
<a href="https://www.webmanajemen.com/page/safelink.html?url=aHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYWdlLnBocD9pZD14eHh4Jm5hbWU9eXl5eQ==" ....></a>
<a href="https://www.webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vcGFnZS5waHA/aWQ9eHh4eCZuYW1lPXl5eXk=" ....></a>
<a href="https://www.webmanajemen.com/page/safelink.html?url=d3d3LmV4YW1wbGUuY29tL3BhZ2UucGhwLzQwNA==" ....></a>
<a href="http://external.domain.com>external</a>
*/
```
