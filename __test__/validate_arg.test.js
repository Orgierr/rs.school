const validate_arg = require('../app/validate_arg');

describe('encode letter', () => {
  test('Caesar  a', () => {
    expect(
      validate_arg([
        'node',
        'my_caesar_cli',
        '-c',
        'C1-C0-A-R1-R0-A-R0-R0-C1-A',
        '-i',
        './input.txt',
        '-o',
        './output.txt',
      ])
    ).toMatch(/^(C1|C0|A|R1|R0)(-(C1|C0|A|R1|R0))*$/);
  });
});
