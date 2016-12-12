import ValidationsHelper from './../../helpers/validations';

class IsBlankValidator {
  validate = (value) => {
    if (value === '' || null || undefined) {
      return true;
    } else {
      return false;
    }
  }
  constructor(params = {}) {
    this.customMessage = params.customMessage;
  }

  message = () => {
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.must_be_blank');
  }
}

export default IsBlankValidator;
