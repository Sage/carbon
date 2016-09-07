/*istanbul ignore next*/"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var /*istanbul ignore next*/_i18nJs = require("i18n-js");

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationsHelper = {

  /**
   * Return the correct validationMessage
   *
   * @method validationMessage
   * @param {String} Overriding validation message
   * @param {String} i18nString e.g. 'errors.messages.valid'
   * @param {Object} i18nOptions e.g. { min: 2, max: 8 }
   * @return {String} message to display
   */
  validationMessage: function /*istanbul ignore next*/validationMessage(message, i18nString) {
    /*istanbul ignore next*/var i18nOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return message || /*istanbul ignore next*/_i18nJs2.default.t(i18nString, i18nOptions);
  },

  /**
   * Return the comparison type depending on params
   *
   * @method comparisonType
   * @param {Object} params
   * @return {String} function type to call
   */
  comparisonType: function /*istanbul ignore next*/comparisonType(params) {
    var is = typeof params.is !== "undefined",
        max = typeof params.max !== "undefined",
        min = typeof params.min !== "undefined";

    if (is && !max && !min) {
      return 'Exact';
    } else if (!is && max && !min) {
      return 'Less';
    } else if (!is && min && !max) {
      return 'Greater';
    } else if (!is && min && max) {
      return 'Range';
    } else {
      return null;
    }
  }
};

/*istanbul ignore next*/exports.default = ValidationsHelper;