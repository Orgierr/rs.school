const atbash = require('../app/atbash');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

describe('ciphering letter to atbash', () => {
  test('set a', () => {
    expect(atbash(0, alphabet)).toBe('z');
  });
  test('set z', () => {
    expect(atbash(25, alphabet)).toBe('a');
  });
});
