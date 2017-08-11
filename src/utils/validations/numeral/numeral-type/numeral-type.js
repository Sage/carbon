import ValidationsHelper from './../../../helpers/validations';

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
class NumeralTypeValidator {

  constructor(params = {}) {
    const numeralType = params.integer ? 'Integer' : 'Decimal';
    const validationToCall = `validate${numeralType}`;
    const numeralFunctions = {
      validateDecimal: validateDecimal(params),
      validateInteger: validateInteger(params)
    };
    const validationObject = numeralFunctions[validationToCall];

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
  }
}

export default NumeralTypeValidator;

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
    validate(value) {
      return (!value || /^-?(\d+(\.\d+)?|\.\d+|\d+\.)$/.test(value));
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message() {
      return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.not_a_number');
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
    validate(value) {
      return (!value || /^-?\d+$/.test(value));
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message() {
      return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.not_an_integer');
    }
  };
}
