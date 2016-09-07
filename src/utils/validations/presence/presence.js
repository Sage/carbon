import ValidationsHelper from './../../helpers/validations';

/**
 * This will validate an input for presence.
 *
 * @constructor PresenceValidator
 */
class PresenceValidator {

  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {

    /**
     * An optional custom validation message.
     *
     * @property customMessage
     * @type {String}
     */
    this.customMessage = params.customMessage;

    /**
     * States that this validation should display an asterisk with the label.
     *
     * @method asterisk
     * @return {Boolean}
     */
    this.asterisk = true;
  }

  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {String} value to check presence
   * @return {Boolean} true if value is valid
   */
  validate = (value) => {
    if (value && !value.match(/^\s*$/)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.blank');
  }
}

export default PresenceValidator;
