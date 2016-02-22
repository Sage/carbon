import I18n from "i18n-js";

const ValidationsHelper = {

  /**
   * Return the correct validationMessage
   *
   * @method validationMessage
   * @param {String} Overriding validation message
   * @param {String} i18nString e.g. 'validations.presence'
   * @param {Object} i18nOptions e.g. { min: 2, max: 8 }
   * @return {String} message to display
   */
  validationMessage: (message, i18nString, i18nOptions = {}) => {
    return message || I18n.t(i18nString, i18nOptions);
  },

  /**
   * Return the comparison type depending on params
   *
   * @method comparisonType
   * @param {Object} params
   * @return {String} function type to call
   */
  comparisonType: (params) => {
    if (params.is && !params.max && !params.min) {
      return 'Exact';
    } else if (!params.is && params.max && !params.min) {
      return 'Less';
    } else if (!params.is && params.min && !params.max) {
      return 'Greater';
    } else if (!params.is && params.min && params.max) {
      return 'Range';
    } else {
      return null;
    }
  }
};

export default ValidationsHelper;
