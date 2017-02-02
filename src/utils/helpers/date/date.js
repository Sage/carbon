import I18n from "i18n-js";
import moment from 'moment';
import { merge } from 'lodash';

const DateHelper = {

  defaultMomentOptions: () => {
    return {
      formats: DateHelper.dateFormats(),
      locale: I18n.locale,
      strict: true,
      sanitize: true
    };
  },

  parseDate: (value, options = {}) => {
    let opts = merge(DateHelper.defaultMomentOptions(), options);
    let val = options.sanitize ? DateHelper.sanitizeDateInput(value) : value
    return moment(val, opts.formats, opts.locale, opts.strict);
  },

  /**
   * Sanitizes all valid date separators ( . - 'whitespace' ) replacing them
   * with a slash
   *
   * This allows us to compare against one separator in the i18n string. DD/MM/YYYY
   *
   * @method sanitizeDateInput
   * @return {String} sanitized input
   */
  sanitizeDateInput: (value) => {
    return value.replace(/[^0-9A-zÀ-ÿ\s\/\.\-]/g, "").replace(/[-.\s]/g, "/").toLowerCase();
  },

  /**
  * Formats valid for entry
  *
  * @method validFormats
  * @private
  * @return {Array} formatted date strings
  */
  dateFormats: () => {
    return I18n.t('date.formats.inputs', { defaultValue: ["MMM/DD/YY", "DD/MM", "DD/MM/YYYY", "DD/MMM/YYYY", "YYYY/MM/DD"] });
  },

  isValidDate: (value, options = {}) => {
    return DateHelper.parseDate(value, options).isValid();
  },

/**
 * Formats the given value to a specified format
 *
 * @method formatValue
 * @param {String} val current value
 * @param {String} formatTo Desired format
 * @param {Object} options Override Moment JS options
 * @return {String} formatted date
 */
  formatValue: (value, formatTo, options = {}) => {
    let date = DateHelper.parseDate(value, options);
    return date.isValid() ? date.format(formatTo) : value
  },

  todayFormatted: (format) => {
    return moment().format(format);
  },

  weekdaysMinified: (locale = I18n.locale) => {
    return moment.localeData(I18n.locale)._weekdaysMin;
  }
}

export default DateHelper;
