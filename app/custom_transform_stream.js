const { Transform } = require('stream');

const transformLetter = require('./transform_letter');
/* istanbul ignore next */
class CustomTransform extends Transform {
  constructor(cipher) {
    super();
    this.cipher = cipher;
  }
  /* istanbul ignore next */
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
