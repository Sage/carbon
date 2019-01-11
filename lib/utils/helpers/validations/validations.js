'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18nJs = require('i18n-js');

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
  validationMessage: function validationMessage(message, i18nString) {
    var i18nOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return message || _i18nJs2.default.t(i18nString, i18nOptions);
  },

  /**
   * Return the comparison type depending on params
   *
   * @method comparisonType
   * @param {Object} params
   * @return {String} function type to call
   */
  comparisonType: function comparisonType(params) {
    var is = typeof params.is !== 'undefined',
        max = typeof params.max !== 'undefined',
        min = typeof params.min !== 'undefined';

    if (is && !max && !min) return 'Exact';
    if (!is && max && !min) return 'Less';
    if (!is && min && !max) return 'Greater';
    if (!is && min && max) return 'Range';
    return null;
  }
};

exports.default = ValidationsHelper;