import { forEach, isEmpty } from 'lodash';
import ValidationsHelper from './../../helpers/validations';

/**
 * This will validate an input for presence.
 *
 * == How to use a presence validator with a component:
 *
 * In your file
 *
 *   import PresenceValidator from 'carbon/lib/utils/validatons/presence';
 *
 * To apply a PresenceValidator:
 *
 *   <Textbox name="foo" validations={ [new PresenceValidator()] } />
 *
 * You can also specify multiple properties to validate by pasing an array of property
 * names as the `props` argument to the constructor:
 *
 *   validator = new PresenceValidator({ props: ['value', 'visibleValue'] });
 *
 * By default, the presence of ANY of the specified properties satisfies the validation.
 * If ALL of the properties are required present, set the `requireAll` argument as well:
 *
 *   validator = new PresenceValidator({ props: ['value', 'visibleValue'], requireAll: true });
 *
 * @constructor PresenceValidator
 */
class PresenceValidator {
  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {
    /**
     * An optional custom validation message.
     *
     * @property customMessage
     * @type {String}
     */
    this.customMessage = params.customMessage;

    /**
     * States that this validation should display an asterisk with the label.
     *
     * @method asterisk
     * @type {Boolean}
     */
    this.asterisk = true;

    /**
     * List of properties to validate.
     *
     * @property props
     * @type {Array}
     * @default ['value']
     */
    this.props = params.props;

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
   * @param {String} value - value to check presence
   * @param {Object} props - component properties
   * @return {Boolean} true if value is valid
   */
  validate = (value, props) => {
    let valid,
        result = this.requireAll,
        val = value;

    if (!this.props) {
      return isValid(value);
    }

    forEach(this.props, (name) => {
      val = props[name];
      valid = isValid(val);
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
    return ValidationsHelper.validationMessage(this.customMessage, 'errors.messages.blank');
  }
}

function isValid(value) {
  return !isEmpty(value) && !value.match(/^\s*$/);
}

export default PresenceValidator;
