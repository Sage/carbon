import I18n from "i18n-js";

/**
* I18n Helper
*
* Provides helper methods for I18n.
*
* @object I18nHelper
* @method formatValue
* @method removeFormat
*
*/
const I18nHelper = {

  /**
   * Formats delimiter and separator through i18n
   *
   * @method i18nFormatting
   * @return {Object} Delimeter and separator values
   */
  i18nFormatting: {
    delimiter: I18n.t("number.format.delimiter", { defaultValue: "," }),
    separator: I18n.t("number.format.separator", { defaultValue: "." })
  },

  /**
   * Adds formatting to the value
   *
   * @method formatValue
   * @param {String} value unformatted Value
   * @param {Interger} precision
   * @return {String} formatted value
   */
  formatValue: (valueToFormat = 0, precision = 2) => {
    return  I18n.toNumber(valueToFormat, {
      precision: precision,
      delimiter: I18nHelper.i18nFormatting.delimiter,
      separator: I18nHelper.i18nFormatting.separator
    });
  },

  /**
   * Removes delimiters and separators from value
   *
   * @method removeFormat
   * @param {String} valueWithFormat Formatted value
   * @return {String} value with no format
   */
  removeFormat: (valueWithFormat = '') => {
    let regex = new RegExp('\\' + I18nHelper.i18nFormatting.delimiter, "g");

    valueWithFormat = valueWithFormat.replace(regex, "", "g");

    return valueWithFormat.replace(I18nHelper.i18nFormatting.separator, ".");
  }
};

export default I18nHelper;
