import ValidationsHelper from './../../helpers/validations';
import I18n from "i18n-js";
import moment from 'moment';

class DateValidator {

  constructor(params = {}) {
    this.customMessage = params.customMessage;
  }

  validate = (value) => {
    let validFormats = I18n.t('date.formats.inputs', { defaultValue: ["MMM/DD/YY", "DD/MM", "DD/MM/YYYY", "DD/MMM/YYYY", "YYYY/MM/DD"] });
    return !value && moment(this._sanitize(value), validFormats, I18n.locale, true).isValid();
  }

  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.date');
  }

  _sanitize(value) {
    return value.replace(/[^0-9A-zÀ-ÿ\s\/\.\-]/g, "").replace(/[-.\s]/g, "/").toLowerCase();
  }
}

export default DateValidator;
