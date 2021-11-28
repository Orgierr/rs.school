function decode(shift, alphabet, letterIndex) {
  return alphabet.at(letterIndex - shift);
}

module.exports = decode;
