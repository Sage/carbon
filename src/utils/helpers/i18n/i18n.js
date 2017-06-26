import BigNumber from 'bignumber.js';
import I18n from "i18n-js";

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
      delimiter: I18n.t("number.format.delimiter", { locale: locale, defaultValue: "," }),
      separator: I18n.t("number.format.separator", { locale: locale, defaultValue: "." }),
      unit: I18n.t("number.currency.format.unit", { locale: locale, defaultValue: '£' }),
      format: I18n.t("number.currency.format.format", { locale: locale, defaultValue: '%u%n' })
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
    let locale = options.locale || I18n.locale || 'en',
        format = I18nHelper.format(locale);

    return  I18n.toNumber(valueToFormat, {
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
  abbreviateCurrency: (num, options = {}) => {
    let locale = options.locale || I18n.locale || 'en',
        sign = num < 0 ? '-' : '',
        abbr = I18nHelper.abbreviateNumber(num, options),
        format = I18nHelper.format(locale),
        unit = options.unit || format.unit;

    return format.format.replace("%u", unit).replace("%n", abbr).replace("%s", sign);
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
      return `${I18nHelper.roundForAbbreviation(num, 100, options)}${I18n.t("number.format.abbreviations.thousand", { defaultValue: "k" })}`;
    } else if (absolute > 999949) {
      return `${I18nHelper.roundForAbbreviation(num, 100000, options)}${I18n.t("number.format.abbreviations.million", { defaultValue: "m" })}`;
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
    if (number == 0) return '0 Bytes';
    let k = 1000;
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let i = Math.floor(Math.log(number) / Math.log(k));

    return parseFloat((number / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  /**
   * returns a number rounded for abbreviation, forced to one decimal place
   *
   * @method roundForAbbreviation
   * @param {num} number to round
   * @param {divisor} number to round to, usually a power of ten
   * @return {String} rounded number
   */
  roundForAbbreviation: (num, divisor, options = {}) => {
    num = new BigNumber(num);
    divisor = new BigNumber(divisor);
    return I18nHelper.formatDecimal(num.dividedBy(divisor).round().dividedBy(10), 1, options);
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
    let locale = options['locale'] || I18n.locale || 'en',
        format = I18nHelper.format(locale),
        precision = options['precision'],
        unit = options['unit'] || format.unit,
        structure = options['format'] || format.format;

    // Checking explicitly as 0 is a valid precision
    if (typeof(precision) === "undefined" || precision === null) {
      precision = 2;
    }

    return  I18n.toCurrency(valueToFormat, {
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
  unformatDecimal: (valueWithFormat = '') => {
    let format = I18nHelper.format(),
        regex = new RegExp('\\' + format.delimiter, "g");

    valueWithFormat = valueWithFormat.replace(regex, "", "g");

    return valueWithFormat.replace(format.separator, ".");
  }
};

export default I18nHelper;
