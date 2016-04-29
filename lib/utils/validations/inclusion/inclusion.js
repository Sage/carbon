'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpersValidations = require('./../../helpers/validations');

var _helpersValidations2 = _interopRequireDefault(_helpersValidations);

/**
 * An Inclusion Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import InclusionValidator from 'utils/validations/inclusion'`
 *
 * Validate the value is included in the list, pass an array in the param allowedValues:
 *
 *  e.g.
 *
 *  `<TextArea validations={ [new InclusionValidator({ allowedValues: ['foo', 'bar'] })] }/>`
 *
 * would validate that the value of the text field is either 'foo' or 'bar'.
 *
 *
 * @constructor InclusionValidator
 */

var InclusionValidator =

/**
 * @method constructor
 * @param {Object} params
 */
function InclusionValidator() {
  var _this = this;

  var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, InclusionValidator);

  this.validate = function (value) {
    return _this.allowedValues.indexOf(value) !== -1;
  };

  this.message = function () {
    return _helpersValidations2['default'].validationMessage(_this.customMessage, 'errors.messages.inclusion');
  };

  this.allowedValues = params.allowedValues || [];

  /**
   * An optional custom validation message.
   *
   * @property customMessage
   * @type {String}
   */
  this.customMessage = params.customMessage;
}

/**
 * This will validate the given value, and return a valid status.
 *
 * @method validate
 * @param {String} value to check presence
 * @return {Boolean} true if value is valid
 */
;

exports['default'] = InclusionValidator;
module.exports = exports['default'];

/**
 * This is the message returned when this validation fails.
 *
 * @method message
 * @return {String} the error message to display
 */