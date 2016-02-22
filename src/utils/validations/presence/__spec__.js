import ImmutableHelper from './../../helpers/immutable';
import I18n from 'i18n-js';
import Validator from './presence';

describe('Presence Validator', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        validations: {
          presence: "This field is required."
        }
      }
    };
  });

  describe('Validate', () => {
    it('returns true when an value is present', () => {
      let value = 'foo'
      expect(Validator().validate(value)).toBeTruthy();
    });

    it('returns false when an id is NOT present', () => {
      let value = null
      expect(Validator().validate(value)).toBeFalsy();
    });
  });

  describe('message', () => {
    it('returns the error message to display', () => {
      expect(Validator().message()).toEqual('This field is required.');
    });

    describe('when passing a custom message', () => {
      it('overrides the i18n message', () => {
        expect(Validator({ message: 'Simple Message' }).message()).toEqual('Simple Message');
      });
    });
  });

  describe('asterisk', () => {
    it('returns true', () => {
      expect(Validator().asterisk).toBeTruthy();
    });
  });
});
