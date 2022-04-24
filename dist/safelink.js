import encryptionURL from './encryptionURL';
import toURL from './toURL';
var _global_safelink = (typeof window !== 'undefined' ? window : global);
var safelink = /** @class */ (function () {
    function safelink(opt) {
        this.options = {
            exclude: [],
            redirect: ['https://www.webmanajemen.com/page/safelink.html?url='],
            password: 'root',
            verbose: false,
            type: 'base64',
        };
        if (typeof opt.redirect == 'string')
            opt.redirect = [opt.redirect];
        this.options = Object.assign(this.options, opt);
    }
    safelink.prototype.isExcluded = function (url) {
        var excludes = this.options.exclude;
        var value = String(url);
        var parsed = url instanceof URL ? url : toURL(value);
        // only process url with protocol
        if (value.match(/^(?:(ht|f)tp(s?)\:\/\/)?/)) {
            for (var i = 0; i < excludes.length; i++) {
                var pattern = excludes[i];
                if (typeof pattern == 'string') {
                    // only validate full url
                    if (parsed.host.includes(pattern))
                        return true;
                }
                else if (pattern instanceof RegExp) {
                    if (value.match(pattern))
                        return true;
                }
            }
        }
        return false;
    };
    safelink.prototype.parse = function (str) {
        var self = this;
        var content = str;
        var result;
        if (typeof content === 'string') {
            var regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gim;
            var processStr = function (content, href) {
                var excluded = self.isExcluded(href);
                if (!excluded) {
                    var encryption = encryptionURL(href, self.options.password, self.options.verbose);
                    var enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
                    var randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];
                    var newhref = randRedir + enc;
                    return content.replace(href, newhref);
                }
            };
            var matches = Array.from(content.matchAll(regex));
            for (var i = 0; i < matches.length; i++) {
                var m = matches[i];
                var href = m[2];
                if (typeof href == 'string' && href.length > 0) {
                    var wholeContents = typeof result == 'string' ? result : content;
                    var processedContent = processStr(wholeContents, href);
                    if (processedContent)
                        result = processedContent;
                }
            }
            if (typeof result == 'string') {
                /*return result.replace(regex, (wholeContents, m1, m2) => {
                  const processedContent = processStr(wholeContents, m2);
                  if (processedContent) return processedContent;
                  return wholeContents;
                });*/
                return result;
            }
        }
        else if (content instanceof HTMLElement) {
            var tagname = content.tagName.toLowerCase();
            if (tagname != 'a') {
                var links = Array.from(content.querySelectorAll('a'));
                for (var i = 0; i < links.length; i++) {
                    var a = links[i];
                    if (!a.href)
                        continue;
                    var href = toURL(a.href);
                    if (!href) {
                        console.log(a.href, null);
                        continue;
                    }
                    var encryption = encryptionURL(href, self.options.password, self.options.verbose);
                    var excluded = self.isExcluded(href);
                    if (self.options.verbose) {
                        console.log(Object.assign(encryption, {
                            url: href.href,
                            isExcluded: excluded,
                        }));
                    }
                    if (!excluded) {
                        var enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
                        var randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];
                        a.href = randRedir + enc;
                        a.target = '_blank';
                        a.rel = 'nofollow noopener noreferer';
                    }
                }
                result = content.outerHTML;
            }
        }
    };
    return safelink;
}());
export default safelink;
_global_safelink.safelink = safelink;
