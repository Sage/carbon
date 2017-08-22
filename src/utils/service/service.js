import axios from 'axios';
import { assign } from 'lodash';
import Logger from '../logger';

/**
 * Global configuration for all service classes.
 */
const config = {
  csrfToken: null, // defines the CSRF token if required by your web application
  onSuccess: null, // defines a callback to trigger on every successful response
  onError: null    // defines a callback to trigger on every erroneous response
};

class Service {
  /**
   * Allows the global config data to be set for your application.
   * eg. Service.configure({ csrfToken: global.CSRF_TOKEN });
   *
   * @method configure
   * @param {Object} opts - see config object above
   * @return {Void}
   */
  static configure(opts) {
    assign(config, config, opts);
  }

  /**
   * @constructor
   */
  constructor(opts = {}) {
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
    this.setURL = this.setURL.bind(this);
    this.setTransformResponse = this.setTransformResponse.bind(this);
    this.setTransformRequest = this.setTransformRequest.bind(this);
    this.enableGlobalCallbacks = this.enableGlobalCallbacks.bind(this);
    this.disableGlobalCallbacks = this.disableGlobalCallbacks.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.responseTransform = this.responseTransform.bind(this);
    this.shouldTriggerCallback = this.shouldTriggerCallback.bind(this);

    // sets up the axios client with default options
    this.client = axios.create({
      headers: {
        'X-CSRF-Token': config.csrfToken,
        Accept: 'application/json',
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
  handleSuccess(response) {
    if (!response.data.message) {
      return response.data;
    }

    if (response.data.status === 'error') {
      // respond with an error if the server responds with an error status
      if (this.shouldTriggerCallback(config.onError)) {
        config.onError(response.data.message);
      }

      return Promise.reject(response);
    }

    // in other cases, default to 'success'
    if (this.shouldTriggerCallback(config.onSuccess)) {
      config.onSuccess(response.data.message);
    }

    return response.data;
  }

  /**
   * Is called after an erroneous response from the server.
   *
   * @method handleError
   * @param {Object} error - the response from the server
   * @return {Object}
   */
  handleError(error) {
    if (this.shouldTriggerCallback(config.onError)) {
      config.onError(error.response.data);
    }

    return Promise.reject(error.response);
  }

  /**
   * Sets the base URL for axios to use for all requests using this class.
   *
   * @method setURL
   * @param {String} url
   * @return {Void}
   */
  setURL(url) {
    this.client.defaults.baseURL = url;
  }

  /**
   * Sets a function to run before a request is made, allowing manipulation of the data.
   *
   * @method setTransformRequest
   * @param {Function} func
   * @return {Void}
   */
  setTransformRequest(func) {
    this.client.defaults.transformRequest[1] = func;
  }

  /**
   * Sets a function to run before a response is received, allowing manipulation of the data.
   *
   * @method setTransformResponse
   * @param {Function} func
   * @return {Void}
   */
  setTransformResponse(func) {
    this.client.defaults.transformResponse[1] = func;
  }

  /**
   * Enables global callbacks (eg onSuccess and onError).
   *
   * @method enableGlobalCallbacks
   * @return {Void}
   */
  enableGlobalCallbacks() {
    this.globalCallbacks = true;
  }

  /**
   * Disables global callbacks (eg onSuccess and onError).
   *
   * @method disableGlobalCallbacks
   * @return {Void}
   */
  disableGlobalCallbacks() {
    this.globalCallbacks = false;
  }

  /**
   * Performs a GET request to the server.
   *
   * @method get
   * @param {Number} id - the ID of the resource.
   * @param {Object} options - an object with options for query params and success/error callbacks
   * @param {Function} _onError - [Deprecated] a callback to trigger on error
   * @return {Void}
   */
  get(id, options, _onError) {
    let request;

    if (typeof (options) === 'function') {
      Logger.deprecate('Passing onSuccess and onError as separate arguments is deprecated. Please use `get(1, { onSuccess: function, onError: function, params { k: "v" } })`'); // eslint-disable-line max-len

      request = this.client.get(String(id));

      request.then(
        this.handleResponse.bind(this, options),
        this.handleResponse.bind(this, _onError)
      );
    } else {
      if (typeof (options.params) === 'undefined') {
        options.params = {};
      }

      request = this.client.get(String(id),
        {
          params: options.params
        });

      request.then(
        this.handleResponse.bind(this, options.onSuccess),
        this.handleResponse.bind(this, options.onError)
      );
    }
  }

  /**
   * Performs a POST request to the server.
   *
   * @method post
   * @param {Object} data - the data to post to the server.
   * @param {Object} options - an object with options for query params and success/error callbacks
   * @param {Function} _onError - [Deprecated] a callback to trigger on error
   * @return {Void}
   */
  post(data, options, _onError) {
    let request;

    if (typeof (options) === 'function') {
      Logger.deprecate("Passing onSuccess and onError as separate arguments is deprecated. Please use `post('', { data_key: 'data_val' }, { onSuccess: function, onError: function, params { k: 'v' } })`"); // eslint-disable-line max-len
      request = this.client.post('', data);

      request.then(
        this.handleResponse.bind(this, options),
        this.handleResponse.bind(this, _onError)
      );
    } else {
      if (typeof (options.params) === 'undefined') {
        options.params = {};
      }

      request = this.client.post('',
        {
          params: options.params
        });

      request.then(
        this.handleResponse.bind(this, options.onSuccess),
        this.handleResponse.bind(this, options.onError)
      );
    }
  }

  /**
   * Performs a PUT request to the server.
   *
   * @method put
   * @param {Number} id - the ID of the resource.
   * @param {Object} data - the data to post to the server.
   * @param {Object} options - an object with options for query params and success/error callbacks
   * @param {Function} _onError - [Deprecated] a callback to trigger on error
   * @return {Void}
   */
  put(id, data, options, _onError) {
    let request;

    if (typeof (options) === 'function') {
      Logger.deprecate("Passing onSuccess and onError as separate arguments is deprecated. Please use `put(1, { data_key: 'data_val' }, { onSuccess: function, onError: function, params { k: 'v' } })`"); // eslint-disable-line max-len
      request = this.client.put(String(id), data);

      request.then(
        this.handleResponse.bind(this, options),
        this.handleResponse.bind(this, _onError)
      );
    } else {
      if (typeof (options.params) === 'undefined') {
        options.params = {};
      }

      request = this.client.put(String(id), data,
        {
          params: options.params
        });

      request.then(
        this.handleResponse.bind(this, options.onSuccess),
        this.handleResponse.bind(this, options.onError)
      );
    }
  }

  /**
   * Performs a DEL request to the server.
   *
   * @method delete
   * @param {Number} id - the ID of the resource.
   * @param {Object} options - an object with options for query params and success/error callbacks
   * @param {Function} _onError - [Deprecated] a callback to trigger on error
   * @return {Void}
   */
  delete(id, options, _onError) {
    let request;

    if (typeof (options) === 'function') {
      Logger.deprecate("Passing onSuccess and onError as separate arguments is deprecated. Please use `delete(1, { onSuccess: function, onError: function, params { k: 'v' } })`"); // eslint-disable-line max-len
      request = this.client.delete(String(id));

      request.then(
        this.handleResponse.bind(this, options),
        this.handleResponse.bind(this, _onError)
      );
    } else {
      if (typeof (options.params) === 'undefined') {
        options.params = {};
      }

      request = this.client.delete(String(id),
        {
          params: options.params
        });

      request.then(
        this.handleResponse.bind(this, options.onSuccess),
        this.handleResponse.bind(this, options.onError)
      );
    }
  }

  /**
   * Handles all responses from the axios promise.
   *
   * @method handleResponse
   * @param {Function} callback
   * @param {Object} response
   * @return {Void}
   */
  handleResponse(callback, response) {
    if (callback) {
      callback(response);
    }
  }

  /**
   * A default response transformer, to convert the data into something useful for devs.
   *
   * @method responseTransform
   * @param {Object}
   * @return {Void}
   */
  responseTransform(response) {
    return JSON.parse(response);
  }

  /**
   * Determines if a callback should be triggered.
   *
   * @method shouldTriggerCallback
   * @param {Function}
   * @return {Boolean}
   */
  shouldTriggerCallback(method) {
    return this.globalCallbacks && method;
  }
}

export default Service;
