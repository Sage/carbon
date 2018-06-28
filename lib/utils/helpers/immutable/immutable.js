'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    if ((typeof js === 'undefined' ? 'undefined' : _typeof(js)) !== 'object' || js === null) {
      if (typeof js === 'number') {
        return String(js);
      }
      return js;
    }

    if (Array.isArray(js)) {
      return _immutable2.default.Seq(js).map(ImmutableHelper.parseJSON).toList();
    }

    return _immutable2.default.Seq(js).map(ImmutableHelper.parseJSON).toMap();
  }
};

exports.default = ImmutableHelper;