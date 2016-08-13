/*istanbul ignore next*/"use strict";

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
  getWindow: function /*istanbul ignore next*/getWindow() {
    return window;
  },

  /**
  * Redirect to URL
  *
  * @method redirectTo
  * @param url => URL string format
  */
  redirectTo: function /*istanbul ignore next*/redirectTo(url) {
    Browser.getWindow().location = url;
  },

  /**
  * Reload the current page
  *
  * @method reload
  */
  reload: function /*istanbul ignore next*/reload() {
    Browser.getWindow().location.reload();
  }
};

/*istanbul ignore next*/exports.default = Browser;