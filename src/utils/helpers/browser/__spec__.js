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
        Browser.redirectUrl(urlsample, _window);
        expect(_window.location).toEqual(urlsample);
      });
    });
  });
});
