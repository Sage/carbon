'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersValidations = require('./../../helpers/validations');

var _helpersValidations2 = _interopRequireDefault(_helpersValidations);

/**
 * A Regex Validator
 *
 * == How to use this validator ==
 *
 * Import the validator into your component
 *
 * import RegexValidator from 'utils/validations/regex'
 *
 * Assign this validator to the validations prop
 *
 * <Textbox validations={ [RegexValidator({ format: (/[A-Z]{5}/) }) ] }/>
 *
 * @method RegexValidator
 * @param {Regex} format the regex to test against
 */
var RegexValidator = function RegexValidator() {
  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function validate(value) {
      return !value || params.format.test(value);
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function message() {
      return _helpersValidations2['default'].validationMessage(params.message, 'validations.regex');
    }
  };
};

exports['default'] = RegexValidator;
module.exports = exports['default'];