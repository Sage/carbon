import ImmutableHelper from './../../helpers/immutable';
import I18n from "i18n-js";
import Validator from './regex';

describe('Regex Validator', () => {
  describe('when value is undefined', () => {
    it('passes validation', () => {
      expect(Validator({ format: /[a-z]/ }).validate(null)).toBeTruthy();
    });
  });

  describe('when value matches the regex', () => {
    it('passes validation', () => {
      expect(Validator({ format: /[a-z]/ }).validate('abc')).toBeTruthy();
    });
  });

  describe('when value does not match the regex', () => {
    it('fails validation', () => {
      expect(Validator({ format: /[a-z]/ }).validate('123')).toBeFalsy();
    });
  });

  describe('message', () => {
    it('returns the i18n error message to display', () => {
      I18n.translations = {
        en: {
          validations: {
            regex: 'Incorrect Format'
          }
        }
      }
      expect(Validator().message()).toEqual("Incorrect Format");
    });

    describe('when passing a custom message', () => {
      it('uses the passed message as the error message', () => {
        expect(Validator({ message: 'Simple Message' }).message()).toEqual('Simple Message');
      });
    });
  });
});
