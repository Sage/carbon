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
      const validator = new Validator({minDate: '08/08/08'});
      it('returns true', () => {
        expect(validator.validate("08/01/2012")).toBe(true);
      });

      it('returns false', () => {
        expect(validator.validate("08/08/2007")).toBe(false);
      });

      it('returns true if minDate was an invalid date', () => {
        expect(validator.validate('08/25/2010')).toBe(true);
      });
    });

    describe('when a maxDate property was given to the constructor', () => {
      const validator = new Validator({maxDate: '21/10/2015'});
      it('return true', () => {
        expect(validator.validate("01/11/2014")).toBe(true);
      });

      it('returns false', () => {
        expect(validator.validate("22/10/2015")).toBe(false);
      });

      it('returns true if maxDate was an invalid date', () => {
        const validator = new Validator({maxDate: "01/13/2012"});
        expect(validator.validate("01/04/98")).toBe(true);
      });
    });

    describe('when a maxDate and minDate was given to the constructor', () => {
      it('should return true for valid dates', () => {
        const validator = new Validator({minDate: "01/10/2000", maxDate: "02/08/2001"});
        expect(validator.validate("01/10/2001"));
      })

      it('should return true if both minDate and maxDate were invalid', () => {
        const validator = new Validator({
          minDate: "0/25/200",
          maxDate: "invalid date"
        });
        expect(validator.validate("05/07/1980")).toBe(true);
      });

      it('should return false', () => {
        const validator = new Validator({
          minDate: "01/02/2008",
          maxDate: "invalid date"
        });
        expect(validator.validate("05/07/1980")).toBe(false);
      });

      it('should return true', () => {
        const validator = new Validator({
          minDate: "01/02/1970",
          maxDate: "invalid date"
        });
        expect(validator.validate("03/05/1987")).toBe(true);
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
