/// <reference path='../../typings/index.d.ts' />
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItAttrs from 'markdown-it-attrs';
import MarkdownItSup from 'markdown-it-sup';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItAbbr from 'markdown-it-abbr';

function mdold() {
  return plug(
    new MarkdownIt({
      html: true,
      // Autoconvert URL-like text to links
      linkify: true,
      // Enable some language-neutral replacement + quotes beautification
      // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
      typographer: true,
      breaks: false,
      langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be useful for external highlighters.
    })
  );
}

function plug(md: MarkdownIt) {
  md.linkify.set({ fuzzyEmail: false }); // disables converting email to link
  md.use(MarkdownItSup)
    .use(MarkdownItSub)
    .use(MarkdownItMark)
    .use(MarkdownItAbbr)
    .use(MarkdownItFootnote)
    .use(MarkdownItAttrs, {
      allowedAttributes: ['id', 'class', /^regex.*$/],
    })
    .use(MarkdownItAnchor, {
      permalink: MarkdownItAnchor.permalink.headerLink(),
      //slugify: (s) => slugify(s),
    });
  md.renderer.rules.footnote_block_open = () =>
    '<h4 class="mt-3">Footnotes</h4>\n' + '<section class="footnotes">\n' + '<ol class="footnotes-list">\n';
  return md;
}

function mdNew() {
  return plug(MarkdownIt('commonmark'));
}

export default function renderMarkdown(str: string) {
  return mdold().render(str);
}
