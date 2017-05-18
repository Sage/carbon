'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Global configuration for all service classes.
 */
var config = {
  csrfToken: null, // defines the CSRF token if required by your web application
  onSuccess: null, // defines a callback to trigger on every successful response
  onError: null // defines a callback to trigger on every erroneous response
};

var Service = function () {
  _createClass(Service, null, [{
    key: 'configure',

    /**
     * Allows the global config data to be set for your application.
     * eg. Service.configure({ csrfToken: global.CSRF_TOKEN });
     *
     * @method configure
     * @param {Object} opts - see config object above
     * @return {Void}
     */
    value: function configure(opts) {
      (0, _lodash.assign)(config, config, opts);
    }

    /**
     * @constructor
     */

  }]);

  function Service() {
    var _this = this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Service);

    this.handleSuccess = function (response) {
      if (!response.data.message) {
        return response.data;
      }

      if (response.data.status === "error") {
        // respond with an error if the server responds with an error status
        if (_this.shouldTriggerCallback(config.onError)) {
          config.onError(response.data.message);
        }

        return Promise.reject(response);
      } else {
        // otherwise respond with a success
        if (_this.shouldTriggerCallback(config.onSuccess)) {
          config.onSuccess(response.data.message);
        }

        return response.data;
      }
    };

    this.handleError = function (error) {
      if (_this.shouldTriggerCallback(config.onError)) {
        config.onError(error.response.data);
      }

      return Promise.reject(error.response);
    };

    this.setURL = function (url) {
      _this.client.defaults.baseURL = url;
    };

    this.setTransformRequest = function (func) {
      _this.client.defaults.transformRequest[1] = func;
    };

    this.setTransformResponse = function (func) {
      _this.client.defaults.transformResponse[1] = func;
    };

    this.enableGlobalCallbacks = function () {
      _this.globalCallbacks = true;
    };

    this.disableGlobalCallbacks = function () {
      _this.globalCallbacks = false;
    };

    this.get = function (id, onSuccess, onError) {
      _this.client.get(String(id)).then(_this.handleResponse.bind(_this, onSuccess), _this.handleResponse.bind(_this, onError));
    };

    this.post = function (data, onSuccess, onError) {
      _this.client.post('', data).then(_this.handleResponse.bind(_this, onSuccess), _this.handleResponse.bind(_this, onError));
    };

    this.put = function (id, data, onSuccess, onError) {
      _this.client.put(String(id), data).then(_this.handleResponse.bind(_this, onSuccess), _this.handleResponse.bind(_this, onError));
    };

    this.delete = function (id, onSuccess, onError) {
      _this.client.delete(String(id)).then(_this.handleResponse.bind(_this, onSuccess), _this.handleResponse.bind(_this, onError));
    };

    this.handleResponse = function (callback, response) {
      if (callback) {
        callback(response);
      }
    };

    this.responseTransform = function (response) {
      return JSON.parse(response);
    };

    this.shouldTriggerCallback = function (method) {
      return _this.globalCallbacks && method;
    };

    // sets up the axios client with default options
    this.client = _axios2.default.create({
      headers: {
        'X-CSRF-Token': config.csrfToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      transformResponse: [this.responseTransform]
    });

    // applies the default axios interceptors used for manipulating the data
    this.client.interceptors.response.use(this.handleSuccess, this.handleError);

    // turns any configured global callbacks on by default
    if (opts.globalCallbacks !== false) {
      this.enableGlobalCallbacks();
    }
  }

  /**
   * Is called after a successful response from the server, and determines how
   * to handle the response.
   *
   * @method handleSuccess
   * @param {Object} response - the reponse from the server
   * @return {Object} the response data
   */


  /**
   * Is called after an erroneous response from the server.
   *
   * @method handleError
   * @param {Object} error - the response from the server
   * @return {Object}
   */


  /**
   * Sets the base URL for axios to use for all requests using this class.
   *
   * @method setURL
   * @param {String} url
   * @return {Void}
   */


  /**
   * Sets a function to run before a request is made, allowing manipulation of the data.
   *
   * @method setTransformRequest
   * @param {Function} func
   * @return {Void}
   */


  /**
   * Sets a function to run before a response is received, allowing manipulation of the data.
   *
   * @method setTransformResponse
   * @param {Function} func
   * @return {Void}
   */


  /**
   * Enables global callbacks (eg onSuccess and onError).
   *
   * @method enableGlobalCallbacks
   * @return {Void}
   */


  /**
   * Disables global callbacks (eg onSuccess and onError).
   *
   * @method disableGlobalCallbacks
   * @return {Void}
   */


  /**
   * Performs a GET request to the server.
   *
   * @method get
   * @param {Number} id - the ID of the resource.
   * @param {Function} onSuccess - a callback to trigger on success
   * @param {Function} onError - a callback to trigger on error
   * @return {Void}
   */


  /**
   * Performs a POST request to the server.
   *
   * @method post
   * @param {Object} data - the data to post to the server.
   * @param {Function} onSuccess - a callback to trigger on success
   * @param {Function} onError - a callback to trigger on error
   * @return {Void}
   */


  /**
   * Performs a PUT request to the server.
   *
   * @method put
   * @param {Number} id - the ID of the resource.
   * @param {Object} data - the data to post to the server.
   * @param {Function} onSuccess - a callback to trigger on success
   * @param {Function} onError - a callback to trigger on error
   * @return {Void}
   */


  /**
   * Performs a DEL request to the server.
   *
   * @method delete
   * @param {Number} id - the ID of the resource.
   * @param {Function} onSuccess - a callback to trigger on success
   * @param {Function} onError - a callback to trigger on error
   * @return {Void}
   */


  /**
   * Handles all responses from the axios promise.
   *
   * @method handleResponse
   * @param {Function} callback
   * @param {Object} response
   * @return {Void}
   */


  /**
   * A default response transformer, to convert the data into something useful for devs.
   *
   * @method responseTransform
   * @param {Object}
   * @return {Void}
   */


  /**
   * Determines if a callback should be triggered.
   *
   * @method shouldTriggerCallback
   * @param {Function}
   * @return {Boolean}
   */


  return Service;
}();

exports.default = Service;