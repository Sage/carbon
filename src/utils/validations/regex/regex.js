import I18n from "i18n-js";

/**
 * A Regex Validator
 *
 * == How to use this validator ==
 *
 * Import the validator into your component
 *
 * import RegexValidator from 'utils/validations/regex'
 *
 * Assign this validator to the validations prop
 *
 * <Textbox validations={ [RegexValidator(/[A-Z]{5}/)] }/>
 *
 * @method RegexValidator
 * @param {Regex} format the regex to test against
 */
var RegexValidator = function(format) {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {Float} value to check
     * @return {Boolean} true if value is valid
     */
    validate: function(value) {
      return (!value || format.test(value));
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String} the error message to display
     */
    message: function() {
      return I18n.t("validations.regex");
    }
  };
};

export default RegexValidator;
