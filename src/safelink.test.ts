import Bluebird from 'bluebird';
import safelink from './safelink';

const sf = new safelink({
  exclude: ['webmanajemen.com']
});

const _parse_html = sf.parse(
  `
<a href="http://google.com">google.com</a>
<a href="http://webmanajemen.com">webmanajemen.com</a>
<a id="idx" href="http://webmanajemen.com">webmanajemen.com</a>
<a id="idx" class="" data-x="" href="http://webmanajemen.com">webmanajemen.com</a>
<a id=idx href=http://webmanajemen.com>webmanajemen.com</a>
<a id="idx" href="http://webmanajemen.com?sdsjdjsd#sasdhdshsfjfdj">webmanajemen.com</a>
`
);

const _parse_url = sf.parseUrl('https://google.com');

log(_parse_url, _parse_html);

function log(...args: any[]) {
  args.forEach((obj) => {
    if (obj.then) {
      Bluebird.resolve(obj).then(console.log);
    } else {
      console.log(obj);
    }
  });
}
