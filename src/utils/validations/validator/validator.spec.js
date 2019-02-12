import Validator from '.';

describe('Validator', () => {
  const isLong = value => new Promise((resolve, reject) => {
    if (value.length > 5) {
      resolve(value);
    } else {
      reject(new Error('value is too short!'));
    }
  });

  const presence = value => new Promise((resolve, reject) => {
    if (value) {
      resolve(true);
    } else {
      reject(new Error('this value is required!'));
    }
  });

  const isNotZero = value => new Promise((resolve, reject) => {
    if (value !== 0) {
      resolve(true);
    } else {
      reject(new Error('this is zero!'));
    }
  });

  const funcArr = [presence, isLong, isNotZero];

  it('receives an array of functions and resolves', async () => {
    const validate = await Validator(funcArr);
    expect(validate('foobar')).toBeTruthy();  //resolve.toMatchSnapshot()
  });

  it('receives an array of functions and rejects', async () => {
    const validate = await Validator(funcArr);
    expect(validate('foo')).rejects.toThrow();
  });

  it('receives a single input and resolves', async () => {
    const validate = await Validator(presence);
    expect(validate('foo')).toBeTruthy();
  });

  it('receives a single input and rejects', async () => {
    const validate = await Validator(presence);
    expect(validate('')).rejects.toThrow();
  });
});
