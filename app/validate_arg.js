const CustomError = require('./custom_error');

function validateArg(arg) {
  const configReg = /^(C1|C0|A|R1|R0)(-(C1|C0|A|R1|R0))*$/;
  const config = arg[arg.findIndex((e) => e === '-c' || e === '--config') + 1];
  if (new Set(arg).size !== arg.length) {
    throw new CustomError('Duplicate argument');
  }
  if (!config || (!arg.includes('-c') && !arg.includes('--config'))) {
    throw new CustomError('No config');
  }
  if (arg.includes('-c') && arg.includes('--config')) {
    throw new CustomError('Duplicate config argument');
  }
  if (arg.includes('-i') && arg.includes('--input')) {
    throw new CustomError('Duplicate input argument');
  }
  if (arg.includes('-o') && arg.includes('--output')) {
    throw new CustomError('Duplicate output argument');
  }
  if (!configReg.test(config)) {
    throw new CustomError(`Wrong cipher in config`);
  }
  return config;
}

module.exports = validateArg;
