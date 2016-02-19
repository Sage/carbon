import ValidationsHelper from './../../helpers/validations';
import { startCase } from 'lodash';

/**
 * A Numeral Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import NumeralValidator from 'utils/validations/numeral'`
 *
 * Assign the validator to the validations prop. The numeral validator
 * takes a type param which is defaulted to 'decimal'
 *
 *  `<Decimal validations={ [NumeralValidator() ] }/>`
 *  `<Number validations={ [NumeralValidator({ type: 'integer' })] }/>`
 *
 * @method NumeralValidator
 * @param {Object} params (type)
 */
const NumeralValidator = function(params = {}) {

  // Default numeral type to decimal
  let numeralType = params.type ? startCase(params.type) : 'Decimal';

  // Build String to call correct function
  let validationToCall = 'validate' + numeralType;

  let NumeralFunctions = {
    validateDecimal: validateDecimal(params),
    validateInteger: validateInteger(params)
  };

  return NumeralFunctions[validationToCall];
};

export default NumeralValidator;

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
    validate: function(value) {
      return (!value || /^\d+(\.\d+)?$/.test(value));
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(params.message, "validations.decimal");
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
    validate: function(value) {
      return (!value || /^\d+$/.test(value));
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(params.message, "validations.integer");
    }
  };
}
