import Validator from '.';

describe('Validator', () => {
  const isLong = (val) => {
    return val.length > 5;
  };

  // const presence = (value) => {
  //   return value !== null || value !== undefined || value.length > 0;
  // };

  const presence = value => new Promise((resolve, reject) => {
    if (value) {
      resolve(true);
    } else {
      reject(new Error('this value is required!'));
    }
  });

  const funcArr = [presence];

  it('receives an array of functions and executes each one', () => {
    const validate = Validator(funcArr);
    expect(validate('')).toBeFalsy();
  });

  it('can handle receiving an input of a single non-array validation function', () => {

  });
});
