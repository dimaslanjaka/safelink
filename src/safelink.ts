import { writeFileSync } from 'fs';
import { EOL } from 'os';
import { join } from 'path';
import encryptionURL from './encryptionURL';
import { Nullable } from './resolveQueryUrl';
import toURL from './toURL';

const _global_safelink = (typeof window !== 'undefined' ? window : global) as any;
interface Options {
  exclude: string[] | RegExp[];
  redirect?: string[];
  password: string;
  verbose?: boolean;
  type: 'base64' | 'aes';
}

export default class safelink {
  options: Partial<Options> = {
    exclude: [],
    redirect: ['https://www.webmanajemen.com/page/safelink.html?url='],
    password: 'root',
    verbose: false,
    type: 'base64',
  };
  constructor(opt: Partial<Options>) {
    if (typeof opt.redirect == 'string') opt.redirect = [opt.redirect];
    this.options = Object.assign(this.options, opt);
  }
  private isExcluded(url: string | URL) {
    const excludes = this.options.exclude;
    const value = String(url);
    const parsed = url instanceof URL ? url : toURL(value);
    for (let i = 0; i < excludes.length; i++) {
      const pattern = excludes[i];
      if (typeof pattern == 'string') {
        if (value.match(/^https?:\/\//)) {
          // only validate full url
          if (parsed.host.includes(pattern)) return true;
        }
      } else if (pattern instanceof RegExp) {
        if (value.match(pattern)) return true;
      }
    }
    return false;
  }
  parse(str: Nullable<string> | HTMLElement): Promise<string> {
    const self = this;
    return new Promise((resolve) => {
      const content = str;
      let result: string;
      if (typeof content == 'string') {
        const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gim;
        let dump = false;
        Array.from(content.matchAll(regex)).forEach((m) => {
          const href = m[2];
          const excluded = self.isExcluded(href);

          if (!excluded) {
            const encryption = encryptionURL(href, self.options.password, self.options.verbose);
            const enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
            const randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];
            const newhref = randRedir + enc;
            result = content.replace(href, newhref);
            if (href.includes('diet')) {
              dump = true;
              writeFileSync(
                join(__dirname, 'tmp/diet.html'),
                JSON.stringify({ excluded, href, newhref }) + EOL.repeat(2) + result
              );
            }
          }
        });
        if (dump) writeFileSync(join(__dirname, 'tmp/replace.html'), result);
        return resolve(result);
      } else if (content instanceof HTMLElement) {
        const tagname = content.tagName.toLowerCase();
        if (tagname != 'a') {
          const links = Array.from(content.querySelectorAll('a'));
          for (let i = 0; i < links.length; i++) {
            const a = links[i];
            if (!a.href) continue;
            const href = toURL(a.href);
            if (!href) {
              console.log(a.href, null);
              continue;
            }
            const encryption = encryptionURL(href, self.options.password, self.options.verbose);
            const excluded = self.isExcluded(href);
            if (self.options.verbose) {
              console.log(
                Object.assign(encryption, {
                  url: href.href,
                  isExcluded: excluded,
                })
              );
            }
            if (!excluded) {
              const enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
              const randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];
              a.href = randRedir + enc;
              a.target = '_blank';
              a.rel = 'nofollow noopener noreferer';
            }
          }
          result = content.outerHTML;
        }
      }
      return resolve(result);
    });
  }
}
_global_safelink.safelink = safelink;
