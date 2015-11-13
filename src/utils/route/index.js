import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

/**
 * Handles boilerplate for starting the React Router with the given routes.
 *
 * You can import this function with the following:
 *
 *   import { startRouter } from 'carbon/lib/utils/route';
 *
 * You can then use the function like this:
 *
 *   var routes = <Route />;
 *   startRouter(routes);
 *
 * You can also provide an optional second parameter if you want to manually tell
 * the router where it should render it's components (by default this uses an
 * element with an ID of 'app'):
 *
 *   var routes = <Route />;
 *   startRouter(routes, document.getElementById('foo'));
 *
 * @method startRouter
 * @param {Object} routes The routes to send to React Router.
 * @param {HTMLElement} target (optional) Where in the DOM should React render.
 */
export function startRouter(routes, target = document.getElementById('app')) {
  let history = createBrowserHistory();

  // render the router into the DOM
  ReactDOM.render((
    <Router history={ history }>
      { routes }
    </Router>
  ), target);
};
