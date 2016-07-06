import Request from 'superagent';
import './../../promises';

/**
 * A helper to make poll an endpoint with a GET request
 *
 * The helper takes the following params
 * - queryOptions: an object containing the url, optional data object with additional params, and a headers object
 * -- url,
 * -- data,
 * -- headers
 * - timeout: the time period after which the request is re-submitted
 * - functions: An object containing the custom functions
 * --  conditionMet: Use this to return a test a desired condition and return a boolean.
 * --  callback: A callback function to call when the conditionMet returns true
 * --  handleError: a callback function that takes an error and handles it.
 *
 * ===Example Usage===
 *
 * import poller from 'carbon/lib/utils/helpers/poller';
 *
 * let options = {url: 'http://foo/bar/1'};
 * let timeout = 10000;
 * let functions = {
 *   conditionMet: function(response) => { return response.body.status === 'complete' };
 *   callback: function(response) => { doSomethingFancy(reponse) };
 *   handleError: function(err) => { FlashMessage("Failed", err) };
 *}
 *
 * poller(options, timeout, conditionMet, callback, handleError);
 *
 */

function getQueryOptions(queryOptions) {
  return {
    url: queryOptions.url,
    data: queryOptions.data || {},
    headers: queryOptions.headers || {}
  };
}

function getOptions(options) {
  return {
    interval: options.interval || 3000,
    endTime:  Number(new Date()) + options.endTime || Infinity,
    retries: options.retries || Infinity
  };
}

function getFunctions(functions) {
  return {
    callback: functions.callback,
    handleError: functions.handleError || null,
    conditionMet: functions.conditionMet || (() => { return false; }),
    terminate: functions.terminate || (() => { return false; })
  };
}

function setupValid(queryOptions, functions) {
  if (queryOptions === null || typeof queryOptions.url === 'undefined') {
    console.error('You must provide a url to the poller'); // eslint-disable-line no-console
    return false;
  }

  if (typeof functions.callback === 'undefined') {
    console.error('You must provide a callback function to the poller'); // eslint-disable-line no-console
    return false;
  }
  return true;
}

export default (queryOptions, functions, options) => {
  if (!setupValid(queryOptions, functions)) {
    return;
  }

  // set default options for unprovided options
  queryOptions = getQueryOptions(queryOptions);
  functions = getFunctions(functions);
  options = getOptions(options);

  return new Promise((resolve, reject) => {
    let pollCount = 1;

    (function poll() {
      if (pollCount > options.retries || Number(new Date()) > options.endTime) {
        console.warn('The poller has made too many requests - terminating poll'); // eslint-disable-line no-console
        return;
      }
      Request
        .get(queryOptions.url)
        .query(queryOptions.data)
        .set(queryOptions.headers)
        .end((err, response) => {
          if (err) {
            if(functions.handleError) {
              return reject(functions.handleError(err));
            } else {
              return reject(console.error(err.message)); // eslint-disable-line no-console
            }
          } else if (functions.terminate(response)) {
            return resolve(response);
          } else if (functions.conditionMet(response)) {
            return resolve(functions.callback(response));
          } else {
            pollCount++;
            setTimeout(poll, options.interval);
          }
        });
    })();
  })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
    });
};
