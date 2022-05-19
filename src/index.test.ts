import sf from '.';

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

const safelink = new sf.safelink(options);
