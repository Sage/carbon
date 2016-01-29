'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.startRouter = startRouter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _historyLibCreateBrowserHistory = require('history/lib/createBrowserHistory');

var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);

/**
 * Handles boilerplate for starting the React Router with the given routes.
 *
 * You can import this function with the following:
 *
 *   import { startRouter } from 'carbon/lib/utils/router';
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
 * @return {void}
 */

function startRouter(routes) {
  var target = arguments.length <= 1 || arguments[1] === undefined ? document.getElementById('app') : arguments[1];

  var history = (0, _historyLibCreateBrowserHistory2['default'])();

  // render the router into the DOM
  _reactDom2['default'].render(_react2['default'].createElement(
    _reactRouter2['default'],
    { history: history },
    routes
  ), target);
}