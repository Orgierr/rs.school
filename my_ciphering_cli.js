const process = require('process');
const validateArg = require('./app/validate_arg');
const fs = require('fs');
const { pipeline } = require('stream');
const CustomError = require('./app/custom_error');
const ReadStream = require('./app/read_stream');
const WriteStream = require('./app/write_stream');
const CustomTransform = require('./app/custom_transform_stream');
process.exitCode = 1;
async function myCipheringCli() {
  try {
    const config = validateArg(process.argv);
    const transforms = [];

    for (const cipher of config.split('-')) {
      transforms.push(new CustomTransform(cipher));
    }

    let readStream = process.stdin;

    let writeStream = process.stdout;

    const inputIndex = process.argv.findIndex(
      (e) => e === '-i' || e === '--input'
    );

    const outputIndex = process.argv.findIndex(
      (e) => e === '-o' || e === '--output'
    );

    if (inputIndex !== -1) {
      try {
        await fs.promises.access(
          process.argv[inputIndex + 1],
          fs.constants.F_OK | fs.constants.R_OK
        );
        readStream = new ReadStream(process.argv[inputIndex + 1]);
      } catch (error) {
        throw new CustomError('Missing  or cant acces input file');
      }
    }
    if (outputIndex !== -1) {
      try {
        await fs.promises.access(
          process.argv[outputIndex + 1],
          fs.constants.F_OK | fs.constants.W_OK
        );

        writeStream = new WriteStream(process.argv[outputIndex + 1]);
      } catch (error) {
        throw new CustomError('Missing  or cant acces output file');
      }
    }
    pipeline(readStream, ...transforms, writeStream, (error) => {
      if (error) {
        throw error;
        // process.stderr.write(err.message);
      }
    });
  } catch (error) {
    throw error;
    // process.stderr.write(error.message);
  }
}

// myCipheringCli();
module.exports = myCipheringCli;
