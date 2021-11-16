const transformLetter = require('../app/transform_letter');

test('transform letter', () => {
  expect(transformLetter('a', 'C1')).toBe('b');
});
