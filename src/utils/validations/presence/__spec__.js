import ImmutableHelper from './../../helpers/immutable';
import Validator from './index';

describe('Presence Validator', () => {
  describe('Immutable data', () => {
    it('returns true when an id is present', () => {
      let data = ImmutableHelper.parseJSON({ id: 1, value: 'foo' });
      expect(Validator().validate(data)).toBeTruthy();
    });
    it('returns false when an id is NOT present', () => {
      let data = ImmutableHelper.parseJSON({ id: null, value: null });
      expect(Validator().validate(data)).toBeFalsy();
    });
  });

  describe('Non immuntable data', () => {
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
  });

  describe('asterisk', () => {
    it('returns true', () => {
      expect(Validator().asterisk).toBeTruthy();
    });
  });
});
