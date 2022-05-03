type anyOf = Buffer &
  string &
  object &
  symbol &
  null &
  undefined &
  Record<string, any> &
  (() => any) &
  boolean &
  boolean[] &
  keyof [false];

if (typeof module.exports != 'undefined') {
  module.exports = null as anyOf;
  module.exports = {
    any: null as anyOf,
  };
}
