'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (str) {
  var result = [];
  var index = str.indexOf('[');

  if (index === -1) {
    // if there are no square brackets
    result.push(str);
  } else {
    if (index > 0) {
      // if the square bracket is not the first character, add the name at the
      // start of the string (not in brackets)
      var name = str.slice(0, index);
      result.push(name);
    }

    // pull out the names in brackets and add to the array
    var nestedNames = str.match(/[^[\]]+(?=])/g);

    result = result.concat(nestedNames);
  }

  return result;
};