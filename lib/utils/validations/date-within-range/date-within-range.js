'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validations = require('../../helpers/validations');

var _validations2 = _interopRequireDefault(_validations);

var _date = require('../../helpers/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Validates that a date is within a given range
var DateWithinRangeValidator =
/**
  * @method constructor
  * @param {Number} limit - the number of units
  * @param {Object} opts
  *   @option [String] customMessage
  *   @option [String] units - unit of time e.g. 'days'/'months'
  */
function DateWithinRangeValidator(limit) {
  var _this = this;

  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, DateWithinRangeValidator);

  this.validate = function (value) {
    // If not a valid date, return true to avoid multiple errors being shown.
    if (!_date2.default.isValidDate(value)) return true;

    return _date2.default.withinRange(value, _this.limit, _this.units);
  };

  this.message = function () {
    return _validations2.default.validationMessage(_this.customMessage, 'errors.messages.out_of_range');
  };

  this.customMessage = opts.customMessage;
  this.limit = limit;
  this.units = opts.units || 'days';
}

/**
 * This will validate the given value, and return a valid status.
 *
 * @method validate
 * @param {Object} value to check
 * @return {Boolean} true if value is within range
 */


/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */
;

exports.default = DateWithinRangeValidator;