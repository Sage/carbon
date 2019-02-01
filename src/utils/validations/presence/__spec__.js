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
    describe('when no props specified', () => {
      it('returns true when a value is present', () => {
        let value = 'foo bar',
            props = { value: value };

        expect(new Validator().validate(value, props)).toBeTruthy();
      });

      it('returns false when a value is NOT present', () => {
        let value = null,
            props = { value: value };

        expect(new Validator().validate(value, props)).toBeFalsy();
      });

      it('returns false when a value consists only of spaces', () => {
        let value = '    ',
            props = { value: value };

        expect(new Validator().validate(value, props)).toBeFalsy();
      });

      it('returns false when an empty array is passed', () => {
        expect(new Validator().validate([])).toBeFalsy();
      });

      it('returns true when an non-empty array is passed', () => {
        expect(new Validator().validate([1])).toBeTruthy();
      });
    });

    describe('when props specified', () => {
      describe('but requireAll not specified', () => {
        let args = { props: ['value_1', 'value_2'] };

        it('returns true when any value is present', () => {
          let value_1 = 'foo bar',
              value_2 = null,
              props = { value_1: value_1, value_2: value_2 };

          expect(new Validator(args).validate(value_1, props)).toBeTruthy();
        });

        it('returns false when no value is present', () => {
          let value_1 = null,
              value_2 = null,
              props = { value_1: value_1, value_2: value_2 };

          expect(new Validator(args).validate(value_1, props)).toBeFalsy();
        });

        it('returns false when values consists only of spaces', () => {
          let value_1 = '    ',
              value_2 = '    ',
              props = { value_1: value_1, value_2: value_2 };

          expect(new Validator(args).validate(value_1, props)).toBeFalsy();
        });
      });

      describe('and requireAll is specified', () => {
        let args = { props: ['value_1', 'value_2'], requireAll: true };

        it('returns true when all values are present', () => {
          let value_1 = 'foo bar',
              value_2 = 'baz quux',
              props = { value_1: value_1, value_2: value_2 };

          expect(new Validator(args).validate(value_1, props)).toBeTruthy();
        });

        it('returns false when not all values are present', () => {
          let value_1 = 'foo bar',
              value_2 = null,
              props = { value_1: value_1, value_2: value_2 };

          expect(new Validator(args).validate(value_1, props)).toBeFalsy();
        });

        it('returns false when no value is present', () => {
          let value_1 = null,
              value_2 = null,
              props = { value_1: value_1, value_2: value_2 };

          expect(new Validator(args).validate(value_1, props)).toBeFalsy();
        });

        it('returns false when values consists only of spaces', () => {
          let value_1 = '    ',
              value_2 = '    ',
              props = { value_1: value_1, value_2: value_2 };

          expect(new Validator(args).validate(value_1, props)).toBeFalsy();
        });
      });
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
