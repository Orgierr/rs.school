const fs = require('fs');
const { Readable } = require('stream');
const CustomError = require('./custom_error');

class ReadStream extends Readable {
  constructor(filename) {
    super(filename);
    this.filename = filename;
    this.fd = null;
  }
  _construct(callback) {
    fs.open(this.filename, (err, fd) => {
      if (err) {
        callback(new CustomError(`Unable to open file ${this.filename}`));
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(new CustomError(`Unable to read file ${this.filename}`));
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
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

module.exports = ReadStream;
