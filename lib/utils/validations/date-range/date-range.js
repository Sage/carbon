'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validations = require('./../../helpers/validations');

var _validations2 = _interopRequireDefault(_validations);

var _date = require('./../../helpers/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A DateRangeValidator object.
 *
 * This validator compares to date fields and asserts that a start date is earlier than the end date.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import DateRangeValidator from 'utils/validations/date-range'`
 *
 * Assign the validator to the two Date fields being compared.
 * Pass the alternative date value to the validator.
 * i.e. Pass the start date value to the EndDate validator, and vice versa.
 *
 *  validations={ [ new DateRangeValidator({
      startDate: this.props.value[0],
      messageText: this.endMessage
    })] }
 *
 * You must pass a messageText string if you want an error message displayed.
 *
 * @constructor DateRangeValidator
 */
var DateRangeValidator =
/**
 * @method constructor
 * @param {Object} params
 */
function DateRangeValidator() {
  var _this = this;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, DateRangeValidator);

  this.validate = function (value) {
    if (_this.endDate) {
      return _this.compareDates(value, _this.endDate);
    } else {
      // this.startDate
      return _this.compareDates(_this.startDate, value);
    }
  };

  this.message = function () {
    return _validations2.default.validationMessage(_this.messageText);
  };

  this.compareDates = function (start, end) {
    if (!_this.bothDatesValid(start, end)) {
      return true;
    }
    return start <= end;
  };

  this.bothDatesValid = function (date1, date2) {
    return _date2.default.isValidDate(date1) && _date2.default.isValidDate(date2);
  };

  /**
   * The error message text
   *
   * @property messageText
   * @type {String}
   */
  this.messageText = params.messageText;

  /**
   * The current endDate, used to compare to the new startDate
   *
   * @property endDate
   * @type {String}
   */
  this.endDate = params.endDate;

  /**
   * The current startDate, used to compare to the new endDate
   *
   * @property startDate
   * @type {String}
   */
  this.startDate = params.startDate;
}

/**
* This will validate the given value, compare it to the other relative
* date value in the date range.
*
* If either of the dates are invalid then it will validate to true as we
* can't compare an invalid date. The date component will show individual
* errors for invalid dates
*
* @method validate
* @param {String} value to compare
* @return {Boolean} true if check is valid
*/


/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */


/**
 * Compare the start and end dates for validity
 *
 *
 * @method compareDates
 * @param {String} start the start date
 * @param {String} end the end date
 * @return {Boolean} true if both dates are valid and start <= end
 *
 */


/**
 * Check if both passed dates are valid
 *
 * @method bothDatesValid
 * @return {Boolean}
 */
;

exports.default = DateRangeValidator;