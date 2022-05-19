import safelinkify from '.';

console.clear();
const options = {
  // exclude patterns (dont anonymize these patterns)
  exclude: [
    'domain.com',
    /another.domain.com/,
    /https?:\/\/?(?:([^*]+)\.)?webmanajemen\.com/,
    /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/
  ],
  // url redirector
  redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
  // debug
  verbose: false,
  // encryption type = 'base64' | 'aes'
  type: 'base64',
  // password aes, default = root
  password: 'unique-password'
};

const sf = new safelinkify.safelink(options);
const processedExternalLinks = sf.parse(`
<a href="www.example.com/page.php?id=xxxx&name=yyyy" ....></a>
<a href="http://www.example.com/page.php?id=xxxx&name=yyyy" ....></a>
<a href="https://www.example.com/page.php?id=xxxx&name=yyyy" ....></a>
<a href="www.example.com/page.php/404" ....></a>
<a href="http://external.domain.com>external</a>
`);
console.log(processedExternalLinks);
