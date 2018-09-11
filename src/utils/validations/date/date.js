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
    if (params.minDate) {
      if (DateHelper.isISOFormat(params.minDate)) {
        this.minDate = params.minDate;
      } else {
        throw new Error('minDate format must be YYYY-MM-DD');
      }
    }

    if (params.maxDate) {
      if (DateHelper.isISOFormat(params.maxDate)) {
        this.maxDate = params.maxDate;
      } else {
        throw new Error('maxDate format must be YYYY-MM-DD');
      }
    }
  }

  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {Object} value to check
   * @return {Boolean} true if value is valid
   */
  validate = (value) => {
    if (!value) {
      return true;
    }
    return DateHelper.isValidDate(value) && DateHelper.withinDateRange(value, this.minDate, this.maxDate);
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
