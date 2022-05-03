/* eslint-disable @typescript-eslint/no-unused-vars */
interface Date {
  addHours: (h: number) => Date;
  addHours2: (h: number) => Date;

  toGMTString(): string;

  /**
   * Check if Date is `n` hour ago
   * @param source number of hours
   */
  isHourAgo(source: number): boolean;
}

Date.prototype.isHourAgo = function (hour) {
  hour = hour * 60 * 1000; /* ms */
  const hourago = Date.now() - hour;
  return hour > hourago;
};

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  //this.setHours(this.getHours()+h);
  return this;
};

Date.prototype.addHours2 = function (hrs) {
  this.setHours(this.getHours() + hrs);
  return this;
};

class date_ext {
  static datetime_local(date: string | number | Date) {
    return new Date(date).toJSON().slice(0, 19);
  }
}

if (typeof window != 'undefined' && window instanceof Window) {
  window.datetime_local = date_ext.datetime_local;
} else if (typeof global == 'object') {
  global.datetime_local = date_ext.datetime_local;
}
if (typeof module != 'undefined' && typeof module == 'object') {
  module.exports = date_ext;
  module.exports = {
    datetime_local: date_ext.datetime_local,
  };
}
