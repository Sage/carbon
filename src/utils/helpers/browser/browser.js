import ReactDOM from 'react-dom';

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
   * Get the current document
   *
   * @return window
   */
  getDocument: () => {
    return document;
  },

  /**
   * Redirect to URL
   *
   * @method redirectTo
   * @param url => URL string format
   */
  redirectTo: (url) => {
    Browser.getWindow().location = url;
  },

  /**
   * Reload the current page
   *
   * @method reload
   */
  reload: () => {
    Browser.getWindow().location.reload();
  },

  /**
   * Focuses and sets cursor of input field
   *
   * @method editFocus
   */
  editFocus: ((ref) => {
    let node = ReactDOM.findDOMNode(ref._input);
    node.focus();
    node.select();
  }),

  /**
   * Sets a cookie where name=value
   *
   * @param {Object} options includes expires or max-age
   * @method setCookie
   */
  setCookie: ((name, value, options ={}) => {
    let cookie = `${ name }=${ value }`;

    if (options.expires) { cookie += `; expires=${ options.expires }`; }
    if (options['max-age']) { cookie += `; max-age=${ options['max-age'] }`; }

    Browser.getDocument().cookie = cookie;
  }),

  /**
   * Returns a cookies value by passed name
   *
   * @param {String} name cookie name key
   * @method getCookieValueByName
   */
  getCookie: ((name) => {
    let cookies = Browser.getDocument().cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim().split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
  })
};

export default Browser;
