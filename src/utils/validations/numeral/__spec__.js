import TestUtils from 'react/lib/ReactTestUtils';
import Validator from './numeral';
import I18n from 'i18n-js';

describe('Decimal Validator', () => {

  beforeEach(() => {
    I18n.translations = {
      en: {
        validations: {
          decimal: "Must be a valid decimal",
          integer: "Must be a valid integer"
        }
      }
    };
  });

  describe('when a type validation is required', () => {
    let decimalValidator, integerValidator;

    beforeEach(() => {
      decimalValidator = Validator();
      integerValidator = Validator({ type: 'integer' });
    });

    it('returns the correct message function', () => {
      expect(decimalValidator.message()).toEqual("Must be a valid decimal");
      expect(integerValidator.message()).toEqual("Must be a valid integer");
    });

    describe('when value is empty', () => {
      it('returns true', () => {
        expect(decimalValidator.validate('')).toBeTruthy();
        expect(integerValidator.validate('')).toBeTruthy();
      });
    });

    describe('when value is of the correct type', () => {
      it('returns true', () => {
        expect(decimalValidator.validate(123.12)).toBeTruthy();
        expect(integerValidator.validate(123)).toBeTruthy();
      });
    });

    describe('when value is not of the correct type', () => {
      it('returns false', () => {
        expect(decimalValidator.validate('abcde12345')).toBeFalsy();
        expect(integerValidator.validate('abcde12345')).toBeFalsy();
      });
    });
  });
});
