'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpersValidations = require('./../../helpers/validations');

var _helpersValidations2 = _interopRequireDefault(_helpersValidations);

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

  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, PresenceValidator);

  this.validate = function (value) {
    if (value) {
      return true;
    } else {
      return false;
    }
  };

  this.message = function () {
    return _helpersValidations2['default'].validationMessage(_this.customMessage, 'validations.presence');
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
;

exports['default'] = PresenceValidator;
module.exports = exports['default'];

/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */