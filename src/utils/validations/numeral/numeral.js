import I18n from "i18n-js";
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
 * Assign the validator to the validations prop, passing the required params.:
 *
 *  `<Decimal validations={ [NumeralValidator({ type: 'decimal' })] }/>`
 *  `<Number validations={ [NumeralValidator({ type: 'integer' })] }/>`
 *
 * @method NumeralValidator
 * @param {Object} params (type)
 */
const NumeralValidator = function(params) {

  // Build String to call correct function
  let validationToCall = 'validate' + startCase(params.type);


  let NumeralFunctions = {
    'validateDecimal': validateDecimal(),
    'validateInteger': validateInteger()
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
function validateDecimal() {
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
      return I18n.t("validations.decimal");
    }
  };
}

/**
 * This will validate whether the value is a valid integer.
 *
 * @method validate
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
      return I18n.t("validations.integer");
    }
  };
}
