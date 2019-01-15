import I18n from 'i18n-js';
import moment from 'moment';
import { merge } from 'lodash';

/**
 * DateHelper used to encapsulate the date parsing library into a single helper
 */
const DateHelper = {

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
    return value.replace(/[-.\s]/g, '/').toLowerCase();
  },

  /**
   * Determins if date is valid
   *
   * @param {String} value - value to validate
   * @param {Object} options Override Moment JS options
   * @return {Boolean}
   */
  isValidDate: (value, options = {}) => {
    return DateHelper._parseDate(value, options).isValid();
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
    const date = DateHelper._parseDate(value, options);
    return date.isValid() ? date.format(formatTo) : value;
  },

  /**
   * Convert a value such as '2017-08-23' into a Javascript Date object
   *
   * @method stringToDate
   * @param {String} value current value e.g. 2017-08-23
   * @return {Oject} The Date object
   */
  stringToDate: value => moment(value).toDate(),

  /**
   * Formats the given date string to the specified format
   * Moment will not format the standard Javascript Date string format
   *
   * @method formatDateString
   * @param {String} value current value e.g. Wed Aug 23 2017 12:00:00 GMT+0100 (BST)
   * @param {String} formatTo Desired format e.g. YYYY-MM-DD
   * @return {String} formatted date
   */
  formatDateString: (value, formatTo) => {
    return (
      moment.utc(new Date(value).getTime()).format(formatTo)
    );
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
  weekdaysMinified: () => {
    return moment.localeData(I18n.locale)._weekdaysMin;
  },

  /**
   * @param {String} value - the date to test
   * @param {Number} limit - the upper and lower bounds
   * @param {String} units - defaulted to days
   * @return {Boolean}
   */
  withinRange: (value, limit, units) => {
    const momentValue = DateHelper._parseDate(value), today = moment();

    const difference = Math.abs(today.diff(momentValue, units));
    return difference < limit;
  },

  /**
   * Default options to pass to moment js
   *
   * @private
   * formats - given accepted formats
   * locale - current locale
   * strict - moment js strict mode
   * sanitize - should value be sanitized before parsing
   */
  _defaultMomentOptions: () => {
    return {
      formats: DateHelper._dateFormats(),
      locale: I18n.locale,
      strict: true,
      sanitize: true
    };
  },

  /**
   * Large set of default date formats for if a
   * i18n is not supplied
   *
   * @private
   */
  _defaultDateFormats: () => {
    return [
      'DDMMYYYY', 'DDMMYY', 'DD/MM/YYYY', 'DD/MM/YY',
      'MMDDYYYY', 'MMDDYY', 'MM/DD/YYYY', 'MM/DD/YY',
      'DDMMM', 'DD/MMM', 'DDMM', 'DD/MM',
      'YYYYMMDD', 'YYYY/MM/DD',
      'D/MM/YYYY', 'D/M/YYYY', 'D/MM/YY', 'D/M/YY',
      'DD/M/YYYY', 'DD/M/YY', 'DD/M/YY',
      'D/MMM/YYYY', 'DD/MMM/YYYY', 'DD/MMM/YY',
      'D/MMMM/YYYY', 'DD/MMMM/YYYY', 'DD/MMMM/YY',
      'MMM/YYYY', 'MMM/YY', 'MMMM/YYYY', 'MMMM/YY',
      'Do/MMM/YYYY', 'Do/MMM/YY', 'Do/M/YYYY', 'Do/M/YY',
      'Do/MM/YYYY', 'Do/MM/YY', 'Do/MMMM/YYYY', 'Do/MMMM/YY',
      'MMMM/Do/YYYY', 'MMMM/Do/YY', 'MMMM/Do',
      'MMM/Do/YYYY', 'MMM/Do/YY', 'MMM/Do',
      'Do/MMM', 'D/MMM', 'D/MM', 'D/M',
      'Do/MMMM', 'Do/MM', 'Do/M',
      'D/MMMM', 'DD/MMMM', 'DD/MMM', 'DD/M',
      'MMM', 'MMMM', 'DD', 'Do', 'D'
    ];
  },

  /**
   * Parses date into moment
   * Note when sanitizing dates formats must contain '/' for separators
   *
   * @private
   * @param {String} value - value to parse
   * @param {Object} options Override Moment JS options
   * @return {Moment}
   */
  _parseDate: (value, options) => {
    const opts = merge(DateHelper._defaultMomentOptions(), options);
    const val = opts.sanitize ? DateHelper.sanitizeDateInput(value) : value;
    return moment(val, opts.formats, opts.locale, opts.strict);
  },

  /**
  * Formats valid for entry
  *
  * @private
  * @method validFormats
  * @return {Array} formatted date strings
  */
  _dateFormats: () => {
    return I18n.t('date.formats.inputs', { defaultValue: DateHelper._defaultDateFormats() });
  }
};

export default DateHelper;
