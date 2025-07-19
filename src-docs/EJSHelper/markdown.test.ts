import fs from 'fs';
import upath from 'upath';
import renderMarkdown from './markdown.js';

const file = upath.join(__dirname, '../../../readme.md');
const read = fs.readFileSync(file).toString();
fs.writeFileSync(
  upath.join(__dirname, 'tmp', 'rendered.html'),
  renderMarkdown(fs.readFileSync(upath.join(__dirname, 'markdown.test.md')).toString())
);
fs.writeFileSync(upath.join(__dirname, 'tmp', 'readme.html'), renderMarkdown(read));
