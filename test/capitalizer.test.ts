import { capitalizer } from '../src/string';

describe('capitalizer', () => {
  it('should capitalize first letter of each word separated by space', () => {
    expect(capitalizer('hello world')).toBe('Hello World');
  });

  it('should capitalize first letter of each word separated by dash', () => {
    expect(capitalizer('foo-bar')).toBe('Foo-Bar');
  });

  it('should capitalize with custom symbols', () => {
    expect(capitalizer('foo_bar', ['_'])).toBe('Foo_Bar');
  });
});
