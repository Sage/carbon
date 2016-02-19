import ValidationsHelper from './../../helpers/validations';
import I18n from "i18n-js";

/**
 * This will validate an input for presence.
 *
 * @object PresenceValidator
 * @return {Object} Validator object
 */
let PresenceValidator = function(params = {}) {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {String} value to check presence
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      if (value && value.get) {
        // if value is an immutable object, we probably want to judge that it has
        // a value by an ID attribute. This relates to components such as
        // DropdownSuggest which has an immutable object as its value.
        if (value.get('id')) {
          return true;
        } else {
          return false;
        }
      } else {
        // for regular inputs, we can just use it's regular value
        if (value) {
          return true;
        } else {
          return false;
        }
      }
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return ValidationsHelper.validationMessage(params.message, 'validations.presence');
    },

    /**
     * States that this validation should display an asterisk with the label.
     *
     * @method asterisk
     * @return {Boolean}
     */
    asterisk: true
  };
};

export default PresenceValidator;
