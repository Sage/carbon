'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _regex = require('./../regex');

var _regex2 = _interopRequireDefault(_regex);

var _helpersValidations = require('./../../helpers/validations');

var _helpersValidations2 = _interopRequireDefault(_helpersValidations);

/**
 * A Email Validator
 *
 * == How to use this validator ==
 *
 * Import the validator into your component
 *
 * import EmailValidator from 'utils/validations/email'
 *
 * Assign this validator to the validations prop
 *
 * <Textbox validations={ [ EmailValidator() ] }/>
 *
 * If you want to add a custom message to the validator you can
 * pass a object with a message key
 *
 * <Textbox validations={ [ EmailValidator({ message: 'foo' }) ] }/>
 *
 * @method EmailValidator
 */
var EmailValidator = function EmailValidator() {
  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    /**
     * This will validate the given value return if it is a valid email.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function validate(value) {
      return (0, _regex2['default'])({ format: /(^$)|^([-a-z0-9+._]{1,64})@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i }).validate(value);
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function message() {
      return _helpersValidations2['default'].validationMessage(params.message, 'validations.email');
    }
  };
};

exports['default'] = EmailValidator;
module.exports = exports['default'];