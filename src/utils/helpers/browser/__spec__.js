import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Form from './../../../components/form';
import Browser from './browser';

describe('Browser', () => {
  let _window;
  const elem = mount(
    <div className='foo bar baz' />
  );

  beforeEach(() => {
    _window = {
      location: null
    };
  });

  describe('redirects', () => {
    const urlSample = 'http://bla';

    beforeEach(() => {
      spyOn(Browser, 'getWindow').and.returnValue(_window);
    });

    describe('redirectTo', () => {
      describe('when url is passed', () => {
        it('redirects to url', () => {
          Browser.redirectTo(urlSample);
          expect(_window.location).toEqual(urlSample);
        });
      });
    });

    describe('redirectAfter', () => {
      const seconds = 5;

      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('redirects to the url after the given number of seconds', () => {
        Browser.redirectAfter(urlSample, seconds);

        expect(_window.location).toBeNull();
        jest.advanceTimersByTime(seconds * 1000);
        expect(_window.location).toEqual(urlSample);
      });

      it('returns the timeout ID', () => {
        const timeoutId = Browser.redirectAfter(urlSample, seconds);
        expect(timeoutId).toBeGreaterThan(0);
      });
    });
  });

  describe('isDomAvailable', () => {
    it('returns the window object', () => {
      expect(Browser.isDomAvailable()).toBe(true);
    });
  });

  describe('isDomAvailable when window is undefined', () => {
    it('returns the window object', () => {
      spyOn(Browser, 'getWindow').and.returnValue(undefined);
      expect(Browser.isDomAvailable()).toBe(false);
    });
  });

  describe('isDomAvailable when document is undefined', () => {
    it('returns the window object', () => {
      spyOn(Browser, 'getDocument').and.returnValue(undefined);
      expect(Browser.isDomAvailable()).toBe(false);
    });
  });

  describe('when document.createElement does not exist', () => {
    it('returns false', () => {
      spyOn(Browser, 'getDocument').and.returnValue({ createElement: undefined });
      expect(Browser.isDomAvailable()).toEqual(false);
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

  describe('getActiveElement', () => {
    it('returns the document.activeElement', () => {
      expect(Browser.getActiveElement()).toEqual(document.activeElement);
    });
  });

  describe('reload', () => {
    it('calls the windows location relaod method', () => {
      const spy = jasmine.createSpy('reload');
      _window = { location: { reload: spy } };

      spyOn(Browser, 'getWindow').and.returnValue(_window);

      Browser.reload();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('edit-focus', () => {
    it('focuses on the input field of the passed in ref', () => {
      const node = { focus: jest.fn(), select: jest.fn() }

      spyOn(ReactDOM, 'findDOMNode').and.returnValue(node);
      Browser.editFocus('fakeRef');
      expect(node.focus).toHaveBeenCalled();
      expect(node.select).toHaveBeenCalled();
    });
  });

  describe('setInputFocus', () => {
    it('focuses on the input field of the passed in ref but doesnot select text', () => {
      const node = { focus: jest.fn() }

      let fakeComponent = { _input: {} };
      spyOn(ReactDOM, 'findDOMNode').and.returnValue(node);
      Browser.setInputFocus(fakeComponent);
      expect(node.focus).toHaveBeenCalled();
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
            const date = new Date();
            date.setDate(date.getDate() + 1);
            Browser.setCookie('foo', 'bar', { expires: date });
            // Cannot check expiration date from document api
            expect(Browser.getDocument().cookie).toEqual('foo=bar');
          });

          it('does not add a cookie when expiration is in the passed', () => {
            const date = new Date();
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

  describe('postToNewWindow', () => {
    const url = '/foo';
    const key1 = 'foo';
    const value1 = 'foo';
    const key2 = 'bar';
    const value2 = 'bar';
    const data = { [key1]: value1, [key2]: value2 };
    let origSubmitForm;

    beforeEach(() => {
      origSubmitForm = Browser.submitForm;
      Browser.submitForm = jest.fn();
      spyOn(Browser, 'getDocument').and.returnValue(document);
    });

    afterEach(() => {
      Browser.submitForm = origSubmitForm;
    });

    describe('when container not found', () => {
      it('creates a container', () => {
        spyOn(document.body, 'appendChild');
        Browser.postToNewWindow(url, { foo: 'bar' });
        expect(document.body.appendChild).toHaveBeenCalled();
      });
    });

    describe('when container found', () => {
      it('does not create a container', () => {
        addPostFormDiv();

        spyOn(document.body, 'appendChild');
        Browser.postToNewWindow(url, data);
        expect(document.body.appendChild).not.toHaveBeenCalled();
      });
    });

    it('renders a form in the container', () => {
      spyOn(React, 'createElement').and.callThrough();
      spyOn(ReactDOM, 'render');

      Browser.postToNewWindow(url, data);

      expect(ReactDOM.render).toHaveBeenCalledWith(
        jasmine.any(Object), // Create Element call
        document.getElementById('carbonPostFormContainer'),
        jasmine.any(Function) // Anon Function
      );

      expect(React.createElement).toHaveBeenCalledWith('form', {
        action: url, method: 'post', target: '_blank'
      }, jasmine.anything());
    });

    it('renders a hidden input for each data member', () => {
      spyOn(React, 'createElement').and.callThrough();
      Browser.postToNewWindow(url, data);
      expect(React.createElement).toHaveBeenCalledWith(
        'input',
        { type: 'hidden', key: key1, name: key1, value: value1 }
      );
      expect(React.createElement).toHaveBeenCalledWith(
        'input',
        { type: 'hidden', key: key2, name: key2, value: value2 }
      );
    });

    it('submits the rendered form', () => {
      const spy = jest.spyOn(Browser, 'submitForm');
      Browser.postToNewWindow(url, data);
      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });

    it('unmounts the rendered form', () => {
      spyOn(ReactDOM, 'unmountComponentAtNode').and.callThrough();
      Browser.postToNewWindow(url, data);
      expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalledWith(
        document.getElementById('carbonPostFormContainer')
      );
    });

    describe('when target option is passed', () => {
      it('sets the form target', () => {
        spyOn(React, 'createElement').and.callThrough();
        const target = 'some_window';

        Browser.postToNewWindow(url, data, target);
        expect(React.createElement).toHaveBeenCalledWith('form', {
          action: url, method: 'post', target
        }, jasmine.anything());
      });
    });
  });

  describe('submitForm', () => {
    it('calls submit on the passed form', () => {
      const mockForm = {
        submit: jest.fn()
      };
      Browser.submitForm(mockForm);
      expect(mockForm.submit).toHaveBeenCalled();
    });
  });
});

function addPostFormDiv() {
  const div = document.createElement('div');
  div.setAttribute('id', 'carbonPostFormContainer');
  document.body.appendChild(div);
}
