import { bufferToString } from '../src/string';

describe('bufferToString', () => {
  it('should convert a Buffer to string', () => {
    const buf = Buffer.from('hello world', 'utf8');
    expect(bufferToString(buf)).toBe('hello world');
  });
});
