import I18n from "i18n-js";

/**
 * A Length Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import LengthValidator from 'utils/validations/length'`
 *
 * Assign the validator to the validations prop, passing the required params.:
 *
 *  `<TextArea validations={ [LengthValidator({
 *                              type: 'text',
 *                              validate: 'greater',
 *                              length: 100 })] }/>`
 *
 *  `<Numbervalidations={ [LengthValidator({ type: 'numeral', length: 10 })] }/>`
 *
 * `type` is required to output the correct i18n translation.
 *
 * == Defaults ==
 * By default, `type` is set to `text`.
 *
 * By default, the validator checks for an exact match length.
 *
 * == Other Prams ==
 *
 * Other possible validate options are 'less', 'greater', & 'range'.
 *
 * For strict inequalities ('less than', 'greater than'), pass an option of `strict: true`.
 *
 * For example, to set a validation to check for a maximum length of 100:
 *
 *  `<TextArea validations={[LengthValidator({
 *                            validate: 'less'
 *                            maxValue: 100  })
 *                           ]
 *                         }/>`
 *
 *
 * @method LengthValidator
 * @param {Object} params (length, minValue, maxValue, strict)
 */
const LengthValidator = function(params) {
  //defaults
  params.type = params.type || 'text';
  params.validate = params.validate || 'length';

  // Build string to call correct function
  validationType += params.strict ? 'Strict' : '';
  let validationToCall = 'validate' + validationType;

  let SizeFunctions = {
    'validateGreater':       validateGreater(params),
    'validateGreaterStrict': validateGreaterStrict(params),
    'validateLength':        validateLength(params),
    'validateLess':          validateLess(params),
    'validateLessStrict':    validateLessStrict(params)
  };

  return SizeFunctions[validationToCall];
};

export default LengthValidator;


// Private Methods

/**
 * This will validate whether the value matches the specified length.
 *
 * @method validateLength
 * @return {Function} validate
 * @return {Function} message
 * @private
 */
function validateLength(params) {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || (value.length == params.length));
    },
    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return I18n.t(`validations.length.${params.type}`, { value: params.length });
    }
  };
}

/**
 * This will validate whether the value is less than or equal to a maximum value.
 *
 * @method validateLess
 * @param {Object} value to check, maxValue
 * @return {Function} validateLess
 * @return {Function} message
 * @private
 */
function validateLess(params) {
  return {
    validate: function(value) {
      return (!value || (value.length <= params.maxValue));
    },
    message: function() {
      return I18n.t(`validations.length_less_than_or_equal.${params.type}`, { value: params.maxValue });
    }
  };
}

/**
 * This will validate whether the value is less than a maximum value.
 *
 * @method validateLessStrict
 * @param {Object} value to check, maxValue, strict
 * @return {Function} validateLessStrict
 * @return {Function} message
 * @private
 */
function validateLessStrict(params) {
  return {
    validate: function(value) {
      return (!value || (value.length < params.maxValue));
    },
    message: function() {
      return I18n.t(`validations.length_less_than.${params.type}`, { value: params.maxValue });
    }
  };
}

/**
 * This will validate whether the value is greater than or equal to a minimum value.
 *
 * @method validateGreater
 * @param {Object} value to check, minValue
 * @return {Function} validateGreater
 * @return {Function} message
 * @private
 */
function validateGreater(params) {
  return {
    validate: function(value) {
      return (!value || (value.length >= params.minValue));
    },
    message: function() {
      return I18n.t(`validations.length_greater_than_or_equal.${params.type}`, { value: params.minValue });
    }
  };
}

/**
 * This will validate whether the value is greater than a minimum value.
 *
 * @method validateGreaterStrict
 * @param {Object} value to check, minValue, strict
 * @return {Function} validateGreaterStrict
 * @return {Function} message
 * @private
 */
function validateGreaterStrict(params) {
  return {
    validate: function(value) {
      return (!value || (value.length > params.minValue));
    },
    message: function() {
      return I18n.t(`validations.length_greater_than.${params.type}`, { value: params.minValue });
    }
  };
}
