const alphCase = require('../app/alph_case');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

test('alphabet case', () => {
  expect(alphCase('A', alphabet)).toBe(alphabet.toUpperCase());
});
