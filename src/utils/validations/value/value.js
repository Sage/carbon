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
 * To validate that a value not be lesser or greater than a given value set a 'maxValue' or
 * 'minValue'.
 *
 *  e.g.
 *
 *  `<Number validations={ [ValueValidator({
 *                              minValue: 8 })] }/>`
 *
 * would validate that a number value be at least 8.
 *
 * To validate that a value is within a given range, set both a minValue and maxValue.
 *
 * @method ValueValidator
 * @param {Object} params (is, minValue, maxValue)
 */
const ValueValidator = function(params) {
  // Build string to call correct function
  let validationToCall = 'validate' + getType(params);

  let ValueFunctions = {
    'validateGreater': validateGreater(params),
    'validateValue':   validateValue(params),
    'validateLess':    validateLess(params),
    'validateRange':   validateRange(params)
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
  if (params.is && !params.maxValue && !params.minValue) {
    return 'Value';
  } else if (!params.is && params.maxValue && !params.minValue) {
    return 'Less';
  } else if (!params.is && params.minValue && !params.maxValue) {
    return 'Greater';
  } else if (!params.is && params.minValue && params.maxValue) {
    return 'Range';
  } else {
    throw new Error("You must either set an 'is' value, a single minimum and maximum value, or both a minimum and maximum value.");
  }
}

/**
 * This will validate whether the value matches the specified Value.
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
      return I18n.t("validations.value", { is: params.is });
    }
  };
}

/**
 * This will validate whether the value is less than or equal to a maximum value.
 *
 * @method validateLess
 * @param {Object} value to check, maxValue
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
      return (!value || (value <= params.maxValue));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return I18n.t("validations.value_less_than_or_equal", { max: params.maxValue });
    }
  };
}


/**
 * This will validate whether the value is greater than or equal to a minimum value.
 *
 * @method validateGreater
 * @param {Object} value to check, minValue
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
      return (!value || (value >= params.minValue));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return I18n.t("validations.value_greater_than_or_equal", { min: params.minValue });
    }
  };
}

/**
 * This will validate whether the value is between a given range,
 * inclusive of the minValue and maxValue.
 *
 * @method validateRange
 * @param {Object} value to check, minValue, maxValue
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
      return (!value || (value >= params.minValue && value <= params.maxValue));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return I18n.t("validations.value_range", { min: params.minValue, max: params.maxValue });
    }
  };
}
