import Validator from './blank';
import I18n from 'i18n-js';

describe('Blank Validator', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            must_be_blank: 'Must be blank'
          }
        }
      }
    };
  });

  describe('validate', () => {
    let validator = new Validator();

    describe('when the value is blank', () => {
      it('returns true', () => {
        expect(validator.validate('')).toBeTruthy();
        expect(validator.validate(null)).toBeTruthy();
        expect(validator.validate(undefined)).toBeTruthy();
      });
    });

    describe('when the value is not blank', () => {
      it('returns false', () => {
        expect(validator.validate('foo')).toBeFalsy();
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

        expect(validator.message()).toEqual('Must be blank');
      });
    });
  });
});
