# Safelinkify

[![Safelink](https://github.com/dimaslanjaka/safelink/actions/workflows/safelink.yml/badge.svg)](https://github.com/dimaslanjaka/safelink/actions/workflows/safelink.yml) [![GitHub forks](https://img.shields.io/github/forks/dimaslanjaka/safelink?style=flat-square)](https://github.com/dimaslanjaka/safelink/network) [![GitHub stars](https://img.shields.io/github/stars/dimaslanjaka/safelink?style=flat-square)](https://github.com/dimaslanjaka/safelink/stargazers) ![www.webmanajemen.com](https://img.shields.io/website?down_color=red&down_message=down&label=www.webmanajemen.com&logo=www.webmanajemen.com&style=flat-square&up_color=green&up_message=up&url=https%3A%2F%2Fwww.webmanajemen.com) ![LICENSE](https://img.shields.io/npm/l/safelinkify?style=flat-square)

Customized safelink url redirector. Transform all hyperlinks to outbound pages. Useful for SEO external links and ADS. [FULL DOCUMENTATION](https://www.webmanajemen.com/safelink/index.html)

## Installation

```bash
npm install --production
# or
yarn install --production=true
```

## Development

```bash
yarn install
# or
npm install
```

| command      | description                       |
| ------------ | --------------------------------- |
| `yarn start` | watch tests and start server      |
| ^ | watch src and compile tsc webpack |
| `tsc`        | build definition files            |
| `webpack`    | build safelink script             |

## Usages
Setup options:
```js
const options = {
  // example patterns
  exclude: ['domain.com', /another.domain.com/, /https?:\/\/?(?:([^*]+)\.)?webmanajemen\.com/],
  // url redirector
  redirect: 'http://domain.com/page/redirect.html?url=',
  // debug
  verbose: false,
  // encryption type = 'base64' | 'aes'
  type: 'base64',
  // password aes
  password: 'root'
}
```
### Browser
script location : `node_modules/safelinkify/dist/bundle.min.js`.

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
</script>
```
### NodeJS
```ts
import safelinkify from 'safelinkify';
const sf = new safelinkify.safelink(options);
const processedExternalLinks = sf.parse('<a href="http://external.domain.com>external</a>');
```