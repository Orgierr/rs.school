const encode = require('../app/encode');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

describe('encode letter', () => {
  test('Caesar  a', () => {
    expect(encode(1, alphabet, 26, 0)).toBe('b');
  });
  test('ROT-8 a', () => {
    expect(encode(8, alphabet, 26, 0)).toBe('i');
  });
});
