import encryptionURL from './encryptionURL';
import { Nullable } from './resolveQueryUrl';
import toURL from './toURL';

const _global_safelink = (window /* browser */ || global) /* node */ as any;
interface Options {
  exclude: string[] | RegExp[];
  redirect?: string;
  password: string;
  verbose?: boolean;
  type: 'base64' | 'aes';
}
interface ResultParse extends ReturnType<typeof encryptionURL> {
  url: string;
}

export default class safelink {
  options: Partial<Options> = {
    exclude: [],
    redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
    password: 'root',
    verbose: false,
    type: 'base64',
  };
  constructor(opt: Partial<Options>) {
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
  parse(str: Nullable<string> | HTMLElement): Promise<ResultParse[]> {
    return new Promise((resolve) => {
      const content = str;
      const self = this;
      const result: ResultParse[] = [];
      if (typeof content == 'string') {
        const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gm;
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
            result.push(
              Object.assign(encryption, {
                url: href.href,
                isExcluded: excluded,
              })
            );
            if (!excluded) {
              const enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
              a.href = self.options.redirect + enc;
              a.target = '_blank';
              a.rel = 'nofollow noopener noreferer';
            }
          }
        }
      }
      return resolve(result);
    });
  }
}
_global_safelink.safelink = safelink;
