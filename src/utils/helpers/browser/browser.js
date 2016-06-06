/**
* Browser Helper
*
* Provides helper methods for working with Browser behavior.
*
*/
var Browser = {

  /**
  * Redirect to URL
  *
  * @method redirectUrl
  * @param url => URL string format
  * @param window global window object, set default so overrideable in tests.
  */
  redirectUrl: (url, win = window) => {
    win.location = url;
  }

};

export default Browser;
