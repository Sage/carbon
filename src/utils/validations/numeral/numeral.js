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
 *  `<Decimal validations={ [NumeralValidator({ validate: 'decimal' })] }/>`
 *  `<Numeral validations={ [NumeralValidator({ validate: 'integer' })] }/>`
 *
 * Other possible validate options are 'less', 'greater', & 'range'.
 * For value or range properties pass a `minValue`, and/or `maxValue`.
 * For strict inequalities ('less than', 'greater than'), pass a prop of `strict`.
 *
 * For example, to set a validation to check for a range between 0 and 10 inclusive:
 *
 *  `<Decimal validations={ [NumeralValidator({
                              validate: 'range',
                              minValue: 0,
                              maxValue: 10 })]
                           }/>`
 * @method NumeralValidator
 * @param {Object} params (validate), optional params (minValue, maxValue, strict)
 */
const NumeralValidator = function(params) {

  // Build String to call correct function
  let validationType = startCase(params.validate);
  validationType += params.strict ? 'Strict' : '';
  let validationToCall = 'validate' + validationType;

  /*
   * Object to map function names to exectuble instances
   */
  let functionCalls = {
    'validateDecimal':       validateDecimal(),
    'validateInteger':       validateInteger(),
    'validateLess':          validateLess(params),
    'validateLessStrict':    validateLessStrict(params),
    'validateGreater':       validateGreater(params),
    'validateGreaterStrict': validateGreaterStrict(params),
    'validateRange':         validateRange(params),
    'validateRangeStrict':   validateRangeStrict(params)
  };

  return functionCalls[validationToCall];
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
    validate: function(value) {
      return (!value || parseFloat(value) <= params.maxValue);
    },
    message: function() {
      return I18n.t("validations.equal_or_less_than", { maxValue: params.maxValue });
    }
  };
}

/**
 * This will validate whether the value is less than a maximum value.
 *
 * @method validateLessStrict
 * @param {Object} value to check, maxValue, strict
 * @return {Function} validateLessStrict
 * @return {Function} message
 * @private
 */
function validateLessStrict(params) {
  return {
    validate: function(value) {
      return (!value || parseFloat(value) < params.maxValue);
    },
    message: function() {
      return I18n.t("validations.less_than", { maxValue: params.maxValue });
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
    validate: function(value) {
      return (!value || parseFloat(value) >= params.minValue);
    },
    message: function() {
      return I18n.t("validations.equal_or_greater_than", { minValue: params.minValue });
    }
  };
}

/**
 * This will validate whether the value is greater than a minimum value.
 *
 * @method validateGreaterStrict
 * @param {Object} value to check, minValue, strict
 * @return {Function} validateGreaterStrict
 * @return {Function} message
 * @private
 */
function validateGreaterStrict(params) {
  return {
    validate: function(value) {
      return (!value || parseFloat(value) > params.minValue);
    },
    message: function() {
      return I18n.t("validations.greater_than", { minValue: params.minValue });
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
    validate: function(value) {
      return (!value ||
              parseFloat(value) >= params.minValue &&
              parseFloat(value) <= params.maxValue);
    },
    message: function() {
      return I18n.t("validations.value_between_inclusive",
                    { minValue: params.minValue, maxValue: params.maxValue });
    }
  };
}

/**
 * This will validate whether the value is between a given range.
 *
 * @method validateRangeStrict
 * @param {Object} value to check, minValue, maxValue, strict
 * @return {Function} validateRangeStrict
 * @return {Function} message
 * @private
 */
function validateRangeStrict(params) {
  return {
    validate: function(value) {
      return (!value ||
              parseFloat(value) > params.minValue &&
              parseFloat(value) < params.maxValue);
    },
    message: function() {
      return I18n.t("validations.value_between",
                   { minValue: params.minValue, maxValue: params.maxValue });
    }
  };
}
