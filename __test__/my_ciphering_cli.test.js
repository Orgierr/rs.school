const { exec } = require('child_process');

describe('validate input', () => {
  it('duplicate', (done) => {
    exec(
      `node ./my_ciphering_cli.js -c C1-C1-A-R0 -c C0`,
      (error, stdout, stderr) => {
        expect(stderr).toEqual('Duplicate argument');
        done();
      }
    );
  });
  it('no config', (done) => {
    exec(`node ./my_ciphering_cli.js`, (error, stdout, stderr) => {
      expect(stderr).toEqual('No config');
      done();
    });
  });
  it('missing  or cant acces input file', (done) => {
    exec(
      `node ./my_ciphering_cli.js -c C1-C1-A-R0 -i`,
      (error, stdout, stderr) => {
        expect(stderr).toEqual('Missing  or cant acces input file');
        done();
      }
    );
  });
  it('missing  or cant acces output file', (done) => {
    exec(
      `node ./my_ciphering_cli.js -c C1-C1-A-R0 -o`,
      (error, stdout, stderr) => {
        expect(stderr).toEqual('Missing  or cant acces output file');
        done();
      }
    );
  });
  it('wrong cipher in config', (done) => {
    exec(
      `node ./my_ciphering_cli.js -c C1-C1-A-R0-X2`,
      (error, stdout, stderr) => {
        expect(stderr).toEqual('Wrong cipher in config');
        done();
      }
    );
  });
  it('correct sequence of symbols as argument for --config', (done) => {
    exec(
      `node ./my_ciphering_cli.js -c "C1-C1-R0-A" -i "./input.txt"`,
      (error, stdout, stderr) => {
        expect(stdout).toEqual('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
        done();
      }
    );
  });
});
