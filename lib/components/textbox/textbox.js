'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A textbox widget.
 *
 * == How to use a Textbox in a component:
 *
 * In your file
 *
 *   import Textbox from 'carbon/lib/components/textbox';
 *
 * To render a Textbox:
 *
 *   <Textbox name="myTextbox" />
 *
 * @class Textbox
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Textbox = (0, _input2.default)((0, _inputLabel2.default)((0, _inputValidation2.default)(function (_React$Component) {
  _inherits(Textbox, _React$Component);

  function Textbox() {
    _classCallCheck(this, Textbox);

    return _possibleConstructorReturn(this, (Textbox.__proto__ || Object.getPrototypeOf(Textbox)).apply(this, arguments));
  }

  _createClass(Textbox, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        _extends({
          className: this.mainClasses,
          ref: function ref(comp) {
            _this2._target = comp;
          }
        }, (0, _tags2.default)('textbox', this.props)),
        this.labelHTML,
        this.inputHTML,
        this.validationHTML,
        this.fieldHelpHTML
      );
    }
  }, {
    key: 'mainClasses',

    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {void}
     */
    get: function get() {
      return 'carbon-textbox';
    }

    /**
     * Input class getter
     *
     * @method inputClasses
     */

  }, {
    key: 'inputClasses',
    get: function get() {
      return 'carbon-textbox__input';
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * textbox specific props.
     *
     * @method inputProps
     * @return {Object} props for the input
     */

  }, {
    key: 'inputProps',
    get: function get() {
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      props.className = this.inputClasses;
      return props;
    }
  }]);

  return Textbox;
}(_react2.default.Component))));

exports.default = Textbox;