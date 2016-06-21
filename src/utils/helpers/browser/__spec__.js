import Browser from './browser.js'

describe('Browser', () => {
  let _window;

  beforeEach(() => {
    _window = {
      location: null
    }
  });

  describe('redirectTo', () => {
    describe('when url is passed', () => {
      let urlsample = 'http://bla';

      it('redirects to url', () => {
        spyOn(Browser, 'getWindow').and.returnValue(_window);

        Browser.redirectTo(urlsample);
        expect(_window.location).toEqual(urlsample);
      });
    });
  });

  describe('getWindow', () => {
    it('returns the window object', () => {
      expect(Browser.getWindow()).toEqual(window);
    });
  });

  describe('reload', () => {
    it('calls the windows location relaod method', () => {
      let spy = jasmine.createSpy('reload');
      _window = { location: { reload: spy } };

      spyOn(Browser, 'getWindow').and.returnValue(_window);

      Browser.reload();
      expect(spy).toHaveBeenCalled();
    });
  });
});
