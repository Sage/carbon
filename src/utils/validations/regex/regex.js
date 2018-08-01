import ValidationsHelper from '../../helpers/validations';

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
 * <Textbox validations={ [new RegexValidator({ format: (/[A-Z]{5}/) }) ] }/>
 *
 * @constructor RegexValidator
 */
class RegexValidator {
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
     * The format to run the regex with.
     *
     * @method format
     * @return {Regex}
     */
    this.format = params.format;
  }

  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {Float} value to check
   * @return {Boolean} true if value is valid
   */
  validate = (value) => {
    return (!value || this.format.test(value));
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.wrong_format');
  }
}

export default RegexValidator;
