import TestUtils from 'react-dom/test-utils';
import Validator from './numeral-type';
import I18n from 'i18n-js';

describe('Numeral Type Validator', () => {

  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            not_a_number: "Must be a valid decimal",
            not_an_integer: "Must be a valid integer"
          }
        }
      }
    };
  });

  describe('when a type validation is required', () => {
    let decimalValidator, integerValidator;

    beforeEach(() => {
      decimalValidator = new Validator();
      integerValidator = new Validator({ integer: true });
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
        expect(decimalValidator.validate('123.12')).toBeTruthy();
        expect(integerValidator.validate(123)).toBeTruthy();
      });
    });

    describe('when value is not of the correct type', () => {
      it('returns false', () => {
        expect(decimalValidator.validate('abcde12345')).toBeFalsy();
        expect(integerValidator.validate('abcde12345')).toBeFalsy();
        expect(decimalValidator.validate('-')).toBeFalsy();
        expect(integerValidator.validate('-')).toBeFalsy();
      });
    });

    describe('negative numbers', () => {
      it('handles negative numbers', () => {
        expect(decimalValidator.validate('-1.00')).toBeTruthy();
        expect(integerValidator.validate('-1')).toBeTruthy();
      });
    });
  });
});
