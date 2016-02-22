'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _numeralType = require('./numeral-type');

var _numeralType2 = _interopRequireDefault(_numeralType);

var _helpersValidations = require('./../../helpers/validations');

var _helpersValidations2 = _interopRequireDefault(_helpersValidations);

var _i18nJs = require("i18n-js");

var _i18nJs2 = _interopRequireDefault(_i18nJs);

/**
 * A Numeral Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import NumeralValidator from 'utils/validations/value'`
 *
 * Assign the validator to the validations prop, passing the required params:
 *
 * This validate will check that the value is a decimal by default. If you want
 * to ensure that the value is a integer pass { integer: true } as a property
 *
 * To validate a number is a specific value, pass { is: 100} :
 *
 * To validate that a value not be lesser or greater than a given value set a 'max' or
 * 'min'.
 *
 *  e.g.
 *
 *  `<Number validations={ [NumeralValidator({ integer: true, min: 8 })] }/>`
 *
 * would validate that a number value be at least 8 and a integer
 *
 * To validate that a value is within a given range, set both a min and max.
 *
 * Examples:
 *
 * // value is greater than or equal to 8:
 * NumeralValidator({ min: 8 });
 *
 * // value is less than or equal to 8:
 * NumeralValidator({ max: 8 });
 *
 * // value is between 5 and 10:
 * NumeralValidator({ min: 5, max: 10 });
 *
 * // value is 10:
 * NumeralValidator({ is: 10 });
 *
 * @method NumeralValidator
 * @param {Object} [params]
 * @param {Integer} [params.is] validate numeral is exact value
 * @param {Integer} [params.min] validate numeral is greater than or equal to
 * @param {Integer} [params.max] validate numeral is less than or equal to
 */
var NumeralValidator = function NumeralValidator(params) {

  // Build string to call correct function
  var validationToCall = 'validate' + getType(params);

  var NumeralFunctions = {
    validateGreater: validateGreater(params),
    validateExact: validateValue(params),
    validateLess: validateLess(params),
    validateRange: validateRange(params),
    validateType: validateType(params)
  };

  return NumeralFunctions[validationToCall];
};

exports['default'] = NumeralValidator;

// Private Methods

/**
 * Returns validation type based on param
 *
 * @method getType
 * @return {String} validation to call
 * @private
 */
function getType(params) {
  return _helpersValidations2['default'].comparisonType(params) || 'Type';
}

/**
 * Returns the correct error message depending on params,
 * numeralType and validation function
 *
 * @method getDescriptiveMessage
 * @param {Object} params validator params
 * @param {Integer|Decimal|String} value value in input field
 * @param {String} i18nString e.g. validations.greater
 * @param {Object} i18nOptions options to pass to i18n
 * @return {String} message to display
 *
 */
function getDescriptiveMessage(params, value, i18nString, i18nOptions) {
  if (params.message) {
    return params.message;
  }

  var typeValidator = (0, _numeralType2['default'])(params);

  if (!typeValidator.validate(value)) {
    return typeValidator.message();
  } else {
    return _i18nJs2['default'].t(i18nString, i18nOptions);
  }
}

/**
 * Checks if value is of the correct type using
 * the NumeralTypeValidator
 *
 * @method typeCheck
 * @param {Object} validator params
 * @param {Integer|Decimal|String} value value in input field
 * @return {Boolean} true if valid numeral type
 *
 */
function typeCheck(params, value) {
  return (0, _numeralType2['default'])(params).validate(value);
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
    validate: function validate(value) {
      return !value || typeCheck(params, value) && value == params.is;
    },
    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function message(value) {
      return getDescriptiveMessage(params, value, "validations.value", { is: params.is });
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
    validate: function validate(value) {
      return !value || typeCheck(params, value) && value <= params.max;
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function message(value) {
      return getDescriptiveMessage(params, value, "validations.value_less_than_or_equal", { max: params.max });
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
    validate: function validate(value) {
      return !value || typeCheck(params, value) && value >= params.min;
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function message(value) {
      return getDescriptiveMessage(params, value, "validations.value_greater_than_or_equal", { min: params.min });
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
     * @param {Integer|Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function validate(value) {
      return !value || typeCheck(params, value) && value >= params.min && value <= params.max;
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function message(value) {
      return getDescriptiveMessage(params, value, "validations.value_range", { min: params.min, max: params.max });
    }
  };
}

/**
 * This will only validate the type of numeral
 *
 * @method validateRange
 * @param {Object} value to check type
 * @return {Function} validateRange
 * @return {Function} message
 * @private
 */
function validateType(params) {
  return {
    /**
     * @method validate
     * @param {Integer|Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function validate(value) {
      return !value || typeCheck(params, value);
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function message() {
      return (0, _numeralType2['default'])(params).message();
    }
  };
}
module.exports = exports['default'];