import extractDomain from '../src/extractDomain';

describe('extractDomain', () => {
  it('should extract domain from a full URL with protocol', () => {
    expect(extractDomain('https://www.example.com/path?query=1')).toBe('www.example.com');
    expect(extractDomain('http://sub.domain.co.uk:8080/page')).toBe('sub.domain.co.uk');
  });

  it('should extract domain from a URL without protocol', () => {
    expect(extractDomain('www.example.com/path')).toBe('www.example.com');
    expect(extractDomain('sub.domain.com:3000/page')).toBe('sub.domain.com');
  });

  it('should extract domain from a URL with query string', () => {
    expect(extractDomain('example.com?foo=bar')).toBe('example.com');
  });

  it('should extract domain from a simple domain', () => {
    expect(extractDomain('example.com')).toBe('example.com');
  });

  it('should return undefined for empty string', () => {
    expect(extractDomain('')).toBeUndefined();
  });

  it('should return undefined for non-string input', () => {
    // @ts-expect-error Testing number input for coverage
    expect(extractDomain(123)).toBeUndefined();
    expect(extractDomain(undefined as any)).toBeUndefined();
    expect(extractDomain(null as any)).toBeUndefined();
  });

  it('should return undefined for malformed URLs', () => {
    expect(extractDomain('://')).toBeUndefined();
    expect(extractDomain('////')).toBeUndefined();
  });
});
