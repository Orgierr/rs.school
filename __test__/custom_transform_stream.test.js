const Transform = require('../app/custom_transform_stream');

test('transform letter', () => {
  expect(new Transform()._transform('a', 'utf8', () => null));
});
