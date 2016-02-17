import TestUtils from 'react/lib/ReactTestUtils';
import Validator from './length';
import I18n from 'i18n-js';

describe('Length Validator', () => {

  beforeEach(() => {
    I18n.translations = {
      en: {
        validations: {
          length: {
            numeral: "Must be %{is} digits exactly",
            text:    "Must be %{is} characters exactly"
          },
          length_less_than_or_equal: {
            numeral: "Must be %{max} digits or less",
            text:    "Must be %{max} characters or less"
          },
          length_greater_than_or_equal: {
            numeral: "Must be %{min} digits or more",
            text:    "Must be %{min} characters or more"
          },
          length_range: {
            numeral: "Must be between %{min} and %{max} digits",
            text:    "Must be between %{min} and %{max} characters"
          }
        }
      }
    };
  });

  describe('when incorrect params have been passed', () => {
    let brokenValidator;

    it('throws an error and returns a warning message', () => {
      expect(function() {brokenValidator = Validator({ is: 5, minValue: 5 })}).toThrowError("You must either set an 'is' value, a single minimum and maximum value, or both a minimum and maximum value.");
    });
  });

  describe('validateLength', () => {
    let lengthValidator;

    describe('when no input type is specified', () => {
      beforeEach(() => {
        lengthValidator = Validator({ is: 5 });
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

    describe('when a numeral input type is specified', () => {
      beforeEach(() => {
        lengthValidator = Validator({ is: 5, type: 'numeral' });
      });

      it('returns the correct message function', () => {
        expect(lengthValidator.message()).toEqual("Must be 5 digits exactly");
      });
    });
  });

  describe('validateLess', () => {
    let lessThanValidator;

    beforeEach(() => {
      lessThanValidator = Validator({ maxValue: 5 });
    });

    describe('when no input type is specified', () => {
      it('returns the correct message function', () => {
        expect(lessThanValidator.message()).toEqual("Must be 5 characters or less");
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

    describe('when a numeral input type is specified', () => {
      beforeEach(() => {
        lessThanValidator = Validator({ maxValue: 10, type: 'numeral' });
      });

      it('returns the correct message function', () => {
        expect(lessThanValidator.message()).toEqual("Must be 10 digits or less");
      });
    });
  });

  describe('validateGreater', () => {
    let greaterThanValidator;

    describe('when no input type is specified', () => {
      beforeEach(() => {
        greaterThanValidator = Validator({ minValue: 10 });
      });

      it('returns the correct message function', () => {
        expect(greaterThanValidator.message()).toEqual("Must be 10 characters or more");
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

    describe('when a numeral input type is specified', () => {
      beforeEach(() => {
        greaterThanValidator = Validator({ minValue: 5, type: 'numeral' });
      });

      it('returns the correct message function', () => {
        expect(greaterThanValidator.message()).toEqual("Must be 5 digits or more");
      });
    });
  });

  describe('validateRange', () => {
      let rangeValidator;

    describe('when no input type is specified', () => {
      beforeEach(() => {
         rangeValidator = Validator({ minValue: 5, maxValue: 10 });
      });

      it('returns the correct message function', () => {
        expect(rangeValidator.message()).toEqual("Must be between 5 and 10 characters");
      });

      describe('when the value is less than the minimum', () => {
        it('returns false', () => {
          expect(rangeValidator.validate('abc')).toBeFalsy();
        });
      });

      describe('when the value is greater than the maximum', () => {
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

    describe('when a numeral input type is specified', () => {
      beforeEach(() => {
        rangeValidator = Validator({ minValue: 5, type: 'numeral' });
      });

      it('returns the correct message function', () => {
        expect(rangeValidator.message()).toEqual("Must be 5 digits or more");
      });
    });
  });
});
