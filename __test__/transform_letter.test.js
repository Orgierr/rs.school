const transformLetter = require('../app/transform_letter');

describe('Transform letter', () => {
  test('a encode C1', () => {
    expect(transformLetter('a', 'C1')).toBe('b');
  });
  test('A encode C1', () => {
    expect(transformLetter('A', 'C1')).toBe('B');
  });
  test('B decode C0', () => {
    expect(transformLetter('B', 'C0')).toBe('A');
  });
  test('b decode C0', () => {
    expect(transformLetter('b', 'C0')).toBe('a');
  });
  test('a encode R1', () => {
    expect(transformLetter('a', 'R1')).toBe('i');
  });
  test('I decode R0', () => {
    expect(transformLetter('I', 'R0')).toBe('A');
  });
  test('A encode A', () => {
    expect(transformLetter('A', 'A')).toBe('Z');
  });
  test('z encode A', () => {
    expect(transformLetter('z', 'A')).toBe('a');
  });
  test('! encode A', () => {
    expect(transformLetter('!', 'A')).toBe('!');
  });
});
