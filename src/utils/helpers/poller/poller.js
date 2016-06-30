import { Request } from 'superagent';
import './../promises';

/**
 * A helper to make poll an endpoint with a GET request
 *
 * The helper takes the following params
 * - options: an object containing the url and optional data object with additional params
 * - timeout: the time period at which the request is re-submitted
 * - conditionMet: a function that accepts the ajax response. Use this to return a test a desired condition and return a boolean.
 * - callback: A callback function to call when the conditionMet returns true
 * - handleError: a callback function that takes an error and handles it.
 *
 * ===Example Usage===
 *
 * import poller from 'carbon/lib/utils/helpers/poller';
 *
 * let options = {url: 'http://foo/bar/1'};
 * let timeout = 10000;
 * let conditionMet = function(response) => { return response.body.status === 'complete' };
 * let callback = function(response) => { doSomethingFancy(reponse) };
 * let handleError = function(err) => { FlashMessage("Failed", err) };
 *
 * ajaxPoller(options, timeout, conditionMet, callback, handleError);
 *
 */
poller(options, timeout, conditionMet, callback, handleError) => {
  return new Promise((resolve, reject) => {
    (poll() => {
       Request
         .get(options.url)
         .data(options.data)
         .end((err, response) => {
           if (!err) {
             if (conditionMet(response)) return resolve(callback(response));
             setTimeout(poll, timeout);
           } else {
             reject(handleError(err))
           }
         })
     })();
  });
}

export default poller;
