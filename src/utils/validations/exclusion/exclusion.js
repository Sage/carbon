import ValidationsHelper from './../../helpers/validations';

/**
 * An Exclusion Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import ExclusionValidator from 'utils/validations/exclusion'`
 *
 * Validate the value is not included in the list, pass an array in the param disallowedValues:
 *
 *  e.g.
 *
 *  `<TextArea validations={ [new ExclusionValidator({ disallowedValues: ['foo', 'bar'] })] }/>`
 *
 * would validate that the value of the text field is not either 'foo' or 'bar'.
 *
 *
 * @constructor ExclusionValidator
 */
class ExclusionValidator {

  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {
    this.disallowedValues = params.disallowedValues || [];

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
    return this.disallowedValues.indexOf(value) === -1;
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.exclusion');
  }
}

export default ExclusionValidator;
