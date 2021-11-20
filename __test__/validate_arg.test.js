const validate_arg = require('../app/validate_arg');

describe('Validate arguments', () => {
  test('correct config', () => {
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
  test('duplicate config', () => {
    expect(() => {
      validate_arg([
        'node',
        'my_caesar_cli',
        '-c',
        '--config',
        'C1-C0-A-R1-R0-A-R0-R0-C1-A',
        '-i',
        './input.txt',
        '-o',
        './output.txt',
      ]);
    }).toThrowError('Duplicate config argument');
  });
  test('duplicate input', () => {
    expect(() => {
      validate_arg([
        'node',
        'my_caesar_cli',
        '-c',

        'C1-C0-A-R1-R0-A-R0-R0-C1-A',
        '-i',
        '--input',
        './input.txt',
        '-o',
        './output.txt',
      ]);
    }).toThrowError('Duplicate input argument');
  });
  test('duplicate output', () => {
    expect(() => {
      validate_arg([
        'node',
        'my_caesar_cli',
        '-c',

        'C1-C0-A-R1-R0-A-R0-R0-C1-A',
        '-i',
        '--output',
        './input.txt',
        '-o',
        './output.txt',
      ]);
    }).toThrowError('Duplicate output argument');
  });
});
