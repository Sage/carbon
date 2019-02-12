import Validator from '.';
import PresenceValidator from '../presence';

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

  const asyncValidation = value => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'foo') {
        resolve();
      } else {
        reject(new Error('not foo!'));
      }
    }, 3000);
  });

  let funcArr = [presence, isLong, isNotZero];

  it('receives an array of functions and resolves', async () => {
    const validate = await Validator(funcArr);
    expect(validate('foobar')).toBeTruthy();
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

  it('handles async validations as part of an array and resolves', async () => {
    funcArr = [presence, asyncValidation, isNotZero];
    const validate = await Validator(funcArr);
    expect(validate('foo')).toBeTruthy();
  });

  it('handles async validations as a single input and resolves', async () => {
    const validate = await Validator(asyncValidation);
    expect(validate('foo')).toBeTruthy();
  });

  it('handles async validations as part of an array and rejects', async () => {
    funcArr = [presence, asyncValidation, isNotZero];
    const validate = await Validator(funcArr);
    expect(validate('bar')).toBeTruthy();
  });

  it('handles async validations as a single input and rejects', async () => {
    const validate = await Validator(asyncValidation);
    expect(validate('bar')).rejects.toThrow();
  });

  describe('old validators', () => {
    // describe('isLegacy', () => {
    //   it('returns true when a legacy validation is passed to the Validator', () => {
        
    //   });
    // });
    const presVal = new PresenceValidator();
    it('handles legacy validations as part of an array and resolves', async () => {
      funcArr = [presence, presVal, isNotZero];
      const validate = await Validator(funcArr);
      expect(validate('foo')).toBeTruthy();
    });

    it('handles legacy validations as a single input and resolves', async () => {
      const validate = await Validator(presVal);
      expect(validate('foo')).toBeTruthy();
    });

    it('handles legacy validations as part of an array and rejects', async () => {
      funcArr = [presVal, isNotZero];
      const validate = await Validator(funcArr);
      expect(validate()).toBeTruthy();
    });

    it('handles legacy validations as a single input and rejects', async () => {
      const validate = await Validator(presVal);
      expect(validate('bar')).rejects.toThrow();
    });
  });
});
