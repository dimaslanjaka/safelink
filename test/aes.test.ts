import aes from '../src/aes';

describe('aes encrypt/decrypt', () => {
  const passphrase = 'test-passphrase';
  const plainText = 'Hello, world!';

  it('should encrypt and decrypt to original text', () => {
    const encrypted = aes.encrypt(passphrase, plainText);
    expect(typeof encrypted).toBe('string');
    expect(encrypted && encrypted.length).toBeGreaterThan(0);
    const decrypted = aes.decrypt(passphrase, encrypted!);
    expect(decrypted).toBe(plainText);
  });

  it('should return null when encrypting null or empty', () => {
    expect(aes.encrypt(passphrase, null)).toBeNull();
    expect(aes.encrypt(passphrase, '')).toBeNull();
  });

  it('should return null when decrypting null or empty', () => {
    expect(aes.decrypt(passphrase, null)).toBeNull();
    expect(aes.decrypt(passphrase, '')).toBeNull();
  });

  it('should return null when decrypting with wrong passphrase', () => {
    const encrypted = aes.encrypt(passphrase, plainText);
    const wrongDecrypted = aes.decrypt('wrong-passphrase', encrypted!);
    expect(wrongDecrypted).toBeNull();
  });

  it('should return null when decrypting invalid ciphertext', () => {
    expect(aes.decrypt(passphrase, 'not-a-valid-ciphertext')).toBeNull();
  });
});
