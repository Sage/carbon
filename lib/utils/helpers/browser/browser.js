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
  * @method redirectUrl
  * @param url => URL string format
  */
  redirectUrl: function redirectUrl(url) {
    Browser.getWindow().location = url;
  },

  /**
  * Reload the current page
  *
  * @method reload
  */
  reload: function reload() {
    Browser.getWindow().location.reload();
  }
};

exports["default"] = Browser;
module.exports = exports["default"];