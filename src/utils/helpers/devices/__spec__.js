import Devices from './devices';

describe('devices', () => {
  let _window, _navigator;

  beforeEach(() => {
    _window = {};
    _navigator = {};
  });

  describe('isTouchDevice', () => {
    describe('When it is a touch device', () => {
      beforeEach(() => {
        _window.ontouchstart = () => {};
        _navigator.MaxTouchPoints = 10;
        _navigator.msMaxTouchPoints = 10;
      });

      describe('when browsing in Chrome or Firefox', () => {
        it('returns true', () => {
          expect(Devices.isTouchDevice(_window, _navigator)).toBeTruthy();
        });
      });

      describe('when browsing in Safari', () => {
        it('returns true', () => {
          expect(Devices.isTouchDevice(_window, _navigator)).toBeTruthy();
        });
      });

      describe('when browsing in Internet Explorer', () => {
        it('returns true', () => {
          expect(Devices.isTouchDevice(_window, _navigator)).toBeTruthy();
        });
      });
    });

    describe('when it is not a touch device', () => {
      beforeEach(() => {
        _navigator.MaxTouchPoints = 0;
        _navigator.msMaxTouchPoints = 0;
      });

      it('returns false', () => {
        expect(Devices.isTouchDevice(_window, _navigator)).toBeFalsy();
      });
    });
  });
});
