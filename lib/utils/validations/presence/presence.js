'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validations = require('./../../helpers/validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This will validate an input for presence.
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

  this.validate = function (value) {
    if (value && !value.match(/^\s*$/)) {
      return true;
    } else {
      return false;
    }
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
   * @return {Boolean}
   */
  this.asterisk = true;
}

/**
 * This will validate the given value, and return a valid status.
 *
 * @method validate
 * @param {String} value to check presence
 * @return {Boolean} true if value is valid
 */


/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */
;

exports.default = PresenceValidator;