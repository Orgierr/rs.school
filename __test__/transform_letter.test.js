const transformLetter = require('../app/transform_letter');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

test('transform letter', () => {
  expect(transformLetter('a', 'C1')).toBe('b');
});
