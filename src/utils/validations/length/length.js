import ValidationsHelper from './../../helpers/validations';

/**
 * A Length Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import LengthValidator from 'utils/validations/length'`
 *
 * Assign the validator to the validations prop, passing the required params:
 *
 * By default, the validator sets the input type to 'text', you can set this to 'numeral',
 * in order to change the i18n message returned.
 *
 * To validate a number is a specific length, pass { type: 'numeral', is: 100} :
 *
 * To validate that a length not be lesser or greater than a value set a 'max' or 'min'.
 *
 *  e.g.
 *
 *  `<TextArea validations={ [LengthValidator({ min: 8 })] }/>`
 *
 * would validate that a text field be at least 8 characters long.
 *
 * To validate a length is within a given range, set both a min and max.
 *
 * Examples:
 *
 * // length is greater than or equal to 8:
 * LengthValidator({ min: 8 });
 *
 * // length is less than or equal to 8:
 * LengthValidator({ max: 8 });
 *
 * // length is between 5 and 10 characters:
 * LengthValidator({ min: 5, max: 10 });
 *
 * // length is 10 characters:
 * LengthValidator({ is: 10 });
 *
 * @method LengthValidator
 * @param {Object} params (is, min, max, type(optional))
 */
const LengthValidator = function(params = {}) {
  //defaults
  params.type = params.type || 'text';

  // Build string to call correct function
  let type = getType(params);
  if (!type) {
    throw new Error("You must either set an 'is' value, a single 'min' and 'max' value, or both a 'min' and 'max' value.");
  }

  let validationToCall = 'validate' + type;

  let LengthFunctions = {
    validateGreater: validateGreater(params),
    validateExact:   validateLength(params),
    validateLess:    validateLess(params),
    validateRange:   validateRange(params)
  };

  return LengthFunctions[validationToCall];
};

export default LengthValidator;


// Private Methods

/**
 * Returns validation type based on param
 *
 * @method getType
 * @return {String} validation to call
 * @private
 */
function getType(params) {
  return ValidationsHelper.comparisonType(params);
}

/**
 * This will validate whether the value matches the specified length.
 *
 * @method validateLength
 * @return {Function} validate
 * @return {Function} message
 * @private
 */
function validateLength(params) {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value.length == params.is));
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(
        params.message,
        `validations.length.${params.type}`,
        { is: params.is }
      );
    }
  };
}

/**
 * This will validate whether the value is less than or equal to a maximum value.
 *
 * @method validateLess
 * @param {Object} value to check, max
 * @return {Function} validateLess
 * @return {Function} message
 * @private
 */
function validateLess(params) {
  return {
    /**
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value.length <= params.max));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(
        params.message,
        `validations.length_less_than_or_equal.${params.type}`,
        { max: params.max }
      );
    }
  };
}

/**
 * This will validate whether the value is greater than or equal to a minimum value.
 *
 * @method validateGreater
 * @param {Object} value to check, min
 * @return {Function} validateGreater
 * @return {Function} message
 * @private
 */
function validateGreater(params) {
  return {
    /**
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value.length >= params.min));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(
        params.message,
        `validations.length_greater_than_or_equal.${params.type}`,
        { min: params.min }
      );
    }
  };
}

/**
 * This will validate whether the value is between a given range,
 * inclusive of the min and max.
 *
 * @method validateRange
 * @param {Object} value to check, min, max
 * @return {Function} validateRange
 * @return {Function} message
 * @private
 */
function validateRange(params) {
  return {
    /**
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value.length >= params.min && value.length <= params.max));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(
        params.message,
        `validations.length_range.${params.type}`,
        { min: params.min, max: params.max }
      );
    }
  };
}
