const app = require('./app/app');

app();

process.on('unhandledRejection', (error) => {
  process.stderr.write(error.message);
});
process.on('uncaughtException', (error) => {
  process.stderr.write(error.message);
});
