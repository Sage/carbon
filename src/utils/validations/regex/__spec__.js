import ImmutableHelper from './../../helpers/immutable';
import I18n from "i18n-js";
import Validator from './regex';

describe('Regex Validator', () => {

  fdescribe('when value is undefined', () => {
    it('passes validation', () => {
      expect(Validator(/[a-z]/).validate(null)).toBeTruthy();
    });
  });

  describe('when value matches the regex', () => {
    it('passes validation', () => {
      expect(Validator(/[a-z]/).validate('abc')).toBeTruthy();
    });
  });

  describe('when value does not match the regex', () => {
    it('fails validation', () => {
      expect(Validator(/[a-z]/).validate('123')).toBeFalsy();
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
  });
});
