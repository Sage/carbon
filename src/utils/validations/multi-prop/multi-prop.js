import { forEach } from 'lodash';
import ValidationsHelper from './../../helpers/validations';

/**
 * This will validate an input for mutli props for a given validator.
 *
 * == How to use a MultiPropValidator with a component:
 *
 * In your file
 *
 *   import MultiProp from 'carbon/lib/utils/validatons/multi-prop';
 *
 *   // Using PresenceValidator as an example
 *   import Presence from 'carbon/lib/utils/validatons/presence';
 *
 * To apply a MultiProp:
 *
 *   <Textbox
 *     prop1={ // get prop1 }
 *     prop2={ // get prop2 }
 *     validations={ [new MultiProp({ props: ['prop1', 'prop2'], validator: new Presence() })] }
 *   />
 *
 * By default, the validation, in this case presence, of ANY of the specified properties satisfies the validation.
 * If ALL of the properties are required to pass validation, set the `requireAll` argument as well:
 *
 *   validator = new MultiProp({ props: ['prop1', 'prop2'], requireAll: true, validator: new Presence() })
 *
 * @constructor MultiPropValidator
 */
class MultiPropValidator {
  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params) {
    /**
     * An optional custom validation message.
     *
     * @property customMessage
     * @type {String}
     */
    this.customMessage = params.customMessage;

    /**
     * Validator
     *
     * @property validator
     * @type {Validation Object}
     */
    this.validator = params.validator;

    /**
     * List of properties to validate.
     *
     * @property props
     * @type {Array}
     */
    this.props = params.props;

    /**
     * States that this validation should display an asterisk with the label.
     *
     * @method asterisk
     * @type {Boolean}
     * @default false
     */
    this.asterisk = Boolean(params.asterisk);

    /**
     * Determines whether any or all properties are required to be present.
     *
     * @property requireAll
     * @type {Boolean}
     * @default false
     */
    this.requireAll = Boolean(params.requireAll);
  }

  /**
   * This will validate the given value, and return a valid status.
   *
   * @method validate
   * @param {String} value - unused - follows format of other validators
   * @param {Object} props - component properties
   * @return {Boolean} true if value is valid
   */
  validate = (value, props) => {
    let valid, val,
        result = this.requireAll;

    forEach(this.props, (name) => {
      val = props[name];
      valid = this.validator.validate(val, props);
      result = this.requireAll ? (result && valid) : (result || valid);

      if (result !== this.requireAll) {
        return false;
      }
      return true;
    });
    return result;
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(
      this.customMessage,
      'errors.messages.multi_prop',
      this.props
    );
  }
}

export default MultiPropValidator;
