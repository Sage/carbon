import ValidationsHelper from './../../helpers/validations';
import I18n from "i18n-js";
import moment from 'moment';

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
    let validFormats = I18n.t('date.formats.inputs', { defaultValue: ["MMM/DD/YY", "DD/MM", "DD/MM/YYYY", "DD/MMM/YYYY", "YYYY/MM/DD"] });
    return !value || moment(this._sanitize(value), validFormats, I18n.locale, true).isValid();
  }


  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.date');
  }

  /**
   * Sanitize date value
   *
   * @method _sanitize
   */
  _sanitize(value) {
    return value.replace(/[^0-9A-zÀ-ÿ\s\/\.\-]/g, "").replace(/[-.\s]/g, "/").toLowerCase();
  }
}

export default DateValidator;
