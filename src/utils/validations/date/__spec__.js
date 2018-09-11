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

    describe('When a minDate property was given to the constructor', () => {
      const validator = new Validator({minDate: '2008-08-08'});
      it('returns true', () => {
        expect(validator.validate("2012-01-08")).toBe(true);
      });

      it('returns false', () => {
        expect(validator.validate("2007-08-08")).toBe(false);
      });

      it('returns true if minDate was an invalid date', () => {
        expect(validator.validate('2010-08-25')).toBe(true);
      });

      it('should raise error if minDate is not a valid date', () => {
        const expected_msg = "minDate format must be YYYY-MM-DD";
        const _validator = () => new Validator({
          minDate: "invalidDate"
        });
        const _validator2 = () => new Validator({
          minDate: "01-14-1998"
        });
        expect(_validator).toThrow(expected_msg);
        expect(_validator2).toThrow(expected_msg);
      });
    });

    describe('when a maxDate property was given to the constructor', () => {
      const validator = new Validator({maxDate: '2015-10-21'});
      it('return true', () => {
        expect(validator.validate("2014-01-11")).toBe(true);
      });

      it('returns false', () => {
        expect(validator.validate("2015-10-22")).toBe(false);
      });

      it('returns true if maxDate was an invalid date', () => {
        const validator = new Validator({maxDate: "2012-01-13"});
        expect(validator.validate("1998-01-04")).toBe(true);
      });

      it('should raise error if maxDate is not a valid date', () => {
        const _validator = () => new Validator({
          maxDate: "invalidDate"
        });
        const _validator2 = () => new Validator({
          maxDate: "01-02-18"
        });
        const expected_msg = "maxDate format must be YYYY-MM-DD";
        expect(_validator).toThrow(expected_msg);
        expect(_validator2).toThrow(expected_msg);
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
