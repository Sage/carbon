import Browser from './browser.js'
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Form from './../../../components/form';

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

  describe('postToNewWindow', () => {
    let url = '/some/url/path',
        key1 = 'foo',
        value1 = 'bar',
        key2 = 'baz',
        value2 = 'quux',
        data = { [key1]: value1, [key2]: value2 },
        container = jasmine.createSpy('div'),
        body = jasmine.createSpyObj('body', ['append']),
        doc = jasmine.createSpyObj('document', ['getElementById', 'createElement']),
        formObject = jasmine.createSpy('form'),
        formComponent = jasmine.createSpy('formComponent'),
        formElement = jasmine.createSpyObj('formElement', ['submit']);

    beforeEach(() => {
      spyOn(Browser, 'getDocument').and.returnValue(doc);
      doc.getElementById.and.returnValue(container);
      doc.createElement.and.returnValue(container);
      doc.body = body;
      spyOn(React, 'createElement').and.returnValue(formObject);
      spyOn(ReactDOM, 'render').and.returnValue(formComponent);
      formComponent.refs = { form: formElement };
      spyOn(ReactDOM, 'unmountComponentAtNode');
    });

    describe('when container not found', () => {
      it('creates a container', () => {
        doc.getElementById = jasmine.createSpy();
        Browser.postToNewWindow(url, data);
        expect(doc.getElementById).toHaveBeenCalledWith('carbonPostFormContainer');
        expect(doc.createElement).toHaveBeenCalledWith('div');
        expect(container.id).toEqual('carbonPostFormContainer');
        expect(body.append).toHaveBeenCalledWith(container);
      });
    });

    describe('when container found', () => {
      it('does not create a container', () => {
        doc.createElement.calls.reset();
        body.append.calls.reset();
        Browser.postToNewWindow(url, data);
        expect(doc.getElementById).toHaveBeenCalledWith('carbonPostFormContainer');
        expect(doc.createElement).not.toHaveBeenCalled();
        expect(body.append).not.toHaveBeenCalled();
      });
    });

    it('renders a form in the container', () => {
      Browser.postToNewWindow(url, data);
      expect(React.createElement).toHaveBeenCalledWith(Form, {
        action: url, method: 'post', target: '_blank', save: false, cancel: false
      }, jasmine.anything());
      expect(ReactDOM.render).toHaveBeenCalledWith(formObject, container);
    });

    it('renders a hidden input for each data member', () => {
      Browser.postToNewWindow(url, data);
      expect(React.createElement).toHaveBeenCalledWith('input', { type: 'hidden', key: key1, name: key1, value: value1 });
      expect(React.createElement).toHaveBeenCalledWith('input', { type: 'hidden', key: key2, name: key2, value: value2 });
    });

    it('submits the rendered form', () => {
      Browser.postToNewWindow(url, data);
      expect(formElement.submit).toHaveBeenCalled();
    });

    it('unmounts the rendered form', () => {
      Browser.postToNewWindow(url, data);
      expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalledWith(container);
    });

    describe('when target option is passed', () => {
      it('sets the form target', () => {
        let target = 'some_window';

        Browser.postToNewWindow(url, data, target);
        expect(React.createElement).toHaveBeenCalledWith(Form, {
          action: url, method: 'post', target: target, save: false, cancel: false
        }, jasmine.anything());
      });
    });
  });
});
