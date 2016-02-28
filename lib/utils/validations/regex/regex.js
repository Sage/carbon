'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpersValidations = require('./../../helpers/validations');

var _helpersValidations2 = _interopRequireDefault(_helpersValidations);

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

  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, RegexValidator);

  this.validate = function (value) {
    return !value || _this.format.test(value);
  };

  this.message = function () {
    return _helpersValidations2['default'].validationMessage(_this.customMessage, 'validations.regex');
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
;

exports['default'] = RegexValidator;
module.exports = exports['default'];

/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */