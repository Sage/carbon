import ValidationsHelper from './../../helpers/validations';
import I18n from "i18n-js";

/**
 * A Value Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import ValueValidator from 'utils/validations/Value'`
 *
 * Assign the validator to the validations prop, passing the required params:
 *
 * To validate a number is a specific value, pass { type: 'numeral', is: 100} :
 *
 * To validate that a value not be lesser or greater than a given value set a 'max' or
 * 'min'.
 *
 *  e.g.
 *
 *  `<Number validations={ [ValueValidator({ min: 8 })] }/>`
 *
 * would validate that a number value be at least 8.
 *
 * To validate that a value is within a given range, set both a min and max.
 *
 * Examples:
 *
 * // value is greater than or equal to 8:
 * ValueValidator({ min: 8 });
 *
 * // value is less than or equal to 8:
 * ValueValidator({ max: 8 });
 *
 * // value is between 5 and 10:
 * ValueValidator({ min: 5, max: 10 });
 *
 * // value is 10:
 * ValueValidator({ is: 10 });
 *
 * @method ValueValidator
 * @param {Object} params (is, min, max)
 */
const ValueValidator = function(params) {
  // Build string to call correct function
  let validationToCall = 'validate' + getType(params);

  let ValueFunctions = {
    validateGreater: validateGreater(params),
    validateExact:   validateValue(params),
    validateLess:    validateLess(params),
    validateRange:   validateRange(params)
  };

  return ValueFunctions[validationToCall];
};

export default ValueValidator;


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
 * This will validate whether the value matches exactly the specified Value.
 *
 * @method validateValue
 * @return {Function} validate
 * @return {Function} message
 * @private
 */
function validateValue(params) {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value == params.is));
    },
    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return params.message || I18n.t("validations.value", { is: params.is });
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
      return (!value || (value <= params.max));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return params.message || I18n.t("validations.value_less_than_or_equal", { max: params.max });
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
      return (!value || (value >= params.min));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return params.message || I18n.t("validations.value_greater_than_or_equal", { min: params.min });
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
      return (!value || (value >= params.min && value <= params.max));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return params.message || I18n.t("validations.value_range", { min: params.min, max: params.max });
    }
  };
}
