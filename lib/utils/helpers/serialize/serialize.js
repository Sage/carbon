/**
 * @method serialize
 * @param {Object}
 * @param {String}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var serialize = function serialize(obj, prefix) {
  var str = [];

  for (var prop in obj) {
    var key = prefix ? prefix + "[" + prop + "]" : prop,
        value = obj[prop];

    str.push(typeof value == "object" ? serialize(value, key) : encodeURIComponent(key) + "=" + encodeURIComponent(value));
  }

  return str.join("&");
};

exports["default"] = serialize;
module.exports = exports["default"];