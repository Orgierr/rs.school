function atbash(letterIndex, alphabet) {
  return alphabet.split('').reverse().at(letterIndex);
}
module.exports = atbash;
