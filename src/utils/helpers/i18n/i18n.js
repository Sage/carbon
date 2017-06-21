import BigNumber from 'bignumber.js';
import I18n from 'i18n-js';

/**
* I18n Helper
*
* Provides helper methods for I18n.
*
* @object I18nHelper
*/
const I18nHelper = {

  /**
   * Returns format from the defined translations.
   *
   * @method format
   * @param {String} locale overrides current locale
   * @return {Object} Format values for decimal and currency
   */
  format: (locale) => {
    return {
      delimiter: I18n.t('number.format.delimiter', { defaultValue: ',' }),
      separator: I18n.t('number.format.separator', { defaultValue: '.' }),
      unit: I18n.t('number.currency.format.unit', {
        locale,
        defaultValue: '£'
      }),
      format: I18n.t('number.currency.format.format', {
        locale,
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
  formatDecimal: (valueToFormat = 0, precision = 2, options = {}) => {
    const locale = options.locale || I18n.locale || 'en';
    const format = I18nHelper.format(locale);

    return I18n.toNumber(valueToFormat, {
      precision,
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
  abbreviateCurrency: (num, options = {}) => {
    const locale = options.locale || I18n.locale || 'en';
    const sign = num < 0 ? '-' : '';
    const abbr = I18nHelper.abbreviateNumber(num, options);
    const format = I18nHelper.format(locale);
    const unit = options.unit || format.unit;

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
  abbreviateNumber: (num, options = {}) => {
    const absolute = Math.abs(num);
    if (absolute > 949 && absolute < 999950) {
      const translation = I18n.t('number.format.abbreviations.thousand', { defaultValue: 'k' });
      return `${I18nHelper.roundForAbbreviation(num, 100, options)}${translation}`;
    } else if (absolute > 999949) {
      const translation = I18n.t('number.format.abbreviations.million', { defaultValue: 'm' });
      return `${I18nHelper.roundForAbbreviation(num, 100000, options)}${translation}`;
    }

    return `${I18nHelper.formatDecimal(num, 2, options)}`;
  },

  /**
   * Formats the bytes in number into a more understandable representation
   * (e.g., giving it 1500 yields 1.5 KB)
   *
   * @method humanizeFilesize
   * @param {Number} number
   */
  humanizeFilesize: (number) => {
    if (number === 0) return '0 Bytes';
    const k = 1000;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(number) / Math.log(k));

    // Unable to use the exponentiation operator ** as browserify
    // seems unable to parse it correctly.
    // Therefore the following line has to stick with Math.pow, and the
    // no-restricted-properties rule disabled.
    const filesize = parseFloat((number / Math.pow(k, i)).toFixed(1)); // eslint-disable-line no-restricted-properties
    return `${filesize} ${sizes[i]}`;
  },

  /**
   * returns a number rounded for abbreviation, forced to one decimal place
   *
   * @method roundForAbbreviation
   * @param {number} number to round
   * @param {divisor} number to round to, usually a power of ten
   * @return {String} rounded number
   */
  roundForAbbreviation: (number, divisor, options = {}) => {
    const num = new BigNumber(number);
    const div = new BigNumber(divisor);
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
  formatCurrency: (valueToFormat = 0, options = {}) => {
    const locale = options.locale || I18n.locale || 'en';
    const format = I18nHelper.format(locale);
    let precision = options.precision;
    const unit = options.unit || format.unit;
    const structure = options.format || format.format;

    // Checking explicitly as 0 is a valid precision
    if (typeof precision === 'undefined' || precision === null) {
      precision = 2;
    }

    return I18n.toCurrency(valueToFormat, {
      precision,
      delimiter: format.delimiter,
      separator: format.separator,
      unit,
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
  unformatDecimal: (valueWithFormat = '') => {
    const format = I18nHelper.format();
    const regex = new RegExp(`\\${format.delimiter}`, 'g');

    const tmp = valueWithFormat.replace(regex, '', 'g');
    return tmp.replace(format.separator, '.');
  }
};

export default I18nHelper;
