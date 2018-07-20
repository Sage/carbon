import ValidationsHelper from './../../helpers/validations';

/**
 * This will validate a value for being blank.
 *
 * @constructor IsBlankValidator
 */
class IsBlankValidator {
  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {
    this.customMessage = params.customMessage;

    /**
     * Validation Properties involved in how the validation looks and interacts
     *
     * @property properties
     * @type {Object}
     */
    this.properties = ValidationsHelper.validationProperties(
      params.type, params.properties
    )
  }

  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {Object} value to check
   * @return {Boolean} true if value is valid
   */
  validate = (value) => {
    return !value;
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.must_be_blank');
  }
}

export default IsBlankValidator;
