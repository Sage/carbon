import ValidationsHelper from './../../helpers/validations';
/**
 * A DateRangeValidator object.
 *
 * This validator compares to date fields and asserts that a start date is earlier than the end date.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import DateRangeValidator from 'utils/validations/date-range'`
 *
 * Assign the validator to the two Date fields being compared.
 * Pass the alternative date value to the validator.
 * i.e. Pass the start date value to the EndDate validator, and vice versa.
 *
 *  validations={ [ new DateRangeValidator({
      startDate: this.props.value[0],
      messageText: this.endMessage
    })] }
 *
 * You must pass a messageText string if you want an error message displayed.
 *
 * @constructor DateRangeValidator
 */
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
    this.messageText = params.messageText;

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
    this.startDate = params.startDate;
  }


  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {String} value to compare
   * @return {Boolean} true if check is valid
   */
   validate = (value) => {
     if (this.endDate && value > this.endDate) {
       return false;
     } else if (this.startDate && value < this.startDate) {
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
    return ValidationsHelper.validationMessage(this.messageText);
  }
}

export default DateRangeValidator;
