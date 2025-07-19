import toURL, { isValidHttpUrl, fixUrl } from '../src/toURL';

describe('isValidHttpUrl', () => {
  it('should return true for valid http URLs', () => {
    expect(isValidHttpUrl('http://example.com')).toBe(true);
    expect(isValidHttpUrl('https://example.com')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidHttpUrl('ftp://example.com')).toBe(false);
    expect(isValidHttpUrl('not a url')).toBe(false);
    expect(isValidHttpUrl('')).toBe(false);
  });

  it('should accept URL objects', () => {
    expect(isValidHttpUrl(new URL('https://example.com'))).toBe(true);
    expect(isValidHttpUrl(new URL('http://example.com'))).toBe(true);
    expect(isValidHttpUrl(new URL('ftp://example.com'))).toBe(false);
  });
});

describe('fixUrl', () => {
  it('should remove doubled slashes except after protocol', () => {
    expect(fixUrl('http://example.com//foo///bar')).toBe('http://example.com/foo/bar');
    expect(fixUrl('https://example.com//foo//bar')).toBe('https://example.com/foo/bar');
    expect(fixUrl('/foo//bar///baz')).toBe('/foo/bar/baz');
  });

  it('should work with URL objects', () => {
    expect(fixUrl(new URL('http://example.com//foo//bar'))).toBe('http://example.com/foo/bar');
  });
});

describe('toURL', () => {
  it('should return a URL object for valid URLs', () => {
    const url = toURL('https://example.com/path?query=1');
    expect(url).toBeInstanceOf(URL);
    expect(url?.href).toBe('https://example.com/path?query=1');
  });

  it('should handle pathnames and queries', () => {
    const url = toURL('/foo/bar?baz=1');
    expect(url).toBeInstanceOf(URL);
    expect(url?.pathname).toBe('/foo/bar');
    expect(url?.search).toBe('?baz=1');
  });

  it('should return null for invalid URLs', () => {
    expect(toURL('not a url')).toBeNull();
    expect(toURL('ftp://example.com')).toBeNull();
  });
});
