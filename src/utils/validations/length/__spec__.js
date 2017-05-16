import TestUtils from 'react-dom/test-utils';
import ValidationsHelper from './../../helpers/validations';
import Validator from './length';
import I18n from 'i18n-js';

describe('Length Validator', () => {

  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            wrong_length: "Must be %{count} characters exactly",
            too_long: "Must be %{count} characters or less",
            too_short: "Must be %{count} characters or more"
          }
        }
      }
    };
  });

  describe('getType', () => {
    describe('when type is undefined', () => {
      it('throws an error and returns a warning message', () => {
        spyOn(ValidationsHelper, 'comparisonType').and.returnValue(null);

        expect(function() { new Validator().getType() })
          .toThrowError("You must either set an 'is' value, a single 'min' and 'max' value, or both a 'min' and 'max' value.");
      });
    });
  });

  describe('validateLength', () => {
    let lengthValidator;

    beforeEach(() => {
      lengthValidator = new Validator({ is: 5 });
    });

    it('returns the correct message function', () => {
      expect(lengthValidator.message()).toEqual("Must be 5 characters exactly");
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(lengthValidator.validate()).toBeTruthy();
      });
    });

    describe('when value is of the correct length', () => {
      it('returns true', () => {
        expect(lengthValidator.validate('abcde')).toBeTruthy();
      });
    });

    describe('when value is not of the correct length', () => {
      it('returns false', () => {
        expect(lengthValidator.validate('abcde12345')).toBeFalsy();
      });
    });
  });

  describe('validateLess', () => {
    let lessThanValidator;

    beforeEach(() => {
      lessThanValidator = new Validator({ max: 5 });
    });

    it('returns the correct message function', () => {
      expect(lessThanValidator.message()).toEqual("Must be 5 characters or less");
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(lessThanValidator.validate()).toBeTruthy();
      });
    });

    describe('when the value is greater than the maximum', () => {
      it('returns false', () => {
        expect(lessThanValidator.validate('abcde12345')).toBeFalsy();
      });
    });

    describe('when the value is less than the maximum', () => {
      it('returns true', () => {
        expect(lessThanValidator.validate('abc')).toBeTruthy();
      });
    });

    describe('when the value equals the maximum', () => {
      it('returns true', () => {
        expect(lessThanValidator.validate('abcde')).toBeTruthy();
      });
    });
  });

  describe('validateGreater', () => {
    let greaterThanValidator;

    beforeEach(() => {
      greaterThanValidator = new Validator({ min: 10 });
    });

    it('returns the correct message function', () => {
      expect(greaterThanValidator.message()).toEqual("Must be 10 characters or more");
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(greaterThanValidator.validate()).toBeTruthy();
      });
    });

    describe('when the value is less than the minimum', () => {
      it('returns false', () => {
        expect(greaterThanValidator.validate('abcde')).toBeFalsy();
      });
    });

    describe('when the value is greater than the minimum', () => {
      it('returns true', () => {
        expect(greaterThanValidator.validate('abcde123456789')).toBeTruthy();
      });
    });

    describe('when the value equals the maximum', () => {
      it('returns true', () => {
        expect(greaterThanValidator.validate('abcde12345')).toBeTruthy();
      });
    });
  });

  describe('validateRange', () => {
    let rangeValidator;

    beforeEach(() => {
       rangeValidator = new Validator({ min: 5, max: 10 });
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(rangeValidator.validate()).toBeTruthy();
      });
    });

    describe('when the value is less than the minimum', () => {
      it('returns the correct message function', () => {
        expect(rangeValidator.message('a')).toEqual("Must be 5 characters or more");
      });

      it('returns false', () => {
        expect(rangeValidator.validate('abc')).toBeFalsy();
      });
    });

    describe('when the value is greater than the maximum', () => {
      it('returns the correct message function', () => {
        expect(rangeValidator.message('abcde123456789')).toEqual("Must be 10 characters or less");
      });

      it('returns false', () => {
        expect(rangeValidator.validate('abcde123456789')).toBeFalsy();
      });
    });

    describe('when the value is within the range', () => {
      it('returns true', () => {
        expect(rangeValidator.validate('abcde')).toBeTruthy();
        expect(rangeValidator.validate('abcde123')).toBeTruthy();
        expect(rangeValidator.validate('abcde12345')).toBeTruthy();
      });
    });
  });
});
