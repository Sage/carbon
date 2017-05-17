import Validator from './character-count';
import I18n from 'i18n-js';

describe('Character Count Validator', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            too_long: "Must be %{count} characters or less"
          }
        }
      }
    };
  });

  describe('constructor', () => {
    describe('when the param limit is undefined', () => {
      it('throws an error and returns a warning message', () => {
        expect(function() { new Validator() }).toThrowError("You must set a 'limit' value.");
      });
    });
  });

  describe('validate', () => {
    let characterCountValidator;

    beforeEach(() => {
      characterCountValidator = new Validator({ limit: 5 });
    });

    describe('when there is no link break', () => {
      describe('when the value is greater than the limit', () => {
        it('returns false', () => {
          expect(characterCountValidator.validate('abcdef')).toBeFalsy();
        });
      });

      describe('when the value is less than the limit', () => {
        it('returns true', () => {
          expect(characterCountValidator.validate('abc')).toBeTruthy();
        });
      });

      describe('when the value equals the maximum', () => {
        it('returns true', () => {
          expect(characterCountValidator.validate('abcde')).toBeTruthy();
        });
      });
    });

    describe('when there is link break', () => {
      describe('when the value is greater than the limit', () => {
        it('returns false', () => {
          expect(characterCountValidator.validate('abcde\n')).toBeFalsy();
        });
      });

      describe('when the value is less than the limit', () => {
        it('returns true', () => {
          expect(characterCountValidator.validate('ab\n')).toBeTruthy();
        });
      });

      describe('when the value equals the maximum', () => {
        it('returns true', () => {
          expect(characterCountValidator.validate('abc\n')).toBeTruthy();
        });
      });
    });
  });

  describe('message', () => {
    it('returns the correct message to display', () => {
      expect(new Validator({ limit: 1000 }).message()).toEqual("Must be 1000 characters or less");
    });


    describe('when passing a custom message', () => {
      it('overrides the i18n message', () => {
        expect(new Validator({ limit: 1000, customMessage: 'Some message' }).message()).toEqual('Some message');
      });
    });
  });
});
