'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _validations = require('../../helpers/validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This will validate an input for presence.
 *
 * == How to use a presence validator with a component:
 *
 * In your file
 *
 *   import PresenceValidator from 'carbon-react/lib/utils/validatons/presence';
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
var PresenceValidator =
/**
 * @method constructor
 * @param {Object} params
 */
function PresenceValidator() {
  var _this = this;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, PresenceValidator);

  this.validate = function (value, props) {
    var valid = void 0,
        result = _this.requireAll,
        val = value;

    if (!_this.props) {
      return isValid(value);
    }

    (0, _lodash.forEach)(_this.props, function (name) {
      val = props[name];
      valid = isValid(val);
      result = _this.requireAll ? result && valid : result || valid;
      if (result !== _this.requireAll) {
        return false;
      }
      return true;
    });
    return result;
  };

  this.message = function () {
    return _validations2.default.validationMessage(_this.customMessage, 'errors.messages.blank');
  };

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


/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */
;

function isValid(value) {
  return !(0, _lodash.isEmpty)(value) && !value.match(/^\s*$/);
}

exports.default = PresenceValidator;