import I18n from 'i18n-js';
import Validator from './exclusion';

describe('mass-import-table', () => {
  let validator;

  beforeEach(() => {
    I18n.translations = {
      en: {
        errors: {
          messages: {
            exclusion: 'is not an accepted value.'
          }
        }
      }
    };
    validator = new Validator({ disallowedValues: ['foo', 'bar'] });
  });

  describe('when value is undefined', () => {
    it('returns false', () => {
      expect(new Validator().validate(null)).toBeTruthy();
    });
  });

  it('validate returns false if the value is in the list', () => {
    expect(validator.validate('foo')).toBeFalsy();
  });

  it('validate returns true if the value is not in the list', () => {
    expect(validator.validate('baz')).toBeTruthy();
  });

  it('message returns a valid error message', () => {
    expect(validator.message()).toEqual('is not an accepted value.');
  });
});
