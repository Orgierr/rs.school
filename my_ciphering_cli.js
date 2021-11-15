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
    const ciphersArray = validateArg(process.argv);
    const transforms = [];
    const validCiphers = ['A', 'C1', 'R1', 'C0', 'R0'];
    for (const cipher of ciphersArray) {
      if (!validCiphers.includes(cipher)) {
        throw new CustomError(`Wrong cipher in config-${cipher} `);
      }
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
    pipeline(readStream, ...transforms, writeStream, (err) => {
      if (err) {
        process.stderr.write(err.message);
      }
    });
  } catch (error) {
    process.stderr.write(error.message);
  }
}

myCipheringCli();
