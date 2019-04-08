import validator from '.';
import PresenceValidator from '../presence';

const shortErr = new Error('value is too short!');
const presErr = new Error('this value is required!');
const notZeroErr = new Error('this is zero!');
const asyncErr = new Error('not foo!');
const legacyErr = new Error('[missing "en.errors.messages.blank" translation]');

const runValidation = async (validations, value) => {
  const validate = validator(validations);
  let valid;
  await validate(value)
    .then(() => {
      valid = true;
    })
    .catch((err) => {
      valid = err;
    });

  return valid;
};

const isLong = value => new Promise((resolve, reject) => {
  if (value.length > 5) {
    resolve(value);
  } else {
    reject(shortErr);
  }
});

const presence = value => new Promise((resolve, reject) => {
  if (value) {
    resolve(true);
  } else {
    reject(presErr);
  }
});

const isNotZero = value => new Promise((resolve, reject) => {
  if (value !== 0) {
    resolve(true);
  } else {
    reject(notZeroErr);
  }
});

const asyncValidation = value => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (value === 'foo') {
      resolve();
    } else {
      reject(asyncErr);
    }
  }, 500);
});

describe('validator', () => {
  it('receives an array of functions and returns true when all promises resolve', async () => {
    const validate = await runValidation([presence, isLong, isNotZero], 'foobar');
    expect(validate).toEqual(true);
  });

  it('receives an array of functions and returns an error message for the first promise that rejects', async () => {
    const validate = await runValidation([presence, isLong, isNotZero], 'foo');
    expect(validate).toEqual(shortErr);
  });

  it('receives a single input and returns true when the promise resolves', async () => {
    const validate = await runValidation(presence, 'foo');
    expect(validate).toEqual(true);
  });

  it('receives a single input and returns the error message when the promise rejects', async () => {
    const validate = await runValidation(presence, '');
    expect(validate).toEqual(presErr);
  });

  it('handles async validations as part of an array and returns true when all the promises resolve', async () => {
    const validate = await runValidation([presence, asyncValidation, isNotZero], 'foo');
    expect(validate).toEqual(true);
  });

  it('handles async validations as a single input and returns true the promise resolves', async () => {
    const validate = await runValidation(asyncValidation, 'foo');
    expect(validate).toEqual(true);
  });

  it('handles async validations in an array and returns an error message of first promise to reject', async () => {
    const validate = await runValidation([presence, asyncValidation, isNotZero], 'bar');
    expect(validate).toEqual(asyncErr);
  });

  it('handles a single async validation, returning the error message when the promise rejects', async () => {
    const validate = await runValidation(asyncValidation, 'bar');
    expect(validate).toEqual(asyncErr);
  });

  describe('legacy validations', () => {
    const presVal = new PresenceValidator();
    it('handles legacy validations as part of an array and returns true when all promises resolve', async () => {
      const valid = await runValidation([presence, presVal, isNotZero], 'foo');
      expect(valid).toEqual(true);
    });

    it('handles a single legacy validation and returns true when the promise resolves', async () => {
      const validate = await runValidation(presVal, 'foo');
      expect(validate).toEqual(true);
    });

    it('handles legacy validations in an array and returns an error message when the promise rejects', async () => {
      const validate = await runValidation([presVal, isNotZero], '');
      expect(validate.message).toEqual(legacyErr.message);
    });

    it('handles a single legacy validation and returns the error message when the promise rejects', async () => {
      const validate = await runValidation(presVal, '');
      expect(validate.message).toEqual(legacyErr.message);
    });
  });
});
