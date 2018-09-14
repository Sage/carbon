import React from 'react';
import ReactDOM from 'react-dom';
import { startRouter } from './router';
import { browserHistory } from 'react-router';

describe('startRouter', () => {
  let render, router, routes;

  beforeEach(() => {
    routes = <div></div>;
    render = spyOn(ReactDOM, 'render');
  });

  describe('default', () => {
    beforeEach(() => {
      spyOn(document, 'getElementById').and.returnValue('foo');
      startRouter(routes);
      router = render.calls.mostRecent().args[0];
    });

    it('sets history from browser history module', () => {
      expect(router.props.history).toEqual(browserHistory);
    });

    it('renders the router with the element', () => {
      expect(render).toHaveBeenCalledWith(router, document.getElementById('app'));
    });

    it('sets the routes of the router', () => {
      expect(router.props.children).toEqual(routes);
    });

    it('sets the router onUpdate to scroll to top', () => {
      window.scrollTo(1, 1);
      router.props.onUpdate();
      expect(window.screenX).toEqual(0);
      expect(window.screenY).toEqual(0);
    });

    it('sets the router onUpdate to track analytics', () => {
      let gaSpy = jasmine.createSpy('ga');
      global.ga = gaSpy;

      router.props.onUpdate();

      // Change last argument to '/' in response to this fix:
      // https://github.com/facebook/jest/pull/6792
      expect(gaSpy).toHaveBeenCalledWith('set', 'page', '/');
      expect(gaSpy).toHaveBeenCalledWith('send', 'pageview');
    });
  });

  describe('with custom target', () => {
    beforeEach(() => {
      startRouter(routes, 'foo');
      router = render.calls.mostRecent().args[0];
    });

    it('renders the router with the element', () => {
      expect(render).toHaveBeenCalledWith(router, 'foo');
    });
  });

  describe('with no target', () => {
    beforeEach(() => {
      spyOn(console, 'warn');
      startRouter(routes);
    });

    it('does not call render', () => {
      expect(render).not.toHaveBeenCalled();
    });
  });
});
