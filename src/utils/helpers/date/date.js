import I18n from "i18n-js";
import moment from 'moment';
import { merge } from 'lodash';

const DateHelper = {

  /**
   * Default options to pass to moment js
   *
   * formats - given accepted formats
   * locale - current locale
   * strict - moment js strict mode
   * sanitize - should value be sanitized before parsing
   */
  defaultMomentOptions: () => {
    return {
      formats: DateHelper.dateFormats(),
      locale: I18n.locale,
      strict: true,
      sanitize: true
    };
  },

  /**
   * Parses date into moment
   *
   * @param {String} value - value to parse
   * @param {Object} options Override Moment JS options
   * @return {Moment}
   */
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
  * @return {Array} formatted date strings
  */
  dateFormats: () => {
    return I18n.t('date.formats.inputs', { defaultValue: ["MMM/DD/YY", "DD/MM", "DD/MM/YYYY", "DD/MMM/YYYY", "YYYY/MM/DD"] });
  },

  /**
   * Determins if date is valid
   *
   * @param {String} value - value to validate
   * @param {Object} options Override Moment JS options
   * @return {Moment}
   */
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

  /**
   * Returns todays date formatted
   *
   * @param {String} format - format of date
   * @return {Moment}
   */
  todayFormatted: (format) => {
    return moment().format(format);
  },

  /**
   * Returns an array of days of the week by locale minfied
   * Mo, Tu, We, Th, Fr, Sa, Su
   *
   * @param {String} locale - defaulted to I18n.locale
   * @return {Array}
   */
  weekdaysMinified: (locale = I18n.locale) => {
    return moment.localeData(I18n.locale)._weekdaysMin;
  }
}

export default DateHelper;
