import Browser from './browser.js'

describe('Browser', () => {
  let _window;

  beforeEach(() => {
    _window = {
      location: null
    }
  });

  describe('redirectUrl', () => {
    describe('when url is passed', () => {
      let urlsample = 'http://bla';

      it('redirects to url', () => {
        spyOn(Browser, 'getWindow').and.returnValue(_window);

        Browser.redirectUrl(urlsample);
        expect(_window.location).toEqual(urlsample);
      });
    });
  });

  describe('bWindow getter', () => {
    it('returns the window object', () => {
      expect(Browser.getWindow()).toEqual(window);
    });
  });
});
