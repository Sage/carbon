"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18nJs = require("i18n-js");

var _i18nJs2 = _interopRequireDefault(_i18nJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* I18n Helper
*
* Provides helper methods for I18n.
*
* @object I18nHelper
*/
var I18nHelper = {

  /**
   * Returns format from the defined translations.
   *
   * @method format
   * @return {Object} Delimeter and separator values
   */
  format: function format() {
    return {
      delimiter: _i18nJs2.default.t("number.format.delimiter", { defaultValue: "," }),
      separator: _i18nJs2.default.t("number.format.separator", { defaultValue: "." })
    };
  },

  /**
   * Adds formatting to the value
   *
   * @method formatDecimal
   * @param {String} value unformatted Value
   * @param {Interger} precision
   * @return {String} formatted value
   */
  formatDecimal: function formatDecimal() {
    var valueToFormat = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var precision = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

    var format = I18nHelper.format();

    return _i18nJs2.default.toNumber(valueToFormat, {
      precision: precision,
      delimiter: format.delimiter,
      separator: format.separator
    });
  },

  /**
   * Removes delimiters and separators from value
   *
   * @method unformatDecimal
   * @param {String} valueWithFormat Formatted value
   * @return {String} value with no format
   */
  unformatDecimal: function unformatDecimal() {
    var valueWithFormat = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    var format = I18nHelper.format(),
        regex = new RegExp('\\' + format.delimiter, "g");

    valueWithFormat = valueWithFormat.replace(regex, "", "g");

    return valueWithFormat.replace(format.separator, ".");
  }
};

exports.default = I18nHelper;