# Safelinkify

[![Safelink](https://github.com/dimaslanjaka/safelink/actions/workflows/safelink.yml/badge.svg)](https://github.com/dimaslanjaka/safelink/actions/workflows/safelink.yml) [![GitHub forks](https://img.shields.io/github/forks/dimaslanjaka/safelink?style=flat-square)](https://github.com/dimaslanjaka/safelink/network) [![GitHub stars](https://img.shields.io/github/stars/dimaslanjaka/safelink?style=flat-square)](https://github.com/dimaslanjaka/safelink/stargazers)

transform all hyperlinks to outbound pages. Useful for SEO.

customized safelink url redirector.

useful for seo external links and ads.

## Installation
```bash
npm install --production
# or
yarn install --production=true
```

## Build
### dev

`nodemon`: watch src and compile tsc webpack

`yarn start`: watch tests and start server

### prod
```bash
tsc
webpack
```
## Usages
script location : `node_modules/safelinkify/dist/bundle.min.js`.

read more [http://dimaslanjaka.github.io/safelink](http://dimaslanjaka.github.io/safelink)
```html
<script src="dist/bundle.min.js"></script>
<script>
  const sf = new safelink({
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
  });
  // automated safelinkify all hyperlinks in body
  sf.parse(document.querySelector('body'));
</script>
```
