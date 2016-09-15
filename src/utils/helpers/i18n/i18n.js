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
  formatDecimal: (valueToFormat = 0, precision = 2) => {
    let format = I18nHelper.format();

    return  I18n.toNumber(valueToFormat, {
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
  formatCurrency: (valueToFormat = 0, options = {}) => {
    let locale = options['locale'] || 'en',
        format = I18nHelper.format(locale),
        precision = options['precision'] || 2,
        unit = options['unit'] || format.unit,
        structure = options['format'] || format.format;

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
