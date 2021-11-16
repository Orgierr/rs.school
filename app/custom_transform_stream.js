const { Transform } = require('stream');

const transformLetter = require('./transform_letter');

class CustomTransform extends Transform {
  constructor(cipher) {
    super();
    this.cipher = cipher;
  }
  _transform(chunk, encoding, callback) {
    const data = chunk
      .toString()
      .split('')
      .map((letter) => transformLetter(letter, this.cipher))
      .join('');
    callback(null, data);
  }
}

module.exports = CustomTransform;
