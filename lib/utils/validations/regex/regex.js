'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validations = require('../../helpers/validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Regex Validator
 *
 * == How to use this validator ==
 *
 * Import the validator into your component
 *
 * import RegexValidator from 'utils/validations/regex'
 *
 * Assign this validator to the validations prop
 *
 * <Textbox validations={ [new RegexValidator({ format: (/[A-Z]{5}/) }) ] }/>
 *
 * @constructor RegexValidator
 */
var RegexValidator =
/**
 * @method constructor
 * @param {Object} params
 */
function RegexValidator() {
  var _this = this;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, RegexValidator);

  this.validate = function (value) {
    return !value || _this.format.test(value);
  };

  this.message = function () {
    return _validations2.default.validationMessage(_this.customMessage, 'errors.messages.wrong_format');
  };

  /**
   * An optional custom validation message.
   *
   * @property customMessage
   * @type {String}
   */
  this.customMessage = params.customMessage;

  /**
   * The format to run the regex with.
   *
   * @method format
   * @return {Regex}
   */
  this.format = params.format;
}

/**
 * This will validate the given value, and return a valid status.
 *
 * @method validate
 * @param {Float} value to check
 * @return {Boolean} true if value is valid
 */


/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */
;

exports.default = RegexValidator;