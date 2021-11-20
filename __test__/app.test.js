const transform = require('../__mocks__/custom_transform_stream');
const app = require('../app/app');
describe('validate arguments', () => {
  it('duplicate', async () => {
    process.argv = ['node', 'my_caesar_cli ', '-c', 'C1-C1-A-R0', '-c', 'C0'];
    await expect(app).rejects.toThrow('Duplicate argument');

    expect(transform).not.toHaveBeenCalled();
  });
  it('no config', async () => {
    process.argv = ['node', 'my_caesar_cli '];
    await expect(app).rejects.toThrow('No config');
    expect(transform).not.toHaveBeenCalled();
  });
  it('missing  or cant acces input file', async () => {
    process.argv = ['node', 'my_caesar_cli ', '-c', 'C1-C1-A-R0', '-i'];
    await expect(app).rejects.toThrow('Missing  or cant acces input file');
    expect(transform).toHaveBeenCalledTimes(4);
  });
  it('missing  or cant acces output file', async () => {
    process.argv = ['node', 'my_caesar_cli ', '-c', 'C1-C1-A-R0', '-o'];
    await expect(app).rejects.toThrow('Missing  or cant acces output file');
    expect(transform.mock.calls[0][0]).toEqual('C1');
  });
  it('wrong cipher in config', async () => {
    process.argv = ['node', 'my_caesar_cli ', '--config', 'C1-C1-A-R0-X2'];
    await expect(app).rejects.toThrow('Wrong cipher in config');
    expect(transform).not.toHaveBeenCalled();
  });
});
