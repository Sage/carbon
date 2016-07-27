/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = undefined;
exports.startRouter = startRouter;

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_reactDom = require('react-dom');

/*istanbul ignore next*/
var _reactDom2 = _interopRequireDefault(_reactDom);

var /*istanbul ignore next*/_reactRouter = require('react-router');

/*istanbul ignore next*/
var _reactRouter2 = _interopRequireDefault(_reactRouter);

var /*istanbul ignore next*/_createBrowserHistory = require('history/lib/createBrowserHistory');

/*istanbul ignore next*/
var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrollToTop = function scrollToTop() {
  window.scrollTo(0, 0);
};

/**
 * Exposes the history object to allow developers to redirect and control the
 * route state (see https://github.com/ReactJSTraining/history/tree/master/docs)
 *
 * @property history
 * @type {Object}
 */
var history = /*istanbul ignore next*/exports.history = /*istanbul ignore next*/(0, _createBrowserHistory2.default)();

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
  /*istanbul ignore next*/var target = arguments.length <= 1 || arguments[1] === undefined ? document.getElementById('app') : arguments[1];

  // render the router into the DOM
  if (target) {
    /*istanbul ignore next*/_reactDom2.default.render( /*istanbul ignore next*/_react2.default.createElement(
      /*istanbul ignore next*/_reactRouter2.default,
      /*istanbul ignore next*/{ onUpdate: scrollToTop, history: history },
      routes
    ), target);
  }
}