# Safelinkify

[![Safelink](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/safelink.yml/badge.svg)](https://github.com/dimaslanjaka/dimaslanjaka.github.io/actions/workflows/safelink.yml)

transform all hyperlinks to outbound pages. Useful for SEO.

customized safelink url redirector.

useful for seo external links and ads.

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
read more [http://dimaslanjaka.github.io/safelink](http://dimaslanjaka.github.io/safelink)
```html
<script src="dist/bundle.min.js"></script>
<script>
  const sf = new safelink({
    exclude: ['domain.com', /domain.com/],
    redirect: 'http://domain.com/page/redirect.html?url=',
    verbose: false,
    type: 'base64',
    password: 'root'
  });
  // automated safelinkify all hyperlinks in body
  sf.parse(document.querySelector('body'));
</script>
```
