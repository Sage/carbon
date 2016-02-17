import TestUtils from 'react/lib/ReactTestUtils';
import Number from './../../../components/number';
import Validator from './value';
import I18n from 'i18n-js';

describe('Value Validator', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        validations: {
          value: "Must equal %{is}",
          value_less_than_or_equal: "Must equal %{max} or less",
          value_greater_than_or_equal: "Must equal %{min} or more",
          value_range: "Must be between %{min} and %{max}"
        }
      }
    };
  });

  fdescribe('when incorrect params have been passed', () => {
    let brokenValidator;

      beforeEach(() => {
        brokenValidator = TestUtils.renderIntoDocument(<Number validations={ [Validator({ is: 5, minValue:10 })] } />);
      });

    it('throws an error and returns a warning message', () => {
      expect(brokenValidator()).toThrowError( "You must either set an 'is' value, a single minimum and maximum value, or both a minimum and maximum value.");
    });
  });

  describe('validateValue', () => {
    let valueValidator;
      beforeEach(() => {
        valueValidator = Validator({ is: 5 });
      });

      it('returns the correct message function', () => {
        expect(valueValidator.message()).toEqual("Must equal 5");
      });

      describe('when value is empty', () => {
        it('returns true', () => {
          expect(valueValidator.validate()).toBeTruthy();
        });
      });

      describe('when value is correct', () => {
        it('returns true', () => {
          expect(valueValidator.validate(5)).toBeTruthy();
        });
      });

      describe('when value is not correct', () => {
        it('returns false', () => {
          expect(valueValidator.validate(5.01)).toBeFalsy();
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
        greaterThanValidator = Validator({ minValue: 10 });
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
         rangeValidator = Validator({ minValue: 5, maxValue: 10 });
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
        });
      });
    });
  });
});
