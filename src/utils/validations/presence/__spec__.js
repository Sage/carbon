import ImmutableHelper from './../../helpers/immutable';
import I18n from 'i18n-js';
import Validator from './presence';

describe('Presence Validator', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            blank: "This field is required."
          }
        }
      }
    };
  });

  describe('Validate', () => {
    it('returns true when a value is present', () => {
      let value = 'foo bar'
      expect(new Validator().validate(value)).toBeTruthy();
    });

    it('returns false when a value is NOT present', () => {
      let value = null
      expect(new Validator().validate(value)).toBeFalsy();
    });

    it('returns false when a value consists only of spaces', () => {
      let value = '    ';
      expect(new Validator().validate(value)).toBeFalsy();
    });
  });

  describe('message', () => {
    it('returns the error message to display', () => {
      expect(new Validator().message()).toEqual('This field is required.');
    });

    describe('when passing a custom message', () => {
      it('overrides the i18n message', () => {
        expect(new Validator({ customMessage: 'Simple Message' }).message()).toEqual('Simple Message');
      });
    });
  });

  describe('asterisk', () => {
    it('returns true', () => {
      expect(new Validator().asterisk).toBeTruthy();
    });
  });
});
