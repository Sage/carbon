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
   * Get the current activeElement
   *
   * @return HTMLElement
   */
  getActiveElement: () => {
    const doc = Browser.getDocument();
    return doc.activeElement;
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
    const node = ReactDOM.findDOMNode(ref._input); // eslint-disable-line react/no-find-dom-node
    node.focus();
    node.select();
  },

  /**
   * Focuses and sets cursor of react node
   *
   * @method setFocus
   */
  setFocus: (reactNode) => {
    const node = ReactDOM.findDOMNode(reactNode); // eslint-disable-line react/no-find-dom-node
    node.focus();
  },

  /**
   *  Focuses and sets cursor of input field but does not select text
   *
   * @method setInputFocus
   */
  setInputFocus: (inputComponent) => {
    Browser.setFocus(inputComponent._input);
  },

  /**
   * Sets a cookie where name=value
   *
   * @param {Object} options includes expires or max-age
   * @method setCookie
   */
  setCookie: (name, value, options = {}) => {
    let cookie = `${name}=${value}`;

    if (options.expires) { cookie += `; expires=${options.expires}`; }
    if (options['max-age']) { cookie += `; max-age=${options['max-age']}`; }

    Browser.getDocument().cookie = cookie;
  },

  /**
   * Returns a cookies value by passed name
   *
   * @param {String} name cookie name key
   * @method getCookieValueByName
   */
  getCookie: (name) => {
    const cookies = Browser.getDocument().cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim().split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
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
    const doc = Browser.getDocument(),
        containerId = 'carbonPostFormContainer';

    let container = doc.getElementById(containerId);

    if (!container) {
      container = doc.createElement('div');
      container.setAttribute('id', containerId);
      doc.body.appendChild(container);
    }

    ReactDOM.render((
      <Form action={ url } method='post' target={ target } save={ false } cancel={ false }>
        { keys(data).map((key) => {
          return <input type='hidden' key={ key } name={ key } value={ data[key] } />;
        }) }
      </Form>
    ), container, function() {
      Browser.submitForm(this._form);
    });
    ReactDOM.unmountComponentAtNode(container);
  },

  /**
   * Submits a passed Form
   *
   * @method submitForm
   * @param {HTML Form} form to submit
   */
  submitForm: (form) => {
    form.submit();
  }
};

export default Browser;
