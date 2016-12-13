import Browser from './browser.js'
import ReactDOM from 'react-dom';

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

  describe('getDocument', () => {
    it('returns the document object', () => {
      expect(Browser.getDocument()).toEqual(document);
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

  describe('edit-focus', () => {
    it('focuses on the input field of the passed in ref', () => {
      let node = jasmine.createSpyObj(['focus', 'select']);
      spyOn(ReactDOM, 'findDOMNode').and.returnValue(node);
      Browser.editFocus('fakeRef');
      expect(node.focus).toHaveBeenCalled();
      expect(node.select).toHaveBeenCalled();
    });
  });

  describe('cookies', () => {
    afterEach(() => {
      // Remove foo cookie
      Browser.setCookie('foo', 'bar', { expires: 'Thu, 01 Jan 1970 00:00:00 GMT' });
    });

    describe('setCookie', () => {
      it('adds a cookie to the document', () => {
        Browser.setCookie('foo', 'bar');
        expect(Browser.getDocument().cookie).toEqual('foo=bar');
      });

      describe('options', () => {
        describe('when expires is passed', () => {
          it('adds expires date to the cookie', () => {
            let date = new Date();
            date.setDate(date.getDate() + 1);
            Browser.setCookie('foo', 'bar', { expires: date });
            // Cannot check expiration date from document api
            expect(Browser.getDocument().cookie).toEqual('foo=bar');
          });

          it('does not add a cookie when expiration is in the passed', () => {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            Browser.setCookie('foo', 'bar', { expires: date });
            // Cannot check expiration date from document api
            expect(Browser.getDocument().cookie).toEqual('');
          });
        });

        describe('when max-age is passed', () => {
          it('adds expires date to the cookie', () => {
            Browser.setCookie('foo', 'bar', { 'max-age': 1000 });
            // Cannot check expiration date from document api
            expect(Browser.getDocument().cookie).toEqual('foo=bar');
          });
        });
      });
    });

    describe('getCookie', () => {
      describe('when cookie exists', () => {
        it('returns the cookies value', () => {
          Browser.setCookie('foo', 'bar');
          expect(Browser.getCookie('foo')).toEqual('bar');
        });
      });

      describe('when cookie does not exist', () => {
        it('returns null', () => {
          expect(Browser.getCookie('foo')).toBeFalsy();
        });
      });
    });
  });
});
