import AutoFocus from './auto-focus';
import guid from '../guid';

describe('AutoFocus', () => {
  describe('default', () => {
    it('returns autoFocus false', () => {
      expect(AutoFocus.default().autoFocus).toBeFalsy();
    });

    it('returns a 36 character length id', () => {
      expect(AutoFocus.default().key.length).toEqual(36);
    });

    it('returns a unique id', () => {
      const id = guid();
      expect(AutoFocus.default().key).not.toEqual(id);
    });
  });

  describe('based on previous', () => {
    let previous;

    beforeEach(() => {
      previous = {
        key: '0',
        autoFocus: true
      };
    });

    describe('default', () => {
      describe('when pass extra params', () => {
        it('returns autoFocus true', () => {
          expect(AutoFocus.default(previous.key, previous.autoFocus).autoFocus).toBeTruthy();
        });

        it('returns a 1 character length id', () => {
          expect(AutoFocus.default(previous.key, previous.autoFocus).key.length).toEqual(1);
        });
      });
    });

    describe('getKey', () => {
      it('returns new key if autoFocus prop changed', () => {
        expect(AutoFocus.getKey(false)).not.toEqual(previous.key);
        expect(AutoFocus.getKey(false, previous)).not.toEqual(previous.key);
      });

      it('returns old key if autoFocus prop did not change', () => {
        expect(AutoFocus.getKey(true, previous)).toEqual(previous.key);
      });
    });
  });
});
