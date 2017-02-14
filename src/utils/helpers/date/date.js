import I18n from "i18n-js";
import moment from 'moment';
import { merge } from 'lodash';

/**
 * DateHelper used to encapsulate the date parsing library into a single helper
 */
const DateHelper = {

  // Allows us to spy on moment
  _moment: () => {
    return moment;
  },

  /**
   * Parses date into moment
   * Note when sanitizing dates formats must contain '/' for separators
   *
   * @param {String} value - value to parse
   * @param {Object} options Override Moment JS options
   * @return {Moment}
   */
  parseDate: (value, options = {}) => {
    let opts = merge(DateHelper.defaultMomentOptions(), options);
    let val = opts.sanitize ? DateHelper.sanitizeDateInput(value) : value;
    return DateHelper._moment()(val, opts.formats, opts.locale, opts.strict);
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
    if (!value) { return ''; }
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
   * @return {Boolean}
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
    return date.isValid() ? date.format(formatTo) : value;
  },

  /**
   * Returns todays date formatted
   *
   * @param {String} format - format of date
   * @return {Moment}
   */
  todayFormatted: (format) => {
    return DateHelper._moment()().format(format);
  },

  /**
   * Returns an array of days of the week by locale minfied
   * Mo, Tu, We, Th, Fr, Sa, Su
   *
   * @param {String} locale - defaulted to I18n.locale
   * @return {Array}
   */
  weekdaysMinified: () => {
    return DateHelper._moment().localeData(I18n.locale)._weekdaysMin;
  },

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
};

export default DateHelper;
