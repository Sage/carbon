import ValidationsHelper from './../../helpers/validations';

class DateRangeValidator {
  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {
    /**
     * The error message text
     *
     * @property messageText
     * @type {String}
     */
    this.messageText = '';

    /**
     * The current endDate, used to compare to the new startDate
     *
     * @property endDate
     * @type {String}
     */
    this.endDate = params.endDate;


    /**
     * The current startDate, used to compare to the new endDate
     *
     * @property startDate
     * @type {String}
     */
    this.startDate = params.startDate
  }


  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {String} value to compare
   * @return {Boolean} true if check is valid
   */
  validate = (value) => {
    if(this.endDate && value > this.endDate) {
      this.messageText = 'Start date cannot be later than end date';
      return false;
    } else if (this.startDate && value < this.startDate) {
      this.messageText = 'End date cannot be before the start date';
      return false;
    }
    return true;
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, this.messageText);
  }
}

export default DateRangeValidator;
