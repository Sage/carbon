import I18n from "i18n-js";

/**
 * A Range Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import RangeValidator from 'utils/validations/Range'`
 *
 * Assign the validator to the validations prop, passing the required params.:
 *
 *  `<TextArea validations={ [RangeValidator({
 *                              type: 'text',
 *                              minValue: 10,
 *                              maxValue: 20 })
 *                            ]
 *                          }/>`
 *
 *  `<Numbervalidations={ [RangeValidator({ type: 'numeral', minValue: 1, maxValue: 10 })] }/>`
 *
 * == Defaults ==
 * By default, `type` is set to `text`.
 *
 * By default, the validator checks for an exact match length.
 *
 * == Other Prams ==
 *
 * For strict inequalities ('less than', 'greater than', but 'equal to'),
 * pass a prop of `strict`.
 *
 * For example, to set a validation to check for a range between 100 and 500,
 * excluding 100 and 500:
 *
 *  `<TextArea validations={ [RangeValidator({
 *                            minValue: 100,
 *                            maxValue: 500,
 *                            strict: true  })
 *                            ]
 *                          }/>`
 *
 * @method LengthValidator
 * @param {Object} params (length, minValue, maxValue, strict)
 */
const RangeValidator = function(params) {
  //defaults
  params.type = params.type || 'text';

  validationStrict += params.strict ? 'Strict' : '';
  let validationToCall = 'validateRange' + validationStrict;

  let RangeFunctions = {
    'validateRange':       validateRange(params),
    'validateRangeStrict': validateRangeStrict(params)
  }

  return RangeFunctions[validationToCall];
};

export default RangeValidator;

/**
 * This will validate whether the value is between a given range,
 * inclusive of the minValue and maxValue.
 *
 * @method validateRange
 * @param {Object} value to check, minValue, maxValue
 * @return {Function} validateRange
 * @return {Function} message
 * @private
 */
function validateRange(params) {
  return {
    validate: function(value) {
      return (!value || (value.length >= params.minValue && value.length <= params.maxValue));
    },
    message: function() {
      return I18n.t(`validations.length_range_inclusive.${params.type}`, { min: params.minValue, max: params.maxValue });
    }
  };
}

/**
 * This will validate whether the value is between a given range.
 *
 * @method validateRangeStrict
 * @param {Object} value to check, minValue, maxValue, strict
 * @return {Function} validateRangeStrict
 * @return {Function} message
 * @private
 */
function validateRangeStrict(params) {
  return {
    validate: function(value) {
      return (!value || (value.length > params.minValue && value.length < params.maxValue));
    },
    message: function() {
      return I18n.t(`validations.length_range.${params.type}`, { min: params.minValue, max: params.maxValue });
    }
  };
}
