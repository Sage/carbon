import Request from 'superagent';
import './../../promises';

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
export default (queryOptions, functions, options) => {
  if (!setupValid(queryOptions, functions)) {
    return undefined;
  }

  // set default options for unprovided options
  const queryOpts = getQueryOptions(queryOptions);
  const funcs = getFunctions(functions);
  const opts = getOptions(options);

  // pollCount for use if retries option passed
  let pollCount = 1;

  (function poll() {
    const now = Date.now();
    if (pollCount > opts.retries || now > opts.endTime) {
      console.warn('The poller has made too many requests - terminating poll'); // eslint-disable-line no-console
      return;
    }
    Request
      .get(queryOpts.url)
      .query(queryOpts.data)
      .set(queryOpts.headers)
      .end((err, response) => {
        let result;

        if (err) {
          if (funcs.handleError) {
            result = funcs.handleError(err);
          } else {
            result = console.error(err.message); // eslint-disable-line no-console
          }
        } else if (funcs.terminate(response)) {
          result = response;
        } else if (funcs.conditionMet(response)) {
          result = funcs.callback(response);
        } else {
          funcs.conditionNotMetCallback(response);
          pollCount += 1;
          setTimeout(poll, opts.interval);
        }

        return result;
      });
  }());
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
    endTime: Date.now() + options.endTime || Infinity,
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
    conditionMet: functions.conditionMet || (() => { return false; }),
    conditionNotMetCallback: functions.conditionNotMetCallback || (() => { return false; }),
    terminate: functions.terminate || (() => { return false; })
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
    const msg = 'You must provide a callback function if you are testing a condition with conditionMet';
    console.error(msg); // eslint-disable-line no-console
    return false;
  }
  return true;
}
