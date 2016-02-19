import RegexValidator from './../regex';
import ValidationsHelper from './../../helpers/validations';

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
var EmailValidator = function(params = {}) {

  return {
    /**
     * This will validate the given value return if it is a valid email.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return RegexValidator({ format: /(^$)|^([-a-z0-9+._]{1,64})@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i }).validate(value);
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(params.message, 'validations.email');
    }
  };
};

export default EmailValidator;
