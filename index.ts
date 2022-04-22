import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'upath';
import browserSync from 'browser-sync';
import { minify } from 'html-minifier-terser';
import EJSHelper from './tests/article-generator/EJSHelper';

/** Deployer for http://dimaslanjaka.github.io/safelink */
const deploy_dir = join(__dirname, 'gh-pages');
if (!existsSync(deploy_dir)) mkdirSync(deploy_dir, { recursive: true });

const PORT = parseInt(process.env.PORT || '5000');
const baseUrl = 'http://localhost' + PORT;
const app = browserSync.create();
app.init({
  port: PORT,
  open: false,
  watchOptions: {
    ignoreInitial: true,
    ignored: '*.txt',
  },
  files: [join(__dirname, 'tests'), join(__dirname, 'dist/**/*.js')],
  excludeFileTypes: ['.ts'],
  server: {
    baseDir: './',
    routes: {
      '/node_modules': './node_modules',
      '/js': './tests/js',
      '/css': './tests/css',
      '/safelink': '/gh-pages',
    },
    middleware: [
      {
        route: '/',
        handle: async (req, res, next) => {
          const url = new URL(baseUrl + req.url);
          const path = (() => {
            const path = url.pathname.replace(/.html$/, '');
            if (path.endsWith('/') || path.length < 1) return path + 'index';
            return path;
          })();

          const view = join(__dirname, 'tests');
          const view_ejs = join(view, path + '.ejs');
          let title = 'Browser Test';
          if (existsSync(view_ejs)) {
            const helpers = new EJSHelper({
              root: join(view, 'layout.ejs'),
            });
            const renderPage = await helpers.renderFile(view_ejs);
            helpers.add('body', renderPage);
            helpers.add('title', title);
            const renderLayout = await helpers.renderFile(join(view, 'layout.ejs'));
            let result = '';
            try {
              result = await minify(renderLayout, {
                minifyCSS: true,
                minifyJS: true,
                collapseWhitespace: true,
              });
            } catch (error) {
              result = renderLayout;
            }

            /** Location deploy page */
            const saveTo = join(deploy_dir, 'index.html');
            writeFileSync(saveTo, result);

            res.end(result);
          }
          next();
        },
      },
    ],
  },
});

console.log('server: http://localhost:3000');
