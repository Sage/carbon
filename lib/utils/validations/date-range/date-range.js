/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var /*istanbul ignore next*/_validations = require('./../../helpers/validations');

/*istanbul ignore next*/
var _validations2 = _interopRequireDefault(_validations);

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
function /*istanbul ignore next*/DateRangeValidator() {
  /*istanbul ignore next*/
  var _this = this;

  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  /*istanbul ignore next*/
  _classCallCheck(this, DateRangeValidator);

  this.validate = function (value) {
    if ( /*istanbul ignore next*/_this.endDate && value > /*istanbul ignore next*/_this.endDate) {
      return false;
    } else if ( /*istanbul ignore next*/_this.startDate && value < /*istanbul ignore next*/_this.startDate) {
      return false;
    }
    return true;
  };

  /*istanbul ignore next*/
  this.message = function () {
    return (/*istanbul ignore next*/_validations2.default.validationMessage( /*istanbul ignore next*/_this.messageText)
    );
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
 * This will validate the given value, and return a valid status.
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
;

/*istanbul ignore next*/exports.default = DateRangeValidator;