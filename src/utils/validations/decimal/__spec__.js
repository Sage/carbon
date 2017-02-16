import TestUtils from 'react/lib/ReactTestUtils';
import Validator from './decimal';
import I18n from 'i18n-js';

describe('Decimal Validator', () => {
  let minValue, maxValue;

  beforeEach(() => {
    I18n.translations = {
      en: {
        validations: {
          decimal: "Must be a valid decimal",
          equal_or_less_than: `Must be equal to or less than %{maxValue}`,
          less_than: `Must be less than %{maxValue}`,
          equal_or_greater_than: `Must be equal to or greater than %{minValue}`,
          greater_than: `Must be greater than %{minValue}`,
          value_between_inclusive: `Must be between %{minValue} and %{maxValue} inclusive`,
          value_between: `Must be between %{minValue} and %{maxValue}`
        }
      }
    };
  });

  describe('when only a type validation is required', () => {
    let typeValidator;

    beforeEach(() => {
      typeValidator = Validator({ validate: 'type' });
    });

    it('returns the correct message function', () => {
      expect(typeValidator.message()).toEqual("Must be a valid decimal");
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(typeValidator.validate('')).toBeTruthy();
      });
    });

    describe('when value is a decimal', () => {
      it('returns true', () => {
        expect(typeValidator.validate(123.12)).toBeTruthy();
      });
    });

    describe('when value is not a decimal', () => {
      it('returns false', () => {
        expect(typeValidator.validate('abcde12345')).toBeFalsy();
      });
    });
  });

  describe('validateLess', () => {
    let lessThanValidator;

    beforeEach(() => {
      lessThanValidator = Validator({ validate: 'less', maxValue: 25.32 });
    });

    it('returns the correct message function', () => {
      expect(lessThanValidator.message()).toEqual("Must be equal to or less than 25.32");
    });

    describe('when the value is greater than the maximum', () => {
      it('returns false', () => {
        expect(lessThanValidator.validate(32.32)).toBeFalsy();
      });
    });

    describe('when the value is less than the maximum', () => {
      it('returns true', () => {
        expect(lessThanValidator.validate(19.19)).toBeTruthy();
      });
    });

    describe('when the value equals the maximum', () => {
      it('returns true', () => {
        expect(lessThanValidator.validate(25.32)).toBeTruthy();
      });
    });
  });

  describe('validateLessStict', () => {
    let lessThanStrictValidator;

    beforeEach(() => {
      lessThanStrictValidator = Validator({ validate: 'less', maxValue: 25.32, strict: true });
    });

    it('returns the correct message function', () => {
      expect(lessThanStrictValidator.message()).toEqual("Must be less than 25.32");
    });

    describe('when the value is greater than the maximum', () => {
      it('returns false', () => {
        expect(lessThanStrictValidator.validate(32.32)).toBeFalsy();
      });
    });

    describe('when the value is less than the maximum', () => {
      it('returns true', () => {
        expect(lessThanStrictValidator.validate(19.19)).toBeTruthy();
      });
    });

    describe('when the value equals the maximum', () => {
      it('returns false', () => {
        expect(lessThanStrictValidator.validate(25.32)).toBeFalsy();
      });
    });
  });

  describe('validateGreater', () => {
    let greaterThanValidator;

    beforeEach(() => {
      greaterThanValidator = Validator({ validate: 'greater', minValue: 5.55 });
    });

    it('returns the correct message function', () => {
      expect(greaterThanValidator.message()).toEqual("Must be equal to or greater than 5.55");
    });

    describe('when the value is less than the minimum', () => {
      it('returns false', () => {
        expect(greaterThanValidator.validate(3.33)).toBeFalsy();
      });
    });

    describe('when the value is greater than the minimum', () => {
      it('returns true', () => {
        expect(greaterThanValidator.validate(19.19)).toBeTruthy();
      });
    });

    describe('when the value equals the maximum', () => {
      it('returns true', () => {
        expect(greaterThanValidator.validate(5.55)).toBeTruthy();
      });
    });
  });

  describe('validateGreaterStict', () => {
    let greaterThanStrictValidator;

    beforeEach(() => {
       greaterThanStrictValidator = Validator({ validate: 'greater', minValue: 5.55, strict: true });
    });

    it('returns the correct message function', () => {
      expect(greaterThanStrictValidator.message()).toEqual("Must be greater than 5.55");
    });

    describe('when the value is less than the minimum', () => {
      it('returns false', () => {
        expect(greaterThanStrictValidator.validate(3.33)).toBeFalsy();
      });
    });

    describe('when the value is greater than the minimum', () => {
      it('returns true', () => {
        expect(greaterThanStrictValidator.validate(19.19)).toBeTruthy();
      });
    });

    describe('when the value equals the minimum', () => {
      it('returns false', () => {
        expect(greaterThanStrictValidator.validate(5.55)).toBeFalsy();
      });
    });
  });

  describe('validateRange', () => {
    let rangeValidator;

    beforeEach(() => {
       rangeValidator = Validator({ validate: 'range', minValue: 5.55, maxValue: 25.25 });
    });

    it('returns the correct message function', () => {
      expect(rangeValidator.message()).toEqual("Must be between 5.55 and 25.25 inclusive");
    });

    describe('when the value is less than the minimum', () => {
      it('returns false', () => {
        expect(rangeValidator.validate(3.33)).toBeFalsy();
      });
    });

    describe('when the value is greater than the maximum', () => {
      it('returns false', () => {
        expect(rangeValidator.validate(55.55)).toBeFalsy();
      });
    });

    describe('when the value equals the minimum or maximum', () => {
      it('returns true', () => {
        expect(rangeValidator.validate(5.55)).toBeTruthy();
        expect(rangeValidator.validate(25.25)).toBeTruthy();
      });
    });
  });

  describe('validateRangeStrict', () => {
    let rangeStrictValidator;

    beforeEach(() => {
       rangeStrictValidator = Validator({ validate: 'range', minValue: 5.55, maxValue: 25.25, strict: true });
    });

    it('returns the correct message function', () => {
      expect(rangeStrictValidator.message()).toEqual("Must be between 5.55 and 25.25");
    });

    describe('when the value is less than the minimum', () => {
      it('returns false', () => {
        expect(rangeStrictValidator.validate(3.33)).toBeFalsy();
      });
    });

    describe('when the value is greater than the maximum', () => {
      it('returns false', () => {
        expect(rangeStrictValidator.validate(55.55)).toBeFalsy();
      });
    });

    describe('when the value equals the minimum or maximum', () => {
      it('returns false', () => {
        expect(rangeStrictValidator.validate(5.55)).toBeFalsy();
        expect(rangeStrictValidator.validate(25.25)).toBeFalsy
        ();
      });
    });
  });
});
