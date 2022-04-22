required config:
```js
{
  page: [
    'url',         'title',
    'description',
    'image',       'content',
    'author',
    'published',
  ]
}
```

executor:
```js
const EJSHelper = require('./EJSHelper');
const layout = join(__dirname, 'layout-redirector.ejs');
const helpers = new EJSHelper({
  root: layout,
  page: {
    //... read above keys
    title: 'title page',
    author: 'your name'
  },
});
helpers.renderFile(layout).then((rendered)=>{
  console.log(rendered); // compiled html string
})
```