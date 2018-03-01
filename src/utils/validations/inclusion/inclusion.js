import ValidationsHelper from './../../helpers/validations';

/**
 * An Inclusion Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import InclusionValidator from 'utils/validations/inclusion'`
 *
 * Validate the value is included in the list, pass an array in the param allowedValues:
 *
 *  e.g.
 *
 *  `<TextArea validations={ [new InclusionValidator({ allowedValues: ['foo', 'bar'] })] }/>`
 *
 * would validate that the value of the text field is either 'foo' or 'bar'.
 *
 *
 * @constructor InclusionValidator
 */
class InclusionValidator {
  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {
    this.allowedValues = params.allowedValues || [];

    /**
     * An optional custom validation message.
     *
     * @property customMessage
     * @type {String}
     */
    this.customMessage = params.customMessage;
  }

  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {String} value to check presence
   * @return {Boolean} true if value is valid
   */
  validate = (value) => {
    return this.allowedValues.indexOf(value) !== -1;
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.inclusion');
  }
}

export default InclusionValidator;
