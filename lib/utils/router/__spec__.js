import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { startRouter } from './router';

describe('startRouter', () => {
  let render, router, routes;

  beforeEach(() => {
    routes = <div></div>;
    render = spyOn(ReactDOM, 'render');
  });

  describe('default', () => {
    beforeEach(() => {
      startRouter(routes);
      router = render.calls.mostRecent().args[0];
    });

    it('renders the router with the element', () => {
      expect(render).toHaveBeenCalledWith(router, document.getElementById('app'));
    });

    it('sets history from browser history module', () => {
      expect(router.props.history.prototype).toEqual(createBrowserHistory().prototype);
    });

    it('sets the routes of the router', () => {
      expect(router.props.children).toEqual(routes);
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
});
