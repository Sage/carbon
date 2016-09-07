/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var /*istanbul ignore next*/_immutable = require('immutable');

/*istanbul ignore next*/
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
  parseJSON: function /*istanbul ignore next*/parseJSON(js) {
    if ( /*istanbul ignore next*/(typeof js === 'undefined' ? 'undefined' : _typeof(js)) !== 'object' || js === null) {
      if (typeof js === 'number') {
        return String(js);
      }
      return js;
    } else {
      if (Array.isArray(js)) {
        // create the immutable object
        return (/*istanbul ignore next*/_immutable2.default.Seq(js).map(ImmutableHelper.parseJSON).toList()
        );
      } else {
        // create the immutable object
        return (/*istanbul ignore next*/_immutable2.default.Seq(js).map(ImmutableHelper.parseJSON).toOrderedMap()
        );
      }
    }
  }

};

/*istanbul ignore next*/exports.default = ImmutableHelper;