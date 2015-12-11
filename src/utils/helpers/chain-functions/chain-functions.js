/**
* Chain Functions
*
* Takes two functions, and return a new function which will call the two functions
* in order.
*
* @method chainFunctions
* @param {Function} newFunction
* @param {Function} originalFunction
*/
export default (newFunction, originalFunction) => {
  return (...args) => {
    if (originalFunction) { originalFunction(...args); }
    newFunction(...args);
  };
};
