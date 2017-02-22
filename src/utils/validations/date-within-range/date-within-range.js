import ValidationsHelper from './../../helpers/validations';
import DateHelper from './../../helpers/date';

// Validates that a date is within a given range
class DateWithinRangeValidator {

  /**
    * @method constructor
    * @param {Object} params
    *   @option [String] customMessage
    *   @option [Number] limit - number of units
    *   @option [String] units - unit of time e.g. 'days'/'months'
    */
  constructor(params = {}) {
    this.customMessage = params.customMessage;
    this.limit = params.limit;
    this.units = params.units || 'days';
  }

  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {Object} value to check
   * @return {Boolean} true if value is within range
   */
  validate = (value) => {
    return DateHelper.withinRange(value, this.limit, this.units);
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.out_of_range');
  }
}

export default DateWithinRangeValidator;
