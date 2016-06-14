/**
* Browser Helper
*
* Provides helper methods for working with Browser behavior.
*
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Browser = {

  getWindow: function getWindow() {
    return window;
  },

  /**
  * Redirect to URL
  *
  * @method redirectUrl
  * @param url => URL string format
  * @param window global window object, set default so overrideable in tests.
  */
  redirectUrl: function redirectUrl(url) {
    Browser.getWindow().location = url;
  }
};

exports["default"] = Browser;
module.exports = exports["default"];