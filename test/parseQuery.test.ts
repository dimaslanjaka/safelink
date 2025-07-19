import parseQuery from '../src/parseQuery';

describe('parseQuery', () => {
  it('should return null for non-string url', () => {
    expect(parseQuery(null, null)).toBeNull();
    expect(parseQuery(null, undefined as any)).toBeNull();
    expect(parseQuery(null, 123 as any)).toBeNull();
  });

  it('should return null for empty string url', () => {
    expect(parseQuery(null, '')).toBeNull();
  });

  it('should parse query string from url', () => {
    expect(parseQuery(null, 'https://example.com?foo=bar&baz=qux')).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('should parse hash from url', () => {
    expect(parseQuery(null, 'https://example.com#foo=bar&baz=qux')).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('should parse both search and hash, hash overrides search', () => {
    expect(parseQuery(null, 'https://example.com?foo=bar&baz=qux#foo=override&new=val')).toEqual({
      foo: 'override',
      baz: 'qux',
      new: 'val'
    });
  });

  it('should parse query from ?foo=bar', () => {
    expect(parseQuery(null, '?foo=bar')).toEqual({ foo: 'bar' });
  });

  it('should parse query from #foo=bar', () => {
    expect(parseQuery(null, '#foo=bar')).toEqual({ foo: 'bar' });
  });

  it('should return value for specific query key', () => {
    expect(parseQuery('foo', 'https://example.com?foo=bar&baz=qux')).toBe('bar');
    expect(parseQuery('baz', 'https://example.com?foo=bar&baz=qux')).toBe('qux');
    expect(parseQuery('notfound', 'https://example.com?foo=bar&baz=qux')).toEqual(
      { foo: 'bar', baz: 'qux' }['notfound']
    );
  });

  it('should handle URLs with no query or hash', () => {
    expect(parseQuery(null, 'https://example.com')).toEqual({});
  });
});
