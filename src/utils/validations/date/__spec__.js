import Validator from './date';
import I18n from 'i18n-js';

describe('Blank Validator', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            wrong_format: 'Invalid Date'
          }
        }
      }
    };
  });

  describe('validate', () => {
    let validator = new Validator();

    describe('when the value is not passed', () => {
      it('returns true', () => {
        expect(validator.validate('')).toBeTruthy();
        expect(validator.validate(null)).toBeTruthy();
        expect(validator.validate(undefined)).toBeTruthy();
      });
    });

    describe('When the value is a valid date', () => {
      it('returns true', () => {
        expect(validator.validate('10/10/2012')).toBeTruthy();
      });
    });

    describe('When the value is NOT a valid date', () => {
      it('returns false', () => {
        expect(validator.validate('FOO')).toBeFalsy();
      });
    });
  });

  describe('message', () => {
    describe('when there is a customMessage', () => {
      it('returns the custom message', () => {
        let validator = new Validator({ customMessage: 'foo'});

        expect(validator.message()).toEqual('foo');
      });
    });

    describe('when there is no customMessage', () => {
      it('returns the default message', () => {
        let validator = new Validator();

        expect(validator.message()).toEqual('Invalid Date');
      });
    });
  });
});
