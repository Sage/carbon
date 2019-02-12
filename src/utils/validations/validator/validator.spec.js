import validator from '.';
import PresenceValidator from '../presence';

const shortErr = 'value is too short!';
const presErr = 'this value is required!';
const asyncErr = 'not foo!';
const legacyErr = '[missing "en.errors.messages.blank" translation]';

const runValidation = async (validations, value) => {
  const validate = validator(validations);
  let valid;
  let index = 0;
  await validate(value)
    .then(() => {
      valid = true;
      index += 1;
    })
    .catch((err) => {
      if (err.message) {
        valid = err.message;
      } else {
        valid = Array.isArray(validations) ? validations[index].message() : validations.message();
      }
    });

  return valid;
};

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
  }, 500);
});

describe('validator', () => {
  it('receives an array of functions and returns true when all promises resolve', async (done) => {
    const validate = await runValidation([presence, isLong, isNotZero], 'foobar');
    expect(validate).toEqual(true);
    done();
  });

  it('receives an array of functions and returns an error message for the first promise that rejects', async (done) => {
    const validate = await runValidation([presence, isLong, isNotZero], 'foo');
    expect(validate).toEqual(shortErr);
    done();
  });

  it('receives a single input and returns true when the promise resolves', async (done) => {
    const validate = await runValidation(presence, 'foo');
    expect(validate).toEqual(true);
    done();
  });

  it('receives a single input and returns the error message when the promise rejects', async (done) => {
    const validate = await runValidation(presence, '');
    expect(validate).toEqual(presErr);
    done();
  });

  it('handles async validations as part of an array and returns true when all th epromises resolve', async (done) => {
    const validate = await runValidation([presence, asyncValidation, isNotZero], 'foo');
    expect(validate).toEqual(true);
    done();
  });

  it('handles async validations as a single input and returns true the promise resolves', async (done) => {
    const validate = await runValidation(asyncValidation, 'foo');
    expect(validate).toEqual(true);
    done();
  });

  it('handles async validations in an array and returns an error message of first promise to reject', async (done) => {
    const validate = await runValidation([presence, asyncValidation, isNotZero], 'bar');
    expect(validate).toEqual(asyncErr);
    done();
  });

  it('handles a single async validation, returning the error message when the promise rejects', async (done) => {
    const validate = await runValidation(asyncValidation, 'bar');
    expect(validate).toEqual(asyncErr);
    done();
  });

  describe('legacy validations', () => {
    const presVal = new PresenceValidator();
    it('handles legacy validations as part of an array and returns true when all promises resolve', async (done) => {
      const valid = await runValidation([presence, presVal, isNotZero], 'foo');
      expect(valid).toEqual(true);
      done();
    });

    it('handles a single legacy validation and returns true when the promise resolves', async (done) => {
      const validate = await runValidation(presVal, 'foo');
      expect(validate).toEqual(true);
      done();
    });

    it('handles legacy validations in an array and returns an error message when the promise rejects', async (done) => {
      const validate = await runValidation([presVal, isNotZero], '');
      expect(validate).toEqual(legacyErr);
      done();
    });

    it('handles a single legacy validation and returns the error message when the promise rejects', async (done) => {
      const validate = await runValidation(presVal, '');
      expect(validate).toEqual(legacyErr);
      done();
    });
  });
});
