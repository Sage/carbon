"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
* Chain Functions
*
* Takes two functions, and return a new function which will call the two functions
* in order.
*
* @method chainFunctions
* @param {Function} newFunction function to be performed second
* @param {Function} originalFunction function to be performed first
* @return {Function} new function that called the two passed functions
*/
exports.default = function (newFunction, originalFunction) {
  return function () {
    if (originalFunction) {
      originalFunction.apply(undefined, arguments);
    }
    newFunction.apply(undefined, arguments);
  };
};