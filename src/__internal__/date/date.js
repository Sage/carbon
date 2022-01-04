import moment from "moment";
import "moment/min/locales";
import { merge } from "lodash";

const isoDateFormat = "YYYY-MM-DD";

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
    if (!value) {
      return "";
    }
    return value.replace(/[-.\s]/g, "/").toLowerCase();
  },

  /**
   * Determines if date is valid
   *
   * @param {String} value - value to validate
   * @param {Object} options Override Moment JS options
   * @return {Boolean}
   */
  isValidDate: ({ value, options = {}, locale, formats, format }) => {
    return DateHelper._parseDate({
      value,
      options,
      locale,
      formats,
      format,
    }).isValid();
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
  formatValue: ({
    value,
    formatTo = isoDateFormat,
    options = {},
    locale,
    formats,
    format,
  }) => {
    const date = DateHelper._parseDate({
      value,
      options,
      locale,
      formats,
      format,
    });

    return date.isValid() ? date.format(formatTo) : value;
  },

  /**
   * Convert a value such as '2017-08-23' into a Javascript Date object
   *
   * @method stringToDate
   * @param {String} value current value e.g. 2017-08-23
   * @return {Object} The Date object
   */
  stringToDate: (value) => moment(value).toDate(),

  /**
   * Formats the given date string to the specified format
   * Moment will not format the standard Javascript Date string format
   *
   * @method formatDateString
   * @param {String} value current value e.g. Wed Aug 23 2017 12:00:00 GMT+0100 (BST)
   * @param {String} formatTo Desired format e.g. YYYY-MM-DD
   * @return {String} formatted date
   */
  formatDateString: (value, formatTo = isoDateFormat) => {
    return moment(new Date(value).getTime()).format(formatTo);
  },

  /**
   * Returns todays date formatted
   *
   * @param {String} format - format of date
   * @return {Moment}
   */
  todayFormatted: (format = isoDateFormat) => {
    return moment().format(format);
  },

  /**
   * Returns an array of days of the week by locale minified
   * Mo, Tu, We, Th, Fr, Sa, Su
   *
   * @param {String} locale - defaulted to I18n.locale
   * @return {Array}
   */
  weekdaysMinified: (locale) => {
    return moment.localeData(locale)._weekdaysMin;
  },

  /**
   * @param {String} value - the date to test
   * @param {Number} limit - the upper and lower bounds
   * @param {String} units - defaulted to days
   * @return {Boolean}
   */
  withinRange: ({ value, limit, units, locale, formats, format }) => {
    const momentValue = DateHelper._parseDate({
        value,
        locale,
        formats,
        format,
      }),
      today = moment();
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
   */
  _defaultMomentOptions: (locale, formats) => {
    return {
      locale,
      formats,
      strict: true,
    };
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
  _parseDate({ value, options, locale, formats = [], format }) {
    const opts = merge(
      DateHelper._defaultMomentOptions(locale, formats),
      options,
      {
        locale,
        formats,
        format,
      }
    );

    return moment(
      value,
      [format, isoDateFormat, ...opts.formats],
      opts.locale,
      opts.strict
    );
  },

  formatDateToCurrentLocale({ value, locale, formats, format }) {
    return DateHelper.formatValue({
      value,
      formatTo: format,
      locale,
      formats,
      format,
    });
  },
};

export default DateHelper;
