'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

require('./../../promises');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A helper to make poll an endpoint with a GET request
 *
 * The helper takes the following params
 *
 * - queryOptions:
 * -- url - the url to make the GET request to
 * -- data - any data you wish to pass with the request
 * -- headers - any header you wish to pass with the request
 *
 * - functions: An object containing the custom functions
 * -- conditionMet: Use this to test a desired condition in the response and return a boolean.
 *                  If the condition is true, the callback will be executed.
 * -- conditionNotMetCallback: Called when condition not met and poller will retry
 * -- callback: A callback function to call when the conditionMet returns true
 * -- handleError: a callback function that takes an error and handles it
 * -- terminate: Use this to test a desired condition in the response and return a boolean.
 *               If the condition is true, the polling will end.
 * options:
 * -- interval - the interval after which the request is re-submitted
 * -- retries - number of times to re-submit the request before giving up
 * -- endTime - a time period after which to end the polling
 *
 * ===Example Usage===
 *
 * import Poller from 'carbon/lib/utils/helpers/poller';
 *
 * let queryOptions = {  url: '/foo/bar/1' }
 * let options = { interval: 5000 };
 * let functions = {
 *   conditionMet: function(response) => { return response.body.status === 'complete' };
 *   conditionNotMetCallback: function(response) => { notYetFunction(response) };
 *   callback: function(response) => { doSomethingFancy(reponse) };
 *   handleError: function(err) => { FlashMessage("Failed", err) };
 * }
 *
 * Poller(queryOptions, functions);
 */
exports.default = function (queryOptions, functions, options) {
  if (!setupValid(queryOptions, functions)) {
    return;
  }

  // set default options for unprovided options
  queryOptions = getQueryOptions(queryOptions);
  functions = getFunctions(functions);
  options = getOptions(options);

  return new Promise(function (resolve, reject) {
    // pollCount for use if retries option passed
    var pollCount = 1;

    (function poll() {
      if (pollCount > options.retries || Number(new Date()) > options.endTime) {
        console.warn('The poller has made too many requests - terminating poll'); // eslint-disable-line no-console
        return;
      }
      _superagent2.default.get(queryOptions.url).query(queryOptions.data).set(queryOptions.headers).end(function (err, response) {
        if (err) {
          if (functions.handleError) {
            return reject(functions.handleError(err));
          } else {
            return reject(console.error(err.message)); // eslint-disable-line no-console
          }
        } else if (functions.terminate(response)) {
          return resolve(response);
        } else if (functions.conditionMet(response)) {
          return resolve(functions.callback(response));
        } else {
          functions.conditionNotMetCallback(response);
          pollCount++;
          setTimeout(poll, options.interval);
        }
      });
    })();
  }).catch(function (err) {
    console.error(err); // eslint-disable-line no-console
  });
};

/**
 * Sets default queryOptions
 *
 * @method getQueryOptions
 * @return {Object} queryOptions
 */


function getQueryOptions(queryOptions) {
  return {
    url: queryOptions.url,
    data: queryOptions.data || {},
    headers: queryOptions.headers || {}
  };
}

/**
 * Sets default Options for poller
 *
 * @method getOptions
 * @return {Object} options
 */
function getOptions(options) {
  return {
    interval: options.interval || 3000,
    endTime: Number(new Date()) + options.endTime || Infinity,
    retries: options.retries || Infinity
  };
}

/**
 * Sets default functions for poller
 *
 * @method getFunctions
 * @return {Object} functions
 */
function getFunctions(functions) {
  return {
    callback: functions.callback || null,
    handleError: functions.handleError || null,
    conditionMet: functions.conditionMet || function () {
      return false;
    },
    conditionNotMetCallback: functions.conditionNotMetCallback || function () {
      return false;
    },
    terminate: functions.terminate || function () {
      return false;
    }
  };
}

/**
 * Checks that required params are present
 *
 * @method setupValid
 * @return {Boolean}
 */
function setupValid(queryOptions, functions) {
  if (queryOptions === null || typeof queryOptions.url === 'undefined') {
    console.error('You must provide a url to the poller'); // eslint-disable-line no-console
    return false;
  }

  if (typeof functions.conditionMet !== 'undefined' && typeof functions.callback === 'undefined') {
    console.error('You must provide a callback function if you are testing a condition with conditionMet'); // eslint-disable-line no-console
    return false;
  }
  return true;
}