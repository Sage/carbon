import ValidationsHelper from '../../helpers/validations/validations';

/**
 * A XSS Validator
 *
 * == How to use this validator ==
 *
 * Import the validator into your component
 *
 * import XssValidator from 'utils/validations/xss'
 *
 * Assign this validator to the validations prop
 *
 * <Textbox validations={ [new XssValidator({ format: (/[A-Z]{5}/) }) ] }/>
 *
 * @constructor XssValidator
 */
class XssValidator {
  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {
    /**
     * The default XSS detection format.
     *
     * @method format
     * @return {Regex}
     */
    this.defaultFormat = /&[a-zA-Z0-9]+;|<(.*)|>(.*)|%3C(.*)|\{|\}|&lt(.*)|&#(.*)|x3c|u003c|\\"|eval\s*\(|\wedirect\s3/i;

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
    this.format = params.format || this.defaultFormat;
  }

  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {Float} value to check
   * @return {Boolean} true if value is valid
   */
  validate = (value) => {
    return !value || (value && !this.format.test(value));
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.invalid_characters');
  }
}

export default XssValidator;
