'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Browser Helper

*
* Provides helper methods for working with Browser behavior.
*
*/
var Browser = {

  /**
   * Get the current window
   *
   * @return window
   */
  getWindow: function getWindow() {
    return window;
  },

  /**
  * Redirect to URL
  *
  * @method redirectTo
  * @param url => URL string format
  */
  redirectTo: function redirectTo(url) {
    Browser.getWindow().location = url;
  },

  /**
  * Reload the current page
  *
  * @method reload
  */
  reload: function reload() {
    Browser.getWindow().location.reload();
  },

  /**
  * Focuses and sets cursor of input field
  *
  * @method editFocus
  */
  editFocus: function editFocus(ref) {
    var node = _reactDom2.default.findDOMNode(ref._input);
    node.focus();
    node.select();
  }
};

exports.default = Browser;