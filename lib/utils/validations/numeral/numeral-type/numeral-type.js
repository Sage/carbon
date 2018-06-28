'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validations = require('./../../../helpers/validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A NumeralType Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import NumeralTypeValidator from 'utils/validations/numeral'`
 *
 * Assign the validator to the validations prop. The numeral validator
 * takes a type param which is defaulted to 'decimal'
 *
 *  `<Decimal validations={ [NumeralTypeValidator() ] }/>`
 *  `<Number validations={ [NumeralTypeValidator({ integer: true })] }/>`
 *
 * @constructor NumeralTypeValidator
 */
var NumeralTypeValidator = function NumeralTypeValidator() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, NumeralTypeValidator);

  var numeralType = params.integer ? 'Integer' : 'Decimal';
  var validationToCall = 'validate' + numeralType;
  var numeralFunctions = {
    validateDecimal: validateDecimal(params),
    validateInteger: validateInteger(params)
  };
  var validationObject = numeralFunctions[validationToCall];

  /**
   * Custom message for validation.
   *
   * @property customMessage
   * @type {String}
   */
  this.customMessage = params.customMessage;

  /**
   * Min length value.
   *
   * @property min
   * @type {Number}
   */
  this.min = params.min;

  /**
   * Max length value.
   *
   * @property max
   * @type {Number}
   */
  this.max = params.max;

  /**
   * An exact match.
   *
   * @property is
   * @type {Number}
   */
  this.is = params.is;

  /**
   * @property validate
   * @type {Function}
   */
  this.validate = validationObject.validate;

  /**
   * @property message
   * @type {Function}
   */
  this.message = validationObject.message;
};

exports.default = NumeralTypeValidator;

// Private Methods

/**
 * This will validate whether the value is a valid decimal.
 *
 * @method validateDecimal
 * @return {Function} validate
 * @return {Function} message
 * @private
 */

function validateDecimal() {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function validate(value) {
      return !value || /^-?(\d+(\.\d+)?|\.\d+|\d+\.)$/.test(value);
    },


    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function message() {
      return _validations2.default.validationMessage(this.customMessage, 'errors.messages.not_a_number');
    }
  };
}

/**
 * This will validate whether the value is a valid integer.
 *
 * @method validateInteger
 * @return {Function} validate
 * @return {Function} message
 * @private
 */
function validateInteger() {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function validate(value) {
      return !value || /^-?\d+$/.test(value);
    },


    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function message() {
      return _validations2.default.validationMessage(this.customMessage, 'errors.messages.not_an_integer');
    }
  };
}