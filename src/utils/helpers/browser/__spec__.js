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
});
