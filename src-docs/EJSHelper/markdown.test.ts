import { readFileSync, writeFileSync } from 'fs';
import { join } from 'upath';
import renderMarkdown from './markdown';

const file = join(__dirname, '../../../readme.md');
const read = readFileSync(file).toString();
writeFileSync(
  join(__dirname, 'tmp', 'rendered.html'),
  renderMarkdown(readFileSync(join(__dirname, 'markdown.test.md')).toString())
);
writeFileSync(join(__dirname, 'tmp', 'readme.html'), renderMarkdown(read));
