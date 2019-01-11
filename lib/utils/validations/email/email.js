'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regex = require('../regex');

var _regex2 = _interopRequireDefault(_regex);

var _validations = require('../../helpers/validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Email Validator
 *
 * == How to use this validator ==
 *
 * Import the validator into your component
 *
 * import EmailValidator from 'carbon-react/lib/utils/validations/email'
 *
 * Assign this validator to the validations prop
 *
 * <Textbox validations={ [ new EmailValidator ] }/>
 *
 * If you want to add a custom message to the validator you can
 * pass a object with a message key
 *
 * <Textbox validations={ [ new EmailValidator({ message: 'foo' }) ] }/>
 *
 * @constructor EmailValidator
 */
var EmailValidator =
/**
 * @method constructor
 * @param {Object} params
 */
function EmailValidator() {
  var _this = this;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, EmailValidator);

  this.validate = function (value) {
    return new _regex2.default({ format: /(^$)|^([-a-z0-9'+._]{1,64})@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i }).validate(value);
  };

  this.message = function () {
    return _validations2.default.validationMessage(_this.customMessage, 'errors.messages.invalid_email');
  };

  /**
   * An optional custom validation message.
   *
   * @property customMessage
   * @type {String}
   */
  this.customMessage = params.customMessage;
}

/**
 * This will validate the given value return if it is a valid email.
 *
 * @method validate
 * @param {Float} value to check
 * @return {Boolean} true if value is valid
 */


/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */
;

exports.default = EmailValidator;