import I18n from 'i18n-js';

const ValidationsHelper = {

  /**
   * Return the correct validationMessage
   *
   * @method validationMessage
   * @param {String} Overriding validation message
   * @param {String} i18nString e.g. 'errors.messages.valid'
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
    const is = typeof params.is !== 'undefined',
        max = typeof params.max !== 'undefined',
        min = typeof params.min !== 'undefined';

    if (is && !max && !min) {
      return 'Exact';
    } else if (!is && max && !min) {
      return 'Less';
    } else if (!is && min && !max) {
      return 'Greater';
    } else if (!is && min && max) {
      return 'Range';
    }
    return null;
  }
};

export default ValidationsHelper;
