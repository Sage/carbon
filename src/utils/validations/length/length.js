import I18n from "i18n-js";

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
 * To validate that a length not be lesser or greater than a value set a 'maxValue' or 'minValue'.
 *
 *  e.g.
 *
 *  `<TextArea validations={ [LengthValidator({
 *                              minValue: 8 })] }/>`
 *
 * would validate that a text field be at least 8 characters long.
 *
 * To validate a length is within a given range, set both a minValue and maxValue.
 *
 * @method LengthValidator
 * @param {Object} params (is, minValue, maxValue, type(optional))
 */
const LengthValidator = function(params) {
  //defaults
  params.type = params.type || 'text';

  // Build string to call correct function
  let validationToCall = 'validate' + getType(params);

  let LengthFunctions = {
    'validateGreater': validateGreater(params),
    'validateLength':  validateLength(params),
    'validateLess':    validateLess(params),
    'validateRange':   validateRange(params)
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
  if (params.is && !params.maxValue && !params.minValue) {
    return 'Length';
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
      return I18n.t(`validations.length.${params.type}`, { is: params.is });
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
      return (!value || (value.length <= params.maxValue));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return I18n.t(`validations.length_less_than_or_equal.${params.type}`, { max: params.maxValue });
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
      return (!value || (value.length >= params.minValue));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return I18n.t(`validations.length_greater_than_or_equal.${params.type}`, { min: params.minValue });
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
      return (!value || (value.length >= params.minValue && value.length <= params.maxValue));
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return I18n.t(`validations.length_range.${params.type}`, { min: params.minValue, max: params.maxValue });
    }
  };
}
