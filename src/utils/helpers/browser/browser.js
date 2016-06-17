/**
* Browser Helper

*
* Provides helper methods for working with Browser behavior.
*
*/
const Browser = {

  /**
   * Get the current window
   *
   * @return window
   */
  getWindow: () => {
    return window;
  },

  /**
  * Redirect to URL
  *
  * @method redirectUrl
  * @param url => URL string format
  */
  redirectUrl: (url) => {
    Browser.getWindow().location = url;
  },

  /**
  * Reload the current page
  *
  * @method reload
  */
  reload: () => {
    Browser.getWindow().location.reload();
  }
};

export default Browser;
