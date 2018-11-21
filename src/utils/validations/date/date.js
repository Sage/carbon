import ValidationsHelper from '../../helpers/validations';
import DateHelper from '../../helpers/date';

/**
 * Validates a date
 *
 * @constructor DateValidator
 */
class DateValidator {
  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {
    this.customMessage = params.customMessage;
  }

  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {Object} value to check
   * @return {Boolean} true if value is valid
   */
  validate = (value) => {
    return !value || DateHelper.isValidDate(value);
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

export default DateValidator;
