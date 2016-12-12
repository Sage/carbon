'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validations = require('./../../helpers/validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IsBlankValidator = function IsBlankValidator() {
  var _this = this;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, IsBlankValidator);

  this.validate = function (value) {
    if (value === '' || null || undefined) {
      return true;
    } else {
      return false;
    }
  };

  this.message = function () {
    return _validations2.default.validationMessage(_this.customMessage, 'errors.messages.must_be_blank');
  };

  this.customMessage = params.customMessage;
};

exports.default = IsBlankValidator;