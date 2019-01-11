'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bignumber = require('bignumber.js');

var _bignumber2 = _interopRequireDefault(_bignumber);

var _i18nJs = require('i18n-js');

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
      delimiter: _i18nJs2.default.t('number.format.delimiter', {
        defaultValue: ','
      }),
      separator: _i18nJs2.default.t('number.format.separator', {
        defaultValue: '.'
      }),
      unit: _i18nJs2.default.t('number.currency.format.unit', {
        locale: locale,
        defaultValue: '£'
      }),
      format: _i18nJs2.default.t('number.currency.format.format', {
        locale: locale,
        defaultValue: '%u%n'
      })
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
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var locale = options.locale || _i18nJs2.default.locale || 'en';
    var format = I18nHelper.format(locale);

    return _i18nJs2.default.toNumber(valueToFormat, {
      precision: precision,
      delimiter: format.delimiter,
      separator: format.separator
    });
  },

  /**
   * Abbreviates currency, including the currency unit and the sign, resulting in values such as `£1.9m`, `45.6k €` or
   *   `£-2.00`
   *
   * @method abbreviateCurrency
   * @param {Number} num
   * @param {Object} options { locale: 'en' }
   * @return {String} abbreviated, currencified number
   */
  abbreviateCurrency: function abbreviateCurrency(num) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var locale = options.locale || _i18nJs2.default.locale || 'en';
    var sign = num < 0 ? '-' : '';
    var abbr = I18nHelper.abbreviateNumber(num, options);
    var format = I18nHelper.format(locale);
    var unit = options.unit || format.unit;

    return format.format.replace('%u', unit).replace('%n', abbr).replace('%s', sign);
  },

  /**
   * Abbreviates number with a `k` or `m` suffix depening on whether it's a thousand or a million
   * billions and above abbreviate with millions
   *
   * @method abbreviateNumber
   * @param {Number} number
   * @return {String} abbreviated number
   */
  abbreviateNumber: function abbreviateNumber(num) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var absolute = Math.abs(num);
    if (absolute > 949 && absolute < 999950) {
      var translation = _i18nJs2.default.t('number.format.abbreviations.thousand', { defaultValue: 'k' });
      return '' + I18nHelper.roundForAbbreviation(num, 100, options) + translation;
    }
    if (absolute > 999949) {
      var _translation = _i18nJs2.default.t('number.format.abbreviations.million', { defaultValue: 'm' });
      return '' + I18nHelper.roundForAbbreviation(num, 100000, options) + _translation;
    }

    return '' + I18nHelper.formatDecimal(num, 2, options);
  },

  /**
   * Formats the bytes in number into a more understandable representation
   * (e.g., giving it 1500 yields 1.5 KB)
   *
   * @method humanizeFilesize
   * @param {Number} number
   */
  humanizeFilesize: function humanizeFilesize(number) {
    if (number === 0) return '0 Bytes';
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(number) / Math.log(k));

    // Unable to use the exponentiation operator ** as browserify
    // seems unable to parse it correctly.
    // Therefore the following line has to stick with Math.pow, and the
    // no-restricted-properties rule disabled.
    var filesize = parseFloat((number / Math.pow(k, i)).toFixed(1)); // eslint-disable-line no-restricted-properties
    return filesize + ' ' + sizes[i];
  },

  /**
   * returns a number rounded for abbreviation, forced to one decimal place
   *
   * @method roundForAbbreviation
   * @param {number} number to round
   * @param {divisor} number to round to, usually a power of ten
   * @return {String} rounded number
   */
  roundForAbbreviation: function roundForAbbreviation(number, divisor) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var num = new _bignumber2.default(number);
    var div = new _bignumber2.default(divisor);
    return I18nHelper.formatDecimal(num.dividedBy(div).round().dividedBy(10), 1, options);
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

    var locale = options.locale || _i18nJs2.default.locale || 'en';
    var format = I18nHelper.format(locale);
    var precision = options.precision;

    var unit = options.unit || format.unit;
    var structure = options.format || format.format;

    // Checking explicitly as 0 is a valid precision
    if (typeof precision === 'undefined' || precision === null) {
      precision = 2;
    }

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

    var format = I18nHelper.format();
    var regex = new RegExp('\\' + format.delimiter, 'g');

    var tmp = valueWithFormat.replace(regex, '', 'g');
    return tmp.replace(format.separator, '.');
  }
};

exports.default = I18nHelper;