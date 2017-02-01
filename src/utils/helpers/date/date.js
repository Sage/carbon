import I18n from "i18n-js";
import moment from 'moment';

const DateHelper = {

  /**
   * Sanitizes all valid date separators ( . - 'whitespace' ) replacing them
   * with a slash
   *
   * This allows us to compare against one separator in the i18n string. DD/MM/YYYY
   *
   * @method _sanitizeDateInput
   * @return {String} sanitized input
   */
  sanitizeDateInput: (value) => {
    return value.replace(/[^0-9A-zÀ-ÿ\s\/\.\-]/g, "").replace(/[-.\s]/g, "/").toLowerCase();
  },

  dateFormats: () => {
    return I18n.t('date.formats.inputs', { defaultValue: ["MMM/DD/YY", "DD/MM", "DD/MM/YYYY", "DD/MMM/YYYY", "YYYY/MM/DD"] });
  },

  isValidDate: (value) => {
    return moment(sanitizeDateInput(val), dateFormats(), I18n.locale, true).isValid();
  }
}

export default DateHelper;
