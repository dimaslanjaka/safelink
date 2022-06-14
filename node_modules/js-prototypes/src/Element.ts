/* eslint-disable @typescript-eslint/no-unused-vars */
interface Element {
  /** @see {@link https://stackoverflow.com/a/59360710/6404439} */
  insertAfter: (el: HTMLElement) => HTMLElement;
}

if (typeof window != 'undefined' && typeof document != 'undefined') {
  Element.prototype.insertAfter = function (this: HTMLElement, el) {
    this.parentNode.insertBefore(el, this.nextSibling);
    return this;
  };
}
