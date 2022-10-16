"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var encryptionURL_1 = __importDefault(require("./encryptionURL"));
var resolveQueryUrl_1 = __importDefault(require("./resolveQueryUrl"));
var toURL_1 = __importDefault(require("./toURL"));
var _global_safelink = (typeof window !== 'undefined' ? window : global);
var safelink = /** @class */ (function () {
    function safelink(opt) {
        this.options = {
            exclude: [],
            redirect: ['https://www.webmanajemen.com/page/safelink.html?url='],
            password: 'root',
            verbose: false,
            type: 'base64'
        };
        if (typeof opt.redirect == 'string')
            opt.redirect = [opt.redirect];
        this.options = Object.assign(this.options, opt);
    }
    /**
     * is url excluded
     * @param url
     * @returns
     */
    safelink.prototype.isExcluded = function (url) {
        var excludes = this.options.exclude;
        var value = String(url);
        var parsed = url instanceof URL ? url : (0, toURL_1.default)(value);
        // only process url with protocol
        if (value.match(/^(?:(ht|f)tp(s?):\/\/)?/)) {
            for (var i = 0; i < excludes.length; i++) {
                var pattern = excludes[i];
                if (typeof pattern == 'string' && typeof parsed === 'object') {
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
    /**
     * parse html string or element to anonymize urls
     * @param str
     * @returns
     */
    safelink.prototype.parse = function (str) {
        var self = this;
        var content = str;
        var result = null;
        if (typeof content === 'string' && content.trim().length > 0) {
            var regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gim;
            var processStr = function (content, href) {
                var excluded = self.isExcluded(href);
                if (!excluded) {
                    var encryption = (0, encryptionURL_1.default)(href, self.options.password, self.options.verbose);
                    var enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
                    var randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];
                    var newhref = randRedir + enc;
                    return content.replace(href, newhref);
                }
            };
            var matches = Array.from(content.matchAll(regex)).filter(function (m) { return m[2].trim().match(/^https?:\/\//); });
            for (var i = 0; i < matches.length; i++) {
                var m = matches[i];
                var href = m[2].trim();
                var allMatch = m[0];
                if (typeof href == 'string' && href) {
                    var wholeContents = typeof result == 'string' ? result : content;
                    if (typeof wholeContents === 'string') {
                        var processedHyperlink = processStr(allMatch, href);
                        if (processedHyperlink) {
                            var processedContent = wholeContents.replace(allMatch, processedHyperlink);
                            result = processedContent;
                        }
                    }
                }
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
                    var href = (0, toURL_1.default)(a.href);
                    if (!href) {
                        console.log(a.href, null);
                        continue;
                    }
                    var encryption = (0, encryptionURL_1.default)(href, self.options.password, self.options.verbose);
                    var excluded = self.isExcluded(href);
                    if (self.options.verbose) {
                        console.log(Object.assign(encryption, {
                            url: href.href,
                            isExcluded: excluded
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
        return result;
    };
    /**
     * anonymize url directly
     * @param href
     */
    safelink.prototype.encodeURL = function (href) {
        var self = this;
        var encryption = (0, encryptionURL_1.default)(href, self.options.password, self.options.verbose);
        var enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
        var randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];
        var newhref = randRedir + enc;
        return newhref;
    };
    /**
     * Resolve query url to decrypt anonymized urls (page redirector)
     * @param search
     * @returns
     */
    safelink.prototype.resolveQueryUrl = function (search) {
        var self = this;
        var obj = (0, resolveQueryUrl_1.default)(typeof search == 'string'
            ? search
            : typeof location == 'object' && typeof location.search == 'string'
                ? location.search
                : null, this.options.password, this.options.verbose);
        if (obj !== null && typeof obj === 'object') {
            Object.keys(obj).forEach(function (key) {
                var encryptions = obj[key];
                if (encryptions.aes.encode) {
                    encryptions.aes.encode_redirector = self.options.redirect + encryptions.aes.encode;
                }
                if (encryptions.base64.encode) {
                    encryptions.base64.encode_redirector = self.options.redirect + encryptions.base64.encode;
                }
            });
        }
        return obj;
    };
    return safelink;
}());
exports.default = safelink;
_global_safelink.safelink = safelink;
