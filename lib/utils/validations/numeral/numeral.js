/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var /*istanbul ignore next*/_numeralType = require('./numeral-type');

/*istanbul ignore next*/
var _numeralType2 = _interopRequireDefault(_numeralType);

var /*istanbul ignore next*/_validations = require('./../../helpers/validations');

/*istanbul ignore next*/
var _validations2 = _interopRequireDefault(_validations);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

var /*istanbul ignore next*/_i18n = require('./../../helpers/i18n');

/*istanbul ignore next*/
var _i18n2 = _interopRequireDefault(_i18n);

var /*istanbul ignore next*/_bignumber = require('bignumber.js');

/*istanbul ignore next*/
var _bignumber2 = _interopRequireDefault(_bignumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
 * @constructor NumeralValidator
 */

var NumeralValidator =

/**
 * @method constructor
 * @param {Object} params
 */
function /*istanbul ignore next*/NumeralValidator() {
  /*istanbul ignore next*/var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  /*istanbul ignore next*/
  _classCallCheck(this, NumeralValidator);

  var validationToCall = /*istanbul ignore next*/void 0,
      numeralFunctions = /*istanbul ignore next*/void 0,
      validationObject = /*istanbul ignore next*/void 0;

  validationToCall = 'validate' + getType(params);

  numeralFunctions = {
    validateGreater: validateGreater(),
    validateExact: validateValue(),
    validateLess: validateLess(),
    validateRange: validateRange(),
    validateType: validateType()
  };

  validationObject = numeralFunctions[validationToCall];

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
   * Can the number be a decimal, or only an integer.
   *
   * @property integer
   * @type {Boolean}
   */
  this.integer = params.integer;

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
};

/*istanbul ignore next*/exports.default = NumeralValidator;

// Private Methods

/**
 * Returns validation type based on param
 *
 * @method getType
 * @return {String} validation to call
 * @private
 */

function getType(params) {
  return (/*istanbul ignore next*/_validations2.default.comparisonType(params) || 'Type'
  );
}

/**
 * Returns the correct error message depending on params,
 * numeralType and validation function
 *
 * @method getDescriptiveMessage
 * @param {Object} params validator params
 * @param {Integer|Decimal|String} value value in input field
 * @param {String} i18nString e.g. errors.messages.length
 * @param {Object} i18nOptions options to pass to i18n
 * @return {String} message to display
 *
 */
function getDescriptiveMessage(params, value, i18nString, i18nOptions) {
  if (params.customMessage) {
    return params.customMessage;
  }

  var typeValidator = new /*istanbul ignore next*/_numeralType2.default(params);

  if (!typeValidator.validate(value)) {
    return typeValidator.message();
  } else {
    var precision = params.integer ? 0 : 2;
    i18nOptions.count = /*istanbul ignore next*/_i18n2.default.formatDecimal(i18nOptions.count, precision);
    return (/*istanbul ignore next*/_i18nJs2.default.t(i18nString, i18nOptions)
    );
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
  return new /*istanbul ignore next*/_numeralType2.default(params).validate(value);
}

/**
 * This will validate whether the value matches exactly the specified Value.
 *
 * @method validateValue
 * @return {Function} validate
 * @return {Function} message
 * @private
 */
function validateValue() {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function /*istanbul ignore next*/validate(value) {
      if (!value) {
        return true;
      }

      var stringValue = new /*istanbul ignore next*/_bignumber2.default(value),
          stringIs = new /*istanbul ignore next*/_bignumber2.default(this.is);

      return typeCheck(this, value) && stringValue.equals(stringIs);
    },
    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function /*istanbul ignore next*/message(value) {
      return getDescriptiveMessage(this, value, "errors.messages.equal", { count: this.is });
    }
  };
}

/**
 * This will validate whether the value is less than or equal to a maximum value.
 *
 * @method validateLess
 * @return {Function} validateLess
 * @return {Function} message
 * @private
 */
function validateLess() {
  return {
    /**
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function /*istanbul ignore next*/validate(value) {
      if (!value) {
        return true;
      }

      var stringValue = new /*istanbul ignore next*/_bignumber2.default(value),
          stringMax = new /*istanbul ignore next*/_bignumber2.default(this.max);

      return typeCheck(this, value) && stringValue.lessThanOrEqualTo(stringMax);
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function /*istanbul ignore next*/message(value) {
      return getDescriptiveMessage(this, value, "errors.messages.less_than_or_equal_to", { count: this.max });
    }
  };
}

/**
 * This will validate whether the value is greater than or equal to a minimum value.
 *
 * @method validateGreater
 * @return {Function} validateGreater
 * @return {Function} message
 * @private
 */
function validateGreater() {
  return {
    /**
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function /*istanbul ignore next*/validate(value) {
      if (!value) {
        return true;
      }

      var stringValue = new /*istanbul ignore next*/_bignumber2.default(value),
          stringMin = new /*istanbul ignore next*/_bignumber2.default(this.min);

      return typeCheck(this, value) && stringValue.greaterThanOrEqualTo(stringMin);
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function /*istanbul ignore next*/message(value) {
      return getDescriptiveMessage(this, value, "errors.messages.greater_than_or_equal_to", { count: this.min });
    }
  };
}

/**
 * This will validate whether the value is between a given range,
 * inclusive of the min and max.
 *
 * @method validateRange
 * @return {Function} validateRange
 * @return {Function} message
 * @private
 */
function validateRange() {
  return {
    /**
     * @method validate
     * @param {Integer|Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function /*istanbul ignore next*/validate(value) {
      if (!value) {
        return true;
      }

      var stringValue = new /*istanbul ignore next*/_bignumber2.default(value),
          stringMin = new /*istanbul ignore next*/_bignumber2.default(this.min),
          stringMax = new /*istanbul ignore next*/_bignumber2.default(this.max);

      return typeCheck(this, value) && stringValue.greaterThanOrEqualTo(stringMin) && stringValue.lessThanOrEqualTo(stringMax);
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function /*istanbul ignore next*/message(value) {
      var error = 'greater',
          count = this.min,
          stringValue = new /*istanbul ignore next*/_bignumber2.default(value),
          stringMin = new /*istanbul ignore next*/_bignumber2.default(count);

      if (stringValue.greaterThanOrEqualTo(stringMin)) {
        error = 'less';
        count = this.max;
      }

      return getDescriptiveMessage(this, value, /*istanbul ignore next*/'errors.messages.' + error + '_than_or_equal_to', { count: count });
    }
  };
}

/**
 * This will only validate the type of numeral
 *
 * @method validateRange
 * @return {Function} validateRange
 * @return {Function} message
 * @private
 */
function validateType() {
  return {
    /**
     * @method validate
     * @param {Integer|Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function /*istanbul ignore next*/validate(value) {
      if (!value) {
        return true;
      }

      return typeCheck(this, value);
    },

    /**
     * @method message
     * @return {String} the error message to display
     */
    message: function /*istanbul ignore next*/message() {
      return new /*istanbul ignore next*/_numeralType2.default(this).message();
    }
  };
}