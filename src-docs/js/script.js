/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../../dist/index.d.ts" />

document.addEventListener('DOMContentLoaded', function () {
  const table = document.querySelector('table#table');
  table.querySelector('#resolveQueryUrl').innerHTML = typeof window.resolveQueryUrl;
  table.querySelector('#parseQuery').innerHTML = typeof window.parseQuery;

  /**
   * Check if variable is ES5 class
   * @param {any} f
   * @returns {boolean}
   */
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

  const isSafelinkClass = isClass(window.safelink);
  table.innerHTML += `<tr><td>global safelink</td> <td><code class="language-javascript">isClass(window.safelink)</code></td><td>is ES5 Class: ${isSafelinkClass}</td></tr>`;
  table.innerHTML += `<tr><td>global safelink</td> <td><code class="language-javascript">typeof window.safelink</code></td><td>${typeof window.safelink}</td></tr>`;

  if (isSafelinkClass) {
    const instance = new window.safelink({
      // exclude patterns (dont anonymize these patterns)
      exclude: [/([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/],
      // url redirector
      redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
      // debug
      verbose: false,
      // encryption type = 'base64' | 'aes'
      type: 'base64',
      // password aes, default = root
      password: 'unique-password'
    });
    instance.parse(document.querySelector('div#external'));
    instance.parse(document.querySelector('div#internal'));

    const currentQuery = JSON.stringify(instance.resolveQueryUrl(location.href), null, 2);
    table.innerHTML += `<tr id="current-queries"><td>Redirector Resolver <a href="#query-url" class="btn btn-sm btn-warning">Change</a></td> <td><code>window.safelink.resolveQueryUrl(location.href)</code></td><td><pre><code class="language-json">${currentQuery}</code></pre></td></tr>`;

    const param = new URLSearchParams(window.location.search);
    if (param.has('o') || param.has('url') || location.href.match(/#(o|url)=/)) {
      document.getElementById('current-queries').scrollIntoView();
    }
  }

  Array.from(document.links).forEach((el) => {
    if (!el.innerHTML.length) {
      el.textContent = el.getAttribute('href');
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = el.href;
        if (el.href.match(/#(o|url)=/)) location.reload();
      });
    }
  });
});
