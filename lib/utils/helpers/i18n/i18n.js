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
   * @param {String} locale overrides current locale
   * @return {Object} Format values for decimal and currency
   */
  format: function format(locale) {
    return {
      delimiter: _i18nJs2.default.t("number.format.delimiter", { locale: locale, defaultValue: "," }),
      separator: _i18nJs2.default.t("number.format.separator", { locale: locale, defaultValue: "." }),
      unit: _i18nJs2.default.t("number.currency.format.unit", { locale: locale, defaultValue: '£' }),
      format: _i18nJs2.default.t("number.currency.format.format", { locale: locale, defaultValue: '%u%n' })
    };
  },

  /**
   * Adds formatting to the value
   *
   * @method formatDecimal
   * @param {String} valueToFormat unformatted Value
   * @param {Integer} precision
   * @return {String} formatted value
   */
  formatDecimal: function formatDecimal() {
    var valueToFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var format = I18nHelper.format();

    return _i18nJs2.default.toNumber(valueToFormat, {
      precision: precision,
      delimiter: format.delimiter,
      separator: format.separator
    });
  },

  /**
   * Adds currency formatting to the value
   *
   * @method formatCurrency
   * @param {String} valueToFormat unformatted Value
   * @param {Object} options list of options to overide formatting from locale
   * @return {String} formatted value
   */
  formatCurrency: function formatCurrency() {
    var valueToFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var locale = options['locale'] || 'en',
        format = I18nHelper.format(locale),
        precision = options['precision'] || 2,
        unit = options['unit'] || format.unit,
        structure = options['format'] || format.format;

    return _i18nJs2.default.toCurrency(valueToFormat, {
      precision: precision,
      delimiter: format.delimiter,
      separator: format.separator,
      unit: unit,
      format: structure
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
    var valueWithFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var format = I18nHelper.format(),
        regex = new RegExp('\\' + format.delimiter, "g");

    valueWithFormat = valueWithFormat.replace(regex, "", "g");

    return valueWithFormat.replace(format.separator, ".");
  }
};

exports.default = I18nHelper;