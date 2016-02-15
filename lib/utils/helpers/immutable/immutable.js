'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

/**
* Immutable Helper
*
* Provides helper methods for working with immutable data.
*
* @object ImmutableHelper
* @param {String} name
* @param {Object} form
*/
var ImmutableHelper = {

  /**
  * Parses a regular JSON object into an Immutable data object, mapping the data
  * correctly and applying custom transforms to make the data easier to work with.
  *
  * @method parseJSON
  * @param {Object} js
  */
  parseJSON: function parseJSON(js) {
    if (typeof js !== 'object' || js === null) {
      // if the js is not an object, or is null then just return it
      return js;
    } else {
      if (Array.isArray(js)) {
        // create the immutable object
        return _immutable2['default'].Seq(js).map(ImmutableHelper.parseJSON).toList();
      } else {
        // create the immutable object
        return _immutable2['default'].Seq(js).map(ImmutableHelper.parseJSON).toOrderedMap();
      }
    }
  }

};

exports['default'] = ImmutableHelper;
module.exports = exports['default'];