import I18n from "i18n-js";
import Validator from './xss';

describe('XSS Validator', () => {
  describe('when value is undefined', () => {
    it('passes validation', () => {
      expect(new Validator().validate(null)).toBeTruthy();
    });
  });

  describe('when value does not contain XSS expressions', () => {
    it('passes validation', () => {
      expect(new Validator().validate('foo')).toBeTruthy();
    });
  });

  describe('when value contains an XSS expression', () => {
    it('fails validation', () => {
      expect(new Validator().validate("<IMG SRC=JaVaScRiPt:alert('XSS')>")).toBeFalsy();
    });
  });

  describe('when value contains an XSS expression and custom regex is used', () => {
    it('fails according to the custom validation', () => {
      expect(new Validator({format: /[a-z]{3}/}).validate("boo")).toBeFalsy();
    });
  });

  describe('message', () => {
    it('returns the i18n error message to display', () => {
      I18n.translations = {
        en: {
          errors: {
            messages: {
              invalid_characters: 'Incorrect Format'
            }
          }
        }
      }
      expect(new Validator().message()).toEqual("Incorrect Format");
    });

    describe('when passing a custom message', () => {
      it('uses the passed message as the error message', () => {
        expect(new Validator({ customMessage: 'Simple Message' }).message()).toEqual('Simple Message');
      });
    });
  });
});
