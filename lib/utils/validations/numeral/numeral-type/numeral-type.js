'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersValidations = require('./../../../helpers/validations');

var _helpersValidations2 = _interopRequireDefault(_helpersValidations);

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
 * @method NumeralTypeValidator
 * @param {Object} [params]
 * @param {Boolean} [params.integer] true if type is a integer
 */
var NumeralTypeValidator = function NumeralTypeValidator() {
  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  // Default numeral type to decimal
  var numeralType = params.integer ? 'Integer' : 'Decimal';

  // Build String to call correct function
  var validationToCall = 'validate' + numeralType;

  var NumeralFunctions = {
    validateDecimal: validateDecimal(params),
    validateInteger: validateInteger(params)
  };

  return NumeralFunctions[validationToCall];
};

exports['default'] = NumeralTypeValidator;

// Private Methods

/**
 * This will validate whether the value is a valid decimal.
 *
 * @method validateDecimal
 * @return {Function} validate
 * @return {Function} message
 * @private
 */
function validateDecimal(params) {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function validate(value) {
      return !value || /^\d+(\.\d+)?$/.test(value);
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function message() {
      return _helpersValidations2['default'].validationMessage(params.message, "validations.decimal");
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
function validateInteger(params) {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function validate(value) {
      return !value || /^\d+$/.test(value);
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function message() {
      return _helpersValidations2['default'].validationMessage(params.message, "validations.integer");
    }
  };
}
module.exports = exports['default'];