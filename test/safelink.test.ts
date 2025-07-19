import safelink from '../src/safelink';

describe('safelink class', () => {
  it('should initialize with default options', () => {
    const sf = new safelink();
    expect(sf.options).toMatchObject({
      exclude: [],
      redirect: [],
      password: 'root',
      verbose: false,
      type: 'base64'
    });
  });

  it('should merge options correctly', () => {
    const sf = new safelink({ exclude: ['test.com'], password: '1234', type: 'aes' });
    expect(sf.options.exclude).toContain('test.com');
    expect(sf.options.password).toBe('1234');
    expect(sf.options.type).toBe('aes');
  });

  it('should detect excluded URLs', () => {
    const sf = new safelink({ exclude: ['example.com'] });
    expect(sf.isExcluded('http://example.com')).toBe(true);
    expect(sf.isExcluded('http://notexcluded.com')).toBe(false);
  });

  it('should encode URL with parseUrl if not excluded', () => {
    const sf = new safelink({ exclude: ['webmanajemen.com'] });
    expect(sf.parseUrl('https://google.com')).toBe('aHR0cHM6Ly9nb29nbGUuY29t');
  });

  it('should return null for parseUrl if excluded', () => {
    const sf = new safelink({ exclude: ['google.com'] });
    expect(sf.parseUrl('https://google.com')).toBeNull();
  });

  it('should encode URL with encodeURL', () => {
    const sf = new safelink();
    const encoded = sf.encodeURL('https://google.com');
    expect(encoded).toContain('aHR0cHM6Ly9nb29nbGUuY29t');
  });

  it('should parse HTML and anonymize only non-excluded links', async () => {
    const sf = new safelink({ exclude: ['webmanajemen.com'] });
    const input = `<a href="http://google.com">google.com</a> <a href="http://webmanajemen.com">webmanajemen.com</a>`;
    const result = await sf.parse(input);
    expect(result).toContain('aHR0cDovL2dvb2dsZS5jb20=');
    expect(result).toContain('http://webmanajemen.com');
  });

  it('should detect excluded URLs with regex', () => {
    const sf = new safelink({ exclude: [/^https?:\/\/(www\.)?example\.(com|org)$/] });
    expect(sf.isExcluded('http://example.com')).toBe(true);
    expect(sf.isExcluded('http://example.org')).toBe(true);
    expect(sf.isExcluded('http://notexample.com')).toBe(false);
  });

  it('should handle mixed string and regex in exclude', () => {
    const sf = new safelink({ exclude: ['test.com', /foo\.(bar|baz)$/] });
    expect(sf.isExcluded('http://test.com')).toBe(true);
    expect(sf.isExcluded('http://foo.bar')).toBe(true);
    expect(sf.isExcluded('http://foo.baz')).toBe(true);
    expect(sf.isExcluded('http://other.com')).toBe(false);
  });
});

describe('safelink.direct', () => {
  const sf = new safelink({
    exclude: ['webmanajemen.com']
  });

  it('should anonymize URLs correctly', async () => {
    const input = `<a href="http://google.com">google.com</a>`;
    const result = await sf.parse(input);
    expect(result).not.toContain('http://google.com');
  });

  it('should keep internal link', async () => {
    const input = `<a href="http://webmanajemen.com">webmanajemen.com</a>`;
    const result = await sf.parse(input);
    expect(result).toContain('http://webmanajemen.com');
  });

  it('should encode URL with parseUrl', () => {
    const encoded = sf.parseUrl('https://google.com');
    expect(encoded).toBe('aHR0cHM6Ly9nb29nbGUuY29t');
  });

  it('should parse HTML and encode/exclude links as expected', async () => {
    const input = `
<a href="http://google.com">google.com</a>
<a href="http://webmanajemen.com">webmanajemen.com</a>
<a id="idx" href="http://webmanajemen.com">webmanajemen.com</a>
<a id="idx" class="" data-x="" href="http://webmanajemen.com">webmanajemen.com</a>
<a id=idx href=http://webmanajemen.com>webmanajemen.com</a>
<a id="idx" href="http://webmanajemen.com?sdsjdjsd#sasdhdshsfjfdj">webmanajemen.com</a>
`;
    const expected = `
<a href="aHR0cDovL2dvb2dsZS5jb20=">google.com</a>
<a href="http://webmanajemen.com">webmanajemen.com</a>
<a id="idx" href="http://webmanajemen.com">webmanajemen.com</a>
<a id="idx" class="" data-x="" href="http://webmanajemen.com">webmanajemen.com</a>
<a id=idx href=http://webmanajemen.com>webmanajemen.com</a>
<a id="idx" href="http://webmanajemen.com?sdsjdjsd#sasdhdshsfjfdj">webmanajemen.com</a>
`;
    const result = await sf.parse(input);
    expect(result).toBe(expected);
  });
});
