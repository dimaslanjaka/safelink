import { readFileSync, writeFileSync } from 'fs';
import { join } from 'upath';
import safelinkify from '.';
console.clear();
var options = {
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
var sf = new safelinkify.safelink(options);
var processedExternalLinks = sf.parse("\n<a href=\"www.example.com/page.php?id=xxxx&name=yyyy\" ....>external</a>\n<a href=\"http://www.example.com/page.php?id=xxxx&name=yyyy\" ....>external</a>\n<a href=\"https://www.example.com/page.php?id=xxxx&name=yyyy\" ....>external</a>\n<a href=\"www.example.com/page.php/404\" ....></a>\n<a href=\"http://external.domain.com\">internal</a>\n<a href=\"http://www.webmanajemen.com\">internal</a>\n<a href=\"http://webmanajemen.com\">internal</a>\n<a href=\"#http://webmanajemen.com\">#internal</a>\n<a href=\"?http://webmanajemen.com\">?internal</a>\n<a href=\"\">internal</a>\n");
writeFileSync(join(__dirname, 'test/processedExternalLinks.html'), processedExternalLinks);
// parse from file
var readFromFile = readFileSync(join(__dirname, 'test/index.html')).toString();
if (typeof readFromFile == 'string' && readFromFile) {
    var parseFromFile = sf.parse(readFromFile);
    if (typeof parseFromFile == 'string' && parseFromFile)
        writeFileSync(join(__dirname, 'test/index.safelinkify.html'), parseFromFile);
}
