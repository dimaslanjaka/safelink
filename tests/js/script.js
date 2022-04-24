const table = document.querySelector('table#table');
table.querySelector('#resolveQueryUrl').innerHTML = typeof resolveQueryUrl;
table.querySelector('#parseQuery').innerHTML = typeof parseQuery;

function isClass(f) {
  return (
    typeof f === 'function' &&
    (() => {
      try {
        f();
        return false;
      } catch {
        return true;
      }
    })()
  );
}

const isSafelinkClass = isClass(safelink);
table.innerHTML += `<tr><td>global safelink</td><td>is ES5 Class: ${isSafelinkClass}</td></tr>`;

if (isSafelinkClass) {
  const instance = new safelink({
    exclude: ['webmanajemen.com'],
    password: 'unique-password',
  });
  instance.parse(document.querySelector('div#external'));
  instance.parse(document.querySelector('div#internal'));

  const currentQuery = JSON.stringify(instance.resolveQueryUrl(location.search), null, 2);
  table.innerHTML += `<tr id="current-queries"><td>Current Query <a href="#query-url">Change</a></td><td><pre><code class="language-json">${currentQuery}</code></pre></td></tr>`;

  const param = new URLSearchParams(location.search);
  if (param.has('o') || param.has('url')) {
    document.getElementById('current-queries').scrollIntoView();
  }
}

Array.from(document.links).forEach((el) => {
  if (!el.innerHTML.length) {
    el.textContent = el.getAttribute('href');
    el.addEventListener('click', (e) => {
      e.preventDefault();
      location.assign(el.href);
      if (el.href.match(/#(o|url)=/)) location.reload();
    });
  }
});
