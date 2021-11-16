const atbash = require('./atbash');
const encode = require('./encode');
const decode = require('./decode');
const alphCase = require('./alph_case');
function transformLetter(letter, cipher) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphLen = 26;
  if (!alphabet.toLowerCase().includes(letter.toLowerCase())) return letter;
  const letterIndex = alphabet.indexOf(letter.toLowerCase());
  const newAlphabet = alphCase(letter, alphabet);
  switch (cipher) {
    case 'A':
      return atbash(letterIndex, newAlphabet);
    case 'C1':
      return encode(1, newAlphabet, alphLen, letterIndex);
    case 'R1':
      return encode(8, newAlphabet, alphLen, letterIndex);
    case 'C0':
      return decode(1, newAlphabet, letterIndex);
    case 'R0':
      return decode(8, newAlphabet, letterIndex);
  }
}

module.exports = transformLetter;