const fs = require('fs');
const { Writable } = require('stream');
const CustomError = require('./custom_error');

class WriteStream extends Writable {
  constructor(filename) {
    super(filename);
    this.filename = filename;
  }
  _construct(callback) {
    fs.open(this.filename, 'a', (err, fd) => {
      if (err) {
        callback(new CustomError(`Unable to open file ${this.filename}`));
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, (err) => {
      if (err)
        callback(new CustomError(`Unable to write file ${this.filename}`));
    });
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) =>
        callback(new CustomError(`Unable to close file ${this.filename}`))
      );
    } else {
      callback(err);
    }
  }
}

module.exports = WriteStream;
