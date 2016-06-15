/**
* Browser Helper
*
* Provides helper methods for working with Browser behavior.
*
*/
const Browser = {

  getWindow: () => {
    return window;
  },

  /**
  * Redirect to URL
  *
  * @method redirectUrl
  * @param url => URL string format
  * @param window global window object, set default so overrideable in tests.
  */
  redirectUrl: (url) => {
    Browser.getWindow().location = url;
  }
};

export default Browser;
