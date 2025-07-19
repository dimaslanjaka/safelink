import { escapeRegex } from '../src/string';

describe('escapeRegex', () => {
  it('should escape special regex characters (method 1)', () => {
    expect(escapeRegex('a.b*c?')).toBe('a\\.b\\*c\\?');
    expect(escapeRegex('[test]')).toBe('\\[test\\]');
  });

  it('should escape special regex characters (method 2)', () => {
    expect(escapeRegex('a-b', '2')).toBe('a\\x2db');
    expect(escapeRegex('a|b', '2')).toBe('a\\|b');
  });
});
