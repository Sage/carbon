import I18n from "i18n-js";

/**
* I18n Helper
*
* Provides helper methods for I18n.
*
* @object I18nHelper
* @param {String} value
*/
const I18nHelper = {

  /**
   * Adds formatting to the value
   *
   * @method formatValue
   * @private
   * @param {String} value Unformatted Value
   * @return {String} formated value
   */
  formatValue: (valueToFormat) => {
    valueToFormat = valueToFormat || 0;

    valueToFormat = I18n.toNumber(valueToFormat, {
      precision: 2,
      delimiter: i18nFormatting().delimiter,
      separator: i18nFormatting().separator
    });
    return valueToFormat;
  },

  /**
   * Removes delimiters and separators from value
   *
   * @method removeFormat
   * @private
   * @param {String} valueWithFormat Formatted value
   * @return {String} value with no format
   */
  removeFormat: (valueWithFormat) => {
    let value = valueWithFormat || '';
    let regex = new RegExp('\\' + i18nFormatting().delimiter, "g");

    value = value.replace(regex, "", "g");
    value = value.replace(i18nFormatting().separator, ".");

    return value;
  }
};

/**
 * Formats delimiter and separator through i18n
 *
 * @method i18nFormatting
 * @private
 * @return {Object} Delimeter and separator values
 */
function i18nFormatting() {
  return {
    delimiter: I18n.t("number.format.delimiter", { defaultValue: "," }),
    separator: I18n.t("number.format.separator", { defaultValue: "." })
  };
}



export default I18nHelper;
