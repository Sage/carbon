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
   * @return {Object} Delimeter and separator values
   */
  format: () => {
    return {
      delimiter: I18n.t("number.format.delimiter", { defaultValue: "," }),
      separator: I18n.t("number.format.separator", { defaultValue: "." })
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
  formatDecimal: (valueToFormat = 0, precision = 2) => {
    let format = I18nHelper.format();

    return  I18n.toNumber(valueToFormat, {
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
  unformatDecimal: (valueWithFormat = '') => {
    let format = I18nHelper.format(),
        regex = new RegExp('\\' + format.delimiter, "g");

    valueWithFormat = valueWithFormat.replace(regex, "", "g");

    return valueWithFormat.replace(format.separator, ".");
  }
};

export default I18nHelper;
