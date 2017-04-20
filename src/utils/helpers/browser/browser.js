import React from 'react';
import ReactDOM from 'react-dom';
import { keys } from 'lodash';
import Form from './../../../components/form';

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
   * Get the current document location
   *
   * @return {Object} location
   */
  getLocation: () => {
    return Browser.getDocument().location;
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
  editFocus: (ref) => {
    let node = ReactDOM.findDOMNode(ref._input);
    node.focus();
    node.select();
  },

  /**
   * Sets a cookie where name=value
   *
   * @param {Object} options includes expires or max-age
   * @method setCookie
   */
  setCookie: (name, value, options = {}) => {
    let cookie = `${ name }=${ value }`;

    if (options.expires) { cookie += `; expires=${ options.expires }`; }
    if (options['max-age']) { cookie += `; max-age=${ options['max-age'] }`; }

    Browser.getDocument().cookie = cookie;
  },

  /**
   * Returns a cookies value by passed name
   *
   * @param {String} name cookie name key
   * @method getCookieValueByName
   */
  getCookie: (name) => {
    let cookies = Browser.getDocument().cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim().split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
  },

  /**
   * Extracts params from url
   *
   * @method extractUrlParams
   * @return {Object} Params as key value
   */
  extractUrlParams: () => {
    let params = Browser.getLocation().search;
    if (!params) { return {}; }

    return params.substring(1).split('&').reduce((accumulator, currentValue) => {
      const keyValue = currentValue.split('=');
      accumulator[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
      return accumulator;
    }, {});
  },

  /**
   * Submits POST in new window
   *
   * @method  postToNewWindow
   * @param   {String}  url     URL to POST to
   * @param   {Object}  data    Data to POST
   * @param   {Object}  target  Optional target window name
   * @return  {Void}
   */
  postToNewWindow: (url, data, target = '_blank') => {
    let doc = Browser.getDocument(),
        containerId = 'carbonPostFormContainer',
        container = doc.getElementById(containerId),
        form;

    if (!container) {
      container = doc.createElement('div');
      container.id = containerId;
      doc.body.append(container);
    }

    form = ReactDOM.render((
      <Form action={ url } method='post' target={ target } save={ false } cancel={ false }>
        { keys(data).map(key => <input type='hidden' key={ key } name={ key } value={ data[key] } />) }
      </Form>
    ), container);
    form.refs.form.submit();
    ReactDOM.unmountComponentAtNode(container);
  }
};

export default Browser;
