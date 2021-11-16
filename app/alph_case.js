function alphCase(letter, alphabet) {
  if (alphabet.toLowerCase().includes(letter)) return alphabet;
  return alphabet.toUpperCase();
}

module.exports = alphCase;
