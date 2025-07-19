import { streamToString } from '../src/string';
import { Readable } from 'stream';

describe('streamToString', () => {
  it('should convert a stream to string', async () => {
    const readable = Readable.from(['hello', ' ', 'world']);
    const result = await streamToString(readable);
    expect(result).toBe('hello world');
  });
});
