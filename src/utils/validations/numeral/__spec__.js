import TestUtils from 'react/lib/ReactTestUtils';
import Validator from './numeral';
import I18n from 'i18n-js';

describe('Numeral Validator', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        validations: {
          integer: 'Must be a valid Integer',
          decimal: 'Must be a valid Decimal',
          value: "Must equal %{is}",
          value_less_than_or_equal: "Must equal %{max} or less",
          value_greater_than_or_equal: "Must equal %{min} or more",
          value_range: "Must be between %{min} and %{max}"
        }
      }
    };
  });

  describe('when incorrect params have been passed', () => {
    let brokenValidator;

    it('throws an error and returns a warning message', () => {
      expect(function() {brokenValidator = Validator({ is: 5, min: 5 })}).toThrowError("You must either set an 'is' value, a single 'min' and 'max' value, or both a 'min' and 'max' value.");
    });
  });
  
  describe('getDescriptiveMessage', () => {
    describe('when passed a message', () => {
      it('returns the passed message', () => {
        let numeralValidator = Validator({ message: 'Simple Message', is: 5 });
        expect(numeralValidator.message(1)).toEqual('Simple Message');
      });
    });

    describe('when passed a invalid type', () => {
      it('returns a invalid type error', () => {
        let numeralValidator = Validator({ integer: true, is: 5 });
        expect(numeralValidator.message(1.50)).toEqual('Must be a valid Integer');
      });
    });

    describe('when correct type', () => {
      it('outputs the correct i18n string with the options', () => {
        let numeralValidator = Validator({ integer: true, is: 5 });
        expect(numeralValidator.message(1)).toEqual('Must equal 5');
      });
    });
  });

  describe('validateValue', () => {
    let numeralValidator;

    beforeEach(() => {
      numeralValidator = Validator({ is: 5 });
    });

    describe('message', () => {
      it('returns the correct message function', () => {
        expect(numeralValidator.message()).toEqual("Must equal 5");
      });
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(numeralValidator.validate()).toBeTruthy();
      });
    });

    describe('when value is correct', () => {
      it('returns true', () => {
        expect(numeralValidator.validate(5)).toBeTruthy();
        expect(numeralValidator.validate('5')).toBeTruthy();
      });
    });

    describe('when value is not correct', () => {
      it('returns false', () => {
        expect(numeralValidator.validate(5.01)).toBeFalsy();
      });
    });
  });

  describe('validateLess', () => {
    let lessThanValidator;

    beforeEach(() => {
      lessThanValidator = Validator({ max: 5 });
    });

    describe('when no input type is specified', () => {
      it('returns the correct message function', () => {
        expect(lessThanValidator.message()).toEqual("Must equal 5 or less");
      });

      describe('when the value is greater than the maximum', () => {
        it('returns false', () => {
          expect(lessThanValidator.validate(7)).toBeFalsy();
        });
      });

      describe('when the value is less than the maximum', () => {
        it('returns true', () => {
          expect(lessThanValidator.validate(4)).toBeTruthy();
          expect(lessThanValidator.validate('4')).toBeTruthy();
        });
      });

      describe('when the value equals the maximum', () => {
        it('returns true', () => {
          expect(lessThanValidator.validate(5.00)).toBeTruthy();
        });
      });
    });
  });

  describe('validateGreater', () => {
    let greaterThanValidator;

    describe('when no input type is specified', () => {
      beforeEach(() => {
        greaterThanValidator = Validator({ min: 10 });
      });

      it('returns the correct message function', () => {
        expect(greaterThanValidator.message()).toEqual("Must equal 10 or more");
      });

      describe('when the value is less than the minimum', () => {
        it('returns false', () => {
          expect(greaterThanValidator.validate(7)).toBeFalsy();
        });
      });

      describe('when the value is greater than the minimum', () => {
        it('returns true', () => {
          expect(greaterThanValidator.validate(14)).toBeTruthy();
        });
      });

      describe('when the value equals the maximum', () => {
        it('returns true', () => {
          expect(greaterThanValidator.validate(10.00)).toBeTruthy();
        });
      });
    });
  });

  describe('validateRange', () => {
    let rangeValidator;

    describe('when no input type is specified', () => {
      beforeEach(() => {
         rangeValidator = Validator({ min: 5, max: 10 });
      });

      it('returns the correct message function', () => {
        expect(rangeValidator.message()).toEqual("Must be between 5 and 10");
      });

      describe('when the value is less than the minimum', () => {
        it('returns false', () => {
          expect(rangeValidator.validate(3)).toBeFalsy();
        });
      });

      describe('when the value is greater than the maximum', () => {
        it('returns false', () => {
          expect(rangeValidator.validate(14)).toBeFalsy();
        });
      });

      describe('when the value is within the range', () => {
        it('returns true', () => {
          expect(rangeValidator.validate(5.00)).toBeTruthy();
          expect(rangeValidator.validate(7)).toBeTruthy();
          expect(rangeValidator.validate(10.00)).toBeTruthy();
          expect(rangeValidator.validate('10.00')).toBeTruthy();
        });
      });
    });
  });
});
