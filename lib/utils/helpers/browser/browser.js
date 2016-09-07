"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  }
};

exports.default = Browser;