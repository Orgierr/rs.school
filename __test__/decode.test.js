const decode = require('../app/decode');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

describe('decode letter', () => {
  test('Caesar  a', () => {
    expect(decode(1, alphabet, 0)).toBe('z');
  });
  test('ROT-8 a', () => {
    expect(decode(8, alphabet, 0)).toBe('s');
  });
});
