'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _form = require('./../../../components/form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
   * Get the current document
   *
   * @return window
   */
  getDocument: function getDocument() {
    return document;
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
  },

  /**
   * Focuses and sets cursor of input field
   *
   * @method editFocus
   */
  editFocus: function editFocus(ref) {
    var node = _reactDom2.default.findDOMNode(ref._input);
    node.focus();
    node.select();
  },

  /**
   * Sets a cookie where name=value
   *
   * @param {Object} options includes expires or max-age
   * @method setCookie
   */
  setCookie: function setCookie(name, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var cookie = name + '=' + value;

    if (options.expires) {
      cookie += '; expires=' + options.expires;
    }
    if (options['max-age']) {
      cookie += '; max-age=' + options['max-age'];
    }

    Browser.getDocument().cookie = cookie;
  },

  /**
   * Returns a cookies value by passed name
   *
   * @param {String} name cookie name key
   * @method getCookieValueByName
   */
  getCookie: function getCookie(name) {
    var cookies = Browser.getDocument().cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim().split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
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
  postToNewWindow: function postToNewWindow(url, data) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '_blank';

    var doc = Browser.getDocument(),
        containerId = 'carbonPostFormContainer',
        container = doc.getElementById(containerId),
        form = void 0;

    if (!container) {
      container = doc.createElement('div');
      container.id = containerId;
      doc.body.append(container);
    }

    form = _reactDom2.default.render(_react2.default.createElement(
      _form2.default,
      { action: url, method: 'post', target: target, save: false, cancel: false },
      (0, _lodash.keys)(data).map(function (key) {
        return _react2.default.createElement('input', { type: 'hidden', key: key, name: key, value: data[key] });
      })
    ), container);
    form.refs.form.submit();
    _reactDom2.default.unmountComponentAtNode(container);
  }
};

exports.default = Browser;