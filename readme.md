# Safelinkify

![npm version](https://img.shields.io/npm/v/safelinkify?label=safelinkify&style=flat)
![www.webmanajemen.com](https://img.shields.io/website?down_color=red&down_message=down&label=www.webmanajemen.com&logo=www.webmanajemen.com&style=flat&up_color=green&up_message=up&url=https%3A%2F%2Fwww.webmanajemen.com)
![LICENSE](https://img.shields.io/npm/l/safelinkify)
![GitHub language count](https://img.shields.io/github/languages/count/dimaslanjaka/safelink)
![Github Workflow](https://github.com/dimaslanjaka/safelink/actions/workflows/build-release.yml/badge.svg)
![GitHub forks](https://img.shields.io/github/forks/dimaslanjaka/safelink)
![GitHub stars](https://img.shields.io/github/stars/dimaslanjaka/safelink)

Customized safelink url redirector. Transform and Anonymize all hyperlinks to outbound pages. Useful for SEO external links and ADS.

- **[API DOCUMENTATION](https://www.webmanajemen.com/docs/safelinkify)**
- **[LIVE DEMO](https://www.webmanajemen.com/docs/safelinkify/demo)**

## Demo
| page | source | samples |
| :--- | :--- | :--- |
| [/page/safelink.html](https://www.webmanajemen.com/page/safelink.html) | [safelink-decode.js](https://github.com/dimaslanjaka/page/blob/master/safelink/safelink-decode.js) <br />[layout](https://github.com/dimaslanjaka/page/tree/master/safelink/layout1) <br/>[template](https://github.com/dimaslanjaka/page/blob/master/_layout.njk) <br />[compiler](https://github.com/dimaslanjaka/page/blob/1601e212200eaa7e8b4534ae7511b4fb6f179a96/gulpfile.js#L222) | [/page/safelink.html?url=aHR0cHM6Ly...](https://www.webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly9jb2RlcGVuLmlvL2RpbWFzbGFuamFrYS9wZW4veUxiclpWbw==) |

## Installation

### Bundles
| registry | link | commands |
| :--- | :--- | :---
| npm | [https://www.npmjs.com/package/safelinkify](https://www.npmjs.com/package/safelinkify) | `npm i safelinkify -D` |
| github | [https://github.com/dimaslanjaka/safelink](https://github.com/dimaslanjaka/safelink) | `npm i https://github.com/dimaslanjaka/safelink -D` |
| tarball | [https://github.com/dimaslanjaka/safelink/raw/master/release/safelinkify.tgz](https://github.com/dimaslanjaka/safelink/raw/master/release/safelinkify.tgz) | `npm i https://github.com/dimaslanjaka/safelink/raw/master/release/safelinkify.tgz -D` |

### npm
```bash
npm install safelinkify -D
```


#### Using yarn

```bash
yarn add safelinkify --dev
```


## Development

```bash
git clone --single-branch --branch main https://github.com/dimaslanjaka/safelink foldername
cd foldername
yarn install # or npm install
```

| Command        | Description           |
| :------------- | :-------------------- |
| `yarn start`   | Serve generated docs  |
| `yarn dev`     | Watch and build docs  |
| `yarn run docs`  | Build docs           |
| `yarn run build` | Build dist           |

## Usage

### Options

```js
const options = {
  // Exclude patterns (do not anonymize these patterns)
  exclude: [
    'domain.com',
    /another.domain.com/,
    /https?:\/\/?([^*]+)\.)?webmanajemen\.com/,
    /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/
  ],
  // URL redirector
  redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
  // Debug
  verbose: false,
  // Encryption type: 'base64' | 'aes'
  type: 'base64',
  // Password for AES (default: 'root')
  password: 'unique-password'
};
```

### Browser

Script location: `node_modules/safelinkify/dist/bundle.min.js`

Include the script:

```html
<script src="dist/bundle.min.js"></script>
<!-- or use CDN -->
<script src="https://raw.githack.com/dimaslanjaka/safelink/main/dist/bundle.min.js"></script>
<script src="https://cdn.statically.io/gh/dimaslanjaka/safelink/main/dist/bundle.min.js"></script>
```

Usage example:

```html
<script>
  const sf = new safelink(options);
  // Automatically safelinkify all hyperlinks in body
  sf.parse(document.querySelector('body')).then((result) => {
    console.log(result);
    // In-page redirector
    sf.resolveQueryUrl(window.location.href);
  });
</script>
```

### Node.js

#### Modern framework (vite,webpack,etc)

```js
import * as safelink from 'safelinkify/browser_module';

const sf = new safelinkify.safelink(options);
const processedExternalLinks = sf.parse(`
<a href="www.example.com/page.php?id=xxxx&name=yyyy">external</a>
<a href="http://www.example.com/page.php?id=xxxx&name=yyyy">external</a>
<a href="https://www.example.com/page.php?id=xxxx&name=yyyy">external</a>
<a href="www.example.com/page.php/404"></a>
<a href="http://external.domain.com">internal</a>
<a href="http://www.webmanajemen.com">internal</a>
<a href="http://webmanajemen.com">internal</a>
<a href="#http://webmanajemen.com">#internal</a>
<a href="?http://webmanajemen.com">?internal</a>
<a href="">internal</a>
`);
processedExternalLinks.then(console.log);
```

#### Reference Examples
- [Full sample](https://github.com/dimaslanjaka/safelink/blob/main/src/index.test.ts)
- [Gulp usage](https://github.com/dimaslanjaka/page/blob/62994d60100b4648283e1847ad026947e184b86f/gulpfile.js#L55-L89)

#### Import

```js
const { safelink } = require('safelinkify');
// or
const { default: safelink } = require('safelinkify/dist/safelink');
```

#### Usage Example

```ts
import safelinkify from 'safelinkify';
// const safelinkify = require('safelinkify');
const sf = new safelinkify.safelink(options);
const processedExternalLinks = sf.parse(`
<a href="www.example.com/page.php?id=xxxx&name=yyyy">external</a>
<a href="http://www.example.com/page.php?id=xxxx&name=yyyy">external</a>
<a href="https://www.example.com/page.php?id=xxxx&name=yyyy">external</a>
<a href="www.example.com/page.php/404"></a>
<a href="http://external.domain.com">internal</a>
<a href="http://www.webmanajemen.com">internal</a>
<a href="http://webmanajemen.com">internal</a>
<a href="#http://webmanajemen.com">#internal</a>
<a href="?http://webmanajemen.com">?internal</a>
<a href="">internal</a>
`);
processedExternalLinks.then(console.log);
```

**Result:**

```html
<a href="www.example.com/page.php?id=xxxx&name=yyyy">external</a>
<a href="https://www.webmanajemen.com/page/safelink.html?url=aHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYWdlLnBocD9pZD14eHh4Jm5hbWU9eXl5eQ==">external</a>
<a href="https://www.webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vcGFnZS5waHA/aWQ9eHh4eCZuYW1lPXl5eXk=">external</a>
<a href="www.example.com/page.php/404"></a>
<a href="http://external.domain.com">internal</a>
<a href="http://www.webmanajemen.com">internal</a>
<a href="http://webmanajemen.com">internal</a>
<a href="#http://webmanajemen.com">#internal</a>
<a href="?http://webmanajemen.com">?internal</a>
<a href="">internal</a>
```

#### Using Gulp

Reference: [Gulp safelink task](https://github.com/dimaslanjaka/page/blob/a2f16cb5470992ac149204fdca621d1bcac1107c/gulpfile.js#L325)

```ts
import gulp from 'gulp';
import sf from 'safelinkify';
import { toUnix, join } from 'upath';
import through2 from 'through2';

const destDir = join(__dirname, 'build');

gulp.task('safelink', () => {
  const safelink = new sf.safelink({
    exclude: [
      /https?:\/\/?([^*]+)\.)?webmanajemen\.com/,
      /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/
    ],
    redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
    verbose: false,
    type: 'base64',
    password: 'unique-password'
  });
  return gulp
    .src(['**/*.html'], {
      cwd: destDir,
      ignore: [
        '**/tmp/**',
        '**/node_modules/**',
        '**/monsters/**/*',
        '**/attendants/**/*',
        '**/materials/**/*',
        '**/scenic-spots/**/*',
        '**/static/**/*'
      ]
    })
    .pipe(
      through2.obj(async (file, _enc, next) => {
        if (file.isNull()) return next();
        const content = String(file.contents);
        const parsed = await safelink.parse(content);
        if (parsed) {
          file.contents = Buffer.from(parsed);
          next(null, file);
        } else {
          console.log('cannot parse', toUnix(file.path).replace(toUnix(process.cwd()), ''));
          next();
        }
      })
    )
    .pipe(gulp.dest(destDir));
});
```
```
