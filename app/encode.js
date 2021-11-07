function encode(shift, alphabet, alphLen, letterIndex) {
  return alphabet.at((letterIndex + shift) % alphLen);
}

module.exports = encode;
